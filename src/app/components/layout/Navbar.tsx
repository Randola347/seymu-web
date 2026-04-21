"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import "./navbar.css";

interface NavbarProps {
  companyName: string;
  logoUrl?: string | null;
}

export default function Navbar({ companyName, logoUrl }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="site-logo">
          {logoUrl ? (
            <img src={logoUrl} alt={companyName} className="site-logo-img" />
          ) : (
            <span className="site-logo-text">{companyName}</span>
          )}
        </Link>

        <nav className="site-nav" aria-label="Navegación principal">
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
          >
            Inicio
          </Link>

          <Link
            href="/nosotros"
            className={`nav-link ${pathname === "/nosotros" ? "active" : ""}`}
          >
            Nosotros
          </Link>

          <Link
            href="/maderas"
            className={`nav-link ${pathname.startsWith("/maderas") ? "active" : ""}`}
          >
            Maderas
          </Link>

          <Link
            href="/contacto"
            className={`nav-link ${pathname === "/contacto" ? "active" : ""}`}
          >
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}