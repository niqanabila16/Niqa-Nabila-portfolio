const scallopPath = (count: number, width: number, top: number, depth: number) => {
  const step = width / count
  let d = `M0 0 H${width} V${top}`
  for (let i = 0; i < count; i += 1) {
    d += ` a ${step / 2} ${depth} 0 0 1 ${-step} 0`
  }
  return `${d} Z`
}

/** Pairs of paper curtains that gather towards the edges when opened. */
export function Curtains() {
  return (
    <div className="curtains" aria-hidden="true">
      <div className="curtain curtain--left">
        <div className="curtain__cloth" />
        <div className="curtain__shade" />
      </div>
      <div className="curtain curtain--right">
        <div className="curtain__cloth" />
        <div className="curtain__shade" />
      </div>
    </div>
  )
}

/** Fixed top valance that stays after the curtains open and frames the stage. */
export function Valance() {
  return (
    <svg
      className="valance"
      viewBox="0 0 1600 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g filter="url(#paper-cut-fine)">
        <path d={scallopPath(16, 1600, 44, 26)} fill="#5c2030" />
        <path d={scallopPath(16, 1600, 30, 20)} fill="#7a2e3b" transform="translate(0 -2)" />
      </g>
      <path
        d="M0 14 H1600"
        stroke="#e8cfc0"
        strokeOpacity="0.5"
        strokeDasharray="4 8"
        strokeWidth="1.5"
      />
    </svg>
  )
}

/** The front edge of the stage; the paper hand rises from behind it. */
export function StageLip() {
  const lights = Array.from({ length: 17 }, (_, i) => 50 + i * 94)
  return (
    <svg
      className="stage-lip"
      viewBox="0 0 1600 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g filter="url(#paper-lift)">
        <path
          d="M0 14 Q200 4 400 12 T800 10 T1200 14 T1600 8 V60 H0 Z"
          fill="#5c2030"
        />
      </g>
      <g fill="#f6efe2" fillOpacity="0.85">
        {lights.map((x) => (
          <ellipse key={x} cx={x} cy="30" rx="9" ry="4.5" />
        ))}
      </g>
    </svg>
  )
}
