"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Settings, 
  Package, 
  LogOut, 
  ChevronRight,
  ScrollText,
  Menu,
  X
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Empresa", href: "/admin/empresa", icon: Settings },
  { name: "Maderas", href: "/admin/maderas", icon: Package },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className={`sidebar-backdrop ${isOpen ? "show" : ""}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* Toggle button for mobile */}
      <button 
        className="sidebar-mobile-toggle" 
        onClick={toggleSidebar}
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo" onClick={() => setIsOpen(false)}>
            Seymu Admin
          </Link>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
                {isActive && <ChevronRight size={16} className="active-arrow" />}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="sidebar-logout"
          >
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}

