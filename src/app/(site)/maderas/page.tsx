import { getActiveWoods, getWoodImages } from "@/lib/seymu-data";
import WoodCatalog from "@/app/components/woods/WoodCatalog";

export const dynamic = "force-dynamic";

export default async function MaderasPage() {
  const woods = await getActiveWoods();

  const woodsWithImages = await Promise.all(
    woods.map(async (wood) => {
      const images = await getWoodImages(wood.id);
      return { 
        ...wood, 
        firstImage: images[0]?.secure_url ?? null,
        // Aseguramos que el precio sea string para el Number() en el componente client
        price: wood.price.toString() 
      };
    })
  );

  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          background: "var(--primary-dark)",
          padding: "80px 32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(163,123,84,.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(163,123,84,.15)",
              color: "var(--accent-light)",
              border: "1px solid rgba(163,123,84,.3)",
              padding: "6px 24px",
              borderRadius: "100px",
              fontSize: ".75rem",
              fontWeight: 800,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            Colección Premium
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "#fff",
              fontWeight: 400,
              fontStyle: "italic",
              marginBottom: "24px",
              lineHeight: 1.1,
            }}
          >
            <strong style={{ fontStyle: "normal", fontWeight: 700 }}>Nuestro</strong> Catálogo
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,.7)",
              maxWidth: "600px",
              margin: "0 auto 48px",
              fontSize: "1.15rem",
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            Maderas finas y estructurales de la más alta calidad, seleccionadas bajo criterios de sostenibilidad y durabilidad extrema.
          </p>

          {/* Stats resumidos */}
          <div style={{ display: "flex", justifyContent: "center", gap: "60px", flexWrap: "wrap" }}>
            {[
              { num: woodsWithImages.length, label: "Especies Disponibles" },
              { num: "100%", label: "Calidad Forestal" },
              { num: "Directo", label: "De Origen" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#fff", fontWeight: 700 }}>{s.num}</div>
                <div style={{ fontSize: ".7rem", color: "var(--accent-light)", textTransform: "uppercase", letterSpacing: "2px", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOGO INTERACTIVO ── */}
      <section className="page-section" style={{ paddingTop: '100px' }}>
        <div className="container">
          <WoodCatalog woods={woodsWithImages} />
        </div>
      </section>
    </main>
  );
}