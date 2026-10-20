import type { ArtKey } from '../data'

const S = {
  stroke: 'var(--art-ink)',
  strokeWidth: 3,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
}
const paper = 'var(--art-paper)'
const red = 'var(--art-red)'
const green = 'var(--art-green)'
const yellow = 'var(--art-yellow)'

const Bars = ({ x, y, w, rows, gap = 16 }: { x: number; y: number; w: number; rows: number; gap?: number }) => (
  <g>
    {Array.from({ length: rows }, (_, i) => (
      <rect key={i} x={x} y={y + i * gap} width={i % 2 ? w * 0.7 : w} height="7" rx="3.5" fill="var(--art-ink)" opacity={i % 2 ? 0.25 : 0.8} />
    ))}
  </g>
)

/**
 * Flat, thick-outline illustrations (one per project / background entry).
 * Parts with the a-* classes move through CSS keyframes (see pages.css);
 * everything stays still under prefers-reduced-motion.
 */
export default function ProjectArt({ art }: { art: ArtKey }) {
  return (
    <svg className="art" viewBox="0 0 320 200" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      <g {...S}>{drawing(art)}</g>
    </svg>
  )
}

function drawing(art: ArtKey) {
  switch (art) {
    case 'payment-system':
    case 'payment-work':
      return (
        <>
          <rect x="22" y="28" width="108" height="136" rx="14" fill={paper} />
          <Bars x={38} y={50} w={76} rows={5} gap={20} />
          <rect x="190" y="28" width="108" height="136" rx="14" fill={paper} />
          <Bars x={206} y={50} w={76} rows={5} gap={20} />
          <g className="a-dash" fill="none" stroke={red}>
            <path d="M130 56 H190" />
            <path d="M130 96 H190" />
            <path d="M130 136 H190" />
          </g>
          <g className="a-bob">
            <circle cx="160" cy="56" r="13" fill={green} />
            <path d="M153 56 l5 5 l9 -10" fill="none" stroke={paper} />
          </g>
          <g className="a-bob a-late">
            <circle cx="160" cy="96" r="13" fill={yellow} />
            <path d="M160 89 v9 M160 103 v1" fill="none" />
          </g>
          <circle cx="160" cy="136" r="13" fill={paper} />
          <path d="M154 130 l12 12 M166 130 l-12 12" fill="none" stroke={red} />
        </>
      )
    case 'seismic':
    case 'bmkg-work':
      return (
        <>
          <rect x="20" y="24" width="280" height="152" rx="16" fill={paper} />
          <circle cx="40" cy="42" r="4" fill={red} />
          <circle cx="54" cy="42" r="4" fill={yellow} />
          <circle cx="68" cy="42" r="4" fill={green} />
          <path className="a-wave" d="M34 112 H80 l8 -8 l8 16 l8 -12 l8 8 H140 l10 -46 l12 82 l12 -62 l10 26 H220 l8 -10 l8 14 l8 -8 H286" fill="none" stroke={red} />
          <path d="M34 150 H150" fill="none" opacity="0.25" />
          <path d="M34 160 H110" fill="none" opacity="0.25" />
          <g className="a-bob">
            <rect x="214" y="132" width="70" height="30" rx="15" fill={green} />
            <path d="M232 147 l6 6 l12 -12" fill="none" stroke={paper} />
          </g>
        </>
      )
    case 'testing':
      return (
        <>
          <rect x="70" y="20" width="150" height="164" rx="16" fill={paper} />
          <rect x="116" y="10" width="58" height="22" rx="11" fill={yellow} />
          {[56, 92, 128].map((y, i) => (
            <g key={y}>
              <rect x="88" y={y} width="22" height="22" rx="6" fill={i === 2 ? paper : green} />
              {i === 2 ? <path d={`M93 ${y + 5} l12 12 M105 ${y + 5} l-12 12`} fill="none" stroke={red} /> : <path d={`M93 ${y + 11} l5 5 l9 -10`} fill="none" stroke={paper} />}
              <rect x="122" y={y + 7} width={i === 1 ? 70 : 84} height="8" rx="4" fill="var(--art-ink)" opacity="0.7" />
            </g>
          ))}
          <g className="a-bob a-late">
            <ellipse cx="248" cy="132" rx="26" ry="20" fill={red} />
            <circle cx="248" cy="104" r="12" fill={red} />
            <path d="M222 124 l-14 -8 M222 140 l-14 8 M274 124 l14 -8 M274 140 l14 8" fill="none" />
            <circle cx="244" cy="102" r="2" fill={paper} stroke="none" />
            <circle cx="252" cy="102" r="2" fill={paper} stroke="none" />
          </g>
        </>
      )
    case 'api-test':
      return (
        <>
          <rect x="18" y="30" width="124" height="140" rx="16" fill={paper} />
          <rect x="32" y="44" width="52" height="22" rx="11" fill={yellow} />
          <Bars x={32} y={86} w={92} rows={4} gap={18} />
          <rect x="178" y="30" width="124" height="140" rx="16" fill={paper} />
          <rect x="192" y="44" width="62" height="22" rx="11" fill={green} />
          <Bars x={192} y={86} w={92} rows={4} gap={18} />
          <g className="a-slide">
            <path d="M146 100 H174" fill="none" stroke={red} />
            <path d="M166 90 l10 10 l-10 10" fill="none" stroke={red} />
          </g>
        </>
      )
    case 'bmkg-api':
      return (
        <>
          {[24, 66, 108].map((y, i) => (
            <g key={y}>
              <rect x="24" y={y} width="130" height="34" rx="12" fill={paper} />
              <circle cx="44" cy={y + 17} r="5" fill={i === 1 ? yellow : green} />
              <rect x="62" y={y + 12} width="70" height="9" rx="4.5" fill="var(--art-ink)" opacity="0.6" />
            </g>
          ))}
          <g className="a-bob">
            <path d="M214 56 v70 a40 14 0 0 0 80 0 v-70" fill={paper} />
            <ellipse cx="254" cy="56" rx="40" ry="14" fill={yellow} />
            <path d="M214 92 a40 14 0 0 0 80 0" fill="none" />
          </g>
          <g className="a-dash" fill="none" stroke={red}>
            <path d="M156 83 H210" />
          </g>
          <rect x="30" y="156" width="96" height="26" rx="13" fill={green} />
          <text x="78" y="174" textAnchor="middle" fontSize="13" fontWeight="700" fill={paper} stroke="none" fontFamily="DM Sans Variable, sans-serif">GET /api</text>
        </>
      )
    case 'payment-app':
      return (
        <>
          <rect x="24" y="22" width="190" height="156" rx="16" fill={paper} />
          <circle cx="44" cy="40" r="4" fill={red} />
          <circle cx="58" cy="40" r="4" fill={yellow} />
          <circle cx="72" cy="40" r="4" fill={green} />
          <rect x="42" y="62" width="150" height="20" rx="10" fill="none" />
          <rect x="42" y="94" width="150" height="20" rx="10" fill="none" />
          <rect x="42" y="132" width="76" height="28" rx="14" fill={green} />
          <g className="a-bob">
            <rect x="170" y="96" width="126" height="64" rx="16" fill={yellow} />
            <path d="M190 118 h54 M190 136 h86" fill="none" />
            <circle cx="274" cy="110" r="11" fill={red} />
            <path d="M274 105 v7 M274 116 v1" fill="none" stroke={paper} />
          </g>
        </>
      )
    case 'msc':
      return (
        <>
          <circle cx="132" cy="100" r="78" fill={paper} />
          <g className="a-bob">
            <path d="M96 86 c-6 -20 22 -30 36 -16 c14 -10 36 4 26 24 c10 16 -10 34 -28 24 c-16 8 -40 -6 -34 -32z" fill="var(--art-yellow)" opacity="0.9" />
          </g>
          <path className="a-dash" d="M92 132 c-8 -18 6 -30 22 -22 c4 -16 30 -14 34 4 c16 2 22 26 4 34 c-12 10 -48 10 -60 -16z" fill="none" stroke={red} />
          <circle cx="156" cy="70" r="9" fill={green} />
          <circle cx="104" cy="70" r="7" fill={green} />
          <g className="a-bob a-late">
            <rect x="214" y="48" width="86" height="104" rx="16" fill={paper} />
            <rect x="228" y="116" width="14" height="22" rx="4" fill={yellow} />
            <rect x="250" y="94" width="14" height="44" rx="4" fill={red} />
            <rect x="272" y="68" width="14" height="70" rx="4" fill={green} />
          </g>
        </>
      )
    case 'credit':
      return (
        <>
          <rect x="22" y="26" width="276" height="148" rx="16" fill={paper} />
          {[
            [48, 96, 'a'],
            [92, 70, 'b'],
            [136, 112, 'a'],
            [180, 54, 'b'],
          ].map(([x, h, k]) => (
            <rect key={x as number} x={x as number} y={152 - (h as number)} width="30" height={h as number} rx="8" fill={k === 'a' ? yellow : green} />
          ))}
          <path className="a-dash" d="M40 70 H200" fill="none" stroke={red} />
          <g className="a-bob">
            <circle cx="254" cy="100" r="34" fill={yellow} />
            <path d="M254 100 L274 80" fill="none" stroke={red} />
            <circle cx="254" cy="100" r="4" fill="var(--art-ink)" />
          </g>
        </>
      )
    case 'edu':
      return (
        <>
          <rect x="24" y="62" width="168" height="112" rx="16" fill={paper} />
          <Bars x={42} y={92} w={110} rows={4} gap={20} />
          <g className="a-bob">
            <path d="M160 40 L252 70 L160 100 L68 70 Z" fill="var(--art-ink)" />
            <path d="M104 92 v26 c30 18 58 18 88 0 v-26" fill={green} />
            <path d="M252 70 v34" fill="none" stroke={yellow} />
            <circle cx="252" cy="108" r="6" fill={yellow} />
          </g>
        </>
      )
    case 'fellow':
      return (
        <>
          <circle cx="104" cy="100" r="64" fill={paper} />
          <path d="M40 100 H168 M104 36 c-30 28 -30 100 0 128 M104 36 c30 28 30 100 0 128 M52 70 H156 M52 130 H156" fill="none" />
          <g className="a-bob">
            <rect x="170" y="52" width="130" height="96" rx="16" fill={yellow} />
            <path d="M192 84 l-14 14 l14 14 M278 84 l14 14 l-14 14 M240 76 l-18 44" fill="none" />
          </g>
        </>
      )
    case 'makeup':
      return (
        <>
          <ellipse cx="112" cy="100" rx="64" ry="80" fill={paper} />
          <path d="M80 76 q14 -10 28 0 M120 76 q14 -10 28 0" fill="none" />
          <circle cx="94" cy="92" r="5" fill="var(--art-ink)" stroke="none" />
          <circle cx="134" cy="92" r="5" fill="var(--art-ink)" stroke="none" />
          <g className="a-bob">
            <path d="M92 138 q20 -14 40 0 q-20 18 -40 0z" fill={red} />
          </g>
          {[[80, 60], [112, 52], [144, 60], [70, 110], [154, 110], [112, 166]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={green} stroke="none" />
          ))}
          <g className="a-bob a-late">
            <rect x="216" y="44" width="76" height="112" rx="16" fill={yellow} />
            <circle cx="254" cy="84" r="14" fill={red} />
            <circle cx="254" cy="122" r="14" fill={green} />
          </g>
        </>
      )
    case 'suara':
      return (
        <>
          <circle cx="160" cy="100" r="30" fill={yellow} />
          <path d="M160 82 v36 M142 100 h36" fill="none" />
          {[[56, 50], [264, 50], [56, 150], [264, 150]].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="20" fill={paper} />
              <circle cx={x} cy={y - 4} r="6" fill={green} />
              <path d={`M${x - 10} ${y + 10} q10 -10 20 0`} fill="none" />
            </g>
          ))}
          <g className="a-dash" fill="none" stroke={red}>
            <path d="M74 62 L134 88" />
            <path d="M246 62 L186 88" />
            <path d="M74 138 L134 112" />
            <path d="M246 138 L186 112" />
          </g>
        </>
      )
    case 'travel':
      return (
        <>
          <rect x="22" y="30" width="170" height="140" rx="16" fill={paper} />
          <path className="a-dash" d="M44 140 c30 -60 60 20 90 -40 s40 -30 44 -44" fill="none" stroke={red} />
          <circle cx="44" cy="140" r="7" fill={green} />
          <g className="a-bob">
            <path d="M232 58 a30 30 0 0 1 30 30 c0 24 -30 56 -30 56 s-30 -32 -30 -56 a30 30 0 0 1 30 -30z" fill={yellow} />
            <circle cx="232" cy="88" r="10" fill={paper} />
          </g>
          <g className="a-bob a-late">
            <circle cx="256" cy="156" r="18" fill={paper} />
            <path d="M256 144 l6 16 l-6 -4 l-6 4z" fill={red} />
          </g>
        </>
      )
    case 'srs':
      return (
        <>
          <rect x="60" y="18" width="130" height="164" rx="14" fill={paper} />
          <rect x="82" y="40" width="60" height="10" rx="5" fill="var(--art-ink)" opacity="0.8" />
          <Bars x={82} y={68} w={90} rows={5} gap={18} />
          <g className="a-bob">
            <rect x="170" y="70" width="120" height="96" rx="14" fill={yellow} />
            <path d="M190 96 l8 8 l14 -16 M190 130 l8 8 l14 -16" fill="none" />
            <path d="M226 98 h46 M226 132 h46" fill="none" opacity="0.6" />
          </g>
        </>
      )
    case 'shopee':
      return (
        <>
          <path d="M44 68 h92 l-8 100 h-76z" fill={paper} />
          <path d="M66 68 c0 -26 48 -26 48 0" fill="none" />
          <circle cx="90" cy="116" r="14" fill={yellow} />
          <g className="a-bob">
            <rect x="170" y="36" width="130" height="128" rx="16" fill={paper} />
            <rect x="188" y="110" width="22" height="36" rx="5" fill={yellow} />
            <rect x="222" y="84" width="22" height="62" rx="5" fill={red} />
            <rect x="256" y="58" width="22" height="88" rx="5" fill={green} />
          </g>
          <path className="a-dash" d="M142 100 H166" fill="none" stroke={red} />
        </>
      )
    case 'elearning':
      return (
        <>
          <rect x="30" y="28" width="260" height="144" rx="16" fill={paper} />
          <rect x="48" y="46" width="150" height="86" rx="10" fill="var(--art-ink)" opacity="0.85" />
          <g className="a-bob">
            <circle cx="123" cy="89" r="22" fill={yellow} />
            <path d="M116 78 l18 11 l-18 11z" fill="var(--art-ink)" />
          </g>
          <rect x="48" y="146" width="150" height="12" rx="6" fill="none" />
          <rect x="48" y="146" width="96" height="12" rx="6" fill={green} />
          <Bars x={214} y={52} w={62} rows={5} gap={22} />
        </>
      )
  }
}
