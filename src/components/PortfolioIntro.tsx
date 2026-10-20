import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { profile, roles } from '../data'
import { markIntroSeen, introSeen } from '../hooks/useIntroSeen'
import { useCompactStage, useReducedMotion } from '../hooks/useMediaQuery'
import CareerTag from './CareerTag'
import { Curtains, StageLip, Valance } from './CurtainStage'
import PaperHand from './illustrations/PaperHand'
import Scenery from './illustrations/Scenery'
import ScrollCue from './ScrollCue'
import { svgHandController } from './handController'
import type { HandController } from './handController'
import ThreadString from './ThreadString'
import { threadPath } from './threadMath'

// three.js is only downloaded for the home page, and only when WebGL is available.
const PuppetHand3D = lazy(() => import('./PuppetHand3D'))
import type { Point } from './threadMath'

type Phase = 'closed' | 'opening' | 'open'

/** Which knuckle ring (ranked left to right on screen) each tag is tied to. */
const TIP_RANK_WIDE = [0, 1, 2, 3]
/** Compact layout is a zig-zag stack: left tags take the left fingers so threads never cross. */
const TIP_RANK_COMPACT = [0, 2, 1, 3]
const PARALLAX_DEPTH = [4, 9, 16, 26]
/** Longest the opening waits for the 3D hand to finish loading (seconds). */
const HAND_WAIT_MAX = 6

interface Motion {
  /** Idle sway, -1..1 */
  w: number
  /** Extra lift while a tag is hovered or focused */
  lift: number
}

const webglAvailable = () => {
  try {
    const c = document.createElement('canvas')
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

const prefersReducedNow = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function PortfolioIntro() {
  const reduced = useReducedMotion()
  const compact = useCompactStage()
  const navigate = useNavigate()

  const stageRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const slackRef = useRef<number[]>([0.5, 0.5, 0.5, 0.5])
  const motionRef = useRef<Motion[]>(roles.map(() => ({ w: 0, lift: 0 })))
  const handRef = useRef<HandController | null>(null)
  // Mirrors of the hand state for effects that must not restart when the hand finishes loading.
  const handModeRef = useRef<'3d' | 'svg'>('3d')
  const hand3dReadyRef = useRef(false)
  const userTriggered = useRef(false)
  const leaving = useRef(false)

  const [storedPhase, setPhase] = useState<Phase>(() =>
    introSeen() || prefersReducedNow() ? 'open' : 'closed',
  )
  // Reduced motion always shows the finished scene, even if it is switched on mid-session.
  const phase: Phase = reduced ? 'open' : storedPhase
  const [announcement, setAnnouncement] = useState('')
  // '3d' = wooden puppet hand (three.js). 'svg' = paper hand, used when WebGL is unavailable or the model fails.
  const [handMode, setHandMode] = useState<'3d' | 'svg'>(() => (webglAvailable() ? '3d' : 'svg'))
  const [hand3dReady, setHand3dReady] = useState(false)
  const handReady = handMode === 'svg' || hand3dReady
  useLayoutEffect(() => {
    handModeRef.current = handMode
    hand3dReadyRef.current = hand3dReady
  }, [handMode, hand3dReady])
  const onHandReady = useCallback((controller: HandController) => {
    handRef.current = controller
    hand3dReadyRef.current = true
    setHand3dReady(true)
  }, [])
  const onHandFail = useCallback(() => {
    handRef.current = null
    hand3dReadyRef.current = false
    handModeRef.current = 'svg'
    setHand3dReady(false)
    setHandMode('svg')
  }, [])
  const pending = phase !== 'open'
  const ranks = compact ? TIP_RANK_COMPACT : TIP_RANK_WIDE

  /* ---------------------------------------------------------------- */
  /* Thread geometry: knuckle ring -> tag eyelet                      */
  /* ---------------------------------------------------------------- */
  const renderThreads = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return
    const box = stage.getBoundingClientRect()
    const toLocal = (el: Element): Point => {
      const r = el.getBoundingClientRect()
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top }
    }
    const hand = handRef.current
    if (!hand) return
    const rings = hand.anchorsClient().map((p) => ({ x: p.x - box.left, y: p.y - box.top }))
    const eyelets = stage.querySelectorAll('.tag__eyelet')
    const tags = stage.querySelectorAll<HTMLElement>('.tag')
    const order = stage.dataset.compact === 'true' ? TIP_RANK_COMPACT : TIP_RANK_WIDE
    const leave: Point = { x: 0, y: 1 } // threads fall away from the hand
    const arrive: Point = { x: 0, y: -1 } // and meet each tag from above

    stage.querySelectorAll('[data-thread]').forEach((group, i) => {
      const from = rings[order[i]]
      const eyelet = eyelets[i]
      if (!from || !eyelet) return
      const tilt = Number(gsap.getProperty(tags[i], 'rotation')) || 0
      const d = threadPath(from, toLocal(eyelet), leave, arrive, slackRef.current[i], tilt * 1.4)
      group.querySelectorAll('path').forEach((p) => p.setAttribute('d', d))
    })
  }, [])

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (handMode === 'svg') handRef.current = svgHandController(stage)
    renderThreads()
    const observer = new ResizeObserver(() => renderThreads())
    observer.observe(stage)
    void document.fonts?.ready.then(renderThreads)
    return () => observer.disconnect()
  }, [compact, phase, renderThreads, handMode, handReady])

  /* ---------------------------------------------------------------- */
  /* Opening sequence                                                 */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (phase !== 'opening') return
    const stage = stageRef.current
    if (!stage) return
    const q = gsap.utils.selector(stage) as (selector: string) => HTMLElement[]
    const gathered = parseFloat(getComputedStyle(stage).getPropertyValue('--gathered')) || 0.12

    const ctx = gsap.context(() => {
      // If the 3D hand is still loading, hold the sequence so the curtains never open on an empty stage.
      const waitingForHand = handModeRef.current === '3d' && !hand3dReadyRef.current
      const tl = gsap.timeline({
        paused: waitingForHand,
        onUpdate: renderThreads,
        onComplete: () => {
          markIntroSeen()
          setPhase('open')
        },
      })
      timelineRef.current = tl
      if (waitingForHand) gsap.delayedCall(HAND_WAIT_MAX, () => tl.play())

      tl.to(q('.invitation'), { autoAlpha: 0, y: -14, duration: 0.25, ease: 'power1.in' }, 0)

      // 1-2. Curtains gather towards the edges; their inner shadow relaxes as they open.
      tl.to(q('.curtain'), { scaleX: gathered, duration: 1, ease: 'power3.inOut' }, 0.1)
      tl.to(q('.curtain__shade'), { opacity: 0.2, duration: 1, ease: 'power2.inOut' }, 0.1)

      // 3. Scenery settles into place layer by layer.
      tl.from(
        q('[data-layer]'),
        { y: 22, scale: 1.03, transformOrigin: '50% 100%', duration: 1.05, ease: 'power2.out', stagger: 0.07 },
        0.15,
      )

      // 4. The hand is lowered from behind the valance, like a marionette controller.
      tl.fromTo(
        q('.hand-wrap'),
        { yPercent: -30, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.45,
      )

      tl.fromTo(
        q('.stage__heading'),
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        1.0,
      )

      // 5-7. Each thread draws from its knuckle ring, then its tag settles at the far end.
      q('.thread').forEach((group, i) => {
        const start = 0.85 + i * 0.07
        tl.fromTo(
          group.querySelectorAll('path'),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.5, ease: 'power1.inOut' },
          start,
        )
        tl.fromTo(q('.tag-slot')[i], { opacity: 0 }, { opacity: 1, duration: 0.2 }, start + 0.3)
        tl.fromTo(
          q('.tag__enter')[i],
          { scale: 0.8, y: -16, rotation: i % 2 ? 9 : -9 },
          { scale: 1, y: 0, rotation: 0, duration: 0.45, ease: 'back.out(1.3)' },
          start + 0.3,
        )
      })
    }, stage)

    return () => {
      timelineRef.current = null
      ctx.revert() // the 'open' CSS state is identical to the timeline's end state
    }
  }, [phase, renderThreads])

  /* ---------------------------------------------------------------- */
  /* Stable interactive state: marionette motion, parallax            */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (phase !== 'open' || reduced) return
    const stage = stageRef.current
    if (!stage) return
    const q = gsap.utils.selector(stage) as (selector: string) => HTMLElement[]

    const ctx = gsap.context(() => {
      const tags = q('.tag')
      // Tags sit closer together in the compact layout, so they follow the fingers less.
      const tagGain = ranks === TIP_RANK_COMPACT ? 0.5 : 1
      const hand = handRef.current
      if (!hand) return
      const motion = motionRef.current
      motion.forEach((m) => {
        m.w = 0
      })

      // One shared motion value per tag lifts its finger. The tag then follows the fingertip's own
      // vertical movement, and the ticker redraws the thread between them.
      const apply = (t: number) => {
        const total = Math.max(-1, Math.min(1.5, motion[t].w + motion[t].lift))
        hand.setLift(ranks[t], total)
      }

      const sways = motion.map((m, t) =>
        gsap
          .timeline({ delay: t * 0.18 })
          .to(m, { w: -0.12, duration: 0.7, ease: 'power2.out' })
          .to(m, { w: 0.4, duration: 1.6 + t * 0.35, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
      )

      const tick = () => {
        motion.forEach((_, t) => apply(t))
        hand.update()
        tags.forEach((el, t) => {
          const total = Math.max(-1, Math.min(1.5, motion[t].w + motion[t].lift))
          gsap.set(el, { y: hand.tagOffset(ranks[t]) * tagGain, rotation: total * 1.4 })
        })
        renderThreads()
      }
      const run = (active: boolean) => {
        gsap.ticker.remove(tick)
        sways.forEach((tl) => (active ? tl.resume() : tl.pause()))
        if (active) gsap.ticker.add(tick)
      }
      run(true)

      // Nothing animates while the stage is scrolled out of view.
      const io = new IntersectionObserver(([entry]) => run(entry.isIntersecting), { threshold: 0.05 })
      io.observe(stage)

      const setters = q('[data-layer]').map((layer) => gsap.quickTo(layer, 'x', { duration: 0.9, ease: 'power3' }))
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return
        const nx = (e.clientX / window.innerWidth - 0.5) * 2
        setters.forEach((set, i) => set(-nx * PARALLAX_DEPTH[i]))
        hand.look(nx)
      }
      stage.addEventListener('pointermove', onMove)

      return () => {
        io.disconnect()
        stage.removeEventListener('pointermove', onMove)
        gsap.ticker.remove(tick)
      }
    }, stage)

    return () => ctx.revert()
  }, [phase, reduced, renderThreads, ranks, handReady])

  // The hand finished loading while the sequence was waiting: let it run.
  useEffect(() => {
    if (hand3dReady && timelineRef.current?.paused()) timelineRef.current.play()
  }, [hand3dReady])

  // After a user-triggered opening, hand focus to the title so the next Tab lands on the first tag.
  useEffect(() => {
    if (phase !== 'open' || !userTriggered.current) return
    titleRef.current?.focus({ preventScroll: true })
    setAnnouncement('Curtains open. Four career paths are available as links.')
  }, [phase])

  /* ---------------------------------------------------------------- */
  /* Handlers                                                         */
  /* ---------------------------------------------------------------- */
  const start = () => {
    if (phase !== 'closed') return
    userTriggered.current = true
    setAnnouncement('Opening the curtains.')
    setPhase('opening')
  }

  const skip = () => {
    userTriggered.current = true
    if (phase === 'opening' && timelineRef.current) {
      timelineRef.current.progress(1)
      return
    }
    markIntroSeen()
    setPhase('open')
  }

  // Hovering or focusing a tag lifts its finger, which raises the tag and tightens the thread.
  const onHover = useCallback(
    (index: number, active: boolean) => {
      if (reduced) return
      gsap.to(motionRef.current[index], { lift: active ? 0.7 : 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(slackRef.current, { [index]: active ? 0.18 : 0.5, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
    },
    [reduced],
  )

  const onChoose = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    if (leaving.current) return
    const go = () => navigate(`/role/${roles[index].slug}`)
    if (reduced || !stageRef.current) return go()

    leaving.current = true
    const q = gsap.utils.selector(stageRef.current) as (selector: string) => HTMLElement[]
    const chosen = q('.tag__enter')[index]
    gsap
      .timeline({ onComplete: () => { leaving.current = false; go() } })
      .to(motionRef.current[index], { lift: 1.5, duration: 0.2, ease: 'power2.out' })
      .to(chosen, { scale: 1.08, rotation: index % 2 ? 2 : -2, duration: 0.16, ease: 'power2.out' }, 0)
      .to(chosen, { scale: 0.97, duration: 0.14, ease: 'power2.in' })
      .to(q('.tag').filter((_, j) => j !== index), { opacity: 0.35, duration: 0.25 }, 0)
  }

  return (
    <section
      ref={stageRef}
      className="stage"
      data-phase={phase}
      data-pending={pending}
      data-compact={compact}
      aria-labelledby="stage-title"
    >
      <Scenery className="stage__scenery" />

      <div className="stage__heading">
        <span className="stage__badge">Portfolio</span>
        <h1 id="stage-title" ref={titleRef} tabIndex={-1}>
          {profile.name}
        </h1>
      </div>

      <div className="hand-anchor">
        <div className="hand-wrap">
          {handMode === '3d' ? (
            <Suspense fallback={null}>
              <PuppetHand3D onReady={onHandReady} onFail={onHandFail} />
            </Suspense>
          ) : (
            <PaperHand className="hand" />
          )}
        </div>
      </div>

      <StageLip />

      <svg className="threads" aria-hidden="true" focusable="false">
        {roles.map((role, i) => (
          <ThreadString key={role.id} index={i} />
        ))}
      </svg>

      <ul className="tags" aria-label="Career paths" inert={pending}>
        {roles.map((role, i) => (
          <li key={role.id} className="tag-slot" style={{ '--i': i } as CSSProperties}>
            <CareerTag role={role} index={i} onHover={onHover} onChoose={onChoose} />
          </li>
        ))}
      </ul>

      <ScrollCue target="work" label="View all my work" className="scroll-cue--stage" />

      <Curtains />
      <Valance />

      {pending && (
        <div className="invitation">
          <div className="invitation__bubble">
            <p className="invitation__eyebrow">An introduction to my work</p>
            <p className="invitation__lead">Open the curtains to explore</p>
            <button type="button" className="btn btn--paper" onClick={start} disabled={phase !== 'closed'}>
              {phase === 'opening' ? 'Opening\u2026' : 'Open my portfolio'}
            </button>
            <button type="button" className="link-btn" onClick={skip}>
              Skip intro
            </button>
          </div>
        </div>
      )}

      {phase === 'opening' && (
        <button type="button" className="skip-floating" onClick={skip}>
          Skip intro
        </button>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </section>
  )
}
