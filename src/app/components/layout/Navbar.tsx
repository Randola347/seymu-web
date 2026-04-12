import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container site-header-content">
        <Link href="/" className="site-logo">
          Seymu
        </Link>

        <nav className="site-nav">
          <Link href="/">Inicio</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/maderas">Maderas</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}