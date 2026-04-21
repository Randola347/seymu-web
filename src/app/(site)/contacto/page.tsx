import { getCompanySettings } from "@/lib/seymu-data";
import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react";
import { formatWhatsApp } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ContactoPage() {
  const company = await getCompanySettings();
  const formattedPhone = formatWhatsApp(company?.whatsapp_number || "");

  return (
    <main style={{ background: 'var(--background)' }}>
      {/* ── HERO COMPACTO CONTACTO ── */}
      <section 
        style={{ 
          height: '25vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--primary-dark)',
          textAlign: 'center',
          padding: '0 20px'
        }}
      >
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            color: '#fff',
            fontWeight: 700 
          }}>
            Contáctenos
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', marginTop: '12px' }}>Estamos aquí para asesorarle en su próximo proyecto.</p>
        </div>
      </section>

      {/* ── INFO & MAPA ── */}
      <section className="page-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px' }}>
            
            {/* Información de Contacto */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '32px' }}>
                  Atención Personalizada
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-ghost)', borderRadius: '12px', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      <Phone size={20} color="var(--primary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>Teléfono / WhatsApp</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{formattedPhone}</div>
                      {company?.phone && (
                        <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '4px' }}>
                          {formatWhatsApp(company.phone)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-ghost)', borderRadius: '12px', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      <Mail size={20} color="var(--primary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>Correo Electrónico</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{company?.email || "info@seymu.com"}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-ghost)', borderRadius: '12px', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      <MapPin size={20} color="var(--primary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>Ubicación</div>
                      <div style={{ fontSize: '1.1rem', color: 'var(--foreground-muted)' }}>{company?.address || "La Guácima, Alajuela, Costa Rica"}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--primary-ghost)', borderRadius: '12px', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      <Clock size={20} color="var(--primary)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>Horario Laboral</div>
                      <div style={{ fontSize: '1.1rem', color: 'var(--foreground-muted)' }}>{company?.schedule || "Lunes a Viernes: 7:00 AM - 5:00 PM"}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--primary-dark)', padding: '30px', borderRadius: 'var(--radius-md)', color: '#fff' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>¿Tienes una consulta rápida?</h3>
                <p style={{ opacity: 0.8, marginBottom: '24px' }}>Nuestros asesores están listos para responderte vía WhatsApp en tiempo real.</p>
                <a 
                  href={`https://wa.me/${company?.whatsapp_number?.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 700 }}
                >
                  <MessageSquare size={18} /> Chat de WhatsApp
                </a>
              </div>
            </div>

            {/* Mapa */}
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', height: '100%', minHeight: '500px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1669.335483259269!2d-84.24406693034028!3d9.962709420265574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0f927c465b865%3A0xb02e8d013702b1fa!2sMaderas%20Don%20Ezequiel!5e1!3m2!1ses-419!2scr!4v1776286895134!5m2!1ses-419!2scr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}