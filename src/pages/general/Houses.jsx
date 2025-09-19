import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import csvUrl from "../../map/heatmap_data.csv?url";


//Colores 
const NEI_COLORS = {
  "Blmngtn": "#1f77b4",       // Bloomington Heights
  "Blueste": "#ff7f0e",       // Bluestem
  "BrDale": "#2ca02c",        // Briardale
  "BrkSide": "#d62728",       // Brookside
  "ClearCr": "#9467bd",       // Clear Creek
  "CollgCr": "#8c564b",       // College Creek
  "Crawfor": "#e377c2",       // Crawford
  "Edwards": "#7f7f7f",       // Edwards
  "Gilbert": "#bcbd22",       // Gilbert
  "IDOTRR": "#17becf",        // Iowa DOT and Rail Road
  "MeadowV": "#aec7e8",       // Meadow Village
  "Mitchel": "#ffbb78",       // Mitchell
  "NAmes": "#98df8a",         // North Ames
  "NoRidge": "#ff9896",       // Northridge
  "NPkVill": "#c5b0d5",       // Northpark Villa
  "NridgHt": "#c49c94",       // Northridge Heights
  "NWAmes": "#f7b6d2",        // Northwest Ames
  "OldTown": "#c7c7c7",       // Old Town
  "SWISU": "#dbdb8d",         // South & West of Iowa State Univ
  "Sawyer": "#9edae5",        // Sawyer
  "SawyerW": "#393b79",       // Sawyer West
  "Somerst": "#637939",       // Somerset
  "StoneBr": "#8c6d31",       // Stone Brook
  "Timber": "#843c39",        // Timberland
  "Veenker": "#7b4173"        // Veenker
};


const PRICE_KEYS = ["price"];
const toNum = (x) => (x == null ? NaN : Number(String(x).replace(/[, ]/g, "")));

const detectPriceKey = (row) => {
  if (!row) return null;
  const keys = Object.keys(row).map((k) => k.toLowerCase().trim());
  for (const k of PRICE_KEYS) {
    const i = keys.indexOf(k);
    if (i !== -1) return Object.keys(row)[i];
  }
  return null;
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



const fmtUSD = (v) =>
  Number.isFinite(v)
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v)
    : "—";

// Paleta automática (para barrios no mapeados)
function generatePalette(n) {
  const colors = [];
  for (let i = 0; i < n; i++) {
    const hue = Math.round((360 * i) / Math.max(1, n));
    colors.push(`hsl(${hue} 70% 45%)`);
  }
  return colors;
}

export default function MapaCasasPorBarrio() {
  const [rows, setRows] = useState([]);
  const [priceKey, setPriceKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Filtro por neighborhood
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [neiQuery, setNeiQuery] = useState("");

  // Cargar CSV
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await fetch(csvUrl);
        if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
        const text = await res.text();
        const data = parseTable(text);
        if (!Array.isArray(data) || data.length === 0) throw new Error("CSV vacío");

        const detected = detectPriceKey(data[0]);
        const cleaned = [];
        for (const r of data) {
          const lat = toNum(r.lat ?? r.latitude ?? r.Latitude ?? r.LAT ?? r.Lat);
          const lng = toNum(r.lon ?? r.long ?? r.lng ?? r.longitude ?? r.Longitude ?? r.LNG ?? r.Lng);
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
          if (lat < -90 || lat > 90 || lng < -180 || lng > 180) continue;

          const neighborhood =
            String(r.neighborhood ?? r.Neighborhood ?? r.NEIGHBORHOOD ?? "").trim() || "—";
          cleaned.push({
            neighborhood,
            lat,
            lng,
            price: detected ? toNum(r[detected]) : null,
          });
        }

        if (!cancelled) {
          setRows(cleaned);
          setPriceKey(detected);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setErr(e?.message || String(e));
          setRows([]);
          setPriceKey(null);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Lista de neighborhoods 
const neighborhoods = useMemo(() => {
  const map = new Map();
  for (const r of rows) {
    const key = r.neighborhood || "—";
    map.set(key, (map.get(key) || 0) + 1);
  }

  // Orden alfabético
  const arr = [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Solo colores del diccionario, lo demás en gris
  return arr.map(n => ({
    ...n,
    color: (n.name in NEI_COLORS) ? NEI_COLORS[n.name] : "#9ca3af"
  }));
}, [rows]);


  // Búsqueda en panel
  const filteredNeighborhoods = useMemo(() => {
    const q = neiQuery.trim().toLowerCase();
    if (!q) return neighborhoods;
    return neighborhoods.filter(n => n.name.toLowerCase().includes(q));
  }, [neiQuery, neighborhoods]);

  // Filtrado aplicado al mapa
  const filtered = useMemo(() => {
    if (!selectedNeighborhood) return rows;
    return rows.filter(r => (r.neighborhood || "—") === selectedNeighborhood);
  }, [rows, selectedNeighborhood]);

  // Helper para obtener color de cada punto
  const colorFor = (name) => {
    const item = neighborhoods.find(n => n.name === (name || "—"));
    return item ? item.color : "#9ca3af";
  };

  return (
    <section className="h-full w-full p-4">
      <h1 className="text-2xl font-semibold mb-2">Casas disponibles — Ames, IA</h1>
      <p className="text-sm text-neutral-600 mb-3"></p>

      <div className="relative w-full h-[560px] rounded-2xl overflow-hidden border shadow-sm">
        {/* Mapa */}
        <MapContainer
          center={[42.03, -93.62]}
          zoom={12}
          minZoom={12}
          maxZoom={17}
          className="h-full w-full"

        
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {filtered.map((r, i) => {
            const fill = colorFor(r.neighborhood);
            return (
              <CircleMarker
                key={i}
                center={[r.lat, r.lng]}
                radius={7}
                weight={1}
                color="#1f2937"
                fillOpacity={0.85}
                pathOptions={{ fillColor: fill }}
              >
                <Tooltip direction="top" offset={[0, -6]}>
                  <div><b>{r.neighborhood || "—"}</b></div>
                  <div>{Number.isFinite(r.price) && <div>Precio: {fmtUSD(r.price)}</div>}</div>                
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Panel flotante */}
        
        <div className="absolute right-3 top-3 z-[1000]">
          <div className="rounded-md bg-white/95 backdrop-blur border shadow p-3 w-72">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Neighborhoods</h3>
              <button
                type="button"
                onClick={() => {
                  setSelectedNeighborhood(null);   // <-- limpia el filtro
                  setNeiQuery("");                 // <-- opcional: limpia la búsqueda
                }}
                className="text-xs underline"
                title="Mostrar todos"
              >
                Todos
              </button>
            </div>

            <input
              type="text"
              placeholder="Buscar…"
              className="mt-2 w-full rounded border px-2 py-1 text-sm"
              value={neiQuery}
              onChange={(e) => setNeiQuery(e.target.value)}
            />

            <ul className="mt-2 max-h-56 overflow-auto divide-y">
              {filteredNeighborhoods.map((n) => {
                const active = selectedNeighborhood === n.name;
                return (
                  <li key={n.name}>
                    <button
                      type="button"
                      onClick={() => setSelectedNeighborhood(active ? null : n.name)}
                      className={`w-full flex items-center gap-3 px-2 py-2 text-left hover:bg-neutral-50 ${
                        active ? "bg-neutral-100" : ""
                      }`}
                      aria-pressed={active}
                      title={`Mostrar solo ${n.name}`}
                    >
                      <span
                        className="inline-block h-3 w-3 rounded-full ring-1 ring-neutral-700/20"
                        style={{ background: n.color }}
                        aria-hidden
                      />
                      <span className="flex-1 text-sm">{n.name}</span>
                      <span className="text-xs text-neutral-500">({n.count})</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

      </div>

      <div className="text-secondary-500">
        {loading ? "Cargando…" : `Puntos visibles: ${filtered.length}`}
      </div>
    </section>
  );
}
