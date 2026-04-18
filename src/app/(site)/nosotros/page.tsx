import { getAboutUs } from "@/lib/seymu-data";
import "./nosotros.css";

export const dynamic = "force-dynamic";

export default async function NosotrosPage() {
  const aboutUs = await getAboutUs();

  const historyPoints = [
    {
      year: "2008",
      title: "Fundación",
      description:
        "Iniciamos operaciones con el propósito de ofrecer maderas de alta calidad, atención cercana y soluciones confiables para proyectos residenciales y comerciales.",
    },
    {
      year: "2010",
      title: "Consolidación",
      description:
        "Fortalecimos relaciones con talleres, ebanistas y clientes del sector construcción, consolidando una reputación basada en servicio y confianza.",
    },
    {
      year: "2012",
      title: "Sostenibilidad",
      description:
        "Reforzamos criterios de selección responsable para trabajar con materiales provenientes de fuentes legales y manejo forestal consciente.",
    },
    {
      year: "2017",
      title: "Digitalización",
      description:
        "Incorporamos canales digitales y una operación más ágil para mejorar la atención, la exhibición del catálogo y la coordinación logística.",
    },
    {
      year: "Actualidad",
      title: "Proyección",
      description:
        "Seguimos evolucionando con una visión enfocada en calidad, continuidad operativa y una experiencia de compra más moderna para nuestros clientes.",
    },
  ];

  const values = ["Calidad", "Confianza", "Sostenibilidad", "Atención cercana"];

  const historyText =
    aboutUs?.history_content ||
    `Desde nuestros inicios, en Maderas Seymu nos hemos enfocado en ofrecer materiales de alta calidad y una atención cercana a cada cliente.

Nuestra experiencia se ha construido con trabajo constante, conocimiento del producto y una relación de confianza con quienes desarrollan, diseñan o construyen.

Cada etapa de nuestro crecimiento ha estado marcada por el compromiso con la calidad, la responsabilidad en la selección de materiales y la búsqueda de una experiencia de compra más profesional.

Hoy seguimos proyectándonos como una empresa sólida, moderna y confiable dentro del sector maderero en Costa Rica.`;

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
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="nosotros-id-side">
              <article className="nosotros-id-card">
                <span className="nosotros-card-eyebrow">Misión</span>
                <h3>Calidad que transforma</h3>
                <p>
                  {aboutUs?.mission_content ||
                    "Brindar soluciones madereras de alta calidad, acompañando a nuestros clientes con productos confiables, atención responsable y compromiso con la excelencia."}
                </p>
              </article>

              <article className="nosotros-id-card">
                <span className="nosotros-card-eyebrow">Visión</span>
                <h3>Referente de confianza</h3>
                <p>
                  {aboutUs?.vision_content ||
                    "Ser una empresa reconocida por la calidad de sus maderas, la solidez de su servicio y una operación alineada con prácticas responsables y sostenibles."}
                </p>
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