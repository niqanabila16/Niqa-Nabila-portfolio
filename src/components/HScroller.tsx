import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Horizontal row of cards: scroll-snap, mouse drag, round arrow buttons and keyboard scrolling.
 * The scroll area is focusable so keyboard users can move it with the arrow keys.
 */
export default function HScroller({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false })
  const [edge, setEdge] = useState({ start: true, end: false, scrollable: false })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
      scrollable: el.scrollWidth > el.clientWidth + 8,
    })
  }, [])

  useEffect(() => {
    measure()
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  const by = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = (card?.offsetWidth ?? 320) + 20
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const el = ref.current
    if (!el) return
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    const el = ref.current
    if (!d.active || !el) return
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 6) d.moved = true
    if (d.moved) el.scrollLeft = d.startLeft - dx
  }
  const endDrag = () => {
    drag.current.active = false
  }
  // A drag must not count as a click on the card underneath.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  return (
    <div className="hscroll">
      <div
        ref={ref}
        className="hscroll__track"
        role="group"
        aria-label={label}
        tabIndex={0}
        onScroll={measure}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>
      <div className="hscroll__nav" hidden={!edge.scrollable}>
        <button type="button" className="round-btn" onClick={() => by(-1)} disabled={edge.start} aria-label={`Scroll ${label} left`}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button type="button" className="round-btn" onClick={() => by(1)} disabled={edge.end} aria-label={`Scroll ${label} right`}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}
