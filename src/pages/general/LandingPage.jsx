// src/pages/general/LandingPage.jsx
import CustomButton from "../../components/UI/CustomButton";
import heroImg from "../../assets/hero.jpg";
import mapaImg from "../../assets/map.jpg"; 
import aiImg   from "../../assets/house.jpg";
import neighImg from "../../assets/neighborhood.jpg";
import finImg from "../../assets/finance.jpg";

function Home() {
  return (
    <main className="font-sans bg-neutral-50 text-secondary-500">
      {/* HERO */}
      <section
        className="relative grid h-[300px] place-items-center bg-cover bg-center text-neutral-50"
        style={{backgroundImage: `linear-gradient(to bottom, rgba(24,24,24,.75), rgba(24,24,24,.75)), url(${heroImg})`}}>
        <div className="container py-16">
          <h1 className="text-3xl md:text-5xl font-extrabold max-w-2xl">
            Bienvenido a Inbol
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-200">
            Conoce la herramienta de valuación de casas más eficiente en el mercado. 
            Saca provecho al máximo de todas nuestras herramientas  y servicios.
          </p>
          
        </div>
      </section>
      

      {/* GRID 2x2 */}
      <section className="py-20 bg-neutral-100">
        <div className="container pl-40">
          <h2 className="text-2xl md:text-3xl font-extrabold text-secondary-500 text-center mb-12">
            Consulta nuestros servicios 
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Valuar con IA */}
            <article className="rounded-2xl bg-neutral-50 shadow p-6 md:p-8 flex flex-col">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* Texto */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-extrabold mb-2">Valúa tu casa con IA</h3>
                  <p className="text-secondary-400 leading-relaxed">
                    Ingresa ubicación, m² y características principales. Nuestro modelo estima el valor 
                    de mercado de forma rápida y confiable.
                  </p>
                </div>
                {/* Imagen */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                  <img src={aiImg} alt="Casa" className="max-w-xs w-xs rounded-xl shadow" />
                </div>
              </div>
              <div className="mt-6">
                <CustomButton texto="Comenzar valuación" style="primario" ruta="/value" />
              </div>
            </article>

            {/* Card 2: Mapa de calor */}
            <article className="rounded-2xl bg-neutral-50 shadow p-6 md:p-8 flex flex-col">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-extrabold mb-2">Mapa de calor</h3>
                  <p className="text-secondary-400 leading-relaxed">
                    Visualiza zonas con mayor demanda, precios promedio y oportunidades únicas 
                    para comprar o invertir.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                  <img src={mapaImg} alt="Mapa de calor" className="max-w-sm w-full rounded-xl shadow" />
                </div>
              </div>
              <div className="mt-6">
                <CustomButton texto="Ver mapa" style="primario" ruta="/heatmap" />
              </div>
            </article>

            {/* Card 3: Encuentra tu casa */}
            <article className="rounded-2xl bg-neutral-50 shadow p-6 md:p-8 flex flex-col">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-extrabold mb-2">Encuentra tu casa ideal</h3>
                  <p className="text-secondary-400 leading-relaxed">
                    Descubre dónde están las propiedades disponibles y explora su entorno. 
                    Encuentra fácilmente centros comerciales, escuelas y servicios que se adapten a tu estilo de vida.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                  <img src={neighImg} alt="Necesidades" className="max-w-sm w-full rounded-xl shadow" />
                </div>
              </div>
              <div className="mt-6">
                <CustomButton texto="Encuentra tu casa ideal" style="primario" ruta="/houses" />
              </div>
            </article>

            {/* Card 4: Informes del mercado (placeholder) */}
            <article className="rounded-2xl bg-neutral-50 shadow p-6 md:p-8 flex flex-col">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="w-full md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-extrabold mb-2">Informes del mercado</h3>
                  <p className="text-secondary-400 leading-relaxed">
                    Analiza tendencias trimestrales, compara colonias y toma decisiones con datos 
                    actualizados y transparentes.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                  <img src={finImg} alt="Informe de mercado" className="max-w-sm w-full rounded-xl shadow" />
                </div>
              </div>
              <div className="mt-6">
                <CustomButton texto="Ver informes" style="primario" ruta="/informes" />
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Home;

