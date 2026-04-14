import Link from "next/link";
import { getCompanySettings, getActiveWoods } from "@/lib/seymu-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const company = await getCompanySettings();
  const woods = await getActiveWoods();

  return (
    <section className="seymu-hero">
      <div className="container seymu-hero-content">
        <span className="seymu-badge">
          {company?.company_name ?? "Maderas Finas Seymu"}
        </span>

        <h1 className="seymu-title">
          {company?.slogan ?? "Calidad, elegancia y tradición en cada pieza de madera"}
        </h1>

        <p className="seymu-subtitle">
          {company?.about_text ??
            "Descubrí nuestro catálogo de maderas, conocé sus características y contactanos por WhatsApp."}
        </p>

        <div className="seymu-actions">
          <Link href="/maderas" className="btn-primary">
            Ver catálogo
          </Link>

          <Link href="/contacto" className="btn-secondary">
            Contactar
          </Link>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <p className="page-text" style={{ marginBottom: "1rem" }}>
            Maderas destacadas
          </p>

          <div className="woods-grid">
            {woods.slice(0, 3).map((wood) => (
              <article key={wood.id} className="wood-card">
                <div className="wood-image-placeholder">{wood.name}</div>

                <div className="wood-card-body">
                  <span className="wood-category">
                    {wood.category ?? "Madera"}
                  </span>

                  <h2 className="wood-title">{wood.name}</h2>
                  <p className="wood-price">₡{Number(wood.price).toLocaleString("es-CR")}</p>
                  <p className="wood-description">{wood.short_description}</p>

                  <div className="wood-actions">
                    <Link href={`/maderas/${wood.slug}`} className="btn-primary">
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}