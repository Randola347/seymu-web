"use server";

import { revalidatePath } from "next/cache";
import { createWood, updateWood, updateWoodStatus } from "@/lib/seymu-data";
import { woodSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";

export async function createWoodAction(prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  
  const data = {
    ...rawData,
    is_active: rawData.is_active === "on" || rawData.is_active === "true",
  };

  const validatedFields = woodSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Revisa los datos de la madera.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await createWood(validatedFields.data);
    
    revalidatePath("/admin/maderas");
    revalidatePath("/maderas");
    revalidatePath("/");

  } catch (error) {
    return {
      success: false,
      message: "Error al crear la madera en la base de datos.",
    };
  }

  redirect("/admin/maderas");
}

export async function updateWoodAction(id: number, prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  
  const data = {
    ...rawData,
    is_active: rawData.is_active === "on" || rawData.is_active === "true",
  };

  const validatedFields = woodSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Revisa los datos de la madera.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await updateWood(id, validatedFields.data);
    
    revalidatePath("/admin/maderas");
    revalidatePath(`/maderas/${validatedFields.data.slug}`);
    revalidatePath("/");

    return {
      success: true,
      message: "Madera actualizada correctamente.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar la madera.",
    };
  }
}

export async function toggleWoodStatusAction(id: number, isActive: boolean) {
  try {
    await updateWoodStatus(id, isActive);
    revalidatePath("/admin/maderas");
    revalidatePath("/maderas");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, message: "No se pudo cambiar el estado." };
  }
}

export async function deleteWoodAction(id: number) {
  try {
    const { deleteWood } = await import("@/lib/seymu-data");
    await deleteWood(id);
    
    revalidatePath("/admin/maderas");
    revalidatePath("/maderas");
    revalidatePath("/");
    
    return { success: true, message: "Madera eliminada correctamente." };
  } catch (error) {
    return { success: false, message: "Error al eliminar la madera." };
  }
}
