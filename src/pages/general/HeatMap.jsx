// src/pages/general/PriceChoropleth.jsx
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Rectangle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import csvUrl from "../../map/heatmap_data.csv?url";

const PRICE_KEYS = ["price"];

// Parser numérico robusto (acepta $, comas, espacios)
const toNum = (x) => {
  if (x == null) return NaN;
  const cleaned = String(x).replace(/[^\d.-]/g, "");
  const v = Number(cleaned);
  return Number.isFinite(v) ? v : NaN;
};

function parseTable(text) {
  const rows = text.trim().split("\n");
  if (rows.length < 2) return [];
  const headers = rows[0].split(",");
  return rows.slice(1).map(line => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (values[i] ?? "").trim()]));
  });
}


const detectPriceKey = (row) => {
  if (!row) return null;
  const keys = Object.keys(row).map((k) => k.toLowerCase().trim());
  for (const k of PRICE_KEYS) {
    const i = keys.indexOf(k);
    if (i !== -1) return Object.keys(row)[i];
  }
  return null;
};

const fmtUSD = (v) =>
  Number.isFinite(v)
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v)
    : "—";

function median(arr) {
  if (!arr.length) return NaN;
  const a = [...arr].sort((x, y) => x - y);
  const m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
}
function mode(arr) {
  if (!arr.length) return "";
  const counts = new Map();
  for (const v of arr) counts.set(v, (counts.get(v) || 0) + 1);
  let best = "", bestC = -1;
  for (const [k, c] of counts) if (c > bestC) { best = k; bestC = c; }
  return best || "";
}

// Gradiente verde→rojo a partir de t en [0,1]
function colorFromT(t) {
  const x = Math.max(0, Math.min(1, t));
  const stops = [
    [0.0, [46, 204, 113]],  // #2ECC71
    [0.25,[163, 230, 53]],  // #A3E635
    [0.5, [250, 204, 21]],  // #FACC15
    [0.75,[251, 146, 60]],  // #FB923C
    [1.0, [220, 38, 38]],   // #DC2626
  ];
  let i = 0;
  while (i < stops.length - 1 && x > stops[i + 1][0]) i++;
  const [t0, c0] = stops[i];
  const [t1, c1] = stops[i + 1] || stops[i];
  const u = t1 === t0 ? 0 : (x - t0) / (t1 - t0);
  const r = Math.round(c0[0] + (c1[0] - c0[0]) * u);
  const g = Math.round(c0[1] + (c1[1] - c0[1]) * u);
  const b = Math.round(c0[2] + (c1[2] - c0[2]) * u);
  return `rgb(${r},${g},${b})`;
}

// ---------- Página ----------
export default function PriceChoropleth() {
  const [rows, setRows] = useState([]);
  const [priceKey, setPriceKey] = useState(null);
  const [globalRange, setGlobalRange] = useState({ min: null, max: null });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Filtro por precio (en escala original)
  const [filterMin, setFilterMin] = useState(null);
  const [filterMax, setFilterMax] = useState(null);

  // tamaño de celda (~500 m en Ames)
  const CELL_SIZE = 0.0045;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(csvUrl);
        if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
        const text = await res.text();
        const data = parseTable(text);
        if (!data.length) throw new Error("CSV vacío");

        const detected = detectPriceKey(data[0]);
        const cleaned = [];
        for (const r of data) {
          const lat = toNum(r.lat ?? r.latitude ?? r.Latitude ?? r.LAT ?? r.Lat);
          const lng = toNum(r.lon ?? r.long ?? r.lng ?? r.longitude ?? r.Longitude ?? r.LNG ?? r.Lng);
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
          cleaned.push({
            neighborhood: String(r.neighborhood ?? r.Neighborhood ?? "").trim(),
            lat, lng,
            price: detected ? toNum(r[detected]) : null,
          });
        }

        let min = Infinity, max = -Infinity;
        for (const r of cleaned) {
          if (Number.isFinite(r.price)) {
            if (r.price < min) min = r.price;
            if (r.price > max) max = r.price;
          }
        }
        if (!Number.isFinite(min) || !Number.isFinite(max)) { min = null; max = null; }

        if (!cancelled) {
          setRows(cleaned);
          setPriceKey(detected);
          setGlobalRange({ min, max });
          setFilterMin(min);
          setFilterMax(max);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setErr(e?.message || String(e));
          setRows([]);
          setPriceKey(null);
          setGlobalRange({ min: null, max: null });
          setFilterMin(null);
          setFilterMax(null);
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const hasPrice = !!priceKey && Number.isFinite(globalRange.min) && Number.isFinite(globalRange.max);

  // ---------- Normalización LOG automática ----------
  const logScale = useMemo(() => {
    if (!hasPrice) {
      return {
        norm: () => 0,
        legendLabels: ["—", "—", "—", "—", "—"]
      };
    }
    // Asegurar valores positivos para log10
    const lo = Math.log10(Math.max(1, globalRange.min));
    const hi = Math.log10(Math.max(1, globalRange.max));

    const norm = (v) => {
      if (!Number.isFinite(v) || lo === hi) return 0;
      const x = Math.log10(Math.max(1, v));
      return Math.max(0, Math.min(1, (x - lo) / (hi - lo)));
    };

    // Etiquetas de leyenda en escala log (5 ticks)
    const ticksLog = [lo, lo + (hi - lo) * 0.25, lo + (hi - lo) * 0.5, lo + (hi - lo) * 0.75, hi];
    const legendLabels = ticksLog.map(L => fmtUSD(Math.round(10 ** L)));

    return { norm, legendLabels };
  }, [hasPrice, globalRange]);

  // filtro por precio (en escala original; independientemente de log para colores)
  const filtered = useMemo(() => {
    if (!hasPrice || !Number.isFinite(filterMin) || !Number.isFinite(filterMax)) return rows;
    const lo = Math.min(filterMin, filterMax);
    const hi = Math.max(filterMin, filterMax);
    return rows.filter((r) => Number.isFinite(r.price) && r.price >= lo && r.price <= hi);
  }, [rows, hasPrice, filterMin, filterMax]);

  // Agregación a celdas (mediana para color, min/max para tooltip, vecindario dominante)
  const cells = useMemo(() => {
    if (!filtered.length) return [];
    const size = CELL_SIZE;
    const buckets = new Map();
    for (const r of filtered) {
      const i = Math.floor(r.lat / size);
      const j = Math.floor(r.lng / size);
      const key = `${i}|${j}`;
      if (!buckets.has(key)) {
        const lat0 = i * size, lng0 = j * size;
        buckets.set(key, { prices: [], neighs: [], bounds: [[lat0, lng0], [lat0 + size, lng0 + size]] });
      }
      const b = buckets.get(key);
      b.prices.push(r.price);
      b.neighs.push(r.neighborhood);
    }

    const out = [];
    for (const [, b] of buckets) {
      const med = median(b.prices);
      const min = Math.min(...b.prices);
      const max = Math.max(...b.prices);
      const neigh = mode(b.neighs);
      out.push({ ...b, median: med, min, max, neigh });
    }
    return out;
  }, [filtered]);

  return (
    <section className="h-full w-full p-6">
      <h1 className="text-3xl font-semibold mb-1">Mapa de calor — Ames, IA</h1>
      <p className="text-md text-neutral-600 mb-4">
        Coloreado con <b>escala logarítmica</b>.
      </p>

      <div className="grid grid-cols-12 gap-6">
        {/* MAPA */}
        <div className="col-span-12 lg:col-span-8">
          <div className="w-full h-[520px] rounded-2xl overflow-hidden border shadow-sm">
            <MapContainer
              center={[42.03, -93.62]}
              zoom={12}
              minZoom={11}
              maxZoom={13}
              style={{ width: "100%", height: "100%" }}
              scrollWheelZoom
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
              {cells.map((c, idx) => {
                const t = logScale.norm(c.median);   // <-- normalización LOG porque si no el mapa de calor no se aprecia
                const color = colorFromT(t);
                return (
                  <Rectangle
                    key={idx}
                    bounds={c.bounds}
                    pathOptions={{ color: "#111827", weight: 0.5, fillColor: color, fillOpacity: 0.65 }}
                  >
                    <Tooltip direction="top" offset={[0, -6]}>
                      <div><b>{c.neigh || "—"}</b></div>
                      <div>Mediana precio: {fmtUSD(c.median)}</div>
                    </Tooltip>
                  </Rectangle>
                );
              })}
            </MapContainer>
          </div>
          <div className="text-xs text-neutral-600 mt-2">
            Celdas: {cells.length} · Puntos visibles: {filtered.length}
          </div>
        </div>

        {/* PANEL */}
        <aside className="col-span-12 lg:col-span-4">
          <div className="rounded-2xl border shadow-sm p-5 space-y-5 sticky top-4">
            {/* Leyenda log automática */}
            <div>
              <h2 className="text-lg font-medium">Rango de precios</h2>
              <div className="mt-3">
                <div className="h-3 w-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #2ECC71 0%, #A3E635 25%, #FACC15 50%, #FB923C 75%, #DC2626 100%)",
                  }}
                />
                <div className="mt-1 flex justify-between text-xs text-neutral-600">
                  {logScale.legendLabels.map((lab, i) => (
                    <span key={i}>{lab}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Filtro por precio (valores originales) */}
            <div>
              <h3 className="text-sm font-medium mb-2">Filtrar por precio</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Mín</label>
                  <input
                    type="number"
                    className="w-full rounded-md border px-2 py-1 text-sm"
                    value={Number.isFinite(filterMin) ? Math.round(filterMin) : ""}
                    onChange={(e) => setFilterMin(toNum(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">Máx</label>
                  <input
                    type="number"
                    className="w-full rounded-md border px-2 py-1 text-sm"
                    value={Number.isFinite(filterMax) ? Math.round(filterMax) : ""}
                    onChange={(e) => setFilterMax(toNum(e.target.value))}
                  />
                </div>

                <input
                  type="range"
                  className="col-span-1"
                  min={globalRange.min ?? 0}
                  max={globalRange.max ?? 1}
                  step="1000"
                  value={Number.isFinite(filterMin) ? filterMin : globalRange.min ?? 0}
                  onChange={(e) => setFilterMin(toNum(e.target.value))}
                />
                <input
                  type="range"
                  className="col-span-1"
                  min={globalRange.min ?? 0}
                  max={globalRange.max ?? 1}
                  step="1000"
                  value={Number.isFinite(filterMax) ? filterMax : globalRange.max ?? 1}
                  onChange={(e) => setFilterMax(toNum(e.target.value))}
                />

                <div className="col-span-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFilterMin(globalRange.min);
                      setFilterMax(globalRange.max);
                    }}
                    className="mt-1 text-xs underline"
                  >
                    Restablecer rango
                  </button>
                </div>
              </div>
            </div>

            {/* Resumen global bruto */}
            <div className="text-xs text-neutral-600">
              Global (bruto): {fmtUSD(globalRange.min)} – {fmtUSD(globalRange.max)}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
