import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  getWoodById,
  getWoodImages,
  slugify,
  updateWood,
} from "@/lib/seymu-data";
import AdminWoodImagesManager from "@/app/components/admin/AdminWoodImagesManager";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditarMaderaPage({ params }: PageProps) {
  const { id } = await params;
  const woodId = Number(id);

  if (!woodId) {
    notFound();
  }

  const wood = await getWoodById(woodId);

  if (!wood) {
    notFound();
  }

  const currentWood = wood;
  const oldSlug = currentWood.slug;
  const woodName = currentWood.name;

  const images = await getWoodImages(woodId);

  async function updateWoodAction(formData: FormData) {
    "use server";

    const name = String(formData.get("name") ?? "").trim();
    const shortDescription = String(
      formData.get("short_description") ?? ""
    ).trim();
    const description = String(formData.get("description") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const availability = String(formData.get("availability") ?? "").trim();
    const price = Number(formData.get("price") ?? 0);
    const isActive = String(formData.get("is_active") ?? "") === "on";

    if (!name || !Number.isFinite(price) || price < 0) {
      return;
    }

    const newSlug = slugify(name);

    await updateWood(woodId, {
      name,
      short_description: shortDescription,
      description,
      category,
      availability,
      price,
      is_active: isActive,
    });

    revalidatePath("/admin/maderas");
    revalidatePath(`/admin/maderas/${woodId}/editar`);
    revalidatePath("/maderas");
    revalidatePath("/");
    revalidatePath(`/maderas/${oldSlug}`);
    revalidatePath(`/maderas/${newSlug}`);

    redirect("/admin/maderas");
  }

  return (
    <section className="page-section">
      <div className="container admin-form-container">
        <div className="admin-header">
          <div>
            <h1 className="page-title">Editar madera</h1>
            <p className="page-text">
              Modificá la información principal del producto y administrá sus imágenes.
            </p>
          </div>

          <Link href="/admin/maderas" className="btn-secondary">
            Volver
          </Link>
        </div>

        <form action={updateWoodAction} className="admin-form-card">
          <div className="form-section">
            <h2 className="form-section-header">Imágenes del producto</h2>

            <AdminWoodImagesManager
              woodId={woodId}
              woodName={woodName}
              images={images}
            />
          </div>

          <div className="form-section">
            <h2 className="form-section-header">Información básica</h2>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={currentWood.name}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="price">Precio</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={Number(currentWood.price)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="category">Categoría</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  defaultValue={currentWood.category ?? ""}
                />
              </div>

              <div className="form-field">
                <label htmlFor="availability">Disponibilidad</label>
                <input
                  id="availability"
                  name="availability"
                  type="text"
                  defaultValue={currentWood.availability ?? ""}
                />
              </div>
            </div>

            <div className="form-field checkbox-field">
              <label>
                <input
                  id="is_active"
                  name="is_active"
                  type="checkbox"
                  defaultChecked={currentWood.is_active}
                />
                Producto activo
              </label>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-header">Descripciones</h2>

            <div className="form-field">
              <label htmlFor="short_description">Descripción corta</label>
              <textarea
                id="short_description"
                name="short_description"
                rows={3}
                defaultValue={currentWood.short_description ?? ""}
              />
            </div>

            <div className="form-field">
              <label htmlFor="description">Descripción completa</label>
              <textarea
                id="description"
                name="description"
                rows={6}
                defaultValue={currentWood.description ?? ""}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Actualizar madera
            </button>

            <Link href={`/maderas/${currentWood.slug}`} className="btn-secondary">
              Ver detalle público
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}