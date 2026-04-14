import { getCompanySettings } from "@/lib/seymu-data";

export const dynamic = "force-dynamic";

export default async function ContactoPage() {
  const company = await getCompanySettings();

  return (
    <section className="page-section">
      <div className="container">
        <h1 className="page-title">Contacto</h1>

        <p className="page-text">
          Para consultas sobre precios, disponibilidad o tipos de madera, escribinos directamente.
        </p>

        <div className="wood-detail-content" style={{ maxWidth: "700px" }}>
          <p><strong>Empresa:</strong> {company?.company_name ?? "Maderas Finas Seymu"}</p>
          <p><strong>WhatsApp:</strong> {company?.whatsapp_number ?? "-"}</p>
          <p><strong>Teléfono:</strong> {company?.phone ?? "-"}</p>
          <p><strong>Email:</strong> {company?.email ?? "-"}</p>
          <p><strong>Dirección:</strong> {company?.address ?? "-"}</p>
          <p><strong>Horario:</strong> {company?.schedule ?? "-"}</p>
        </div>
      </div>
    </section>
  );
}