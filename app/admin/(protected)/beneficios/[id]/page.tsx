import {notFound} from "next/navigation";
import {getAdminBenefits} from "@/lib/benefits";
import BenefitEditor from "@/components/admin/BenefitEditor";
import BenefitsMigrationNotice from "@/components/admin/BenefitsMigrationNotice";
export default async function Page({params}:{params:Promise<{id:string}>}){
  const data=await getAdminBenefits();
  if(!data.ready)return <BenefitsMigrationNotice/>;
  const {id}=await params;
  const record=id==="nuevo"?undefined:data.benefits.find(b=>b.id===id);
  if(id!=="nuevo"&&!record)notFound();
  return <BenefitEditor initial={record} categories={data.categories}/>;
}
