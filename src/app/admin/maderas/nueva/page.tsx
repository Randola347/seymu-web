import WoodForm from "../WoodForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NuevaMaderaPage() {
  return (
    <div>
      <Link href="/admin/maderas" className="admin-back-link">
        <ChevronLeft size={18} />
        Volver al inventario
      </Link>
      <WoodForm mode="create" />
    </div>
  );
}