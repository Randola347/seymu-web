import Link from "next/link";
import {
  getFeaturedWoods,
  getSiteIdentity,
} from "@/lib/seymu-data";
import {
  ArrowRight,
  ShieldCheck,
  TreeDeciduous,
  Award,
  Zap,
  MapPin,
  TrendingUp,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const identity = await getSiteIdentity();
  const featuredWoods = await getFeaturedWoods();

  const timeline = [
    {
      year: "2008",
      title: "El Nacimiento",
      description:
        "Fundación de Maderas Seymu en Alajuela, con el sueño de ofrecer las mejores especies del país.",
      icon: <Zap size={20} />,
    },
    {
      year: "2010",
      title: "Crecimiento",
      description:
        "Ampliación de nuestro inventario y consolidación como proveedores de ebanisterías locales.",
      icon: <MapPin size={20} />,
    },
    {
      year: "2012",
      title: "Excelencia",
      description:
        "Implementación de rigurosos estándares de calidad y selección manual de cada pieza.",
      icon: <Award size={20} />,
    },
    {
      year: "2017",
      title: "Expansión",
      description:
        "Nuevas rutas de distribución nacional y modernización del catálogo digital.",
      icon: <TrendingUp size={20} />,
    },
    {
      year: "Hoy",
      title: "Liderazgo",
      description:
        "Referente en maderas finas, comprometidos con la sostenibilidad y la satisfacción total.",
      icon: <Clock size={20} />,
    },
  ];

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-bg" />

        <div className="container home-hero-container">
          <div className="home-hero-grid">
            <div className="home-hero-logo-wrap">
              <img
                src={identity?.logo_url || "/assets/logo.jpg"}
                alt="Seymu Logo"
                className="home-hero-logo"
              />
            </div>

            <div className="home-hero-copy">
              <span className="home-pill">35+ Años de Experiencia</span>

              <h1 className="home-hero-title">
                Elegancia en <i>cada pieza</i> de madera
              </h1>

              <p className="home-hero-text">
                Calidad y excelencia en cada pieza seleccionada.
              </p>

              <div className="home-hero-actions">
                <Link href="/maderas" className="btn-premium btn-premium-primary">
                  Ver Catálogo <ArrowRight size={18} />
                </Link>

                <Link href="/contacto" className="home-outline-btn">
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section home-benefits">
        <div className="container">
          <div className="home-benefits-grid">
            <article className="premium-card home-benefit-card">
              <ShieldCheck size={32} color="var(--primary)" />
              <h3>Garantía Total</h3>
              <p>Maderas seleccionadas bajo los más altos estándares.</p>
            </article>

            <article className="premium-card home-benefit-card">
              <TreeDeciduous size={32} color="var(--primary)" />
              <h3>Sostenibilidad</h3>
              <p>Compromiso con el medio ambiente y manejo forestal.</p>
            </article>

            <article className="premium-card home-benefit-card">
              <Award size={32} color="var(--primary)" />
              <h3>Excelencia</h3>
              <p>Más de tres décadas de experiencia garantizada.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="page-section home-timeline">
        <div className="container">
          <div className="home-section-heading centered">
            <h2>Nuestra Trayectoria</h2>
            <div className="home-section-line" />
          </div>

          <div className="home-timeline-grid">
            {timeline.map((item, index) => (
              <article key={index} className="home-timeline-item">
                <div className="home-timeline-icon">{item.icon}</div>
                <span className="home-timeline-year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section home-featured">
        <div className="container">
          <div className="home-featured-grid">
            <div className="home-featured-media">
              <img
                src={identity?.banner_url || "/assets/logo.jpg"}
                alt="Banner Seymu"
                className="home-featured-image"
              />
            </div>

            <div className="home-featured-copy">
              <span className="hero-tag">Inventario Único</span>
              <h2>Variedad Exclusiva de Especies Finas</h2>
              <p>
                Contamos con un catálogo rigurosamente seleccionado para
                proyectos premium. Desde maderas decorativas hasta estructurales
                de alta densidad, garantizamos piezas que elevan el estándar de
                cualquier obra.
              </p>

              <div className="home-featured-actions">
                <Link href="/maderas" className="btn-premium btn-premium-primary">
                  Ver Catálogo <ArrowRight size={18} />
                </Link>

                <div className="home-quality-stat">
                  <span>100%</span>
                  <small>Calidad Forestal</small>
                </div>
              </div>
            </div>
          </div>

          {featuredWoods.length > 0 && (
            <div className="home-featured-list">
              <div className="wood-grid">
                {featuredWoods.map((wood) => (
                  <article key={wood.id} className="premium-card home-wood-card">
                    <div className="home-wood-card-media">
                      {wood.main_image_url ? (
                        <img
                          src={wood.main_image_url}
                          alt={wood.name}
                          className="home-wood-card-image"
                        />
                      ) : (
                        <div className="home-wood-card-placeholder">
                          <TreeDeciduous size={60} />
                        </div>
                      )}
                    </div>

                    <div className="home-wood-card-body">
                      <span className="hero-tag home-wood-card-tag">
                        {wood.category}
                      </span>

                      <h3>{wood.name}</h3>
                      <p>{wood.short_description}</p>

                      <Link
                        href={`/maderas/${wood.slug}`}
                        className="btn-premium btn-premium-primary home-wood-card-btn"
                      >
                        Ver Detalles
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}