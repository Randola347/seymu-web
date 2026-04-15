import Link from "next/link";
import { getActiveWoods, getWoodImages } from "@/lib/seymu-data";
import { ArrowRight, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MaderasPage() {
  const woods = await getActiveWoods();

  const woodsWithImages = await Promise.all(
    woods.map(async (wood) => {
      const images = await getWoodImages(wood.id);
      return { ...wood, firstImage: images[0]?.secure_url ?? null };
    })
  );

  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          background: "var(--primary-dark)",
          padding: "72px 32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
        }}
      >
        {/* acento de luz desde abajo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(163,123,84,.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(163,123,84,.18)",
              color: "var(--accent-light)",
              border: "1px solid rgba(163,123,84,.35)",
              padding: "6px 20px",
              borderRadius: "100px",
              fontSize: ".72rem",
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Colección Exclusiva
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: "#f5f0e8",
              fontWeight: 400,
              fontStyle: "italic",
              marginBottom: "16px",
              lineHeight: 1.15,
            }}
          >
            <strong
              style={{ fontStyle: "normal", fontWeight: 700, color: "#fff" }}
            >
              Catálogo
            </strong>{" "}
            de Maderas Finas
          </h1>

          <p
            style={{
              color: "rgba(245,240,232,.6)",
              maxWidth: "480px",
              margin: "0 auto 40px",
              fontSize: "1rem",
              fontWeight: 300,
            }}
          >
            Descubra la belleza natural y resistencia estructural de nuestras
            maderas de primera calidad, seleccionadas con cuidado.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              flexWrap: "wrap",
            }}
          >
            {[
              { num: woodsWithImages.length, label: "Especies" },
              { num: "100%", label: "Certificadas" },
              { num: "CR", label: "Origen local" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    color: "#fff",
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: ".72rem",
                    color: "rgba(245,240,232,.5)",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginTop: "4px",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENIDO ── */}
      <section className="page-section">
        <div className="container">
          {/* Cabecera de sección */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "28px",
              paddingTop: "8px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                color: "var(--foreground)",
              }}
            >
              Maderas disponibles
            </h2>
            <span style={{ fontSize: ".82rem", color: "var(--foreground-muted)" }}>
              {woodsWithImages.length} especies en stock
            </span>
          </div>

          {/* Grid */}
          {woodsWithImages.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {woodsWithImages.map((wood, idx) => (
                <article
                  key={wood.id}
                  className="premium-card"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    // primera tarjeta destacada en pantallas anchas
                    ...(idx === 0 && { gridColumn: "span 2" }),
                  }}
                >
                  {/* Imagen */}
                  <div
                    style={{
                      position: "relative",
                      height: idx === 0 ? "340px" : "240px",
                      overflow: "hidden",
                      background: "linear-gradient(135deg, #e8e3dc, #d4cfc7)",
                    }}
                  >
                    {wood.firstImage ? (
                      <img
                        src={wood.firstImage}
                        alt={wood.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform .6s cubic-bezier(.165,.84,.44,1)",
                          display: "block",
                        }}
                      // zoom on hover via CSS — agrega la clase si la tienes
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1rem",
                            color: "var(--foreground-muted)",
                            opacity: 0.5,
                            fontStyle: "italic",
                          }}
                        >
                          {wood.name}
                        </span>
                      </div>
                    )}

                    {/* Badge categoría */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        background: "rgba(251,249,246,.92)",
                        backdropFilter: "blur(8px)",
                        padding: "5px 14px",
                        borderRadius: "100px",
                        fontSize: ".68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        color: "var(--primary)",
                      }}
                    >
                      {wood.category || "General"}
                    </div>

                    {/* Badge precio flotante */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "14px",
                        right: "14px",
                        background: "var(--primary-dark)",
                        color: "#fff",
                        padding: "8px 14px",
                        borderRadius: "var(--radius-sm)",
                        fontFamily: "var(--font-display)",
                        fontSize: ".95rem",
                        fontWeight: 600,
                      }}
                    >
                      ₡{Number(wood.price).toLocaleString("es-CR")}
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: ".65rem",
                          fontWeight: 400,
                          opacity: 0.7,
                          marginLeft: "4px",
                        }}
                      >
                        / unidad
                      </span>
                    </div>
                  </div>

                  {/* Cuerpo de la tarjeta */}
                  <div style={{ padding: "22px 24px 24px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: idx === 0 ? "1.6rem" : "1.25rem",
                        color: "var(--foreground)",
                        marginBottom: "8px",
                      }}
                    >
                      {wood.name}
                    </h3>
                    <p
                      style={{
                        fontSize: ".85rem",
                        color: "var(--foreground-muted)",
                        lineHeight: 1.55,
                        marginBottom: "20px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {wood.short_description || "Sin descripción disponible."}
                    </p>

                    <Link
                      href={`/maderas/${wood.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        background: "var(--primary)",
                        color: "#fff",
                        padding: "14px 20px",
                        borderRadius: "8px",
                        fontSize: ".85rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 12px rgba(30,77,56,0.15)",
                      }}
                    >
                      Ver detalles completos
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div
              style={{
                textAlign: "center",
                padding: "100px 0",
                border: "1.5px dashed var(--border)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <Search
                size={40}
                color="var(--border)"
                style={{ marginBottom: "20px" }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  marginBottom: "10px",
                }}
              >
                No hay maderas disponibles
              </h3>
              <p style={{ color: "var(--foreground-muted)", fontSize: ".9rem" }}>
                Estamos actualizando nuestro catálogo. Vuelva pronto.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}