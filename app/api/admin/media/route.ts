import { NextResponse, type NextRequest } from "next/server";
import { optimizeImage } from "@/lib/admin/images";
import { adminAccess } from "@/lib/admin/auth";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const session = await adminAccess({ writable: true });
  if (session.status !== "authorized") return NextResponse.json({ error: "Necesitás iniciar sesión con una cuenta administradora." }, { status: session.status === "forbidden" ? 403 : 401 });
  // Defensa CSRF adicional a la cookie SameSite: las cargas solo provienen de este origen.
  if (request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 4*1024*1024) return NextResponse.json({ error: "La imagen supera el tamaño permitido." }, { status: 413 });
  try {
    const data = await request.formData(); const file = data.get("file");
    if (!(file instanceof File) || file.size > 3*1024*1024 || !["image/jpeg","image/png","image/webp","image/avif"].includes(file.type)) return NextResponse.json({ error: "Elegí una imagen JPG, PNG, WebP o AVIF de hasta 3 MB." }, { status: 400 });
    const original = Buffer.from(await file.arrayBuffer());
    const optimized = await optimizeImage(original);
    const path = `${session.user.id}/${crypto.randomUUID()}.webp`;
    const { error } = await session.client.storage.from("fme-media").upload(path, optimized, { contentType: "image/webp", upsert: false, cacheControl: "31536000" });
    if (error) return NextResponse.json({ error: "No se pudo guardar la imagen. Revisá la configuración y los permisos de Storage." }, { status: 502 });
    const { data: publicData } = session.client.storage.from("fme-media").getPublicUrl(path);
    return NextResponse.json({ url: publicData.publicUrl }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "No pudimos procesar la imagen. Probá otro archivo." }, { status: 400 }); }
}
