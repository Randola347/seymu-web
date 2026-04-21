"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import "./woods.css";

interface Wood {
  id: number;
  name: string;
  slug: string;
  category: string | null;
  short_description: string | null;
  price: string;
  main_image_url?: string | null;
  firstImage?: string | null;
}

interface WoodCatalogProps {
  woods: Wood[];
}

export default function WoodCatalog({ woods }: WoodCatalogProps) {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const categories = useMemo(
    () => [
      "Todas",
      ...Array.from(new Set(woods.map((w) => w.category))).filter(
        (c): c is string => Boolean(c)
      ),
    ],
    [woods]
  );

  const filteredWoods = useMemo(() => {
    if (activeCategory === "Todas") return woods;
    return woods.filter((w) => w.category === activeCategory);
  }, [woods, activeCategory]);

  const handleCategoryClick = (category: string) => {
    // Force a clean state update
    setActiveCategory(() => category);
  };

  return (
    <div className="woods-catalog-shell">
      <div className="woods-toolbar">
        <div className="woods-toolbar-top">
          <div>
            <span className="woods-overline">Catálogo interactivo</span>
            <h2 className="woods-title">Maderas Premium</h2>
            <p className="woods-subtitle">
              Selecciona una categoría para filtrar. Desliza lateralmente para ver más.
            </p>
          </div>
        </div>

        <div className="woods-filters">
          <div className="woods-filter-row">
            <div className="woods-chip-list woods-chip-list-scroll">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`woods-chip ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="woods-scroll-hint mobile-only">Desliza para ver más →</span>
          </div>

          <div className="woods-toolbar-meta">
            <div className="woods-results-count">
              <span>{filteredWoods.length}</span> {filteredWoods.length === 1 ? "madera encontrada" : "maderas encontradas"}
            </div>

            {activeCategory !== "Todas" && (
              <button
                type="button"
                className="woods-clear-btn"
                onClick={() => setActiveCategory("Todas")}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="woods-grid-custom woods-grid-min-height">
        {filteredWoods.length > 0 ? (
          filteredWoods.map((wood) => {
            const imageUrl =
              wood.main_image_url || wood.firstImage || "/assets/madera-placeholder.jpg";

            return (
              <article key={wood.id} className="wood-card">
                <div className="wood-card-media">
                  <img
                    src={imageUrl}
                    alt={wood.name}
                    className="wood-card-image"
                    loading="lazy"
                  />
                  {wood.category && (
                    <span className="wood-card-category-badge">{wood.category}</span>
                  )}
                </div>

                <div className="wood-card-body">
                  <h3 className="wood-card-title">{wood.name}</h3>

                  <p className="wood-card-description">
                    {wood.short_description || "Madera seleccionada con altos estándares de calidad."}
                  </p>

                  <div className="wood-card-footer">
                    <span className="wood-card-price">
                      ₡{Number(wood.price).toLocaleString("es-CR")}
                    </span>

                    <Link
                      href={`/maderas/${wood.slug}`}
                      className="btn-premium btn-premium-primary wood-card-btn"
                    >
                      Ver madera
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="woods-empty-state">
            <p>No hay maderas disponibles en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}