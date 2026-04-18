import { notFound } from "next/navigation";
import {
  getCompanySettings,
  getWoodBySlug,
  getWoodImages,
} from "@/lib/seymu-data";
import {
  CheckCircle2,
  MessageSquare,
  ArrowLeft,
  Ruler,
  Truck,
  Award,
} from "lucide-react";
import Link from "next/link";
import WoodGallery from "@/app/components/woods/WoodGallery";

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
  const cleanPhone = company?.whatsapp_number?.replace(/\D/g, "") || "";

  const msgDirect = encodeURIComponent(
    `¡Hola! Me interesa recibir una cotización detallada sobre la madera ${wood.name} (${wood.category || "Premium"}). Vi los detalles en su sitio web y me gustaría conocer más detalles. ¡Muchas gracias!`
  );

  const msgCustom = encodeURIComponent(
    `Buenas, me interesa consultar un pedido personalizado de la madera ${wood.name} (${wood.category || "Premium"}).`
  );

  const linkDirect = `https://wa.me/${cleanPhone}?text=${msgDirect}`;
  const linkCustom = `https://wa.me/${cleanPhone}?text=${msgCustom}`;

  return (
    <main className="wood-detail-page">
      <nav className="wood-detail-breadcrumb">
        <div className="container wood-detail-breadcrumb-inner">
          <Link href="/maderas" className="wood-detail-back-link">
            <ArrowLeft size={16} />
            Catálogo
          </Link>

          <span className="wood-detail-separator">/</span>

          <span className="wood-detail-current">{wood.name}</span>
        </div>
      </nav>

      <section className="page-section wood-detail-section">
        <div className="container">
          <div className="wood-detail-grid">
            <WoodGallery images={images} woodName={wood.name} />

            <div className="wood-detail-main">
              <span className="hero-tag wood-detail-tag">
                {wood.category || "Especie Fina"}
              </span>

              <h1 className="wood-detail-title">{wood.name}</h1>

              <div className="wood-detail-price-row">
                <span className="wood-detail-price">
                  ₡{Number(wood.price).toLocaleString("es-CR")}
                </span>
              </div>

              <div className="wood-detail-specs-box">
                <h4 className="wood-detail-specs-title">
                  Especificaciones Técnicas
                </h4>

                <div className="wood-detail-specs-grid">
                  <div className="wood-detail-spec-item">
                    <Ruler size={18} color="var(--primary)" />
                    <div>
                      <div className="wood-detail-spec-label">Medidas</div>
                      <div className="wood-detail-spec-value">
                        {wood.measurements || "Personalizables"}
                      </div>
                    </div>
                  </div>

                  <div className="wood-detail-spec-item">
                    <Award size={18} color="var(--primary)" />
                    <div>
                      <div className="wood-detail-spec-label">Secado</div>
                      <div className="wood-detail-spec-value">Horno / Aire</div>
                    </div>
                  </div>

                  <div className="wood-detail-spec-item">
                    <Truck size={18} color="var(--primary)" />
                    <div>
                      <div className="wood-detail-spec-label">Entrega</div>
                      <div className="wood-detail-spec-value">Nacional</div>
                    </div>
                  </div>

                  <div className="wood-detail-spec-item">
                    <CheckCircle2 size={18} color="var(--primary)" />
                    <div>
                      <div className="wood-detail-spec-label">Calidad</div>
                      <div className="wood-detail-spec-value">Certificada</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="wood-detail-description-box">
                <h4 className="wood-detail-description-title">Descripción</h4>
                <p className="wood-detail-description">
                  {wood.description ||
                    "Madera fina seleccionada por nuestros expertos para garantizar la mayor durabilidad y belleza en sus proyectos."}
                </p>
              </div>

              <div className="wood-detail-actions">
                <a
                  href={linkDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wood-detail-whatsapp wood-detail-whatsapp-primary"
                >
                  <MessageSquare size={20} />
                  ¡Hola! Me interesa recibir información
                </a>

                <a
                  href={linkCustom}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wood-detail-whatsapp wood-detail-whatsapp-secondary"
                >
                  <Award size={20} />
                  Pedido Personalizado
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}