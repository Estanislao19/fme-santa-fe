import { site } from "@/data/site";
export function whatsappLink(phone = site.phone) {
  const number = phone.replace(/\D/g, "");
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(site.whatsappMessage)}`
    : null;
}
