import { notFound } from "next/navigation";
import { getCompanySettings, getWoodBySlug, getWoodImages } from "@/lib/seymu-data";
import { CheckCircle2, MessageSquare, ArrowLeft, Ruler, ShieldCheck, Truck, Award } from "lucide-react";
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
    getWoodBySlug(slug)
  ]);

  if (!wood) {
    notFound();
  }

  const images = await getWoodImages(wood.id);
  const cleanPhone = company?.whatsapp_number?.replace(/\D/g, "") || "";

  // WhatsApp 1: Cotización Directa
  const msgDirect = encodeURIComponent(
    `¡Hola! Me interesa recibir una cotización detallada sobre la madera ${wood.name} (${wood.category || 'Premium'}). Vi los detalles en su sitio web y me gustaría conocer mas detalles. ¡Muchas gracias!`
  );
  
  // WhatsApp 2: Pedido Personalizado
  const msgCustom = encodeURIComponent(
    `Buenas, me interesa consultar un pedido personalizado de la madera ${wood.name} (${wood.category || 'Premium'}).`
  );

  const linkDirect = `https://wa.me/${cleanPhone}?text=${msgDirect}`;
  const linkCustom = `https://wa.me/${cleanPhone}?text=${msgCustom}`;

  return (
    <main style={{ background: '#fff' }}>
      <nav style={{ padding: '20px 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/maderas" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Catálogo
          </Link>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>{wood.name}</span>
        </div>
      </nav>

      <section className="page-section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="wood-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '40px' }}>
            
            {/* Interactive Gallery */}
            <WoodGallery images={images} woodName={wood.name} />

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="hero-tag" style={{ fontSize: '0.75rem', marginBottom: '16px' }}>{wood.category || "Especie Fina"}</span>

              <h1 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                color: 'var(--primary-dark)',
                marginBottom: '20px',
                lineHeight: 1.1
              }}>
                {wood.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                  ₡{Number(wood.price).toLocaleString("es-CR")}
                </span>
                <span style={{ background: 'var(--primary-ghost)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>
                  {wood.availability || "Disponible"}
                </span>
              </div>

              {/* Especificaciones con Medidas */}
              <div style={{ padding: '24px', background: 'var(--surface-alt)', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '0.95rem', color: 'var(--primary-dark)' }}>Especificaciones Técnicas</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Ruler size={18} color="var(--primary)" />
                    <div>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, opacity: 0.6 }}>Medidas</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--foreground)' }}>{wood.measurements || "Personalizables"}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Award size={18} color="var(--primary)" />
                    <div>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, opacity: 0.6 }}>Secado</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--foreground)' }}>Horno / Aire</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Truck size={18} color="var(--primary)" />
                    <div>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, opacity: 0.6 }}>Entrega</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--foreground)' }}>Nacional</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={18} color="var(--primary)" />
                    <div>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, opacity: 0.6 }}>Calidad</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--foreground)' }}>Certificada</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '12px', color: 'var(--primary-dark)' }}>Descripción</h4>
                <p style={{ fontSize: '1.05rem', color: 'var(--foreground-muted)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {wood.description || "Madera fina seleccionada por nuestros expertos para garantizar la mayor durabilidad y belleza en sus proyectos."}
                </p>
              </div>

              {/* Doble Botón de WhatsApp */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href={linkDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    background: '#25D366', color: '#fff', padding: '18px', borderRadius: 'var(--radius-sm)',
                    fontSize: '1.1rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease'
                  }}
                >
                  <MessageSquare size={20} /> ¡Hola! Me interesa recibir información
                </a>
                <a
                  href={linkCustom}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    background: 'var(--primary)', color: '#fff', padding: '18px', borderRadius: 'var(--radius-sm)',
                    fontSize: '1.1rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s ease'
                  }}
                >
                  <Award size={20} /> Pedido Personalizado
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}