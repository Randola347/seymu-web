"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, ArrowRight, X } from "lucide-react";
import Link from "next/link";

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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
    setActiveCategory(category);
    setMobileFiltersOpen(false);
  };

  return (
    <div className="woods-catalog-shell">
      <div className="woods-toolbar">
        <div className="woods-toolbar-top">
          <div>
            <span className="woods-overline">Catálogo interactivo</span>
            <h2 className="woods-title">Explora por categoría</h2>
            <p className="woods-subtitle">
              Selecciona una categoría para encontrar más rápido la madera que
              necesitas.
            </p>
          </div>

          <button
            type="button"
            className="woods-mobile-filters-btn"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            aria-expanded={mobileFiltersOpen}
          >
            {mobileFiltersOpen ? <X size={18} /> : <SlidersHorizontal size={18} />}
            {mobileFiltersOpen ? "Cerrar filtros" : "Abrir filtros"}
          </button>
        </div>

        <div className={`woods-filters ${mobileFiltersOpen ? "show" : ""}`}>
          <div className="woods-filter-row">
            <div className="woods-filter-label">
              <SlidersHorizontal size={18} />
              <span>Filtrar:</span>
            </div>

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
          </div>

          <div className="woods-toolbar-meta">
            <span>
              {filteredWoods.length}{" "}
              {filteredWoods.length === 1 ? "resultado" : "resultados"}
            </span>

            {activeCategory !== "Todas" && (
              <button
                type="button"
                className="woods-clear-btn"
                onClick={() => setActiveCategory("Todas")}
              >
                Limpiar filtro
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
                  />
                </div>

                <div className="wood-card-body">
                  {wood.category ? (
                    <span className="wood-card-category">{wood.category}</span>
                  ) : null}

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
                      Ver Detalles
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="woods-empty-state premium-card woods-empty-full">
            <p>No se encontraron maderas en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}