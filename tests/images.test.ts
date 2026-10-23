import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import sharp from "sharp";
import { optimizeImage } from "../lib/admin/images";
test("optimiza imágenes reales y rechaza SVG disfrazado o archivos inválidos",async()=>{
  const output=await optimizeImage(readFileSync("public/media/demo/socias/foto-demo-01.webp"));
  const metadata=await sharp(output).metadata();
  assert.equal(metadata.format,"webp");assert.ok(metadata.width!<=1600&&metadata.height!<=1600);assert.equal(metadata.exif,undefined);
  await assert.rejects(optimizeImage(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100"/></svg>')),/no permitido/);
  await assert.rejects(optimizeImage(Buffer.from("no es una imagen")));
});
