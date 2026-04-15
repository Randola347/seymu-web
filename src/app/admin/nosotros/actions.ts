"use server";

import { revalidatePath } from "next/cache";
import { saveAboutUs } from "@/lib/seymu-data";
import { z } from "zod";

const nosotrosSchema = z.object({
  history_content: z.string().optional(),
  mission_content: z.string().optional(),
  vision_content: z.string().optional(),
});

export async function saveNosotrosAction(prevState: any, formData: FormData) {
  try {
    const data = {
      history_content: formData.get("history_content") as string,
      mission_content: formData.get("mission_content") as string,
      vision_content: formData.get("vision_content") as string,
    };

    const validated = nosotrosSchema.parse(data);

    await saveAboutUs(validated);

    revalidatePath("/admin/nosotros");
    revalidatePath("/nosotros");
    revalidatePath("/");

    return { success: true, message: "Información de 'Nosotros' actualizada correctamente." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error al guardar los cambios." };
  }
}
