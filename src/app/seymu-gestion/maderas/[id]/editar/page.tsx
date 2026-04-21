import Link from "next/link";
import { notFound } from "next/navigation";
import { getWoodById, getWoodImages } from "@/lib/seymu-data";
import AdminWoodImagesManager from "@/app/components/admin/AdminWoodImagesManager";
import WoodForm from "../../WoodForm";
import { ChevronLeft } from "lucide-react";

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

  const images = await getWoodImages(woodId);

  return (
    <div className="admin-form-container">
      <Link href="/seymu-gestion/maderas" className="admin-back-btn">
        <ChevronLeft size={18} />
        Volver al inventario
      </Link>

      <div className="admin-header">
        <div>
          <h1 className="page-title">Editar Madera</h1>
          <p className="page-text">
            Actualizá la información técnica y administrá la galería de imágenes de <strong>{wood.name}</strong>.
          </p>
        </div>
      </div>

      <div className="admin-edit-grid">
        <div className="admin-edit-main">
          <WoodForm wood={wood} mode="edit" />
        </div>

        <aside className="admin-edit-sidebar">
          <div className="admin-form-card">
            <div className="form-section">
              <h2 className="form-section-header">Galería de Imágenes</h2>
              <AdminWoodImagesManager
                woodId={woodId}
                woodName={wood.name}
                images={images}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
