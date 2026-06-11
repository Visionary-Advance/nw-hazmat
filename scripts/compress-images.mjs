import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const IMG_DIR = path.join(process.cwd(), 'public', 'img');
// Keep backups OUT of /public so originals are never served or deployed.
const BACKUP_DIR = path.join(process.cwd(), '.image-originals');
const MAX_EDGE = 2400;

const targets = [
  'Soil_Analysis.jpg',
  'Confined_Space.jpg',
  'Orso_Img.png',
  'Reading_Gauge.jpg',
];

await fs.mkdir(BACKUP_DIR, { recursive: true });

for (const file of targets) {
  const src = path.join(IMG_DIR, file);
  const backup = path.join(BACKUP_DIR, file);

  const before = (await fs.stat(src)).size;

  // Back up the original once (don't overwrite an existing backup)
  try {
    await fs.access(backup);
  } catch {
    await fs.copyFile(src, backup);
  }

  const ext = path.extname(file).toLowerCase();
  let pipeline = sharp(backup, { failOn: 'none' }).rotate().resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: 'inside',
    withoutEnlargement: true,
  });

  if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, quality: 80, effort: 8 });
  } else {
    pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
  }

  const buf = await pipeline.toBuffer();
  await fs.writeFile(src, buf);

  const after = buf.length;
  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${file}: ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB (-${pct}%)`
  );
}

console.log('Done. Originals backed up to public/img/_originals/');
