import { z } from "zod";

export const companySchema = z.object({
  company_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  slogan: z.string().optional().nullable(),
  about_text: z.string().optional().nullable(),
  whatsapp_number: z.string().min(8, "El número de WhatsApp no es válido"),
  phone: z.string().optional().nullable(),
  email: z.string().email("Email inválido").or(z.literal("")).optional().nullable(),
  address: z.string().optional().nullable(),
  schedule: z.string().optional().nullable(),
  logo_url: z.string().optional().nullable(),
  banner_url: z.string().optional().nullable(),
});

export const woodSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  slug: z.string().optional().nullable(),
  short_description: z.string().max(200, "La descripción corta es muy larga").optional().nullable(),
  description: z.string().optional().nullable(),
  price: z.coerce.number().positive("El precio debe ser un número positivo"),
  availability: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  measurements: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
});

export type CompanyInput = z.infer<typeof companySchema>;
export type WoodInput = z.infer<typeof woodSchema>;
