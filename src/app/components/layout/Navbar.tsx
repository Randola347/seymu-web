import Link from "next/link";
import { getCompanySettings, getSiteIdentity } from "@/lib/seymu-data";

export default async function Navbar() {
  const company = await getCompanySettings();
  const identity = await getSiteIdentity();

  return (
    <header className="site-header">
      <div className="container site-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link href="/" className="site-logo">
          {identity?.logo_url ? (
            <img src={identity.logo_url} alt={company?.company_name} style={{ height: '50px' }} />
          ) : (
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontStyle: 'italic' }}>
              {company?.company_name || "Seymu"}
            </span>
          )}
        </Link>

        <nav className="site-nav" style={{ display: 'flex', gap: '30px' }}>
          <Link href="/" className="nav-link">Inicio</Link>
          <Link href="/nosotros" className="nav-link">Nosotros</Link>
          <Link href="/maderas" className="nav-link">Maderas</Link>
          <Link href="/contacto" className="nav-link">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}