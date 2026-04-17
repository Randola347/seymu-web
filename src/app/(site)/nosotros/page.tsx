import { getAboutUs, getCompanySettings } from "@/lib/seymu-data";

export const dynamic = "force-dynamic";

export default async function NosotrosPage() {
  const aboutUs = await getAboutUs();
  const company = await getCompanySettings();

  // Función para procesar y limpiar el texto de la historia
  const processHistory = (content: string) => {
    if (!content) return [];
    
    // Dividimos por saltos de línea dobles para identificar párrafos reales
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    return paragraphs.map(p => {
      // Buscamos un año (4 dígitos) en el texto del párrafo
      const yearMatch = p.match(/\b(20[0-9]{2}|19[0-9]{2})\b/);
      // Si el párrafo menciona "Hoy" o similar
      const isToday = p.toLowerCase().includes("hoy en día") || p.toLowerCase().includes("actualmente");
      
      return {
        text: p.trim(),
        year: yearMatch ? yearMatch[0] : (isToday ? "Hoy" : null)
      };
    });
  };

  const historyBlocks = processHistory(aboutUs?.history_content || "");

  return (
    <main style={{ background: 'var(--background)' }}>
      {/* ── HERO EDITORIAL ── */}
      <section 
        style={{ 
          height: '25vh', 
          background: 'var(--primary-dark)', 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        <div style={{ position: 'relative', zIndex: 10 }}>
          <span className="hero-tag" style={{ border: '1px solid rgba(255,255,255,0.3)', background: 'transparent', color: '#fff' }}>
            Nuestra Historia
          </span>
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            color: '#fff',
            marginTop: '20px',
            textTransform: 'uppercase',
            letterSpacing: '4px'
          }}>
            {company?.company_name || "Seymu"}
          </h1>
        </div>
      </section>

      {/* ── NARRATIVA CORPORATIVA ── */}
      <section className="page-section" style={{ padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <header style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              color: 'var(--primary-dark)',
              marginTop: '16px'
            }}>
              Calidad que trasciende
            </h1>
          </header>

          <div className="editorial-story" style={{ color: 'var(--foreground)' }}>
            
            {/* Historia Procesada Dinámicamente */}
            <div style={{ position: 'relative' }}>
              {historyBlocks.map((block, idx) => (
                <div key={idx} className="nosotros-timeline-item" style={{ marginTop: idx > 0 ? '120px' : '0' }}>
                  {/* Indicador de Año dinámico con margen inferior corregido */}
                  {block.year && (
                    <div className="nosotros-year-container" style={{ marginBottom: '15px' }}>
                      <span style={{ 
                        display: 'block', 
                        fontFamily: 'var(--font-display)', 
                        fontSize: '2.5rem', 
                        fontWeight: 800, 
                        color: 'var(--accent)',
                        lineHeight: 1,
                        opacity: 0.5
                      }}>
                        {block.year}
                      </span>
                    </div>
                  )}
                  
                  <div className="nosotros-history-text" style={{ 
                    fontSize: '1.2rem',
                    lineHeight: 1.8,
                    textAlign: 'justify',
                    color: 'var(--foreground-muted)'
                  }}>
                    {block.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Misión y Visión con Diseño Sobrio */}
            <div style={{ 
              marginTop: '100px', 
              padding: '60px 40px', 
              background: 'var(--surface-alt)', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary)' }}>Nuestra Visión</h3>
                  <p style={{ lineHeight: 1.7, opacity: 0.8 }}>{aboutUs?.vision_content}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--primary)' }}>Nuestra Misión</h3>
                  <p style={{ lineHeight: 1.7, opacity: 0.8 }}>{aboutUs?.mission_content}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
