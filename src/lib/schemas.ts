import { z } from "zod";

export const companySchema = z.object({
  company_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  slogan: z.string().min(5, "El slogan es obligatorio"),
  about_text: z.string().optional().nullable(),
  whatsapp_number: z.string().min(8, "El número de WhatsApp es obligatorio"),
  phone: z.string().optional().nullable(),
  email: z.string().email("Email inválido"),
  address: z.string().min(10, "La dirección es obligatoria"),
  schedule: z.string().min(5, "El horario es obligatorio"),
  logo_url: z.string().optional().nullable(),
  banner_url: z.string().optional().nullable(),
});

export const woodSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  slug: z.string().optional().nullable(),
  description: z.string().min(10, "La descripción es obligatoria"),
  price: z.coerce.number().positive("El precio debe ser un número positivo"),
  category: z.string().min(2, "La categoría es obligatoria"),
  measurements: z.string().min(2, "Las medidas son obligatorias"),
  is_active: z.coerce.boolean().default(true),
  is_featured: z.coerce.boolean().default(false),
});

export type CompanyInput = z.infer<typeof companySchema>;
export type WoodInput = z.infer<typeof woodSchema>;
