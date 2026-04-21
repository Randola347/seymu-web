"use server";

import { revalidatePath } from "next/cache";
import { saveCompanySettings, saveSiteIdentity, getCompanySettings } from "@/lib/seymu-data";
import { companySchema } from "@/lib/schemas";
import { deleteFromCloudinary, extractPublicIdFromUrl } from "@/lib/cloudinary";
import { auth } from "@/auth";

export async function saveCompanySettingsAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) {
    return { success: false, message: "No autorizado." };
  }

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
    const existing = await getCompanySettings();
    
    // Cleanup Cloudinary if logo changed
    if (existing?.logo_url && existing.logo_url !== validatedFields.data.logo_url) {
      const publicId = extractPublicIdFromUrl(existing.logo_url);
      if (publicId) await deleteFromCloudinary(publicId);
    }
    
    // Cleanup Cloudinary if banner changed
    if (existing?.banner_url && existing.banner_url !== validatedFields.data.banner_url) {
      const publicId = extractPublicIdFromUrl(existing.banner_url);
      if (publicId) await deleteFromCloudinary(publicId);
    }

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
