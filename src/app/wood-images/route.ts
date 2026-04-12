import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const woodId = Number(body.woodId);
    const publicId = body.publicId as string | null;
    const secureUrl = body.secureUrl as string;
    const altText = (body.altText as string | null) ?? null;

    if (!woodId || !secureUrl) {
      return NextResponse.json(
        { success: false, message: "woodId y secureUrl son obligatorios." },
        { status: 400 }
      );
    }

    const currentRows = (await sql`
      SELECT COALESCE(MAX(sort_order), 0) AS max_sort
      FROM wood_images
      WHERE wood_id = ${woodId}
    `) as Array<{ max_sort: number | string | null }>;

    const nextSortOrder = Number(currentRows[0]?.max_sort ?? 0) + 1;

    const insertedRows = (await sql`
      INSERT INTO wood_images (
        wood_id,
        public_id,
        secure_url,
        alt_text,
        sort_order
      )
      VALUES (
        ${woodId},
        ${publicId},
        ${secureUrl},
        ${altText},
        ${nextSortOrder}
      )
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
      image: insertedRows[0],
    });
  } catch (error) {
    console.error("Error saving wood image:", error);

    return NextResponse.json(
      { success: false, message: "No se pudo guardar la imagen." },
      { status: 500 }
    );
  }
}