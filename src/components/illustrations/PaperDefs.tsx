/**
 * Shared SVG definitions, rendered once at the app root.
 * - paper-cut:   slightly irregular edge + small contact shadow (hand, tags art)
 * - paper-lift:  larger, softer shadow for big scenery layers
 * The element is zero-sized (not display:none) because some browsers ignore
 * filters that live inside a display:none SVG.
 */
export default function PaperDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', pointerEvents: 'none' }}
    >
      <defs>
        <filter id="paper-cut" x="-8%" y="-8%" width="118%" height="124%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feDropShadow in="rough" dx="1.2" dy="2.8" stdDeviation="2.2" floodColor="#3b1d1d" floodOpacity="0.34" />
        </filter>

        <filter id="paper-cut-fine" x="-8%" y="-8%" width="118%" height="124%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="9" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feDropShadow in="rough" dx="0.8" dy="1.8" stdDeviation="1.4" floodColor="#3b1d1d" floodOpacity="0.3" />
        </filter>

        <filter id="paper-lift" x="-5%" y="-10%" width="110%" height="125%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="12" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feDropShadow in="rough" dx="0" dy="-5" stdDeviation="7" floodColor="#2e1a22" floodOpacity="0.22" />
        </filter>

        <linearGradient id="skin-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#efc7b0" />
          <stop offset="1" stopColor="#dca78d" />
        </linearGradient>
        <linearGradient id="skin-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8bba2" />
          <stop offset="1" stopColor="#d49a80" />
        </linearGradient>
        <linearGradient id="skin-c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2cdb8" />
          <stop offset="1" stopColor="#e0ac92" />
        </linearGradient>
        <linearGradient id="sleeve" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8aa387" />
          <stop offset="1" stopColor="#6f8a6f" />
        </linearGradient>
        <linearGradient id="cuff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a3443" />
          <stop offset="1" stopColor="#6c2434" />
        </linearGradient>
      </defs>
    </svg>
  )
}
