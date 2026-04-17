'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  companyName: string;
  logoUrl?: string | null;
}

export default function Navbar({ companyName, logoUrl }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        
        <Link href="/" className="site-logo" onClick={closeMenu}>
          {logoUrl ? (
            <img src={logoUrl} alt={companyName} style={{ height: '60px', width: 'auto' }} />
          ) : (
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontStyle: 'italic' }}>
              {companyName}
            </span>
          )}
        </Link>

        {/* Desktop & Mobile Navigation */}
        <nav className={`site-nav ${isOpen ? 'open' : ''}`}>
          <Link href="/" className="nav-link" onClick={closeMenu}>Inicio</Link>
          <Link href="/nosotros" className="nav-link" onClick={closeMenu}>Nosotros</Link>
          <Link href="/maderas" className="nav-link" onClick={closeMenu}>Maderas</Link>
          <Link href="/contacto" className="nav-link" onClick={closeMenu}>Contacto</Link>
        </nav>

        {/* Hamburger Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMenu}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
}