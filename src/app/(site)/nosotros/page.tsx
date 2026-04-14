import { getCompanySettings } from "@/lib/seymu-data";
import { ScrollText, Target, Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NosotrosPage() {
  const company = await getCompanySettings();

  return (
    <div className="page-section">
      <div className="container">
        <header className="nosotros-header">
          <h1 className="page-title">Nuestra Historia</h1>
          <p className="page-text">
            Conocé las raíces y el propósito que impulsa a Seymu cada día.
          </p>
        </header>

        <section className="nosotros-content">
          <div className="history-block">
            {company?.history_text ? (
              <div className="rich-text">
                {company.history_text.split("\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <p className="page-text">Historia en proceso de actualización...</p>
            )}
          </div>

          <div className="values-grid">
            <article className="value-card">
              <div className="value-icon">
                <Target size={32} />
              </div>
              <h2 className="value-title">Misión</h2>
              <p className="value-text">
                {company?.mission_text || "Ofrecer maderas de la más alta calidad con un servicio excepcional."}
              </p>
            </article>

            <article className="value-card">
              <div className="value-icon">
                <Eye size={32} />
              </div>
              <h2 className="value-title">Visión</h2>
              <p className="value-text">
                {company?.vision_text || "Ser referentes nacionales en la comercialización de maderas finas y sostenibles."}
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
