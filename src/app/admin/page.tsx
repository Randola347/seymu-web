import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1 className="page-title">Panel administrativo</h1>
            <p className="page-text">
              Gestioná la información general de Seymu y el catálogo de maderas.
            </p>
          </div>
        </div>

        <div className="admin-grid">
          <article className="admin-card">
            <h2 className="admin-card-title">Empresa</h2>
            <p className="admin-card-text">
              Editá nombre, WhatsApp, descripción, contacto y datos generales.
            </p>
            <Link href="/admin/empresa" className="btn-primary">
              Editar empresa
            </Link>
          </article>

          <article className="admin-card">
            <h2 className="admin-card-title">Maderas</h2>
            <p className="admin-card-text">
              Creá, editá, activá o desactivá productos del catálogo.
            </p>
            <Link href="/admin/maderas" className="btn-primary">
              Administrar maderas
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}