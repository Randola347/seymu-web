import { sql } from "./db";

export type CompanySettings = {
  id: number;
  company_name: string;
  slogan: string | null;
  about_text: string | null;
  history_text: string | null;
  mission_text: string | null;
  vision_text: string | null;
  whatsapp_number: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  schedule: string | null;
  logo_url: string | null;
  banner_url: string | null;
};

export type AboutUs = {
  id: number;
  history_title: string;
  history_content: string | null;
  mission_title: string;
  mission_content: string | null;
  vision_title: string;
  vision_content: string | null;
  updated_at: string;
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
  measurements: string | null;
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
  measurements?: string | null;
  is_active?: boolean;
};

type SaveCompanyInput = {
  company_name: string;
  slogan?: string | null;
  about_text?: string | null;
  history_text?: string | null;
  mission_text?: string | null;
  vision_text?: string | null;
  whatsapp_number: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  schedule?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
};

type SaveAboutUsInput = {
  history_title?: string;
  history_content?: string | null;
  mission_title?: string;
  mission_content?: string | null;
  vision_title?: string;
  vision_content?: string | null;
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
        company_name = ${input.company_name ?? existing.company_name},
        slogan = ${input.slogan !== undefined ? emptyToNull(input.slogan) : existing.slogan},
        about_text = ${input.about_text !== undefined ? emptyToNull(input.about_text) : existing.about_text},
        history_text = ${input.history_text !== undefined ? emptyToNull(input.history_text) : existing.history_text},
        mission_text = ${input.mission_text !== undefined ? emptyToNull(input.mission_text) : existing.mission_text},
        vision_text = ${input.vision_text !== undefined ? emptyToNull(input.vision_text) : existing.vision_text},
        whatsapp_number = ${input.whatsapp_number ?? existing.whatsapp_number},
        phone = ${input.phone !== undefined ? emptyToNull(input.phone) : existing.phone},
        email = ${input.email !== undefined ? emptyToNull(input.email) : existing.email},
        address = ${input.address !== undefined ? emptyToNull(input.address) : existing.address},
        schedule = ${input.schedule !== undefined ? emptyToNull(input.schedule) : existing.schedule},
        logo_url = ${emptyToNull(input.logo_url) ?? existing.logo_url},
        banner_url = ${emptyToNull(input.banner_url) ?? existing.banner_url},
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
      history_text,
      mission_text,
      vision_text,
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
      ${emptyToNull(input.history_text)},
      ${emptyToNull(input.mission_text)},
      ${emptyToNull(input.vision_text)},
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

export interface SiteIdentity {
  id: number;
  logo_url: string | null;
  banner_url: string | null;
  updated_at: Date;
}

export async function getAboutUs(): Promise<AboutUs | null> {
  // Auto-migration check
  await sql`
    CREATE TABLE IF NOT EXISTS about_us (
      id SERIAL PRIMARY KEY,
      history_title TEXT DEFAULT 'Historia',
      history_content TEXT,
      mission_title TEXT DEFAULT 'Misión',
      mission_content TEXT,
      vision_title TEXT DEFAULT 'Visión',
      vision_content TEXT,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
  
  const rows = (await sql`
    SELECT * FROM about_us LIMIT 1
  `) as AboutUs[];
  return rows[0] ?? null;
}

export async function getSiteIdentity(): Promise<SiteIdentity | null> {
  const rows = (await sql`
    SELECT * FROM site_identity LIMIT 1
  `) as SiteIdentity[];
  return rows[0] ?? null;
}

export async function saveSiteIdentity(input: {
  logo_url?: string | null;
  banner_url?: string | null;
}) {
  const existing = await getSiteIdentity();
  
  const emptyToNull = (val: string | null | undefined) => 
    (val === "null" || val === "" || val === undefined) ? null : val;

  if (!existing) {
    return await sql`
      INSERT INTO site_identity (logo_url, banner_url)
      VALUES (
        ${emptyToNull(input.logo_url)}, 
        ${emptyToNull(input.banner_url)}
      )
      RETURNING *
    `;
  }

  return await sql`
    UPDATE site_identity
    SET 
      logo_url = ${emptyToNull(input.logo_url) ?? existing.logo_url},
      banner_url = ${emptyToNull(input.banner_url) ?? existing.banner_url},
      updated_at = NOW()
    WHERE id = ${existing.id}
    RETURNING *
  `;
}

export async function saveAboutUs(input: SaveAboutUsInput): Promise<AboutUs> {
  const existing = await getAboutUs();

  if (existing) {
    const rows = (await sql`
      UPDATE about_us
      SET
        history_title = ${input.history_title ?? existing.history_title},
        history_content = ${input.history_content !== undefined ? emptyToNull(input.history_content) : existing.history_content},
        mission_title = ${input.mission_title ?? existing.mission_title},
        mission_content = ${input.mission_content !== undefined ? emptyToNull(input.mission_content) : existing.mission_content},
        vision_title = ${input.vision_title ?? existing.vision_title},
        vision_content = ${input.vision_content !== undefined ? emptyToNull(input.vision_content) : existing.vision_content},
        updated_at = NOW()
      WHERE id = ${existing.id}
      RETURNING *
    `) as AboutUs[];
    return rows[0];
  }

  const rows = (await sql`
    INSERT INTO about_us (
      history_title, history_content, 
      mission_title, mission_content, 
      vision_title, vision_content
    )
    VALUES (
      ${input.history_title ?? "Historia"},
      ${emptyToNull(input.history_content)},
      ${input.mission_title ?? "Misión"},
      ${emptyToNull(input.mission_content)},
      ${input.vision_title ?? "Visión"},
      ${emptyToNull(input.vision_content)}
    )
    RETURNING *
  `) as AboutUs[];
  return rows[0];
}

export async function getActiveWoods(): Promise<(Wood & { main_image_url: string | null })[]> {
  const rows = (await sql`
    SELECT w.*, 
           (SELECT secure_url FROM wood_images WHERE wood_id = w.id ORDER BY sort_order ASC, id ASC LIMIT 1) as main_image_url
    FROM woods w
    WHERE w.is_active = true
    ORDER BY w.id ASC
  `) as (Wood & { main_image_url: string | null })[];

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
      measurements,
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
      ${emptyToNull(input.measurements)},
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
      measurements = ${emptyToNull(input.measurements)},
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
  const response = await sql`
    UPDATE woods
    SET
      is_active = ${isActive},
      updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function deleteWood(id: number): Promise<void> {
  await sql`
    DELETE FROM woods
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