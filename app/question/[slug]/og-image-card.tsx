import { ImageResponse } from 'next/og';
import { resolveDecision } from '@/services/resolver';
import { verdictDisplay } from '@/components/decision/verdict-config';

/**
 * Shared per-question OG/Twitter image generator — used by both
 * `opengraph-image.tsx` and `twitter-image.tsx` (one render function, two
 * Next.js file-convention outputs) so the image logic exists exactly once.
 *
 * Content is ONLY: the real question, the real verdict, the real authority,
 * and the brand mark. No marketing copy, no ratings, no invented statistics —
 * `next/og` renders via Satori (no Tailwind/CSS variables available), so
 * colours are a small literal hex map matching the app's real design tokens.
 */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

const TONE_COLOR: Record<string, string> = {
  positive: '#15803d',
  conditional: '#b45309',
  negative: '#b91c1c',
  neutral: '#1d4ed8',
};

export async function renderQuestionCard(slug: string): Promise<ImageResponse> {
  const result = await resolveDecision(slug);

  // Fail-closed: an unverified/unknown slug gets a plain branded card — never a
  // fabricated verdict.
  if (result.state !== 'available') {
    return new ImageResponse(
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f6f7fa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, color: '#0f1729' }}>YourTravelGuide</div>
        <div style={{ fontSize: 24, color: '#5b6577', marginTop: 12 }}>
          Verified travel answers for India
        </div>
      </div>,
      OG_IMAGE_SIZE,
    );
  }

  const v = result.view;
  const verdict = verdictDisplay(v.answerKind, v.verdict);
  const color = TONE_COLOR[verdict.tone] ?? '#4f46e5';
  const authority = v.sources[0]?.authority;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#f6f7fa',
        padding: 64,
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: '#4f46e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          Y
        </div>
        <div style={{ fontSize: 24, fontWeight: 600, color: '#0f1729' }}>YourTravelGuide</div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          maxWidth: 1000,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            background: color,
            color: '#ffffff',
            fontSize: 22,
            fontWeight: 600,
            padding: '10px 22px',
            borderRadius: 999,
          }}
        >
          {verdict.label}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 48,
            fontWeight: 700,
            color: '#0f1729',
            lineHeight: 1.2,
          }}
        >
          {v.question}
        </div>
      </div>

      <div style={{ display: 'flex', fontSize: 22, color: '#5b6577' }}>
        {authority ? `Source: ${authority}` : 'Source-verified'}
      </div>
    </div>,
    OG_IMAGE_SIZE,
  );
}
