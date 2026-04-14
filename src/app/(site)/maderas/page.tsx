import Link from "next/link";
import { getActiveWoods, getWoodImages } from "@/lib/seymu-data";

export const dynamic = "force-dynamic";

export default async function MaderasPage() {
  const woods = await getActiveWoods();

  const woodsWithImages = await Promise.all(
    woods.map(async (wood) => {
      const images = await getWoodImages(wood.id);
      return {
        ...wood,
        firstImage: images[0]?.secure_url ?? null,
      };
    })
  );

  return (
    <section className="page-section">
      <div className="container">
        <h1 className="page-title">Catálogo de Maderas</h1>
        <p className="page-text">
          Explorá nuestras opciones disponibles y conocé más detalles de cada tipo de madera.
        </p>

        <div className="woods-grid">
          {woodsWithImages.map((wood) => (
            <article key={wood.id} className="wood-card">
              <div
                className="wood-image-placeholder"
                style={
                  wood.firstImage
                    ? {
                        backgroundImage: `url(${wood.firstImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : undefined
                }
              >
                {!wood.firstImage ? wood.name : ""}
              </div>

              <div className="wood-card-body">
                <span className="wood-category">{wood.category ?? "Madera"}</span>
                <h2 className="wood-title">{wood.name}</h2>
                <p className="wood-price">
                  ₡{Number(wood.price).toLocaleString("es-CR")}
                </p>
                <p className="wood-description">{wood.short_description}</p>

                <div className="wood-actions">
                  <Link href={`/maderas/${wood.slug}`} className="btn-primary">
                    Ver detalle
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}