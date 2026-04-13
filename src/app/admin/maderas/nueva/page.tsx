import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createWood } from "@/lib/seymu-data";

export default function NuevaMaderaPage() {
  async function createWoodAction(formData: FormData) {
    "use server";

    const name = String(formData.get("name") ?? "").trim();
    const slug = String(formData.get("slug") ?? "").trim();
    const shortDescription = String(formData.get("short_description") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const availability = String(formData.get("availability") ?? "").trim();
    const price = Number(formData.get("price") ?? 0);

    if (!name || !Number.isFinite(price) || price < 0) {
      return;
    }

    await createWood({
      name,
      slug,
      short_description: shortDescription,
      description,
      category,
      availability,
      price,
      is_active: true,
    });

    revalidatePath("/admin/maderas");
    revalidatePath("/maderas");
    revalidatePath("/");

    redirect("/admin/maderas");
  }

  return (
    <section className="page-section">
      <div className="container admin-form-container">
        <div className="admin-header">
          <div>
            <h1 className="page-title">Nueva madera</h1>
            <p className="page-text">
              Creá una nueva madera. Si dejás el slug vacío, se genera automáticamente.
            </p>
          </div>

          <Link href="/admin/maderas" className="btn-secondary">
            Volver
          </Link>
        </div>

        <form action={createWoodAction} className="admin-form-card">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Nombre</label>
              <input id="name" name="name" type="text" required />
            </div>

            <div className="form-field">
              <label htmlFor="slug">Slug</label>
              <input id="slug" name="slug" type="text" placeholder="opcional" />
            </div>

            <div className="form-field">
              <label htmlFor="price">Precio</label>
              <input id="price" name="price" type="number" min="0" step="0.01" required />
            </div>

            <div className="form-field">
              <label htmlFor="category">Categoría</label>
              <input id="category" name="category" type="text" />
            </div>

            <div className="form-field">
              <label htmlFor="availability">Disponibilidad</label>
              <input
                id="availability"
                name="availability"
                type="text"
                defaultValue="Disponible"
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="short_description">Descripción corta</label>
            <textarea id="short_description" name="short_description" rows={3} />
          </div>

          <div className="form-field">
            <label htmlFor="description">Descripción completa</label>
            <textarea id="description" name="description" rows={6} />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Guardar madera
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}