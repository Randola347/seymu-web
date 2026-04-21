"use server";

import { revalidatePath } from "next/cache";
import { createWood, updateWood, updateWoodStatus, saveWoodImages, getWoodByName } from "@/lib/seymu-data";
import { woodSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function createWoodAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) {
    return { success: false, message: "No autorizado." };
  }
  
  const rawData = Object.fromEntries(formData.entries());
  
  const data = {
    ...rawData,
    is_active: rawData.is_active === "on" || rawData.is_active === "true",
    is_featured: rawData.is_featured === "on" || rawData.is_featured === "true",
  };

  const validatedFields = woodSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Revisa los datos de la madera.",
      errors: validatedFields.error.flatten().fieldErrors,
      fields: data,
    };
  }

  // Check for duplicate name
  const existing = await getWoodByName(validatedFields.data.name);
  if (existing) {
    return {
      success: false,
      message: "Este nombre ya está registrado.",
      errors: { name: ["Ya existe una madera con este nombre."] },
      fields: data,
    };
  }

  try {
    const wood = await createWood(validatedFields.data);
    
    // Save images if present
    const imagesRaw = formData.getAll("wood_images");
    if (imagesRaw.length > 0) {
      const images = imagesRaw.map(img => JSON.parse(img as string));
      await saveWoodImages(wood.id, images);
    }
    
    revalidatePath("/admin/maderas");
    revalidatePath("/maderas");
    revalidatePath("/");

    // Redirect to the inventory with the new ID for highlighting
    redirect(`/admin/maderas?newId=${wood.id}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("CREATE WOOD ERROR:", error);
    return {
      success: false,
      message: "Error al crear la madera en la base de datos.",
    };
  }
}

export async function updateWoodAction(id: number, prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) {
    return { success: false, message: "No autorizado." };
  }

  const rawData = Object.fromEntries(formData.entries());
  
  const data = {
    ...rawData,
    is_active: rawData.is_active === "on" || rawData.is_active === "true",
    is_featured: rawData.is_featured === "on" || rawData.is_featured === "true",
  };

  const validatedFields = woodSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Revisa los datos de la madera.",
      errors: validatedFields.error.flatten().fieldErrors,
      fields: data,
    };
  }

  // Check for duplicate name (excluding self)
  const existing = await getWoodByName(validatedFields.data.name);
  if (existing && existing.id !== id) {
    return {
      success: false,
      message: "Este nombre ya está en uso por otra madera.",
      errors: { name: ["Ese nombre ya pertenece a otra madera."] },
      fields: data,
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
  const session = await auth();
  if (!session) return { success: false, message: "No autorizado." };

  try {
    const { updateWoodStatus } = await import("@/lib/seymu-data");
    await updateWoodStatus(id, isActive);
    revalidatePath("/admin/maderas");
    revalidatePath("/maderas");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, message: "No se pudo cambiar el estado." };
  }
}

export async function toggleWoodFeaturedAction(id: number, isFeatured: boolean) {
  const session = await auth();
  if (!session) return { success: false, message: "No autorizado." };

  try {
    const { updateWoodFeaturedStatus } = await import("@/lib/seymu-data");
    await updateWoodFeaturedStatus(id, isFeatured);
    revalidatePath("/admin/maderas");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, message: "No se pudo cambiar el estado de destacado." };
  }
}

export async function deleteWoodAction(id: number) {
  const session = await auth();
  if (!session) return { success: false, message: "No autorizado." };

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
