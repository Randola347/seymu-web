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

type SaveWoodInput = {
  name: string;
  slug?: string | null;
  short_description?: string | null;
  description?: string | null;
  price: number;
  availability?: string | null;
  category?: string | null;
  is_active?: boolean;
};

type SaveCompanyInput = {
  company_name: string;
  slogan?: string | null;
  about_text?: string | null;
  whatsapp_number: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  schedule?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
};

function emptyToNull(value?: string | null) {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function getCompanySettings(): Promise<CompanySettings | null> {
  const rows = (await sql`
    SELECT *
    FROM company_settings
    ORDER BY id ASC
    LIMIT 1
  `) as CompanySettings[];

  return rows[0] ?? null;
}

export async function saveCompanySettings(
  input: SaveCompanyInput
): Promise<CompanySettings> {
  const existing = await getCompanySettings();

  if (existing) {
    const rows = (await sql`
      UPDATE company_settings
      SET
        company_name = ${input.company_name},
        slogan = ${emptyToNull(input.slogan)},
        about_text = ${emptyToNull(input.about_text)},
        whatsapp_number = ${input.whatsapp_number},
        phone = ${emptyToNull(input.phone)},
        email = ${emptyToNull(input.email)},
        address = ${emptyToNull(input.address)},
        schedule = ${emptyToNull(input.schedule)},
        logo_url = ${emptyToNull(input.logo_url)},
        banner_url = ${emptyToNull(input.banner_url)},
        updated_at = NOW()
      WHERE id = ${existing.id}
      RETURNING *
    `) as CompanySettings[];

    return rows[0];
  }

  const rows = (await sql`
    INSERT INTO company_settings (
      company_name,
      slogan,
      about_text,
      whatsapp_number,
      phone,
      email,
      address,
      schedule,
      logo_url,
      banner_url
    )
    VALUES (
      ${input.company_name},
      ${emptyToNull(input.slogan)},
      ${emptyToNull(input.about_text)},
      ${input.whatsapp_number},
      ${emptyToNull(input.phone)},
      ${emptyToNull(input.email)},
      ${emptyToNull(input.address)},
      ${emptyToNull(input.schedule)},
      ${emptyToNull(input.logo_url)},
      ${emptyToNull(input.banner_url)}
    )
    RETURNING *
  `) as CompanySettings[];

  return rows[0];
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

export async function getAllWoods(): Promise<Wood[]> {
  const rows = (await sql`
    SELECT *
    FROM woods
    ORDER BY id DESC
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

export async function getWoodById(id: number): Promise<Wood | null> {
  const rows = (await sql`
    SELECT *
    FROM woods
    WHERE id = ${id}
    LIMIT 1
  `) as Wood[];

  return rows[0] ?? null;
}

export async function createWood(input: SaveWoodInput): Promise<Wood> {
  const finalSlug = slugify(input.slug?.trim() || input.name);

  const rows = (await sql`
    INSERT INTO woods (
      name,
      slug,
      short_description,
      description,
      price,
      availability,
      category,
      is_active,
      created_at,
      updated_at
    )
    VALUES (
      ${input.name},
      ${finalSlug},
      ${emptyToNull(input.short_description)},
      ${emptyToNull(input.description)},
      ${input.price},
      ${emptyToNull(input.availability) ?? "Disponible"},
      ${emptyToNull(input.category)},
      ${input.is_active ?? true},
      NOW(),
      NOW()
    )
    RETURNING *
  `) as Wood[];

  return rows[0];
}

export async function updateWood(
  id: number,
  input: SaveWoodInput
): Promise<Wood> {
  const finalSlug = slugify(input.slug?.trim() || input.name);

  const rows = (await sql`
    UPDATE woods
    SET
      name = ${input.name},
      slug = ${finalSlug},
      short_description = ${emptyToNull(input.short_description)},
      description = ${emptyToNull(input.description)},
      price = ${input.price},
      availability = ${emptyToNull(input.availability) ?? "Disponible"},
      category = ${emptyToNull(input.category)},
      is_active = ${input.is_active ?? true},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `) as Wood[];

  return rows[0];
}

export async function updateWoodStatus(
  id: number,
  isActive: boolean
): Promise<void> {
  await sql`
    UPDATE woods
    SET
      is_active = ${isActive},
      updated_at = NOW()
    WHERE id = ${id}
  `;
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