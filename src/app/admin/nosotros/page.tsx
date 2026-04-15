import { getAboutUs } from "@/lib/seymu-data";
import NosotrosForm from "./NosotrosForm";

export const dynamic = "force-dynamic";

export default async function AdminNosotrosPage() {
  const content = await getAboutUs();

  return (
    <div className="admin-form-container">
      <div className="admin-header">
        <div>
          <h1 className="page-title">Sobre Nosotros</h1>
          <p className="page-text">
            Gestioná el contenido histórico y los valores (Misión y Visión) que se muestran en la página informativa.
          </p>
        </div>
      </div>

      <NosotrosForm content={content} />
    </div>
  );
}
