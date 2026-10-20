import { useLayoutEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useMediaQuery'

gsap.registerPlugin(ScrollTrigger)

const FROM: Record<string, gsap.TweenVars> = {
  up: { y: 36 },
  left: { x: -60 },
  right: { x: 60 },
  pop: { scale: 0.82, y: 14 },
}

/**
 * Scroll-driven motion for everything inside `scope`:
 *  - [data-reveal="up|left|right|pop"]  fades and slides in once when scrolled into view
 *    (optional data-delay in seconds for staggering)
 *  - [data-grow]                        scales from 0 to 1 along the Y axis while scrolling (timeline line)
 * Does nothing under prefers-reduced-motion, so content is simply visible.
 * Every trigger is created inside a gsap.context and reverted on unmount.
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>, key?: string) {
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const root = scope.current
    if (reduced || !root) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          ...FROM[el.dataset.reveal ?? 'up'],
          opacity: 0,
          duration: 0.85,
          delay: Number(el.dataset.delay) || 0,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-grow]').forEach((el) => {
        const track = el.parentElement ?? el
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: { trigger: track, start: 'top 65%', end: 'bottom 70%', scrub: 0.6 },
          },
        )
      })
    }, root)

    void document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => ctx.revert()
  }, [reduced, scope, key])
}
