interface FingerSpec {
  x: number
  y: number
  angle: number
  length: number
  width: number
  fill: string
}

/** Index to little finger, left to right. Fingertip eyelets are the string anchors. */
const FINGERS: FingerSpec[] = [
  { x: 150, y: 354, angle: -9, length: 170, width: 38, fill: 'url(#skin-a)' },
  { x: 196, y: 354, angle: -3, length: 195, width: 38, fill: 'url(#skin-c)' },
  { x: 242, y: 354, angle: 4, length: 178, width: 37, fill: 'url(#skin-b)' },
  { x: 282, y: 356, angle: 12, length: 140, width: 33, fill: 'url(#skin-a)' },
]

const capsule = (w: number, len: number) =>
  `M ${-w / 2} 0 L ${-w / 2} ${-(len - w / 2)} A ${w / 2} ${w / 2} 0 0 1 ${w / 2} ${-(len - w / 2)} L ${w / 2} 0 Z`

const scallops = (count: number, width: number) =>
  Array.from({ length: count }, () => `a ${width / 2} ${width / 2} 0 0 1 ${-width} 0`).join(' ')

/**
 * The hand is built from overlapping pieces of paper: sleeve, thumb, four
 * fingers, palm and a scalloped cuff. Each piece gets its own rough edge and
 * contact shadow from the shared #paper-cut filter.
 */
export default function PaperHand({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 140 400 500"
      role="img"
      aria-label="A paper-cut hand holding four threads, each tied to a career path"
      overflow="visible"
    >
      {/* Sleeve */}
      <g filter="url(#paper-cut)">
        <path d="M136 492 L264 492 L296 700 L104 700 Z" fill="url(#sleeve)" />
        <path d="M168 520 L162 700 M232 520 L238 700" stroke="#5c7560" strokeOpacity="0.35" strokeWidth="1.4" fill="none" />
      </g>

      {/* Thumb */}
      <g transform="translate(116 430) rotate(-42)" filter="url(#paper-cut)">
        <path d={capsule(42, 112)} fill="url(#skin-b)" />
        <path d="M-8 -30 Q0 -22 8 -30" stroke="#a5604b" strokeOpacity="0.3" strokeWidth="1.4" fill="none" />
      </g>

      {/* Fingers. Each .finger group is moved by GSAP: it slides towards the palm and tilts a little,
          and the string ring sits at the base of the finger so the thread moves with it. */}
      {FINGERS.map((f, i) => (
        <g key={i} className="finger" data-finger={i} data-ox={f.x} data-oy={f.y}>
          <g transform={`translate(${f.x} ${f.y}) rotate(${f.angle})`}>
            <g filter="url(#paper-cut)">
              <path d={capsule(f.width, f.length)} fill={f.fill} />
              <path
                d={`M${-f.width / 4} ${-f.length * 0.5} h${f.width / 2} M${-f.width / 4} ${-f.length * 0.72} h${f.width / 2}`}
                stroke="#a5604b"
                strokeOpacity="0.28"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </g>
            {/* String ring at the base of the finger */}
            <circle cx="0" cy="-36" r="9" fill="#f6efe2" stroke="#7a2e3b" strokeWidth="1.3" />
            <circle cx="0" cy="-36" r="3.6" fill="#5c2030" data-anchor={i} />
          </g>
        </g>
      ))}

      {/* Palm */}
      <g filter="url(#paper-cut)">
        <path
          d="M106 376 Q104 340 140 337 L262 337 Q298 340 296 376 L292 432 Q290 474 262 486 L138 486 Q110 474 108 432 Z"
          fill="url(#skin-c)"
        />
        <path d="M146 402 Q198 428 254 398" stroke="#a5604b" strokeOpacity="0.26" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M150 436 Q200 454 250 432" stroke="#a5604b" strokeOpacity="0.2" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>

      {/* Cuff with scalloped lower edge */}
      <g filter="url(#paper-cut)">
        <path d={`M124 468 H276 V498 ${scallops(8, 19)} Z`} fill="url(#cuff)" />
        <path d="M130 480 H270" stroke="#e8cfc0" strokeOpacity="0.55" strokeWidth="1.3" strokeDasharray="3 5" />
      </g>

    </svg>
  )
}
