"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname(); const admin = path === "/admin" || path.startsWith("/admin/");
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a>{!admin&&<Header/>}<main id="contenido" tabIndex={-1}>{children}</main>{!admin&&<><Footer/><WhatsAppButton/></>}</>;
}
