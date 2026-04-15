import { getAboutUs, getCompanySettings, getSiteIdentity } from "@/lib/seymu-data";
import { Target, Eye, Quote, TreeDeciduous } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NosotrosPage() {
  const content = await getAboutUs();
  const company = await getCompanySettings();
  const identity = await getSiteIdentity();

  return (
    <main style={{ background: 'var(--background)' }}>
      {/* ── HERO SECCION ── */}
      <section 
        style={{ 
          height: '60vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--primary-dark)',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        }}
      >
        {identity?.banner_url && (
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${identity.banner_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.35,
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px' }}>
          <div className="hero-tag" style={{ color: 'var(--accent-light)', borderColor: 'var(--accent)', marginBottom: '24px' }}>Nuestra Esencia</div>
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            color: '#fff',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.1
          }}>
            Maestros de la <strong style={{ fontStyle: 'normal', fontWeight: 700 }}>Madera</strong>
          </h1>
        </div>
      </section>

      {/* ── HISTORIA SECCION ── */}
      <section className="page-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '-40px',
                left: '-40px',
                width: '120px',
                height: '120px',
                background: 'var(--primary-ghost)',
                borderRadius: '50%',
                zIndex: -1
              }}></div>
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '3.5rem', 
                color: 'var(--primary-dark)',
                marginBottom: '40px',
                lineHeight: 1.2
              }}>
                {content?.history_title || "Una historia grabada en el tiempo"}
              </h2>
              <div style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', lineHeight: 1.8 }}>
                {content?.history_content?.split("\n").map((para, i) => (
                  <p key={i} style={{ marginBottom: '24px' }}>{para}</p>
                )) || "Nuestra historia es un legado de pasión por la calidad artesanal."}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div className="premium-card" style={{ padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: 'none', borderRadius: 'var(--radius-lg)' }}>
                <img 
                  src={identity?.logo_url || "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=800&auto=format&fit=crop"} 
                  alt="Seymu Artesanía" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                right: '-30px',
                background: 'var(--primary)',
                color: '#fff',
                padding: '40px',
                borderRadius: 'var(--radius-md)',
                maxWidth: '320px',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <Quote size={32} style={{ marginBottom: '20px', opacity: 0.5 }} />
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "La madera no es solo un material, es una vida que transformamos en legado."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALORES SECCION ── */}
      <section className="page-section" style={{ background: 'var(--primary-dark)', color: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 700 }}>Nuestra Brújula</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', marginTop: '16px' }}>Propósito Global</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            <div style={{ 
              background: 'rgba(255,255,255,0.04)', 
              padding: '60px 40px', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.4s ease'
            }}>
              <div style={{ background: 'var(--accent)', width: '60px', height: '60px', borderRadius: '12px', display: 'grid', placeItems: 'center', marginBottom: '32px' }}>
                <Target size={30} color="#fff" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '24px' }}>
                {content?.mission_title || "Nuestra Misión"}
              </h3>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                {content?.mission_content || "Cargando misión..."}
              </p>
            </div>

            <div style={{ 
              background: 'rgba(255,255,255,0.04)', 
              padding: '60px 40px', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.4s ease'
            }}>
              <div style={{ background: 'var(--accent)', width: '60px', height: '60px', borderRadius: '12px', display: 'grid', placeItems: 'center', marginBottom: '32px' }}>
                <Eye size={30} color="#fff" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '24px' }}>
                {content?.vision_title || "Nuestra Visión"}
              </h3>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                {content?.vision_content || "Cargando visión..."}
              </p>
            </div>

            <div style={{ 
              background: 'rgba(255,255,255,0.04)', 
              padding: '60px 40px', 
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.4s ease'
            }}>
              <div style={{ background: 'var(--accent)', width: '60px', height: '60px', borderRadius: '12px', display: 'grid', placeItems: 'center', marginBottom: '32px' }}>
                <TreeDeciduous size={30} color="#fff" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '24px' }}>Sostenibilidad</h3>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                Nos regimos por un respeto profundo a la naturaleza, asegurando que cada árbol cortado sea parte de un ciclo de vida renovable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
