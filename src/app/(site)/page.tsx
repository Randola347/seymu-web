import Link from "next/link";
import { getCompanySettings, getActiveWoods, getSiteIdentity } from "@/lib/seymu-data";
import { ArrowRight, Star, ShieldCheck, TreeDeciduous, Award } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const company = await getCompanySettings();
  const identity = await getSiteIdentity();
  const woods = await getActiveWoods();

  return (
    <main>
      {/* ── HERO PREMIUM SECCION ── */}
      <section 
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'var(--primary-dark)',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        }}
      >
        {/* Background Image with Parallax-like effect */}
        {identity?.banner_url && (
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${identity.banner_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.45,
            }}
          />
        )}
        
        {/* Overlay Gradient */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(18,47,34,0.9) 0%, rgba(18,47,34,0.4) 100%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(163,123,84,0.2)',
              border: '1px solid rgba(163,123,84,0.3)',
              padding: '6px 16px',
              borderRadius: '100px',
              color: 'var(--accent-light)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '28px'
            }}>
              <Award size={14} /> Tradición y Calidad
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '32px',
              fontWeight: 400,
              fontStyle: 'italic'
            }}>
              <strong style={{ fontStyle: 'normal', fontWeight: 700 }}>Elegancia</strong> en cada veta de madera
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(251,249,246,0.8)',
              marginBottom: '48px',
              maxWidth: '540px',
              fontWeight: 300,
              lineHeight: 1.6
            }}>
              {company?.slogan || "Transformamos espacios con la nobleza de las maderas más exclusivas de la región."}
            </p>

            <div className="seymu-actions" style={{ display: 'flex', gap: '20px' }}>
              <Link href="/maderas" className="btn-premium" style={{ background: 'var(--primary)', color: '#fff', padding: '20px 48px', borderRadius: 'var(--radius-sm)' }}>
                Ver Catálogo <ArrowRight size={20} />
              </Link>
              <Link href="/contacto" className="btn-premium" style={{ border: '2px solid #fff', color: '#fff', padding: '20px 48px', borderRadius: 'var(--radius-sm)' }}>
                Contáctanos
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Stat Card */}
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '5%',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '30px',
          borderRadius: 'var(--radius-md)',
          color: '#fff',
          display: 'flex',
          gap: '40px',
          zIndex: 20
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>35+</div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Años de Experiencia</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>100%</div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Calidad Garantizada</div>
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS SECCION ── */}
      <section className="page-section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '16px' }}>Por qué elegirnos</h2>
            <div style={{ width: '60px', height: '4px', background: 'var(--accent)', margin: '0 auto' }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div className="premium-card" style={{ border: 'none', background: 'var(--surface-alt)', padding: '50px 40px' }}>
              <div style={{ width: '64px', height: '64px', background: 'var(--primary)', borderRadius: '16px', display: 'grid', placeItems: 'center', marginBottom: '30px' }}>
                <ShieldCheck size={32} color="#fff" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '20px' }}>Garantía Total</h3>
              <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.7 }}>Seleccionamos cada pieza con rigor para asegurar la máxima durabilidad en sus proyectos más exigentes.</p>
            </div>

            <div className="premium-card" style={{ border: 'none', background: 'var(--surface-alt)', padding: '50px 40px' }}>
              <div style={{ width: '64px', height: '64px', background: 'var(--primary)', borderRadius: '16px', display: 'grid', placeItems: 'center', marginBottom: '30px' }}>
                <TreeDeciduous size={32} color="#fff" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '20px' }}>Origen Responsable</h3>
              <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.7 }}>Comprometidos con el medio ambiente, todas nuestras maderas provienen de fuentes gestionadas de forma sostenible.</p>
            </div>

            <div className="premium-card" style={{ border: 'none', background: 'var(--surface-alt)', padding: '50px 40px' }}>
              <div style={{ width: '64px', height: '64px', background: 'var(--primary)', borderRadius: '16px', display: 'grid', placeItems: 'center', marginBottom: '30px' }}>
                <Star size={32} color="#fff" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '20px' }}>Asesoría Experta</h3>
              <p style={{ color: 'var(--foreground-muted)', lineHeight: 1.7 }}>Le acompañamos en la elección de la madera ideal según el clima, uso y estética que busque para su hogar u obra.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Maderas Destacadas ── */}
      <section className="page-section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--primary-dark)' }}>Piezas Maestras</h2>
              <p style={{ color: 'var(--foreground-muted)', fontSize: '1.1rem' }}>Una selección exclusiva de nuestras maderas más nobles.</p>
            </div>
            <Link href="/maderas" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              Explorar todo el catálogo <ArrowRight size={18} />
            </Link>
          </div>

          <div className="wood-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}>
            {woods.slice(0, 3).map((wood) => (
              <article key={wood.id} className="premium-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                <div style={{ height: '300px', background: '#eee', display: 'grid', placeItems: 'center', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  {wood.name}
                </div>
                <div style={{ padding: '30px' }}>
                  <span className="hero-tag" style={{ fontSize: '0.65rem', marginBottom: '16px' }}>{wood.category || "Reserva Especial"}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '12px' }}>{wood.name}</h3>
                  <p style={{ color: 'var(--foreground-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>{wood.short_description}</p>
                  
                  {/* BOTON CON CUADRO VERDE */}
                  <Link href={`/maderas/${wood.slug}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: 'var(--primary)',
                    color: '#fff',
                    padding: '14px 20px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(30,77,56,0.2)'
                  }}>
                    Ver Detalles
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}