'use client';

import { useState } from "react";
import { SlidersHorizontal, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Wood {
  id: number;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  price: string;
  main_image_url?: string;
}

interface WoodCatalogProps {
  woods: Wood[];
}

export default function WoodCatalog({ woods }: WoodCatalogProps) {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const categories = ["Todas", ...Array.from(new Set(woods.map((w) => w.category))).filter(Boolean)];

  const filteredWoods = activeCategory === "Todas" 
    ? woods 
    : woods.filter((w) => w.category === activeCategory);

  return (
    <div className="catalog-container">
      {/* ── BARRA DE FILTROS ── */}
      <div style={{ 
        marginBottom: '40px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px', 
        flexWrap: 'nowrap', 
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        background: '#fff',
        padding: '20px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border)',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', flexShrink: 0 }}>
          <SlidersHorizontal size={18} />
          Filtrar:
        </div>
        
        <div className="filter-scroll" style={{ display: 'flex', gap: '8px', flexShrink: 0, paddingRight: '20px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 22px',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeCategory === cat ? 'var(--primary)' : 'var(--surface-alt)',
                color: activeCategory === cat ? '#fff' : 'var(--foreground-muted)',
                border: `1px solid ${activeCategory === cat ? 'var(--primary)' : 'var(--border)'}`,
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                flexShrink: 0
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID DE PRODUCTOS ── */}
      <div className="wood-grid" style={{ minHeight: '400px' }}>
        {filteredWoods.length > 0 ? (
          filteredWoods.map((wood) => (
            <article key={wood.id} className="premium-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={wood.main_image_url || "/assets/madera-placeholder.jpg"} 
                  alt={wood.name}
                  className="wood-card-img"
                />
                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span className="hero-tag" style={{ fontSize: '0.65rem', marginBottom: '12px' }}>{wood.category}</span>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--primary-dark)' }}>{wood.name}</h3>
                  <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem', marginBottom: '24px', flex: 1 }}>
                    {wood.short_description}
                  </p>
                  
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ marginBottom: '20px', color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem' }}>
                      ₡{Number(wood.price).toLocaleString("es-CR")}
                    </div>
                    <Link
                      href={`/maderas/${wood.slug}`}
                      className="btn-premium btn-premium-primary"
                      style={{ width: '100%', justifyContent: 'center', textAlign: 'center', gap: '10px' }}
                    >
                      Ver Detalles
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0', border: '1px dashed var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)' }}>No se encontraron maderas en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}
