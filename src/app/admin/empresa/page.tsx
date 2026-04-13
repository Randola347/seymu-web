import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCompanySettings, saveCompanySettings } from "@/lib/seymu-data";

export const dynamic = "force-dynamic";

export default async function EmpresaPage() {
  const company = await getCompanySettings();

  async function saveCompanyAction(formData: FormData) {
    "use server";

    const companyName = String(formData.get("company_name") ?? "").trim();
    const slogan = String(formData.get("slogan") ?? "").trim();
    const aboutText = String(formData.get("about_text") ?? "").trim();
    const whatsappNumber = String(formData.get("whatsapp_number") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const schedule = String(formData.get("schedule") ?? "").trim();
    const logoUrl = String(formData.get("logo_url") ?? "").trim();
    const bannerUrl = String(formData.get("banner_url") ?? "").trim();

    if (!companyName || !whatsappNumber) {
      return;
    }

    await saveCompanySettings({
      company_name: companyName,
      slogan,
      about_text: aboutText,
      whatsapp_number: whatsappNumber,
      phone,
      email,
      address,
      schedule,
      logo_url: logoUrl,
      banner_url: bannerUrl,
    });

    revalidatePath("/");
    revalidatePath("/contacto");
    revalidatePath("/admin/empresa");

    redirect("/admin/empresa");
  }

  return (
    <section className="page-section">
      <div className="container admin-form-container">
        <div className="admin-header">
          <div>
            <h1 className="page-title">Editar empresa</h1>
            <p className="page-text">
              Actualizá la información general que se usa en la web.
            </p>
          </div>
        </div>

        <form action={saveCompanyAction} className="admin-form-card">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="company_name">Nombre de empresa</label>
              <input
                id="company_name"
                name="company_name"
                type="text"
                defaultValue={company?.company_name ?? ""}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="whatsapp_number">WhatsApp</label>
              <input
                id="whatsapp_number"
                name="whatsapp_number"
                type="text"
                defaultValue={company?.whatsapp_number ?? ""}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                name="phone"
                type="text"
                defaultValue={company?.phone ?? ""}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={company?.email ?? ""}
              />
            </div>

            <div className="form-field">
              <label htmlFor="schedule">Horario</label>
              <input
                id="schedule"
                name="schedule"
                type="text"
                defaultValue={company?.schedule ?? ""}
              />
            </div>

            <div className="form-field">
              <label htmlFor="address">Dirección</label>
              <input
                id="address"
                name="address"
                type="text"
                defaultValue={company?.address ?? ""}
              />
            </div>

            <div className="form-field">
              <label htmlFor="logo_url">URL logo</label>
              <input
                id="logo_url"
                name="logo_url"
                type="text"
                defaultValue={company?.logo_url ?? ""}
              />
            </div>

            <div className="form-field">
              <label htmlFor="banner_url">URL banner</label>
              <input
                id="banner_url"
                name="banner_url"
                type="text"
                defaultValue={company?.banner_url ?? ""}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="slogan">Slogan</label>
            <textarea
              id="slogan"
              name="slogan"
              rows={2}
              defaultValue={company?.slogan ?? ""}
            />
          </div>

          <div className="form-field">
            <label htmlFor="about_text">Descripción principal</label>
            <textarea
              id="about_text"
              name="about_text"
              rows={5}
              defaultValue={company?.about_text ?? ""}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}