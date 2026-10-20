import gsap from 'gsap'
import type { Point } from './threadMath'

/**
 * Both hands (the 3D wooden puppet hand and the SVG paper fallback) expose the same small API,
 * so the stage logic never needs to know which one is on screen.
 * "rank" is the finger's position from left to right on screen (0..3).
 */
export interface HandController {
  /** Raise (positive) or relax (negative) the finger at this rank. Roughly -1..1.5. */
  setLift(rank: number, value: number): void
  /** Turn the hand slightly towards the pointer (-1..1). */
  look(nx: number): void
  /** Re-pose the hand and draw it. Call once per frame while animating. */
  update(): void
  /** Where each thread is tied (fingertip), in client pixels, ordered by rank. */
  anchorsClient(): Point[]
  /** Vertical movement (px, negative = up) that the tag at this rank should follow. */
  tagOffset(rank: number): number
}

/** Fallback controller for the SVG paper hand (used when WebGL is unavailable). */
export function svgHandController(stage: HTMLElement): HandController {
  const fingers = Array.from(stage.querySelectorAll<HTMLElement>('.finger'))
  const lifts = [0, 0, 0, 0]
  // The paper hand is drawn upright and rotated 180deg, so rank r is finger index 3 - r.
  const fingerFor = (rank: number) => 3 - rank

  return {
    setLift(rank, value) {
      lifts[rank] = value
    },
    look() {},
    update() {
      lifts.forEach((total, rank) => {
        const f = fingers[fingerFor(rank)]
        if (!f) return
        gsap.set(f, { y: total * 9, rotation: total * 3, svgOrigin: `${f.dataset.ox} ${f.dataset.oy}` })
      })
    },
    anchorsClient() {
      return Array.from(stage.querySelectorAll('[data-anchor]'))
        .map((el) => {
          const r = el.getBoundingClientRect()
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
        })
        .sort((a, b) => a.x - b.x)
    },
    tagOffset(rank) {
      return -lifts[rank] * 10
    },
  }
}
