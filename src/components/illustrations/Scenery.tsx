/**
 * Layered paper scenery behind the curtains. Each <g data-layer> can be moved
 * independently for a restrained parallax effect. Paths extend past the
 * viewBox so the layers never reveal gaps while they shift.
 */
export default function Scenery({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {/* Back wall */}
      <rect width="1600" height="900" fill="#dfe6e6" />
      <rect width="1600" height="900" fill="url(#sky-wash)" />
      <defs>
        <linearGradient id="sky-wash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b9cad8" />
          <stop offset="0.6" stopColor="#e6e3d8" />
          <stop offset="1" stopColor="#f1e2cc" />
        </linearGradient>
      </defs>

      {/* Layer 0: sun and clouds */}
      <g data-layer="0">
        <g filter="url(#paper-cut)">
          <circle cx="1150" cy="300" r="170" fill="#e8c7ae" />
        </g>
        <g filter="url(#paper-cut)">
          <circle cx="1150" cy="300" r="128" fill="#dc9f82" />
        </g>
        <g filter="url(#paper-cut)">
          <circle cx="1150" cy="300" r="86" fill="#c4755a" />
        </g>
        <g filter="url(#paper-cut-fine)" fill="#fbf6ea">
          <path d="M180 250 q20 -52 78 -40 q26 -44 86 -14 q58 -12 70 42 q40 4 38 34 H150 q-24 -4 -18 -22 Z" />
          <path d="M620 140 q16 -40 62 -30 q22 -34 66 -10 q46 -8 54 32 q30 4 28 26 H590 q-18 -4 -14 -16 Z" />
          <path d="M1330 520 q14 -34 54 -26 q18 -28 56 -8 q40 -6 46 28 q26 4 24 22 H1306 q-14 -2 -10 -14 Z" />
        </g>
      </g>

      {/* Layer 1: far hills */}
      <g data-layer="1" filter="url(#paper-lift)">
        <path
          d="M-120 640 Q120 520 360 590 T820 570 T1260 600 T1720 540 V960 H-120 Z"
          fill="#b7c4a9"
        />
      </g>

      {/* Layer 2: middle hills with paper trees */}
      <g data-layer="2">
        <g filter="url(#paper-lift)">
          <path
            d="M-120 720 Q140 610 420 690 T900 670 T1340 700 T1720 650 V960 H-120 Z"
            fill="#8fa58a"
          />
        </g>
        <g filter="url(#paper-cut-fine)" fill="#6f8a6f">
          {[
            [250, 704, 1],
            [338, 716, 0.72],
            [1060, 700, 0.9],
            [1130, 712, 0.65],
            [1480, 690, 1.05],
          ].map(([x, y, k]) => (
            <g key={x} transform={`translate(${x} ${y}) scale(${k})`}>
              <path d="M0 -150 L-34 -92 H-16 L-48 -40 H-22 L-62 14 H62 L22 -40 H48 L16 -92 H34 Z" />
              <rect x="-8" y="14" width="16" height="26" fill="#5c7560" />
            </g>
          ))}
        </g>
      </g>

      {/* Layer 3: front hills */}
      <g data-layer="3" filter="url(#paper-lift)">
        <path
          d="M-120 800 Q180 710 520 780 T1060 770 T1500 790 T1720 760 V960 H-120 Z"
          fill="#c9826a"
        />
        <path
          d="M-120 850 Q260 790 640 840 T1200 835 T1720 830 V960 H-120 Z"
          fill="#a9564f"
        />
      </g>
    </svg>
  )
}
