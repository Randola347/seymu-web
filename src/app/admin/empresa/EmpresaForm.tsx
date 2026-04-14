"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { saveCompanySettingsAction } from "./actions";
import type { CompanySettings } from "@/lib/seymu-data";
import EmpresaImageUploader from "./EmpresaImageUploader";

export default function EmpresaForm({ company }: { company: CompanySettings | null }) {
  const [state, formAction, isPending] = useActionState(saveCompanySettingsAction, {
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
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="company_name">Nombre de empresa</label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            defaultValue={company?.company_name ?? ""}
            required
            disabled={isPending}
          />
          {state.errors?.company_name && <span className="error-text">{state.errors.company_name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="whatsapp_number">WhatsApp</label>
          <input
            id="whatsapp_number"
            name="whatsapp_number"
            type="text"
            defaultValue={company?.whatsapp_number ?? ""}
            required
            disabled={isPending}
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            name="phone"
            type="text"
            defaultValue={company?.phone ?? ""}
            disabled={isPending}
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={company?.email ?? ""}
            disabled={isPending}
          />
        </div>

        <div className="form-field">
          <label htmlFor="schedule">Horario</label>
          <input
            id="schedule"
            name="schedule"
            type="text"
            defaultValue={company?.schedule ?? ""}
            disabled={isPending}
          />
        </div>

        <div className="form-field">
          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            name="address"
            type="text"
            defaultValue={company?.address ?? ""}
            disabled={isPending}
          />
        </div>

        <EmpresaImageUploader 
          label="Logo" 
          name="logo_url" 
          currentUrl={company?.logo_url} 
        />

        <EmpresaImageUploader 
          label="Banner Principal" 
          name="banner_url" 
          currentUrl={company?.banner_url} 
        />
      </div>

      <div className="form-field" style={{ padding: "0 2rem", marginBottom: "2rem" }}>
        <label htmlFor="slogan">Slogan / Frase corta</label>
        <textarea
          id="slogan"
          name="slogan"
          rows={2}
          defaultValue={company?.slogan ?? ""}
          disabled={isPending}
          placeholder="Ej: Maderas de calidad para toda la vida."
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar Identidad"}
        </button>
      </div>
    </form>
  );
}
