import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/whatsapp/WhatsAppButton";
import { getCompanySettings, getSiteIdentity } from "@/lib/seymu-data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCompanySettings();
  const identity = await getSiteIdentity();
  const whatsappNumber = company?.whatsapp_number?.replace(/\D/g, "") || "";
  const companyName = company?.company_name || "Seymu";

  return (
    <>
      <Navbar companyName={companyName} logoUrl={identity?.logo_url} />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton whatsappNumber={whatsappNumber} companyName={companyName} />
    </>
  );
}
