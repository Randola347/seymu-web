export function formatWhatsApp(phone: string | null): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  // Simple check for CR format (8 digits) -> +506 XXXX XXXX
  if (cleaned.length === 8) {
    return `+506 ${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  }
  // If already has 506
  if (cleaned.startsWith("506") && cleaned.length === 11) {
    return `+506 ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}
