import { useReducedMotion } from '../hooks/useMediaQuery'

/** Pill with a bouncing down-arrow that smooth-scrolls to an element on the same page. */
export default function ScrollCue({ target, label, className = '' }: { target: string; label: string; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <a
      className={`scroll-cue ${className}`}
      href={`#${target}`}
      onClick={(e) => {
        const el = document.getElementById(target)
        if (!el) return
        e.preventDefault()
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      }}
    >
      <span>{label}</span>
      <span className="scroll-cue__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
      </span>
    </a>
  )
}
