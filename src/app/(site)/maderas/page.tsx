import { getActiveWoods, getWoodImages } from "@/lib/seymu-data";
import WoodCatalog from "@/app/components/woods/WoodCatalog";
import "./maderas.css";

export const dynamic = "force-dynamic";

export default async function MaderasPage() {
  const woods = await getActiveWoods();

  const woodsWithImages = woods.map((wood) => ({
    ...wood,
    // Ensure price is a string for the Number() conversion in the client component
    price: wood.price.toString()
  }));

  const stats = [
    { num: woodsWithImages.length, label: "Especies Disponibles" },
    { num: "100%", label: "Calidad Forestal" },
    { num: "Directo", label: "De Origen" },
  ];

  return (
    <main className="maderas-page">
      <section className="maderas-hero">
        <div className="maderas-hero-glow" />

        <div className="container">
          <div className="maderas-hero-inner">
            <span className="maderas-hero-tag">Colección Premium</span>

            <h1 className="maderas-hero-title">
              <strong>Nuestro</strong> Catálogo
            </h1>

            <p className="maderas-hero-text">
              Maderas finas y estructurales de la más alta calidad,
              seleccionadas bajo criterios de sostenibilidad y durabilidad.
            </p>

            <div className="maderas-hero-stats">
              {stats.map((item, index) => (
                <div key={index} className="maderas-stat-card">
                  <div className="maderas-stat-number">{item.num}</div>
                  <div className="maderas-stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="maderas-catalog-section page-section">
        <div className="container">
          <WoodCatalog woods={woodsWithImages} />
        </div>
      </section>
    </main>
  );
}