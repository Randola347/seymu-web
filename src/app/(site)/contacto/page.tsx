import { getCompanySettings, getSiteIdentity } from "@/lib/seymu-data";
import { Mail, Phone, MapPin, Clock, MessageSquare, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ContactoPage() {
  const company = await getCompanySettings();
  const identity = await getSiteIdentity();

  return (
    <main style={{ background: 'var(--background)' }}>
      {/* ── HERO SECCION ── */}
      <section 
        style={{ 
          height: '45vh',
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
              opacity: 0.3,
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
            color: '#fff',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.1
          }}>
            Estamos a su <strong style={{ fontStyle: 'normal', fontWeight: 700 }}>Disposición</strong>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginTop: '16px' }}>Soluciones personalizadas en madera de alta gama.</p>
        </div>
      </section>

      {/* ── CONTACTO GRID SECCION ── */}
      <section className="page-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            
            {/* Info Column */}
            <div style={{ gridColumn: 'span 2' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '40px' }}>Hablemos de su proyecto</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div className="premium-card" style={{ padding: '32px', background: '#fff', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--primary)', marginBottom: '20px' }}><Phone size={24} /></div>
                  <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>Atención Telefónica</h4>
                  <p style={{ color: 'var(--foreground-muted)' }}>{company?.phone || company?.whatsapp_number}</p>
                </div>

                <div className="premium-card" style={{ padding: '32px', background: '#fff', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--primary)', marginBottom: '20px' }}><Mail size={24} /></div>
                  <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>Email Corporativo</h4>
                  <p style={{ color: 'var(--foreground-muted)' }}>{company?.email || "ventas@seymu.com"}</p>
                </div>

                <div className="premium-card" style={{ padding: '32px', background: '#fff', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--primary)', marginBottom: '20px' }}><MapPin size={24} /></div>
                  <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>Ubicación</h4>
                  <p style={{ color: 'var(--foreground-muted)' }}>{company?.address || "La Guácima, Alajuela, Costa Rica."}</p>
                </div>

                <div className="premium-card" style={{ padding: '32px', background: '#fff', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--primary)', marginBottom: '20px' }}><Clock size={24} /></div>
                  <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>Nuestro Horario</h4>
                  <p style={{ color: 'var(--foreground-muted)' }}>{company?.schedule || "Lun - Vie: 7:00 AM - 5:00 PM"}</p>
                </div>
              </div>
            </div>

            {/* Direct Action Column */}
            <div>
              <div className="premium-card" style={{ 
                background: 'var(--primary-dark)', 
                color: '#fff', 
                padding: '50px 40px', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
                  <MessageSquare size={200} />
                </div>
                
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '24px', position: 'relative' }}>¿Necesita una cotización rápida?</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '40px', lineHeight: 1.6, position: 'relative' }}>
                  Envíenos un mensaje por WhatsApp y nuestros expertos le asesorarán en minutos.
                </p>
                
                <a 
                  href={`https://wa.me/${company?.whatsapp_number?.replace(/\D/g, "")}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium"
                  style={{ 
                    background: '#25D366', 
                    color: '#fff', 
                    justifyContent: 'center', 
                    fontSize: '1.2rem',
                    padding: '20px',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
                    position: 'relative'
                  }}
                >
                  <MessageSquare size={24} /> Chat en WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ── */}
      <section style={{ padding: '0 0 100px 0' }}>
        <div className="container">
          <div style={{ 
            height: '400px', 
            background: 'var(--surface-alt)', 
            borderRadius: 'var(--radius-lg)', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid var(--border)',
            textAlign: 'center',
            padding: '40px'
          }}>
            <MapPin size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '12px' }}>Encuéntrenos en Alajuela</h3>
            <p style={{ color: 'var(--foreground-muted)', maxWidth: '400px', marginBottom: '32px' }}>{company?.address || "La Guácima de Alajuela, parque industrial."}</p>
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              Abrir en Google Maps <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}