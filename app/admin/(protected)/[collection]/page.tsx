import { notFound } from "next/navigation";
import { collections } from "@/lib/admin/collections";
import { adminRecords } from "@/lib/admin/data";
import RecordList from "@/components/admin/RecordList";
export default async function Page({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!Object.hasOwn(collections, collection)) notFound();
  const c = collections[collection]; const records = await adminRecords(c.kind);
  return <RecordList initial={records} collection={collection} title={c.title} />;
}
