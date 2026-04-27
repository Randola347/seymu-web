import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Maderas Finas Seymu | Venta de Maderas en Costa Rica",
    template: "%s | Maderas Finas Seymu"
  },
  description: "Maderas Finas Seymu en Alajuela, Costa Rica. Catálogo de maderas finas y decorativas. Calidad y elegancia en cada pieza de madera.",
  keywords: ["Maderas Finas Seymu", "Maderas en Costa Rica", "Maderas en Alajuela", "Catálogo de maderas", "Venta de maderas finas", "Especies finas"],
  authors: [{ name: "Seymu" }],
  openGraph: {
    title: "Maderas Finas Seymu",
    description: "Venta de maderas finas y decorativas en Costa Rica. Calidad garantizada.",
    url: "https://www.maderasfinasseymu.com",
    siteName: "Maderas Finas Seymu",
    locale: "es_CR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <Toaster position="bottom-right" richColors />
        {children}
      </body>
    </html>
  );
}