"use server";

import { revalidatePath } from "next/cache";
import { saveCompanySettings, saveSiteIdentity } from "@/lib/seymu-data";
import { companySchema } from "@/lib/schemas";

export async function saveCompanySettingsAction(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = companySchema.safeParse(data);

  if (!validatedFields.success) {
    console.error("ZOD ERROR:", validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: "Por favor revisa los campos del formulario.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await saveCompanySettings(validatedFields.data);
    
    // Also save to site_identity table
    await saveSiteIdentity({
      logo_url: validatedFields.data.logo_url,
      banner_url: validatedFields.data.banner_url
    });

    revalidatePath("/");
    revalidatePath("/contacto");
    revalidatePath("/admin/empresa");
    revalidatePath("/nosotros");

    return {
      success: true,
      message: "Configuración guardada correctamente.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al guardar en la base de datos.",
    };
  }
}
