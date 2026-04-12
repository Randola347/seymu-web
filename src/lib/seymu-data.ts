import { sql } from "./db";

export type CompanySettings = {
  id: number;
  company_name: string;
  slogan: string | null;
  about_text: string | null;
  whatsapp_number: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  schedule: string | null;
  logo_url: string | null;
  banner_url: string | null;
};

export type Wood = {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price: string;
  availability: string | null;
  category: string | null;
  is_active: boolean;
};

export type WoodImage = {
  id: number;
  wood_id: number;
  public_id: string | null;
  secure_url: string;
  alt_text: string | null;
  sort_order: number;
};

export async function getCompanySettings(): Promise<CompanySettings | null> {
  const rows = (await sql`
    SELECT *
    FROM company_settings
    ORDER BY id ASC
    LIMIT 1
  `) as CompanySettings[];

  return rows[0] ?? null;
}

export async function getActiveWoods(): Promise<Wood[]> {
  const rows = (await sql`
    SELECT *
    FROM woods
    WHERE is_active = true
    ORDER BY id ASC
  `) as Wood[];

  return rows;
}

export async function getWoodBySlug(slug: string): Promise<Wood | null> {
  const rows = (await sql`
    SELECT *
    FROM woods
    WHERE slug = ${slug}
      AND is_active = true
    LIMIT 1
  `) as Wood[];

  return rows[0] ?? null;
}

export async function getWoodImages(woodId: number): Promise<WoodImage[]> {
  const rows = (await sql`
    SELECT *
    FROM wood_images
    WHERE wood_id = ${woodId}
    ORDER BY sort_order ASC, id ASC
  `) as WoodImage[];

  return rows;
}