import { getActiveWoods } from "@/lib/seymu-data";
import WoodImageUploader from "@/app/components/admin/WoodImageUploader";

export const dynamic = "force-dynamic";

export default async function AdminMaderasPage() {
  const woods = await getActiveWoods();

  return (
    <section className="page-section">
      <div className="container">
        <h1 className="page-title">Administrar imágenes de maderas</h1>
        <p className="page-text">
          Subí una imagen principal para cada madera.
        </p>

        <div className="admin-woods-grid">
          {woods.map((wood) => (
            <div key={wood.id} className="wood-card">
              <div className="wood-card-body">
                <span className="wood-category">{wood.category ?? "Madera"}</span>
                <h2 className="wood-title">{wood.name}</h2>
                <p className="wood-price">
                  ₡{Number(wood.price).toLocaleString("es-CR")}
                </p>
                <p className="wood-description">
                  {wood.short_description ?? "Sin descripción corta."}
                </p>

                <WoodImageUploader woodId={wood.id} woodName={wood.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}