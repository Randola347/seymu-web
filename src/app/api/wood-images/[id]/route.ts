import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const imageId = Number(id);

    if (!imageId) {
      return NextResponse.json(
        { success: false, message: "ID de imagen inválido." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const publicId = (body.publicId as string | null) ?? null;
    const secureUrl = body.secureUrl as string;
    const altText = (body.altText as string | null) ?? null;

    if (!secureUrl) {
      return NextResponse.json(
        { success: false, message: "secureUrl es obligatorio." },
        { status: 400 }
      );
    }

    // Get old public_id to delete from Cloudinary if changed
    const oldRow = (await sql`
      SELECT public_id FROM wood_images WHERE id = ${imageId}
    `) as { public_id: string | null }[];

    if (oldRow[0]?.public_id && oldRow[0].public_id !== publicId) {
      await deleteFromCloudinary(oldRow[0].public_id);
    }

    const updatedRows = (await sql`
      UPDATE wood_images
      SET
        public_id = ${publicId},
        secure_url = ${secureUrl},
        alt_text = ${altText}
      WHERE id = ${imageId}
      RETURNING *
    `) as Array<{
      id: number;
      wood_id: number;
      public_id: string | null;
      secure_url: string;
      alt_text: string | null;
      sort_order: number;
    }>;

    return NextResponse.json({
      success: true,
      image: updatedRows[0],
    });
  } catch (error) {
    console.error("Error updating wood image:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "No se pudo actualizar la imagen.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const imageId = Number(id);

    if (!imageId) {
      return NextResponse.json(
        { success: false, message: "ID de imagen inválido." },
        { status: 400 }
      );
    }

    const row = (await sql`
      SELECT public_id FROM wood_images WHERE id = ${imageId}
    `) as { public_id: string | null }[];

    if (row[0]?.public_id) {
      await deleteFromCloudinary(row[0].public_id);
    }

    await sql`
      DELETE FROM wood_images
      WHERE id = ${imageId}
    `;

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting wood image:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "No se pudo eliminar la imagen.",
      },
      { status: 500 }
    );
  }
}