import { getCompanySettings } from "@/lib/seymu-data";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default async function Footer() {
  const company = await getCompanySettings();

  return (
    <footer className="site-footer" style={{ padding: '80px 0 40px', background: '#f9f7f4' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', textAlign: 'left', marginBottom: '60px' }}>
          <div>
            <h3 className="hero-title" style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary)' }}>
              {company?.company_name || "Seymu"}
            </h3>
            <p style={{ color: 'var(--foreground-muted)', lineHeight: '1.8' }}>
              {company?.slogan || "Calidad y tradición en maderas finas desde 2008."}
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contacto</h4>
            <ul style={{ listStyle: 'none', color: 'var(--foreground-muted)' }}>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} /> {company?.whatsapp_number}
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} /> {company?.email || "ventas@seymu.com"}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} /> {company?.address || "La Guácima, Alajuela, Costa Rica."}
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Horario</h4>
            <p style={{ color: 'var(--foreground-muted)' }}>
              {company?.schedule || "Lunes a Viernes: 7:00 AM - 5:00 PM"}
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px', display: 'flex', justifyContent: 'center', fontSize: '0.85rem' }}>
          <p>© 2026 {company?.company_name} — Maderas de Excelencia. Hecho con orgullo en Costa Rica.</p>
        </div>
      </div>
    </footer>
  );
}