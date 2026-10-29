import Link from "next/link";
import {membershipBenefits} from "@/data/benefits";
export default function MembershipBenefits(){return <section className="section container membership-benefits" id="beneficios" aria-labelledby="membership-benefits-title">
  <div className="section-heading"><div><h2 id="membership-benefits-title">Beneficios de ser socia</h2><p className="lede">La Fundación brinda herramientas concretas para acompañar el desarrollo personal y profesional de cada emprendedora.</p></div></div>
  <div className="membership-benefit-areas">{membershipBenefits.map(area=><div key={area.title}><h3>{area.title}</h3><ul>{area.items.map(item=><li key={item}>{item}</li>)}</ul></div>)}</div>
  <Link className="text-link" href="/beneficios">Conocé todos los beneficios</Link>
</section>;}
