"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createWoodAction, updateWoodAction } from "./actions";
import type { Wood } from "@/lib/seymu-data";
import Link from "next/link";
import { Save, ArrowLeft, Star, MonitorCheck } from "lucide-react";

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
    <div className="admin-form-container">
      <div className="admin-header">
        <div>
          <h1 className="page-title">{mode === "create" ? "Nueva Madera" : wood?.name}</h1>
          <p className="page-text">
            {mode === "create"
              ? "Agregá una nueva especie de madera al catálogo."
              : "Editá la información técnica y comercial de esta madera."}
          </p>
        </div>

        <Link href="/admin/maderas" className="btn-secondary btn-icon-labeled">
          <ArrowLeft size={16} />
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
            <label htmlFor="measurements">Medidas Técnicas</label>
            <input
              id="measurements"
              name="measurements"
              type="text"
              defaultValue={wood?.measurements ?? ""}
              placeholder='Ej: 1"x4", 2"x6"...'
              disabled={isPending}
            />
          </div>

          <div className="form-field checkbox-field">
             <input
                type="checkbox"
                name="is_featured"
                id="is_featured"
                defaultChecked={wood?.is_featured ?? false}
                disabled={isPending}
              />
              <label htmlFor="is_featured">
                <Star size={16} color="var(--accent)" fill={wood?.is_featured ? "var(--accent)" : "none"} />
                Producto Destacado (Ver en Inicio)
              </label>
          </div>

          <div className="form-field checkbox-field">
              <input
                type="checkbox"
                name="is_active"
                id="is_active"
                defaultChecked={wood ? wood.is_active : true}
                disabled={isPending}
              />
              <label htmlFor="is_active">
                <MonitorCheck size={16} color="var(--primary)" />
                Producto Activo (Visible en Catálogo)
              </label>
          </div>
        </div>

        <div className="form-field mb-24">
          <label htmlFor="short_description">Descripción corta</label>
          <textarea
            id="short_description"
            name="short_description"
            rows={2}
            defaultValue={wood?.short_description ?? ""}
            disabled={isPending}
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Descripción detallada</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={wood?.description ?? ""}
            disabled={isPending}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary btn-icon-labeled" disabled={isPending}>
            <Save size={18} />
            {isPending ? "Guardando..." : "Guardar madera"}
          </button>
        </div>
      </form>

    </div>
  );
}