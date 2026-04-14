import Link from "next/link";
import { getAllWoods } from "@/lib/seymu-data";
import WoodStatusToggle from "./WoodStatusToggle";
import WoodDeleteButton from "./WoodDeleteButton";
import WoodImageUploader from "@/app/components/admin/WoodImageUploader";
import { Plus, Edit2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminMaderasPage() {
  const woods = await getAllWoods();

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="page-title">Inventario de Maderas</h1>
          <p className="page-text">
            Gestioná el catálogo de productos, sus precios y galería de imágenes.
          </p>
        </div>

        <Link href="/admin/maderas/nueva" className="btn-primary">
          <Plus size={18} />
          Nueva madera
        </Link>
      </div>

      <div className="admin-woods-grid">
        {woods.map((wood) => (
          <article key={wood.id} className="wood-card">
            <div className="wood-card-body">
              <div className="admin-status-row">
                <span className="wood-category">{wood.category ?? "Sin categoría"}</span>
                <span className={wood.is_active ? "status-badge active" : "status-badge inactive"}>
                  {wood.is_active ? "Activa" : "Inactiva"}
                </span>
              </div>

              <h2 className="wood-title" title={wood.name}>{wood.name}</h2>

              <p className="wood-price">
                ₡{Number(wood.price).toLocaleString("es-CR")}
              </p>

              <p className="wood-description">
                {wood.short_description ?? "Sin descripción corta disponible."}
              </p>

              <div className="admin-actions">
                <Link
                  href={`/admin/maderas/${wood.id}/editar`}
                  className="btn-secondary"
                  title="Editar detalles"
                >
                  <Edit2 size={16} />
                  Editar
                </Link>

                <WoodStatusToggle id={wood.id} initialStatus={wood.is_active} />
                
                <WoodDeleteButton id={wood.id} name={wood.name} />
              </div>

              <div className="wood-uploader-card">
                <WoodImageUploader woodId={wood.id} woodName={wood.name} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}