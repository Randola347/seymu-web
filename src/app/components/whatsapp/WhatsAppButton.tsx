'use client';

import { usePathname } from 'next/navigation';

interface WhatsAppButtonProps {
  whatsappNumber: string;
  companyName: string;
}

export default function WhatsAppButton({ whatsappNumber, companyName }: WhatsAppButtonProps) {
  const pathname = usePathname();

  // Ocultar en páginas de detalle de madera (ej: /maderas/cedro) 
  // o si estamos en el panel administrativo
  const isWoodDetail = pathname.startsWith('/maderas/') && pathname !== '/maderas';
  const isAdmin = pathname.startsWith('/admin');
  
  if (isWoodDetail || isAdmin || !whatsappNumber) return null;

  const message = encodeURIComponent(
    `Hola, me gustaría recibir más información sobre ${companyName}.`
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      aria-label="Contactar por WhatsApp"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-2.32 0-4.208 1.887-4.208 4.208 0 .822.213 1.597.592 2.229l-.615 2.247 2.296-.602a4.17 4.17 0 0 0 1.935.474c2.321 0 4.209-1.887 4.209-4.208A4.214 4.214 0 0 0 12.031 6.172zm2.463 6.007c-.1.282-.577.534-.844.577-.23.037-.506.059-1.294-.251-1.01-.397-1.66-1.424-1.71-1.492-.051-.068-.415-.552-.415-1.056 0-.503.263-.75.358-.853.094-.103.204-.129.27-.129.068 0 .136 0 .195.006.064.004.149-.025.234.181.1.243.341.83.371.892.03.061.05.132.01.21-.039.08-.059.13-.117.2-.058.071-.124.158-.176.213-.058.061-.119.128-.051.246.068.118.303.501.65.811.446.398.823.522.938.583.116.061.183.051.252-.027.068-.078.293-.342.37-.46.078-.118.156-.098.263-.058.107.039.68.321.797.379.117.058.195.087.224.136.029.051.029.293-.071.575zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.662 1.443 5.176L2 22l4.908-1.288C8.358 21.583 10.115 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.634 0-3.15-.429-4.457-1.182l-.32-.184-2.915.765.779-2.846-.201-.32A7.953 7.953 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
      </svg>
      WhatsApp
    </a>
  );
}