"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { saveCompanySettingsAction } from "./actions";
import type { CompanySettings, SiteIdentity } from "@/lib/seymu-data";
import EmpresaImageUploader from "./EmpresaImageUploader";
import { Save, Building2, Globe } from "lucide-react";

export default function EmpresaForm({ 
  company, 
  identity 
}: { 
  company: CompanySettings | null,
  identity: SiteIdentity | null
}) {
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
    <div className="admin-form-container">
      <div className="admin-header">
        <div>
          <h1 className="page-title">Configuración Empresa</h1>
          <p className="page-text">Gestioná la información pública y la identidad visual de Seymu.</p>
        </div>
      </div>

      <form action={formAction} className="admin-form-card">
        <h3 className="admin-section-title">
          <Building2 size={20} />
          Información de Contacto
        </h3>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="company_name">Nombre de Empresa</label>
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

          <div className="form-field" style={{ gridColumn: 'span 2' }}>
            <label htmlFor="slogan">Slogan Corporativo</label>
            <textarea
              id="slogan"
              name="slogan"
              rows={2}
              defaultValue={company?.slogan ?? ""}
              disabled={isPending}
            />
          </div>

          <div className="form-divider" />

          <h3 className="admin-section-title" style={{ gridColumn: 'span 2' }}>
            <Globe size={20} />
            Identidad Visual
          </h3>

          <EmpresaImageUploader 
            label="Logotipo" 
            name="logo_url" 
            currentUrl={identity?.logo_url} 
          />

          <EmpresaImageUploader 
            label="Banner Home" 
            name="banner_url" 
            currentUrl={identity?.banner_url} 
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary btn-icon-labeled" disabled={isPending}>
            <Save size={18} />
            {isPending ? "Guardando..." : "Actualizar Configuración"}
          </button>
        </div>
      </form>

    </div>
  );
}
