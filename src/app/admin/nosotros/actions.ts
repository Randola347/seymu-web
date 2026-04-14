"use server";

import { revalidatePath } from "next/cache";
import { getCompanySettings, saveCompanySettings } from "@/lib/seymu-data";
import { z } from "zod";

const nosotrosSchema = z.object({
  history_text: z.string().optional(),
  mission_text: z.string().optional(),
  vision_text: z.string().optional(),
});

export async function saveNosotrosAction(prevState: any, formData: FormData) {
  try {
    const existing = await getCompanySettings();
    if (!existing) {
      return { success: false, message: "Primero debes configurar la información básica de la empresa." };
    }

    const data = {
      history_text: formData.get("history_text") as string,
      mission_text: formData.get("mission_text") as string,
      vision_text: formData.get("vision_text") as string,
    };

    const validated = nosotrosSchema.parse(data);

    await saveCompanySettings({
      ...existing, // Mantiene lo demás
      ...validated,
    });

    revalidatePath("/admin/nosotros");
    revalidatePath("/nosotros");
    revalidatePath("/");

    return { success: true, message: "Información de 'Nosotros' actualizada correctamente." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error al guardar los cambios." };
  }
}
