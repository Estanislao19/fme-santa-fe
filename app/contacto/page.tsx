import Form from "@/components/Forms";
import { PageHero } from "@/components/ui";
import { site, UNKNOWN } from "@/data/site";
import { whatsappLink } from "@/utils/links";
import { pageMetadata } from "@/utils/metadata";
export const metadata = pageMetadata(
  "Contacto",
  "Contactate con Fundación Mujeres Emprendedoras de Santa Fe.",
  "/contacto",
);
export default function Page() {
  const whatsapp = whatsappLink();
  return (
    <>
      <PageHero
        title="Una conversación puede ser el primer paso."
        description="Para acercar una consulta, conocer la Fundación o compartir una propuesta, encontrá acá nuestros canales de contacto."
      />
      <div className="container">
        <section className="section form-section" id="canales">
          <div>
            <h2>Estamos en Santa Fe.</h2>
            <dl className="detail-list">
              {[
                ["Dirección", site.address],
                ["Horario", site.hours],
                ["WhatsApp", site.phone || UNKNOWN],
                ["Email", site.email || UNKNOWN],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="contact-channels">
              <a
                className="text-link"
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.instagramHandle} ↗
              </a>
              {whatsapp ? (
                <a className="button" href={whatsapp}>
                  Escribinos por WhatsApp ↗
                </a>
              ) : (
                <p className="editorial-note">
                  El acceso a WhatsApp se habilitará cuando FME confirme su
                  número.
                </p>
              )}
              {site.email && (
                <a className="text-link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              )}
            </div>
          </div>
          <Form kind="contact" />
        </section>
        <section className="section">
          <div className="map-placeholder">
            <h2>Nos encontramos en Santa Fe</h2>
            <p>
              Mapa preparado para integrar cuando esté confirmada la dirección
              de la sede.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
