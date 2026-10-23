import { notFound } from "next/navigation";
import { collections, type ContentRecord } from "@/lib/admin/collections";
import { requireAdmin } from "@/lib/admin/auth";
import { getCategories } from "@/lib/content";
import RecordEditor from "@/components/admin/RecordEditor";
export default async function Page({ params }: { params: Promise<{collection:string;id:string}> }) {
  const { collection,id }=await params;
  if(!Object.hasOwn(collections,collection))notFound();
  const { client }=await requireAdmin();let record:ContentRecord|null=null;
  if(id!=="nuevo") {
    if(!/^[0-9a-f-]{36}$/.test(id))notFound();
    const {data,error}=await client.from("fme_content").select("*").eq("kind",collections[collection].kind).eq("id",id).maybeSingle();
    if(error)throw new Error("No se pudo abrir el contenido.");if(!data)notFound();record=data as ContentRecord;
  }
  return <RecordEditor collection={collection} initial={record} categories={await getCategories()}/>;
}
