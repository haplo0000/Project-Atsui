/**
 * Generates placeholder PNG assets for src/assets/avatar/.
 * Run: node scripts/generate-avatar-placeholders.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../src/assets/avatar');
const W = 200;
const H = 240;

const LAYER_COLORS = {
  body: [74, 144, 164, 220],
  hair_back: [74, 144, 164, 140],
  hair_front: [74, 144, 164, 180],
  eyes_open: [26, 26, 46, 255],
  eyes_closed: [74, 144, 164, 230],
  mouth_neutral: [26, 26, 46, 120],
  ears: [74, 144, 164, 230],
  tail: [74, 144, 164, 170],
  glasses: [100, 255, 218, 200],
  hoodie: [57, 73, 171, 180],
  raincoat: [21, 101, 192, 160],
  bowtie: [144, 202, 249, 220],
  headphones: [156, 39, 176, 200],
  helmet: [230, 74, 25, 200],
};

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function setPixel(pixels, x, y, rgba) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  pixels[i] = rgba[0];
  pixels[i + 1] = rgba[1];
  pixels[i + 2] = rgba[2];
  pixels[i + 3] = rgba[3];
}

function fillEllipse(pixels, cx, cy, rx, ry, rgba) {
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      if (dx * dx + dy * dy <= 1) setPixel(pixels, x, y, rgba);
    }
  }
}

function fillRect(pixels, x, y, rw, rh, rgba) {
  for (let py = y; py < y + rh; py++) {
    for (let px = x; px < x + rw; px++) setPixel(pixels, px, py, rgba);
  }
}

function drawLayer(id, pixels) {
  const c = LAYER_COLORS[id] ?? [128, 128, 128, 180];
  switch (id) {
    case 'hair_back':
      fillEllipse(pixels, 100, 70, 58, 50, c);
      break;
    case 'tail':
      for (let y = 170; y < 230; y++) {
        for (let x = 70; x < 130; x++) {
          if (Math.hypot(x - 100, y - 200) < 35 + (y - 170) * 0.2) setPixel(pixels, x, y, c);
        }
      }
      break;
    case 'body':
      fillEllipse(pixels, 100, 155, 52, 62, c);
      break;
    case 'ears':
      for (let y = 20; y < 60; y++) {
        setPixel(pixels, 50, y, c);
        setPixel(pixels, 51, y, c);
        setPixel(pixels, 150, y, c);
        setPixel(pixels, 149, y, c);
      }
      fillEllipse(pixels, 55, 48, 12, 18, c);
      fillEllipse(pixels, 145, 48, 12, 18, c);
      break;
    case 'eyes_open':
      fillEllipse(pixels, 82, 82, 11, 13, c);
      fillEllipse(pixels, 118, 82, 11, 13, c);
      fillEllipse(pixels, 84, 83, 5, 6, [126, 200, 227, 255]);
      fillEllipse(pixels, 120, 83, 5, 6, [126, 200, 227, 255]);
      break;
    case 'eyes_closed':
      for (let x = 70; x < 94; x++) setPixel(pixels, x, 82, c);
      for (let x = 106; x < 130; x++) setPixel(pixels, x, 82, c);
      break;
    case 'mouth_neutral':
      for (let x = 92; x <= 108; x++) setPixel(pixels, x, 104, c);
      break;
    case 'hair_front':
      fillEllipse(pixels, 100, 62, 50, 28, c);
      break;
    case 'glasses':
      fillRect(pixels, 68, 72, 30, 22, [0, 0, 0, 0]);
      for (let x = 68; x < 98; x++) {
        setPixel(pixels, x, 72, c);
        setPixel(pixels, x, 93, c);
      }
      for (let y = 72; y < 94; y++) {
        setPixel(pixels, 68, y, c);
        setPixel(pixels, 97, y, c);
      }
      for (let x = 102; x < 132; x++) {
        setPixel(pixels, x, 72, c);
        setPixel(pixels, x, 93, c);
      }
      for (let y = 72; y < 94; y++) {
        setPixel(pixels, 102, y, c);
        setPixel(pixels, 131, y, c);
      }
      for (let x = 98; x <= 102; x++) setPixel(pixels, x, 83, c);
      break;
    case 'hoodie':
      fillRect(pixels, 45, 85, 110, 115, c);
      break;
    case 'raincoat':
      fillRect(pixels, 42, 75, 116, 150, c);
      break;
    case 'bowtie':
      fillEllipse(pixels, 92, 112, 10, 8, c);
      fillEllipse(pixels, 108, 112, 10, 8, c);
      fillRect(pixels, 97, 110, 6, 6, c);
      break;
    case 'headphones':
      for (let y = 75; y < 103; y++) {
        setPixel(pixels, 38, y, c);
        setPixel(pixels, 39, y, c);
        setPixel(pixels, 148, y, c);
        setPixel(pixels, 149, y, c);
      }
      for (let x = 48; x < 152; x++) {
        const dy = 80 - Math.sqrt(Math.max(0, 52 * 52 - (x - 100) ** 2));
        setPixel(pixels, x, Math.round(dy), c);
      }
      break;
    case 'helmet':
      fillEllipse(pixels, 100, 78, 52, 40, c);
      fillRect(pixels, 48, 78, 104, 18, c);
      break;
    default:
      fillRect(pixels, 60, 60, 80, 80, c);
  }
}

function encodePNG(id) {
  const pixels = new Uint8Array(W * H * 4);
  drawLayer(id, pixels);

  const raw = Buffer.alloc((W * 4 + 1) * H);
  for (let y = 0; y < H; y++) {
    raw[y * (W * 4 + 1)] = 0;
    for (let x = 0; x < W; x++) {
      const si = (y * W + x) * 4;
      const di = y * (W * 4 + 1) + 1 + x * 4;
      raw[di] = pixels[si];
      raw[di + 1] = pixels[si + 1];
      raw[di + 2] = pixels[si + 2];
      raw[di + 3] = pixels[si + 3];
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync(OUT_DIR, { recursive: true });

for (const id of Object.keys(LAYER_COLORS)) {
  const outPath = join(OUT_DIR, `${id}.png`);
  writeFileSync(outPath, encodePNG(id));
  console.log(`Wrote ${outPath}`);
}

console.log('Done — placeholder avatar PNGs generated.');
