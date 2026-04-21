import "./nosotros.css";

export const dynamic = "force-dynamic";

export default async function NosotrosPage() {
  const values = ["Calidad", "Confianza", "Sostenibilidad", "Atención cercana"];

  const historyPoints = [
    {
      year: "2008",
      title: "Fundación",
      description: "Nacimiento de la empresa en La Guácima por el Ing. Ezequiel Segura López.",
    },
    {
      year: "2010",
      title: "Crecimiento",
      description: "Traslado a la ubicación actual y expansión del inventario de especies.",
    },
    {
      year: "2012",
      title: "Innovación",
      description: "Incorporación del secado al horno para garantizar máxima estabilidad.",
    },
    {
      year: "2017",
      title: "Expansión",
      description: "Proveedor clave de proyectos de lujo en Guanacaste y aserrío personalizado.",
    },
    {
      year: "Hoy",
      title: "Liderazgo",
      description: "Inventario de 50,000 pulgadas y referente en maderas finas a nivel nacional.",
    },
  ];

  const historyText = `<b>Maderas Finas Seymu</b> nació en <b>2008</b> en La Guácima, Alajuela, como un proyecto personal del <b>Ing. Ezequiel Segura López</b>, profesional del TEC con más de <b>35 años de experiencia</b>. Lo que inició en una pequeña bodega contigua a la casa de su fundador para abastecer a ebanistas locales con <b>cedro de alta calidad</b>, pronto se transformó en una operación sólida impulsada por la confianza de proveedores que financiaron nuestros primeros cargamentos de <b>1,000 pulgadas</b>.

    Para <b>2010</b>, el crecimiento constante nos trasladó a nuestra <b>ubicación actual</b>, ampliando el inventario y la oferta de especies. En <b>2012</b>, marcamos un hito tecnológico al integrar el <b>secado al horno</b>, un servicio que garantiza la máxima <b>estabilidad y durabilidad</b> del material, brindando a nuestros clientes una satisfacción y fidelidad que nos distingue en el mercado.

    Un momento de gran expansión ocurrió en <b>2017</b>, al convertirnos en proveedores clave de <b>proyectos hoteleros y residencias de lujo en Guanacaste</b>. Este salto nos permitió evolucionar nuestro modelo de negocio, pasando de comprar madera aserrada a gestionar directamente el <b>aserrío personalizado de trozas</b>, asegurando un control total sobre la calidad y las medidas específicas solicitadas por el cliente.

    Hoy en día, contamos con un inventario propio de <b>50,000 pulgadas</b> y una amplia gama de especies exclusivas como <b>cedro, guanacaste, laurel, cenízaro, teca y roble sabana</b>. Nuestra oferta incluye desde <b>tablones exclusivos para sobres de mesa</b> hasta madera estructural, rodapiés y tablillas para cielo, consolidándonos como un referente de excelencia y servicio experto en toda Costa Rica.`;

  const historyParagraphs = historyText
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="nosotros-page">
      <section className="nosotros-hero">
        <div className="container">
          <div className="nosotros-hero-grid">
            <div className="nosotros-hero-copy">
              <span className="nosotros-hero-tag anim-up anim-up-1">
                Maderas Finas Seymu
              </span>

              <h1 className="nosotros-hero-title anim-up anim-up-2">
                Madera que <em>cuenta</em> historias.
              </h1>

              <p className="nosotros-hero-text anim-up anim-up-3">
                Seleccionamos y distribuimos maderas con enfoque técnico,
                atención personalizada y compromiso con la calidad en cada
                proyecto.
              </p>

              <div className="nosotros-hero-pills anim-up anim-up-4">
                {values.map((value) => (
                  <span key={value} className="nosotros-hero-pill">
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <aside className="nosotros-hero-panel anim-up anim-up-3">
              <span className="nosotros-panel-label">Nuestra esencia</span>
              <p>
                Trabajamos con criterio, detalle y una visión enfocada en
                brindar materiales confiables para quienes valoran la calidad y
                la buena atención.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="nosotros-identidad">
        <div className="container">
          <div className="nosotros-section-head anim-up anim-up-1">
            <span>Quiénes somos</span>
            <h2>
              Una empresa construida sobre confianza, detalle y continuidad.
            </h2>
          </div>

          <div className="nosotros-identidad-layout anim-up anim-up-2">
            <article className="nosotros-id-story">
              <span className="nosotros-card-eyebrow">Nuestra historia</span>
              <h3>Compromiso con cada pieza, desde el origen hasta el destino.</h3>

              <div className="nosotros-id-story-flow">
                {historyParagraphs.map((paragraph, index) => (
                  <p 
                    key={index} 
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
              </div>
            </article>

            <div className="nosotros-id-side">
              <article className="nosotros-id-card-combined">
                <div className="nosotros-combined-section">
                  <span className="nosotros-card-eyebrow">Misión</span>
                  <h3>Calidad que transforma</h3>
                  <p>
                    Proveer maderas finas para la fabricación de muebles y construcción de la más alta calidad que superen las expectativas de los clientes, ofreciendo un servicio experto y personalizado fomentando las mejores prácticas.
                  </p>
                </div>
                
                <div className="nosotros-combined-divider"></div>
                
                <div className="nosotros-combined-section">
                  <span className="nosotros-card-eyebrow">Visión</span>
                  <h3>Referente de confianza</h3>
                  <p>
                    Ser los líderes en la comercialización de maderas finas, transformando la forma en que los clientes perciben y valoran nuestro producto reflejando nuestro compromiso con la calidad.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="nosotros-trayectoria">
        <div className="container">
          <div className="nosotros-tray-header anim-up anim-up-1">
            <span>Trayectoria</span>
            <h2>Nuestra evolución</h2>
            <p>
              Una línea de tiempo clara ayuda a transmitir solidez, experiencia
              y crecimiento continuo.
            </p>
          </div>

          <div className="nosotros-tray-grid anim-up anim-up-2">
            {historyPoints.map((point, index) => (
              <article key={index} className="nosotros-tray-item">
                <div className="nosotros-tray-top">
                  <span className="nosotros-tray-step">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="nosotros-tray-year">{point.year}</span>
                </div>

                <h3 className="nosotros-tray-title">{point.title}</h3>
                <p className="nosotros-tray-desc">{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}