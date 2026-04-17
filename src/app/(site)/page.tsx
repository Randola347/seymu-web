import Link from "next/link";
import { getCompanySettings, getActiveWoods, getSiteIdentity } from "@/lib/seymu-data";
import { ArrowRight, ShieldCheck, TreeDeciduous, Award, Zap, MapPin, TrendingUp, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const company = await getCompanySettings();
  const identity = await getSiteIdentity();
  const woods = await getActiveWoods();

  const timeline = [
    { 
      year: "2008", 
      title: "El Nacimiento", 
      description: "Fundación de Maderas Seymu en Alajuela, con el sueño de ofrecer las mejores especies del país.",
      icon: <Zap size={20} /> 
    },
    { 
      year: "2010", 
      title: "Crecimiento", 
      description: "Ampliación de nuestro inventario y consolidación como proveedores de ebanisterías locales.",
      icon: <MapPin size={20} /> 
    },
    { 
      year: "2012", 
      title: "Excelencia", 
      description: "Implementación de rigurosos estándares de calidad y selección manual de cada pieza.",
      icon: <Award size={20} /> 
    },
    { 
      year: "2017", 
      title: "Expansión", 
      description: "Nuevas rutas de distribución nacional y modernización del catálogo digital.",
      icon: <TrendingUp size={20} /> 
    },
    { 
      year: "Hoy", 
      title: "Liderazgo", 
      description: "Referente en maderas finas, comprometidos con la sostenibilidad y la satisfacción total.",
      icon: <Clock size={20} /> 
    }
  ];

  return (
    <main>
      {/* ── HERO COMPACTO (Sin imagen de fondo) ── */}
      <section 
        style={{
          position: 'relative',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'var(--primary-dark)',
        }}
      >
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(18,47,34,1) 0%, rgba(30,77,56,1) 100%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1.5fr', gap: '60px', alignItems: 'center' }}>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <img 
                src={identity?.logo_url || "/assets/logo.jpg"} 
                alt="Seymu Logo" 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  maxHeight: '300px',
                  borderRadius: 'var(--radius-md)',
                  filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.3))'
                }} 
              />
            </div>

            <div style={{ color: '#fff' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(163,123,84,0.3)',
                padding: '6px 16px',
                borderRadius: '100px',
                color: 'var(--accent-light)',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '24px'
              }}>
                35+ Años de Experiencia
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.1,
                marginBottom: '16px'
              }}>
                Elegancia en <i style={{ fontWeight: 400 }}>cada veta</i> de madera
              </h1>

              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
                Calidad y excelencia en cada pieza seleccionada.
              </p>

              <div style={{ display: 'flex', gap: '16px' }}>
                <Link href="/maderas" className="btn-premium btn-premium-primary">
                  Ver Catálogo <ArrowRight size={18} />
                </Link>
                <Link href="/contacto" className="btn-premium" style={{ border: '1px solid #fff', color: '#fff' }}>
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ── */}
      <section className="page-section" style={{ background: '#fff', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div className="premium-card" style={{ background: 'var(--surface-alt)', border: 'none', padding: '30px' }}>
              <ShieldCheck size={32} color="var(--primary)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Garantía Total</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--foreground-muted)' }}>Maderas seleccionadas bajo los más altos estándares.</p>
            </div>
            <div className="premium-card" style={{ background: 'var(--surface-alt)', border: 'none', padding: '30px' }}>
              <TreeDeciduous size={32} color="var(--primary)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Sostenibilidad</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--foreground-muted)' }}>Compromiso con el medio ambiente y manejo forestal.</p>
            </div>
            <div className="premium-card" style={{ background: 'var(--surface-alt)', border: 'none', padding: '30px' }}>
              <Award size={32} color="var(--primary)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Excelencia</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--foreground-muted)' }}>Más de tres décadas de experiencia garantizada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LINEA DE TIEMPO (CON NARRATIVA) ── */}
      <section className="page-section" style={{ background: 'var(--surface-alt)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Nuestra Trayectoria</h2>
            <div style={{ width: '40px', height: '3px', background: 'var(--accent)', margin: '0 auto' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '25px', left: '0', right: '0', height: '2px', background: 'rgba(30, 77, 56, 0.1)', zIndex: 0, display: 'none' }}></div>
             {timeline.map((t, i) => (
               <div key={i} style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '20px' }}>
                 <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '50%', color: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 15px', border: '5px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                   {t.icon}
                 </div>
                 <span style={{ fontWeight: 800, color: 'var(--accent)', display: 'block', fontSize: '1.2rem', marginBottom: '8px' }}>{t.year}</span>
                 <h4 style={{ fontSize: '1rem', color: 'var(--primary-dark)', marginBottom: '10px' }}>{t.title}</h4>
                 <p style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)', lineHeight: 1.4 }}>{t.description}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ── VARIEDAD EXCLUSIVA INTEGRADA ── */}
      <section className="page-section" style={{ background: '#fff', padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '80px' }}>
            
            {/* Imagen del Banner a la Izquierda */}
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img 
                src={identity?.banner_url || "/assets/logo.jpg"} 
                alt="Banner Seymu" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '500px',
                  objectFit: 'contain',
                  background: 'var(--surface-alt)',
                  borderRadius: 'var(--radius-lg)'
                }} 
              />
            </div>

            {/* Texto a la Derecha */}
            <div>
              <span className="hero-tag">Inventario Único</span>
              <h2 style={{ fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '24px', lineHeight: 1.1 }}>
                Variedad Exclusiva de Especies Finas
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--foreground-muted)', marginBottom: '32px', lineHeight: 1.7 }}>
                Contamos con un catálogo rigurosamente seleccionado para proyectos premium. Desde maderas decorativas hasta estructurales de alta densidad, garantizamos piezas que elevan el estándar de cualquier obra.
              </p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <Link href="/maderas" className="btn-premium btn-premium-primary">
                  Explorar Catálogo <ArrowRight size={18} />
                </Link>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>100%</span>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--foreground-muted)' }}>Calidad Forestal</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── CATALOGO (Sin título redundante) ── */}
          <div style={{ paddingTop: '20px' }}>
            <div className="wood-grid">
              {woods.slice(0, 3).map((w) => (
                <article key={w.id} className="premium-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '260px', overflow: 'hidden' }}>
                    {w.main_image_url ? (
                      <img 
                        src={w.main_image_url} 
                        alt={w.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        background: 'linear-gradient(45deg, #1e4d38 0%, #122f22 100%)', 
                        display: 'grid', 
                        placeItems: 'center',
                        color: 'rgba(255,255,255,0.2)'
                      }}>
                        <TreeDeciduous size={60} />
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span className="hero-tag" style={{ fontSize: '0.65rem', marginBottom: '12px' }}>{w.category}</span>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{w.name}</h3>
                    <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>{w.short_description}</p>
                    <Link href={`/maderas/${w.slug}`} className="btn-premium btn-premium-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto', gap: '10px' }}>
                      Ver Detalles
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}