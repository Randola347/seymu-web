"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Settings, 
  Package, 
  LogOut, 
  ChevronRight,
  ScrollText
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Empresa", href: "/admin/empresa", icon: Settings },
  { name: "Nosotros", href: "/admin/nosotros", icon: ScrollText },
  { name: "Maderas", href: "/admin/maderas", icon: Package },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <Link href="/" className="sidebar-logo">
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
  );
}
