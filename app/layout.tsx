import type { Metadata } from "next";
import { Manrope, Source_Sans_3 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/data/site";
import "./globals.css";
const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    site.url || "https://fme-santa-fe-comunidad.blondgrove3.chatgpt.site",
  ),
  title: {
    default: "FME · Fundación Mujeres Emprendedoras Santa Fe",
    template: "%s | FME · Santa Fe",
  },
  description: site.description,
  keywords: [
    "Fundación Mujeres Emprendedoras Santa Fe",
    "mujeres emprendedoras Santa Fe",
    "emprendimientos Santa Fe",
    "capacitaciones para emprendedoras",
    "comunidad de emprendedoras",
  ],
  openGraph: {
    title: "FME · Fundación Mujeres Emprendedoras",
    description: site.description,
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/logo-fme.png",
        width: 500,
        height: 500,
        alt: "Fundación Mujeres Emprendedoras",
      },
    ],
  },
  robots: { index: !!site.url, follow: !!site.url },
  icons: { icon: "/images/logo-fme.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable}`}>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
