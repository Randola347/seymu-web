import { getCompanySettings } from "@/lib/seymu-data";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { formatWhatsApp } from "@/lib/utils";

export default async function Footer() {
  const company = await getCompanySettings();
  const formattedPhone = formatWhatsApp(company?.whatsapp_number || "");

  return (
    <footer className="site-footer" style={{ padding: '80px 0 40px', background: '#f9f7f4' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px', textAlign: 'left', marginBottom: '60px' }}>
          <div>
            <h3 className="hero-title" style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary)' }}>
              {company?.company_name || "Seymu"}
            </h3>
            <p style={{ color: 'var(--foreground-muted)', lineHeight: '1.8' }}>
              {company?.slogan || "Calidad y tradición en maderas finas desde 2008."}
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <a 
                href="https://www.facebook.com/share/1E3HR9iCAF/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: 'var(--primary)', 
                  fontWeight: 600,
                  background: 'var(--primary-ghost)',
                  padding: '8px 16px',
                  borderRadius: '8px'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contacto</h4>
            <ul style={{ listStyle: 'none', color: 'var(--foreground-muted)' }}>
              {company?.whatsapp_number && (
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={16} /> 
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>Principal / WhatsApp</span>
                    {formatWhatsApp(company.whatsapp_number)}
                  </div>
                </li>
              )}
              {company?.phone && (
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={16} /> 
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>Secundario</span>
                    {formatWhatsApp(company.phone)}
                  </div>
                </li>
              )}
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} /> {company?.email || "ventas@seymu.com"}
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} style={{ marginTop: '4px' }} /> 
                <span>{company?.address || "La Guácima, Alajuela, Costa Rica."}</span>
              </li>
            </ul>
          </div>

          <div style={{ gridColumn: 'span 1' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Ubicación</h4>
            <div style={{ width: '100%', height: '160px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '12px' }}>
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
            <a 
              href="https://maps.app.goo.gl/rNTXuGzEAnSiHUe88" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Ver en Google Maps <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px', display: 'flex', justifyContent: 'center', fontSize: '0.85rem' }}>
          <p>© 2026 {company?.company_name} — Maderas de Excelencia. Hecho con orgullo en Costa Rica.</p>
        </div>
      </div>
    </footer>
  );
}