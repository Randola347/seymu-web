import { MetadataRoute } from "next";
import { getActiveWoods } from "@/lib/seymu-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.maderasfinasseymu.com";

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/maderas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    // Generar dinámicamente las rutas para cada madera
    const woods = await getActiveWoods();
    const woodPages: MetadataRoute.Sitemap = woods.map((wood) => ({
      url: `${baseUrl}/maderas/${wood.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticPages, ...woodPages];
  } catch (error) {
    console.error("Sitemap error:", error);
    return staticPages;
  }
}
