/**
 * Generates /public/og-default.png (1200×630) — static OG fallback image.
 * Run once: npx tsx scripts/generate-og-default.ts
 */
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import path from 'path';

// ── SVG source ───────────────────────────────────────────────────────────────
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Main background gradient: white top-left → light blue right -->
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#ffffff"/>
      <stop offset="45%"  stop-color="#eff6ff"/>
      <stop offset="100%" stop-color="#dbeafe"/>
    </linearGradient>
    <!-- Blue accent gradient for the top bar -->
    <linearGradient id="bar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <!-- Soft shadow filter for cards -->
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#93c5fd" flood-opacity="0.3"/>
    </filter>
    <!-- Decorative arc gradient -->
    <radialGradient id="arc" cx="100%" cy="0%" r="60%">
      <stop offset="0%"   stop-color="#bfdbfe" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#bfdbfe" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- ── Background ──────────────────────────────────────────────────── -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circle top-right -->
  <circle cx="1100" cy="-40" r="320" fill="url(#arc)"/>
  <circle cx="1050" cy="80"  r="180" fill="#dbeafe" fill-opacity="0.3"/>

  <!-- Decorative circle bottom-left -->
  <circle cx="100"  cy="640" r="200" fill="#eff6ff"/>

  <!-- ── Top accent bar ──────────────────────────────────────────────── -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#bar)" rx="0"/>

  <!-- ── Left accent stripe ─────────────────────────────────────────── -->
  <rect x="0" y="8" width="6" height="622" fill="#3b82f6" opacity="0.4"/>

  <!-- ── Brand pill (top-left) ──────────────────────────────────────── -->
  <rect x="56" y="44" width="264" height="40" rx="20" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5"/>
  <text x="80" y="70" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#2563eb" letter-spacing="0.5">yourtravelguide.in</text>

  <!-- ── ICON ROW ────────────────────────────────────────────────────── -->
  <!-- Each icon: white card, coloured circle bg, SVG path icon -->

  <!-- ✈ Airplane icon card -->
  <rect x="56" y="120" width="110" height="110" rx="20" fill="white" filter="url(#shadow)"/>
  <circle cx="111" cy="175" r="38" fill="#dbeafe"/>
  <!-- Airplane path (simplified) -->
  <g transform="translate(111,175)">
    <path d="M-22 5 L-4 -10 L22 -6 L10 2 Z M-2 -8 L12 -20 L18 -14 L2 -2 Z M-14 8 L-6 4 L2 10 L-6 14 Z"
          fill="#2563eb" transform="scale(0.75) rotate(-15)"/>
    <!-- Simpler airplane: fuselage + wings -->
    <ellipse cx="0" cy="0" rx="18" ry="5" fill="#1d4ed8" transform="rotate(-20)"/>
    <path d="M-5,-2 L-18,-14 L-14,-14 L2,0 Z" fill="#3b82f6" transform="rotate(-20)"/>
    <path d="M5,3 L16,14 L12,14 L-1,2 Z" fill="#3b82f6" transform="rotate(-20)"/>
    <path d="M10,-3 L20,-8 L18,-5 L8,0 Z" fill="#60a5fa" transform="rotate(-20)"/>
  </g>
  <text x="111" y="243" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle">Flights</text>

  <!-- 🛂 Passport icon card -->
  <rect x="184" y="120" width="110" height="110" rx="20" fill="white" filter="url(#shadow)"/>
  <circle cx="239" cy="175" r="38" fill="#dcfce7"/>
  <rect x="218" y="154" width="42" height="54" rx="5" fill="#16a34a" opacity="0.9"/>
  <rect x="222" y="158" width="34" height="10" rx="2" fill="white" opacity="0.95"/>
  <rect x="222" y="172" width="34" height="3" rx="1" fill="white" opacity="0.6"/>
  <rect x="222" y="179" width="26" height="3" rx="1" fill="white" opacity="0.6"/>
  <rect x="222" y="186" width="30" height="3" rx="1" fill="white" opacity="0.6"/>
  <rect x="222" y="195" width="34" height="5" rx="1" fill="#86efac" opacity="0.8"/>
  <text x="239" y="243" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle">Passport</text>

  <!-- 🛡 Security icon card -->
  <rect x="312" y="120" width="110" height="110" rx="20" fill="white" filter="url(#shadow)"/>
  <circle cx="367" cy="175" r="38" fill="#fef9c3"/>
  <path d="M367,148 L388,157 L388,172 Q388,188 367,198 Q346,188 346,172 L346,157 Z" fill="#ca8a04" opacity="0.9"/>
  <path d="M367,153 L384,161 L384,173 Q384,186 367,195 Q350,186 350,173 L350,161 Z" fill="#fde68a"/>
  <path d="M360,174 L365,180 L376,167" stroke="#ca8a04" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="367" y="243" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle">Security</text>

  <!-- 🧳 Luggage icon card -->
  <rect x="440" y="120" width="110" height="110" rx="20" fill="white" filter="url(#shadow)"/>
  <circle cx="495" cy="175" r="38" fill="#ede9fe"/>
  <rect x="476" y="160" width="38" height="30" rx="6" fill="#7c3aed" opacity="0.9"/>
  <rect x="484" y="154" width="22" height="10" rx="4" fill="none" stroke="#7c3aed" stroke-width="3"/>
  <rect x="481" y="172" width="28" height="3" rx="1" fill="white" opacity="0.5"/>
  <rect x="493" y="162" width="2" height="26" rx="1" fill="white" opacity="0.4"/>
  <rect x="474" y="189" width="42" height="4" rx="2" fill="#6d28d9"/>
  <text x="495" y="243" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="600" fill="#64748b" text-anchor="middle">Luggage</text>

  <!-- ── MAIN HEADLINE ───────────────────────────────────────────────── -->
  <text x="56" y="320"
        font-family="Arial Black, Arial, Helvetica, sans-serif"
        font-size="74"
        font-weight="900"
        fill="#0f172a"
        letter-spacing="-1">Airport Rules</text>

  <text x="56" y="406"
        font-family="Arial Black, Arial, Helvetica, sans-serif"
        font-size="74"
        font-weight="900"
        letter-spacing="-1">
    <tspan fill="#2563eb">India</tspan>
    <tspan fill="#0f172a" dx="16">2026</tspan>
  </text>

  <!-- ── SUBTEXT ────────────────────────────────────────────────────── -->
  <text x="56" y="460"
        font-family="Arial, Helvetica, sans-serif"
        font-size="26"
        font-weight="400"
        fill="#64748b"
        letter-spacing="0.2">What You Can &amp; Can&apos;t Carry on Indian Flights</text>

  <!-- ── TAGS ROW ───────────────────────────────────────────────────── -->
  <rect x="56" y="488" width="150" height="34" rx="17" fill="#dbeafe"/>
  <text x="131" y="510" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#1d4ed8" text-anchor="middle" letter-spacing="0.4">DGCA VERIFIED</text>

  <rect x="220" y="488" width="130" height="34" rx="17" fill="#dcfce7"/>
  <text x="285" y="510" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#15803d" text-anchor="middle" letter-spacing="0.4">FREE GUIDE</text>

  <rect x="364" y="488" width="130" height="34" rx="17" fill="#f1f5f9"/>
  <text x="429" y="510" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#475569" text-anchor="middle" letter-spacing="0.4">INDIA 2026</text>

  <!-- ── BOTTOM BAR ────────────────────────────────────────────────── -->
  <rect x="0" y="590" width="1200" height="40" fill="#f8fafc"/>
  <rect x="0" y="590" width="1200" height="1" fill="#e2e8f0"/>
  <text x="56" y="617" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="600" fill="#94a3b8" letter-spacing="0.3">India&apos;s airport rules — simplified for every traveller</text>
  <text x="1144" y="617" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="600" fill="#94a3b8" text-anchor="end">yourtravelguide.in</text>
</svg>`;

// ── Convert SVG → PNG ────────────────────────────────────────────────────────
async function main() {
  const outPath = path.join(process.cwd(), 'public', 'og-default.png');

  const buffer = await sharp(Buffer.from(svg))
    .png({ quality: 95, compressionLevel: 9 })
    .toBuffer();

  writeFileSync(outPath, buffer);
  console.log(`✅ Saved ${buffer.length} bytes → ${outPath}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
