import { notFound } from "next/navigation";
import { getCompanySettings, getWoodBySlug, getWoodImages } from "@/lib/seymu-data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function WoodDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [company, wood] = await Promise.all([
    getCompanySettings(),
    getWoodBySlug(slug),
  ]);

  if (!wood) {
    notFound();
  }

  const images = await getWoodImages(wood.id);
  const firstImage = images[0]?.secure_url ?? null;

  const whatsappMessage = encodeURIComponent(
    `Hola, me interesa la madera ${wood.name}. Quiero consultar precio y disponibilidad.`
  );

  const whatsappLink = `https://wa.me/${company?.whatsapp_number ?? "50600000000"}?text=${whatsappMessage}`;

  return (
    <section className="page-section">
      <div className="container">
        <div className="wood-detail">
          <div
            className="wood-detail-image"
            style={
              firstImage
                ? {
                    backgroundImage: `url(${firstImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          >
            {!firstImage ? wood.name : ""}
          </div>

          <div className="wood-detail-content">
            <span className="wood-category">{wood.category ?? "Madera"}</span>

            <h1 className="page-title wood-detail-title">{wood.name}</h1>

            <p className="wood-price wood-detail-price">
              ₡{Number(wood.price).toLocaleString("es-CR")}
            </p>

            <div className="wood-detail-meta">
              <div className="wood-detail-meta-item">
                <strong>Disponibilidad:</strong> {wood.availability ?? "Disponible"}
              </div>

              <div className="wood-detail-meta-item">
                <strong>Tipo:</strong> {wood.category ?? "Madera"}
              </div>
            </div>

            <p className="page-text wood-detail-description">
              {wood.description}
            </p>

            <div className="wood-detail-actions">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}