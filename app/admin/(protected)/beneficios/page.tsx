import {getAdminBenefits} from "@/lib/benefits";
import BenefitsAdmin from "@/components/admin/BenefitsAdmin";
import BenefitsMigrationNotice from "@/components/admin/BenefitsMigrationNotice";
export default async function Page(){const data=await getAdminBenefits();return data.ready?<BenefitsAdmin initial={data.benefits} categories={data.categories}/>:<BenefitsMigrationNotice/>;}
