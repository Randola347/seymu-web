"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { saveNosotrosAction } from "./actions";
import type { AboutUs } from "@/lib/seymu-data";
import { ScrollText, Target, Eye } from "lucide-react";

export default function NosotrosForm({ content }: { content: AboutUs | null }) {
  const [state, formAction, isPending] = useActionState(saveNosotrosAction, {
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
    <form action={formAction} className="admin-form-card">
      <div className="form-section">
        <h2 className="form-section-header">
          <ScrollText size={18} />
          Nuestra Historia
        </h2>
        <div className="form-field">
          <textarea
            id="history_content"
            name="history_content"
            rows={10}
            defaultValue={content?.history_content ?? ""}
            placeholder="Contá cómo nació Seymu, vuestra trayectoria y pasión por la madera..."
            disabled={isPending}
          />
        </div>
      </div>

      <div className="form-section">
        <h2 className="form-section-header">
          <Target size={18} />
          Misión
        </h2>
        <div className="form-field">
          <textarea
            id="mission_content"
            name="mission_content"
            rows={4}
            defaultValue={content?.mission_content ?? ""}
            placeholder="¿Cuál es el propósito diario de la empresa?"
            disabled={isPending}
          />
        </div>
      </div>

      <div className="form-section">
        <h2 className="form-section-header">
          <Eye size={18} />
          Visión
        </h2>
        <div className="form-field">
          <textarea
            id="vision_content"
            name="vision_content"
            rows={4}
            defaultValue={content?.vision_content ?? ""}
            placeholder="¿A dónde quiere llegar Seymu en el futuro?"
            disabled={isPending}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar Contenido"}
        </button>
      </div>
    </form>
  );
}
