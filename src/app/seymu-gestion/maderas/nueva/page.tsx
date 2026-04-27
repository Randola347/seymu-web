import WoodForm from "../WoodForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getWoodCategories } from "@/lib/seymu-data";

export default async function NuevaMaderaPage() {
  const categories = await getWoodCategories();

  return (
    <div className="admin-form-container">
      <Link href="/seymu-gestion/maderas" className="admin-back-btn">
        <ChevronLeft size={18} />
        Volver al inventario
      </Link>

      <div className="admin-header">
        <div>
          <h1 className="page-title">Nueva Madera</h1>
          <p className="page-text">
            Agregá una nueva especie de madera al catálogo completando la información técnica y comercial.
          </p>
        </div>
      </div>

      <WoodForm mode="create" initialCategories={categories} />
    </div>
  );
}
