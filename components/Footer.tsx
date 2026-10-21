import Image from "next/image";
import Link from "next/link";
import { navigation, site, UNKNOWN } from "@/data/site";
import { whatsappLink } from "@/utils/links";
export default function Footer() {
  const whatsapp = whatsappLink();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="footer-brand" href="/">
              <Image
                src="/images/logo-fme.png"
                width={112}
                height={112}
                alt="FME"
              />
              <span>
                Fundación Mujeres
                <br />
                Emprendedoras
              </span>
            </Link>
            <p>
              Una comunidad para acompañar,
              <br />
              conectar y hacer visible lo que hacemos.
            </p>
            <Link className="text-link light" href="/comunidad">
              Sumate a la comunidad
            </Link>
          </div>
          <div>
            <h3>Explorá FME</h3>
            <nav aria-label="Navegación del pie">
              {navigation
                .filter(([, href]) => href !== "/")
                .map(([label, href]) => (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ))}
              <Link href="/voluntariado">Voluntariado</Link>
            </nav>
          </div>
          <div className="footer-contact">
            <h3>Estamos en contacto</h3>
            <p>Santa Fe, Argentina</p>
            <p>Dirección: {site.address}</p>
            <p>Horario: {site.hours}</p>
            <p>Email: {site.email || UNKNOWN}</p>
            {whatsapp ? (
              <a href={whatsapp}>WhatsApp ↗</a>
            ) : (
              <p>WhatsApp: {UNKNOWN}</p>
            )}
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              {site.instagramHandle} ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FME · Santa Fe</span>
          <div>
            <Link href="/politica-de-privacidad">Política de privacidad</Link>
            <Link href="/terminos-y-condiciones">Términos y condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
