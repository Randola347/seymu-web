import { getCompanySettings } from "@/lib/seymu-data";

export default async function WhatsAppButton() {
  const company = await getCompanySettings();

  if (!company?.whatsapp_number) return null;

  const message = encodeURIComponent(
    `Hola, me gustaría recibir más información sobre ${company.company_name}.`
  );

  return (
    <a
      href={`https://wa.me/${company.whatsapp_number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Contactar por WhatsApp"
    >
      WhatsApp
    </a>
  );
}