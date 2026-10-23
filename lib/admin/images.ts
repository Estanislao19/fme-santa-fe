import sharp from "sharp";
export async function optimizeImage(original: Buffer) {
  const decoder = sharp(original, { limitInputPixels: 40_000_000, animated: false });
  const metadata = await decoder.metadata();
  if (!["jpeg","png","webp","avif","heif"].includes(metadata.format || "")) throw new Error("Formato de imagen no permitido.");
  return decoder.rotate().resize({width:1600,height:1600,fit:"inside",withoutEnlargement:true}).webp({quality:82}).toBuffer();
}
