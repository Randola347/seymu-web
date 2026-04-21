"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createWoodAction, updateWoodAction } from "./actions";
import WoodImageUploader from "./WoodImageUploader";
import type { Wood } from "@/lib/seymu-data";
import { Save, Star, MonitorCheck, Info } from "lucide-react";
import { useState } from "react";

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

  // Price formatting logic
  const formatNumber = (val: string) => {
    if (!val) return "";
    const clean = val.toString().replace(/\D/g, "");
    return new Intl.NumberFormat("en-US").format(parseInt(clean || "0"));
  };

  // State for display price, initialized with wood data or previous failed state
  const [displayPrice, setDisplayPrice] = useState(
    formatNumber(state.fields?.price?.toString() ?? wood?.price?.toString() ?? "")
  );

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue === "") {
      setDisplayPrice("");
      return;
    }
    setDisplayPrice(formatNumber(rawValue));
  };

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
    // Update local price state if server returns new fields (persistence)
    if (state.fields?.price) {
      setDisplayPrice(formatNumber(state.fields.price.toString()));
    }
  }, [state]);

  return (
    <form action={formAction} className={mode === "create" ? "admin-edit-grid" : ""}>
      <div className={mode === "create" ? "admin-edit-main" : ""}>
        <div className="admin-form-card">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={state.fields?.name ?? wood?.name ?? ""}
                required
                disabled={isPending}
              />
              {state.errors?.name && <span className="error-text">{state.errors.name}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="price_display">Precio (₡)</label>
              <input
                id="price_display"
                type="text"
                value={displayPrice}
                onChange={handlePriceChange}
                placeholder="0"
                required
                disabled={isPending}
              />
              <input 
                type="hidden" 
                name="price" 
                value={displayPrice.replace(/\D/g, "")} 
              />
              {state.errors?.price && <span className="error-text">{state.errors.price}</span>}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: 'var(--foreground-muted)', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Info size={14} />
                  <span>Se formatea automáticamente mientras escribís.</span>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="category">Categoría</label>
              <input
                id="category"
                name="category"
                type="text"
                defaultValue={state.fields?.category ?? wood?.category ?? ""}
                required
                placeholder="Ej: Mueblería, Construcción"
                disabled={isPending}
              />
              {state.errors?.category && <span className="error-text">{state.errors.category}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="measurements">Medidas Técnicas</label>
              <input
                id="measurements"
                name="measurements"
                type="text"
                defaultValue={state.fields?.measurements ?? wood?.measurements ?? ""}
                required
                placeholder='Ej: 1"x4", 2"x6"...'
                disabled={isPending}
              />
              {state.errors?.measurements && <span className="error-text">{state.errors.measurements}</span>}
            </div>

            <div className="form-field checkbox-field">
              <input
                type="checkbox"
                name="is_featured"
                id="is_featured"
                defaultChecked={state.fields?.is_featured === "true" || state.fields?.is_featured === true || wood?.is_featured === true}
                disabled={isPending}
              />
              <label htmlFor="is_featured">
                <Star size={16} color="var(--accent)" fill={(state.fields?.is_featured ?? wood?.is_featured) ? "var(--accent)" : "none"} />
                Producto Destacado (Ver en Inicio)
              </label>
            </div>

            <div className="form-field checkbox-field">
              <input
                type="checkbox"
                name="is_active"
                id="is_active"
                defaultChecked={state.fields?.is_active === "false" || state.fields?.is_active === false ? false : (wood ? wood.is_active : true)}
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
              defaultValue={state.fields?.short_description ?? wood?.short_description ?? ""}
              required
              disabled={isPending}
            />
            {state.errors?.short_description && <span className="error-text">{state.errors.short_description}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="description">Descripción detallada</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={state.fields?.description ?? wood?.description ?? ""}
              required
              disabled={isPending}
            />
            {state.errors?.description && <span className="error-text">{state.errors.description}</span>}
          </div>

          <div className="form-actions" style={{ marginTop: '32px' }}>
            <button type="submit" className="btn-primary btn-icon-labeled" disabled={isPending}>
              <Save size={18} />
              {isPending ? "Guardando..." : mode === "create" ? "Crear Madera" : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </div>

      {mode === "create" && (
        <div className="admin-edit-sidebar">
          <div className="admin-form-card">
            <h2 className="admin-card-title">Imágenes de la Madera</h2>
            <p className="admin-card-subtitle" style={{ marginBottom: '20px' }}>
              Subí las fotos que se mostrarán en el catálogo. Al guardar se vincularán a la madera.
            </p>
            <WoodImageUploader initialImages={[]} />
          </div>
        </div>
      )}
    </form>
  );
}