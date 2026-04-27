"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createWoodAction, updateWoodAction, type ActionState } from "./actions";
import WoodImageUploader from "./WoodImageUploader";
import type { Wood, WoodCategory } from "@/lib/seymu-data";
import { Save, Star, MonitorCheck, Plus } from "lucide-react";
import CategoryModal from "./CategoryModal";

interface WoodFormProps {
  wood?: Wood | null;
  mode: "create" | "edit";
  initialCategories: WoodCategory[];
}

export default function WoodForm({ wood, mode, initialCategories }: WoodFormProps) {
  const [categories, setCategories] = useState<WoodCategory[]>(initialCategories);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const actionWithId = mode === "edit" ? updateWoodAction.bind(null, wood!.id) : createWoodAction;

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(actionWithId, {
    success: false,
    message: "",
  });

  // Price formatting logic
  const formatNumber = (val: string | number | undefined | null) => {
    if (val === undefined || val === null || val === "") return "";
    const clean = val.toString().replace(/\D/g, "");
    return new Intl.NumberFormat("es-CR").format(parseInt(clean || "0"));
  };

  const [displayPrice, setDisplayPrice] = useState(
    formatNumber(state.fields?.price ?? wood?.price ?? "")
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
    if (state.fields?.price) {
      setDisplayPrice(formatNumber(state.fields.price));
    }
  }, [state]);

  return (
    <>
      <form action={formAction} className={mode === "create" ? "admin-edit-grid" : ""}>
        <div className={mode === "create" ? "admin-edit-main" : ""}>
          <div className="admin-form-card">
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="name">Nombre de la Madera</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={state.fields?.name ?? wood?.name ?? ""}
                  placeholder="Ej: Cedro Real, Guanacaste..."
                  required
                  disabled={isPending}
                />
                {state.errors?.name && <span className="error-text">{state.errors.name}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="price_display">Precio Estimado (₡)</label>
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
              </div>

              <div className="form-field">
                <label htmlFor="category">Categoría / Especie</label>
                <div className="category-field-row">
                  <select
                    id="category"
                    name="category"
                    defaultValue={state.fields?.category ?? wood?.category ?? ""}
                    required
                    disabled={isPending}
                  >
                    <option value="" disabled>Seleccione una categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    className="btn-manage-categories"
                    onClick={() => setIsCategoryModalOpen(true)}
                    title="Gestionar categorías"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {state.errors?.category && <span className="error-text">{state.errors.category}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="measurements">Medidas Disponibles</label>
                <input
                  id="measurements"
                  name="measurements"
                  type="text"
                  defaultValue={state.fields?.measurements ?? wood?.measurements ?? ""}
                  required
                  placeholder='Ej: 1"x4", 2"x6", tablilla...'
                  disabled={isPending}
                />
                {state.errors?.measurements && <span className="error-text">{state.errors.measurements}</span>}
              </div>

              <div className="form-field checkbox-field">
                <input
                  type="checkbox"
                  name="is_featured"
                  id="is_featured"
                  defaultChecked={state.fields?.is_featured === true || (state.fields === undefined && wood?.is_featured === true)}
                  disabled={isPending}
                />
                <label htmlFor="is_featured">
                  <Star size={16} fill={(state.fields?.is_featured ?? wood?.is_featured) ? "var(--accent)" : "none"} color="var(--accent)" />
                  Destacar en Inicio (Novedades)
                </label>
              </div>

              <div className="form-field checkbox-field">
                <input
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                  defaultChecked={state.fields?.is_active === false ? false : (state.fields === undefined ? (wood ? wood.is_active : true) : state.fields.is_active === true)}
                  disabled={isPending}
                />
                <label htmlFor="is_active">
                  <MonitorCheck size={16} color="var(--primary)" />
                  Mostrar en Catálogo Público
                </label>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="description">Descripción de la Madera</label>
              <textarea
                id="description"
                name="description"
                rows={6}
                defaultValue={state.fields?.description ?? wood?.description ?? ""}
                placeholder="Describí las características de la madera, usos recomendados, acabado..."
                required
                disabled={isPending}
              />
              {state.errors?.description && <span className="error-text">{state.errors.description}</span>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary btn-icon-labeled" disabled={isPending}>
                <Save size={18} />
                {isPending ? "Guardando..." : mode === "create" ? "Publicar Madera" : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>

        {mode === "create" && (
          <div className="admin-edit-sidebar">
            <div className="admin-form-card">
              <h2 className="admin-card-title">Galería de Imágenes</h2>
              <p className="admin-card-subtitle" style={{ marginBottom: '20px' }}>
                Subí las fotos que se mostrarán en el catálogo. Al guardar se vincularán a la madera automáticamente.
              </p>
              <WoodImageUploader initialImages={[]} />
            </div>
          </div>
        )}
      </form>

      <CategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onCategoriesChange={setCategories}
      />
    </>
  );
}
