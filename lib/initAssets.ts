import fs from "fs";
import path from "path";
import sharp from "sharp";

let initialized = false;

/**
 * Ensures:
 * 1. public/gambhir.pdf is moved to public/files/gambhir.pdf so that
 *    Next.js can route /gambhir.pdf to an HTML wrapper page with full favicon
 *    and title support.
 * 2. A true multi-resolution binary ICO file (16x16, 32x32, 48x48) is created
 *    from greenLogo.png and placed at public/favicon.ico and app/favicon.ico
 *    for maximum browser and PDF viewer compatibility.
 */
export async function ensureAssets() {
  if (initialized) return;
  initialized = true;

  try {
    const cwd = process.cwd();
    const publicDir = path.join(cwd, "public");
    const filesDir = path.join(publicDir, "files");
    const sourcePdf = path.join(publicDir, "gambhir.pdf");
    const targetPdf = path.join(filesDir, "gambhir.pdf");

    // 1. Move/copy gambhir.pdf to public/files/gambhir.pdf
    if (fs.existsSync(sourcePdf)) {
      if (!fs.existsSync(filesDir)) {
        fs.mkdirSync(filesDir, { recursive: true });
      }
      fs.copyFileSync(sourcePdf, targetPdf);
      fs.unlinkSync(sourcePdf);
    }

    // 2. Generate true binary ICO file from greenLogo.png
    const logoPath = path.join(publicDir, "greenLogo.png");
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      const b16 = await sharp(logoBuffer).resize(16, 16).png().toBuffer();
      const b32 = await sharp(logoBuffer).resize(32, 32).png().toBuffer();
      const b48 = await sharp(logoBuffer).resize(48, 48).png().toBuffer();

      const images = [
        { width: 16, height: 16, data: b16 },
        { width: 32, height: 32, data: b32 },
        { width: 48, height: 48, data: b48 },
      ];

      // 6-byte ICO header
      const header = Buffer.alloc(6);
      header.writeUInt16LE(0, 0); // reserved
      header.writeUInt16LE(1, 2); // 1 = ICO
      header.writeUInt16LE(images.length, 4); // number of icons

      let currentOffset = 6 + images.length * 16;
      const entries: Buffer[] = [];
      for (const img of images) {
        const entry = Buffer.alloc(16);
        entry.writeUInt8(img.width, 0);
        entry.writeUInt8(img.height, 1);
        entry.writeUInt8(0, 2); // color count
        entry.writeUInt8(0, 3); // reserved
        entry.writeUInt16LE(1, 4); // color planes
        entry.writeUInt16LE(32, 6); // bpp
        entry.writeUInt32LE(img.data.length, 8); // size of image data
        entry.writeUInt32LE(currentOffset, 12); // offset of image data
        entries.push(entry);
        currentOffset += img.data.length;
      }

      const icoBuffer = Buffer.concat([
        header,
        ...entries,
        ...images.map((i) => i.data),
      ]);

      fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
      fs.writeFileSync(path.join(cwd, "app", "favicon.ico"), icoBuffer);
    }
  } catch (err) {
    console.error("ensureAssets execution error:", err);
  }
}
