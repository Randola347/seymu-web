import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.maderasfinasseymu.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/seymu-gestion", // Ocultamos el panel administrativo de los buscadores
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
