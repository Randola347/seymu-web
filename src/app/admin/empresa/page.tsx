import { getCompanySettings } from "@/lib/seymu-data";
import EmpresaForm from "./EmpresaForm";

export const dynamic = "force-dynamic";

export default async function EmpresaPage() {
  const company = await getCompanySettings();

  return (
    <div className="admin-form-container">
      <div className="admin-header">
        <div>
          <h1 className="page-title">Configuración de Empresa</h1>
          <p className="page-text">
            Administrá los datos de contacto y la identidad visual de Seymu.
          </p>
        </div>
      </div>

      <EmpresaForm company={company} />
    </div>
  );
}