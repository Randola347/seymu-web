"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  companyName: string;
  logoUrl?: string | null;
}

export default function Navbar({ companyName, logoUrl }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <header className="site-header">
        <div className="container site-header-inner">
          <Link href="/" className="site-logo" onClick={closeMenu}>
            {logoUrl ? (
              <img src={logoUrl} alt={companyName} className="site-logo-img" />
            ) : (
              <span className="site-logo-text">{companyName}</span>
            )}
          </Link>

          <nav
            className={`site-nav ${isOpen ? "open" : ""}`}
            aria-label="Navegación principal"
          >
            <Link
              href="/"
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Inicio
            </Link>

            <Link
              href="/nosotros"
              className={`nav-link ${pathname === "/nosotros" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Nosotros
            </Link>

            <Link
              href="/maderas"
              className={`nav-link ${pathname.startsWith("/maderas") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Maderas
            </Link>

            <Link
              href="/contacto"
              className={`nav-link ${pathname === "/contacto" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Contacto
            </Link>
          </nav>

          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <button
        type="button"
        className={`site-nav-overlay ${isOpen ? "show" : ""}`}
        onClick={closeMenu}
        aria-label="Cerrar menú"
      />
    </>
  );
}