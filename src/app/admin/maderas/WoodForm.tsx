"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createWoodAction, updateWoodAction } from "./actions";
import type { Wood } from "@/lib/seymu-data";
import Link from "next/link";

interface WoodFormProps {
  wood?: Wood | null;
  mode: "create" | "edit";
}

export default function WoodForm({ wood, mode }: WoodFormProps) {
  const actionWithId = mode === "edit" ? updateWoodAction.bind(null, wood!.id) : createWoodAction;
  
  const [state, formAction, isPending] = useActionState(actionWithId, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className="container admin-form-container">
      <div className="admin-header">
        <div>
          <h1 className="page-title">{mode === "create" ? "Nueva madera" : `Editar: ${wood?.name}`}</h1>
          <p className="page-text">
            {mode === "create" 
              ? "Creá una nueva madera para el catálogo." 
              : "Actualizá la información técnica y comercial de esta madera."}
          </p>
        </div>

        <Link href="/admin/maderas" className="btn-secondary">
          Volver
        </Link>
      </div>

      <form action={formAction} className="admin-form-card">
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">Nombre</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              defaultValue={wood?.name ?? ""} 
              required 
              disabled={isPending}
            />
            {state.errors?.name && <span className="error-text">{state.errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="price">Precio (₡)</label>
            <input 
              id="price" 
              name="price" 
              type="number" 
              min="0" 
              step="0.01" 
              defaultValue={wood?.price ?? ""} 
              required 
              disabled={isPending}
            />
            {state.errors?.price && <span className="error-text">{state.errors.price}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="category">Categoría</label>
            <input 
              id="category" 
              name="category" 
              type="text" 
              defaultValue={wood?.category ?? ""} 
              placeholder="Ej: Mueblería, Construcción"
              disabled={isPending} 
            />
          </div>

          <div className="form-field">
            <label htmlFor="availability">Disponibilidad</label>
            <input
              id="availability"
              name="availability"
              type="text"
              defaultValue={wood?.availability ?? "Disponible"}
              disabled={isPending}
            />
          </div>
          
          <div className="form-field checkbox-field">
             <label>
              <input 
                type="checkbox" 
                name="is_active" 
                defaultChecked={wood ? wood.is_active : true} 
                disabled={isPending}
              />
              Producto activo (visible en catálogo)
             </label>
          </div>
        </div>

        <div className="form-field" style={{ padding: "0 2rem" }}>
          <label htmlFor="short_description">Descripción corta (Catálogo)</label>
          <textarea 
            id="short_description" 
            name="short_description" 
            rows={2} 
            defaultValue={wood?.short_description ?? ""} 
            disabled={isPending}
          />
        </div>

        <div className="form-field" style={{ padding: "0 2rem", marginBottom: "2rem" }}>
          <label htmlFor="description">Descripción detallada (Página de producto)</label>
          <textarea 
            id="description" 
            name="description" 
            rows={5} 
            defaultValue={wood?.description ?? ""} 
            disabled={isPending}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isPending}>
            {isPending ? "Guardando..." : "Guardar madera"}
          </button>
        </div>
      </form>
    </div>
  );
}
