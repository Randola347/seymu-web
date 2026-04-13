import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getAllWoods, updateWoodStatus } from "@/lib/seymu-data";
import WoodImageUploader from "@/app/components/admin/WoodImageUploader";

export const dynamic = "force-dynamic";

export default async function AdminMaderasPage() {
  const woods = await getAllWoods();

  async function toggleWoodAction(formData: FormData) {
    "use server";

    const id = Number(formData.get("id"));
    const nextIsActive = String(formData.get("nextIsActive")) === "true";

    if (!id) return;

    await updateWoodStatus(id, nextIsActive);

    revalidatePath("/admin/maderas");
    revalidatePath("/maderas");
    revalidatePath("/");
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="page-title">Administrar maderas</h1>
            <p className="page-text">
              Desde aquí podés crear, editar, activar, desactivar y subir imágenes.
            </p>
          </div>

          <Link href="/admin/maderas/nueva" className="btn-primary">
            Nueva madera
          </Link>
        </div>

        <div className="admin-woods-grid">
          {woods.map((wood) => (
            <article key={wood.id} className="wood-card">
              <div className="wood-card-body">
                <div className="admin-status-row">
                  <span className="wood-category">{wood.category ?? "Madera"}</span>
                  <span className={wood.is_active ? "status-badge active" : "status-badge inactive"}>
                    {wood.is_active ? "Activa" : "Inactiva"}
                  </span>
                </div>

                <h2 className="wood-title">{wood.name}</h2>

                <p className="wood-price">
                  ₡{Number(wood.price).toLocaleString("es-CR")}
                </p>

                <p className="wood-description">
                  {wood.short_description ?? "Sin descripción corta."}
                </p>

                <div className="admin-actions">
                  <Link
                    href={`/admin/maderas/${wood.id}/editar`}
                    className="btn-secondary"
                  >
                    Editar
                  </Link>

                  <form action={toggleWoodAction}>
                    <input type="hidden" name="id" value={wood.id} />
                    <input
                      type="hidden"
                      name="nextIsActive"
                      value={(!wood.is_active).toString()}
                    />

                    <button type="submit" className="btn-outline-small">
                      {wood.is_active ? "Desactivar" : "Activar"}
                    </button>
                  </form>
                </div>

                <WoodImageUploader woodId={wood.id} woodName={wood.name} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}