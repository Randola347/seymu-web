import { getCompanySettings, getSiteIdentity } from "@/lib/seymu-data";
import EmpresaForm from "./EmpresaForm";

export const dynamic = "force-dynamic";

export default async function EmpresaPage() {
  const company = await getCompanySettings();
  const identity = await getSiteIdentity();

  return <EmpresaForm company={company} identity={identity} />;
}
