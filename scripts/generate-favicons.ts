/**
 * Generates favicon PNGs from an SVG source.
 * Run: npx tsx scripts/generate-favicons.ts
 *
 * Outputs:
 *   public/favicon-16x16.png
 *   public/favicon-32x32.png
 *   public/apple-touch-icon.png   (180×180)
 *   public/favicon.ico            (replaces default — 32×32 ICO-wrapped PNG)
 */
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import path from 'path';

// ── SVG: blue circle + white airplane ────────────────────────────────────────
// Designed to be crisp at 16px and still detailed at 180px
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <!-- Background circle -->
  <circle cx="50" cy="50" r="50" fill="#2563EB"/>

  <!-- Airplane silhouette — white, centred, pointing top-right -->
  <g transform="translate(50,50) rotate(-35) scale(0.9)" fill="white">
    <!-- Fuselage -->
    <ellipse cx="0" cy="0" rx="26" ry="7" rx="26" ry="7"/>
    <!-- Main wing -->
    <path d="M-4,-4 L-22,-22 L-14,-20 L6,2 Z"/>
    <!-- Right main wing mirror -->
    <path d="M4,4 L22,22 L14,20 L-6,-2 Z"/>
    <!-- Tail fin -->
    <path d="M16,-4 L26,-14 L24,-10 L14,0 Z"/>
    <!-- Nose -->
    <ellipse cx="-20" cy="0" rx="8" ry="5"/>
  </g>
</svg>`;

// Better — clean minimal airplane SVG optimised for favicon
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Vivid blue circle background -->
  <circle cx="256" cy="256" r="256" fill="#2563EB"/>

  <!-- White airplane, pointing top-right, balanced in circle -->
  <g transform="translate(256,256) rotate(-40)" fill="white">
    <!-- Fuselage body -->
    <rect x="-110" y="-18" width="220" height="36" rx="18"/>
    <!-- Left wing -->
    <path d="M-30,-18 L-110,-110 L-70,-100 L30,20 Z"/>
    <!-- Right wing -->
    <path d="M-30,18 L-110,110 L-70,100 L30,-20 Z"/>
    <!-- Tail -->
    <path d="M80,-18 L140,-70 L130,-50 L90,0 Z"/>
    <path d="M80,18 L140,70 L130,50 L90,0 Z"/>
    <!-- Nose cone -->
    <ellipse cx="110" cy="0" rx="30" ry="16"/>
  </g>
</svg>`;

async function main() {
  const pub = path.join(process.cwd(), 'public');
  const buf = Buffer.from(faviconSvg);

  const sizes: Array<{ name: string; size: number }> = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon.ico', size: 32 },   // browsers accept PNG-in-.ico filename
  ];

  for (const { name, size } of sizes) {
    const out = path.join(pub, name);
    await sharp(buf)
      .resize(size, size)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(out);
    console.log(`✅ ${name} (${size}×${size})`);
  }
  console.log('\nAll favicons written to /public/');
}

main().catch((e) => { console.error(e); process.exit(1); });
