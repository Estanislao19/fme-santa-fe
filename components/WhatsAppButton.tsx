import Link from "next/link";
import { whatsappLink } from "@/utils/links";
export default function WhatsAppButton() {
  const href = whatsappLink();
  return href ? (
    <a
      className="whatsapp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a FME por WhatsApp"
    >
      <span aria-hidden="true">◉</span> WhatsApp ↗
    </a>
  ) : (
    <Link
      className="whatsapp"
      href="/contacto#canales"
      aria-label="Consultar canales de contacto; WhatsApp pendiente de confirmación"
    >
      <span aria-hidden="true">◉</span> Contactanos ↗
    </Link>
  );
}
