import Link from "next/link";
import { getAllWoods, getCompanySettings } from "@/lib/seymu-data";
import { Settings, Package, ArrowRight, Info, TrendingUp, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const woods = await getAllWoods();
  const company = await getCompanySettings();
  
  const activeWoods = woods.filter(w => w.is_active).length;
  const featuredWoods = woods.filter(w => w.is_featured).length;

  return (
    <div className="admin-form-container">
      <div className="admin-header">
        <div>
          <h1 className="page-title">Panel de Control</h1>
          <p className="page-text">
            Bienvenido al centro de administración de Seymu. Gestioná tu negocio con facilidad.
          </p>
        </div>
      </div>

      <div className="admin-grid mb-40">
        <div className="admin-form-card stats-card">
          <div className="stats-icon wood">
            <Package size={24} />
          </div>
          <div>
            <h3 className="stats-label">Total Especies</h3>
            <p className="stats-value">{woods.length}</p>
            <p className="stats-sub">{activeWoods} activas en la web</p>
          </div>
        </div>

        <div className="admin-form-card stats-card">
          <div className="stats-icon featured">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 className="stats-label">Destacados</h3>
            <p className="stats-value">{featuredWoods}</p>
            <p className="stats-sub">En escaparate de Inicio</p>
          </div>
        </div>
      </div>

      <div className="admin-grid">
        <article className="admin-form-card board-card">
          <div className="board-icon" style={{ background: 'var(--primary-dark)', color: '#fff' }}>
            <Settings size={20} />
          </div>
          <h2>Identidad de Empresa</h2>
          <p>
            Actualizá el nombre, contacto de WhatsApp, slogan e identidad visual (logo y banners).
          </p>
          <Link href="/admin/empresa" className="btn-primary btn-icon-labeled" style={{ justifyContent: 'center' }}>
            Gestionar Perfil
            <ArrowRight size={16} />
          </Link>
        </article>

        <article className="admin-form-card board-card">
          <div className="board-icon" style={{ background: 'var(--accent)', color: '#fff' }}>
            <Package size={20} />
          </div>
          <h2>Gestión de Maderas</h2>
          <p>
            Agregá nuevas especies, cambiá precios, marcá favoritos y gestioná la galería de fotos.
          </p>
          <Link href="/admin/maderas" className="btn-primary btn-icon-labeled" style={{ justifyContent: 'center' }}>
            Ir al Inventario
            <ArrowRight size={16} />
          </Link>
        </article>
      </div>

    </div>
  );
}