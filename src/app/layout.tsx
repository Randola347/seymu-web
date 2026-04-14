import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Maderas Finas Seymu",
  description: "Catálogo informativo de maderas finas y contacto directo por WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}