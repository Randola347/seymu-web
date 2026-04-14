import Link from "next/link";
import { getAllWoods, getCompanySettings } from "@/lib/seymu-data";
import { Settings, Package, ArrowRight, Info } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const woods = await getAllWoods();
  const company = await getCompanySettings();
  
  const activeWoods = woods.filter(w => w.is_active).length;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="page-title">Panel de Control</h1>
          <p className="page-text">
            Bienvenido al centro de administración de Seymu. Aquí puedes ver el resumen de tu negocio.
          </p>
        </div>
      </div>

      <div className="admin-grid" style={{ marginBottom: "3rem" }}>
        <div className="admin-card stats-card">
          <div className="stats-icon primary">
            <Package size={24} />
          </div>
          <div>
            <h3 className="stats-label">Maderas en Catálogo</h3>
            <p className="stats-value">{woods.length}</p>
            <p className="stats-sub">{activeWoods} activas públicamente</p>
          </div>
        </div>

        <div className="admin-card stats-card">
          <div className="stats-icon accent">
            <Info size={24} />
          </div>
          <div>
            <h3 className="stats-label">Información de Empresa</h3>
            <p className="stats-value">{company ? "Configurada" : "Incompleta"}</p>
            <p className="stats-sub">{company?.company_name || "Sin nombre"}</p>
          </div>
        </div>
      </div>

      <div className="admin-grid">
        <article className="admin-card">
          <div className="card-header-icon">
            <Settings size={22} />
          </div>
          <h2 className="admin-card-title">Gestión de Empresa</h2>
          <p className="admin-card-text">
            Cambia el nombre, contacto de WhatsApp, redes sociales e identidad visual.
          </p>
          <Link href="/admin/empresa" className="btn-primary">
            Editar Configuración
            <ArrowRight size={16} />
          </Link>
        </article>

        <article className="admin-card">
          <div className="card-header-icon">
            <Package size={22} />
          </div>
          <h2 className="admin-card-title">Catálogo de Maderas</h2>
          <p className="admin-card-text">
            Sube nuevos productos, ajusta precios y añade fotos para que tus clientes las vean.
          </p>
          <Link href="/admin/maderas" className="btn-primary">
            Ir al Inventario
            <ArrowRight size={16} />
          </Link>
        </article>
      </div>
    </div>
  );
}