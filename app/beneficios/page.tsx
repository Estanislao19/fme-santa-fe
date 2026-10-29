import Link from "next/link";
import {PageHero} from "@/components/ui";
import BenefitsDirectory from "@/components/BenefitsDirectory";
import {getBenefits} from "@/lib/benefits";
import {pageMetadata} from "@/utils/metadata";
export const dynamic="force-dynamic";
export const metadata=pageMetadata("Beneficios y descuentos exclusivos","Convenios con comercios, servicios, profesionales y emprendimientos de Santa Fe para las socias de FME.","/beneficios");
export default async function Page(){
  const {ready,benefits,categories}=await getBenefits();
  return <><PageHero title="Beneficios y descuentos exclusivos" description="Una red de convenios con comercios, servicios, profesionales y emprendimientos de Santa Fe para acompañar la economía de nuestras socias y potenciar el consumo local."/>
    <section className="section container">{ready?<BenefitsDirectory benefits={benefits} categories={categories}/>:<p role="status">Los convenios estarán disponibles próximamente.</p>}
      <div className="section-end"><Link className="text-link" href="/socias#beneficios">Conocé los beneficios de ser socia</Link><Link className="text-link" href="/comunidad">Quiero ser parte</Link></div>
    </section></>;
}
