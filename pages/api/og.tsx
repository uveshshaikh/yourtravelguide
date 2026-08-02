import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

// ── Verdict pill config ────────────────────────────────────────────────────
const VERDICT: Record<string, { label: string; bg: string; fg: string; dot: string }> = {
  allowed: {
    label: 'YES — ALLOWED',
    bg: '#dcfce7',
    fg: '#166534',
    dot: '#22c55e',
  },
  not_allowed: {
    label: 'NO — NOT ALLOWED',
    bg: '#fee2e2',
    fg: '#991b1b',
    dot: '#ef4444',
  },
  limited: {
    label: 'CONDITIONS APPLY',
    bg: '#fef9c3',
    fg: '#854d0e',
    dot: '#eab308',
  },
};

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title       = searchParams.get('title')   ?? 'Airport Rules & Travel Documents India';
  const subtitle    = searchParams.get('sub')      ?? 'Know what\'s allowed before you fly';
  const status      = searchParams.get('status');
  const pageType    = searchParams.get('type')     ?? 'rule';   // 'rule' | 'hub' | 'sub' | 'home'

  const verdict = status && VERDICT[status] ? VERDICT[status] : null;

  return new ImageResponse(
    (
      <div
        style={{
          display:        'flex',
          flexDirection:  'column',
          width:          '1200px',
          height:         '630px',
          background:     'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f2744 100%)',
          fontFamily:     'sans-serif',
          overflow:       'hidden',
          position:       'relative',
        }}
      >
        {/* ── Subtle dot grid ─────────────────────────────────────────── */}
        <div
          style={{
            position:   'absolute',
            inset:      0,
            opacity:    0.06,
            background: 'radial-gradient(circle, #93c5fd 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── Left accent bar ──────────────────────────────────────────── */}
        <div
          style={{
            position:   'absolute',
            left:       0,
            top:        0,
            width:      '8px',
            height:     '630px',
            background: 'linear-gradient(180deg, #3b82f6 0%, #818cf8 100%)',
          }}
        />

        {/* ── Top-right decorative arc ─────────────────────────────────── */}
        <div
          style={{
            position:     'absolute',
            right:        '-120px',
            top:          '-120px',
            width:        '480px',
            height:       '480px',
            borderRadius: '50%',
            border:       '60px solid rgba(59,130,246,0.12)',
          }}
        />
        <div
          style={{
            position:     'absolute',
            right:        '-60px',
            top:          '-60px',
            width:        '300px',
            height:       '300px',
            borderRadius: '50%',
            border:       '40px solid rgba(99,102,241,0.12)',
          }}
        />

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div
          style={{
            display:        'flex',
            flexDirection:  'row',
            alignItems:     'center',
            flex:           1,
            padding:        '60px 72px',
            gap:            '48px',
            zIndex:         10,
          }}
        >
          {/* ── Left: text ─────────────────────────────────────────────── */}
          <div
            style={{
              display:        'flex',
              flexDirection:  'column',
              flex:           1,
              gap:            '20px',
            }}
          >
            {/* Brand badge */}
            <div
              style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '8px',
              }}
            >
              <div
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '6px',
                  background:   'rgba(59,130,246,0.18)',
                  border:       '1px solid rgba(59,130,246,0.4)',
                  borderRadius: '999px',
                  padding:      '6px 16px',
                }}
              >
                <span style={{ fontSize: '18px' }}>✈️</span>
                <span
                  style={{
                    color:       '#93c5fd',
                    fontSize:    '15px',
                    fontWeight:  700,
                    letterSpacing: '0.04em',
                  }}
                >
                  yourtravelguide.in
                </span>
              </div>
            </div>

            {/* Main title */}
            <div
              style={{
                color:        '#ffffff',
                fontSize:     title.length > 50 ? '44px' : '52px',
                fontWeight:   800,
                lineHeight:   1.15,
                letterSpacing: '-0.02em',
                maxWidth:     '680px',
              }}
            >
              {title}
            </div>

            {/* Verdict pill (rule pages only) */}
            {verdict && (
              <div
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          '8px',
                  background:   verdict.bg,
                  borderRadius: '999px',
                  padding:      '8px 20px',
                  width:        'fit-content',
                }}
              >
                <div
                  style={{
                    width:        '10px',
                    height:       '10px',
                    borderRadius: '50%',
                    background:   verdict.dot,
                  }}
                />
                <span
                  style={{
                    color:       verdict.fg,
                    fontSize:    '16px',
                    fontWeight:  800,
                    letterSpacing: '0.06em',
                  }}
                >
                  {verdict.label}
                </span>
              </div>
            )}

            {/* Subtitle */}
            <div
              style={{
                color:       '#94a3b8',
                fontSize:    '20px',
                fontWeight:  400,
                lineHeight:  1.5,
                maxWidth:    '600px',
              }}
            >
              {subtitle}
            </div>

            {/* Tags row */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
              {['DGCA Verified', 'India 2026', 'Free Guide'].map((tag) => (
                <div
                  key={tag}
                  style={{
                    background:   'rgba(255,255,255,0.06)',
                    border:       '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '6px',
                    padding:      '5px 12px',
                    color:        '#cbd5e1',
                    fontSize:     '13px',
                    fontWeight:   600,
                    letterSpacing: '0.04em',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: icon cluster ───────────────────────────────────── */}
          <div
            style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '16px',
              flexShrink:     0,
            }}
          >
            {/* Central icon */}
            <div
              style={{
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                width:          '160px',
                height:         '160px',
                borderRadius:   '32px',
                background:     'linear-gradient(135deg, #1d4ed8 0%, #4f46e5 100%)',
                boxShadow:      '0 0 60px rgba(59,130,246,0.35)',
                fontSize:       '80px',
              }}
            >
              {pageType === 'hub' && status === undefined ? '📋' :
               pageType === 'sub' ? '📂' : '✈️'}
            </div>

            {/* 2-col icon grid */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: '🛂', label: 'Documents' },
                { icon: '🧳', label: 'Baggage' },
                { icon: '🛡️', label: 'Security' },
                { icon: '🛃', label: 'Customs' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display:        'flex',
                    flexDirection:  'column',
                    alignItems:     'center',
                    gap:            '4px',
                    background:     'rgba(255,255,255,0.05)',
                    border:         '1px solid rgba(255,255,255,0.09)',
                    borderRadius:   '12px',
                    padding:        '10px 14px',
                    minWidth:       '64px',
                  }}
                >
                  <span style={{ fontSize: '26px' }}>{item.icon}</span>
                  <span style={{ color: '#64748b', fontSize: '11px', fontWeight: 600, letterSpacing: '0.03em' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div
          style={{
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding:    '14px 80px',
            background: 'rgba(0,0,0,0.3)',
            borderTop:  '1px solid rgba(255,255,255,0.06)',
            zIndex:     10,
          }}
        >
          <span style={{ color: '#475569', fontSize: '14px', fontWeight: 600 }}>
            India&apos;s #1 airport rules reference
          </span>
          <span style={{ color: '#334155', fontSize: '13px' }}>
            yourtravelguide.in
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
