import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { HandController } from './handController'
import type { Point } from './threadMath'

interface Props {
  onReady: (controller: HandController) => void
  onFail: () => void
}

/** Left to right as seen from the front camera at rest. The real order is re-measured after loading. */
const FINGER_NAMES = ['Pinky', 'Ring', 'Middle', 'Index'] as const
/** How much each of the three finger segments bends per unit of lift (radians). Segment 2 moves most. */
const SEGMENT_GAIN = [0.18, 0.32, 0.21]
/** The fingertip is this far beyond the last bone joint (model units). It drives how far the tags follow. */
const TIP_LENGTH = 1.3
/** The thread is wrapped around the base of each finger: loop radius, and distance along the first segment. */
const LOOP_RADIUS = 0.5
const LOOP_TUBE = 0.05
const LOOP_ALONG = 0.32
const THREAD_COLOR = 0x5c2030
const TARGET = new THREE.Vector3(6.2, 5.3, -0.5)
const CAMERA_DISTANCE = 24
const AZIMUTH = Math.PI / 2 // looking along the fingers: forearm above, four fingers hanging below
const ELEVATION = 0.12

/**
 * Rigged wooden puppet hand (public/models/puppet-hand.glb) rendered with three.js.
 * A small thread loop is wrapped around the base of each finger as real geometry, so it bends with
 * the finger. The hand draws only when something changes (the stage calls update() each frame while
 * animating), so there is no render loop of its own.
 */
export default function PuppetHand3D({ onReady, onFail }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    // The canvas is created here, not in JSX: React StrictMode runs this effect twice in development,
    // and a canvas whose WebGL context was released cannot be reused by the second run.
    const canvas = document.createElement('canvas')
    host.prepend(canvas)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    } catch {
      canvas.remove()
      onFail()
      return
    }
    renderer.setClearAlpha(0)

    const scene = new THREE.Scene()
    scene.add(new THREE.HemisphereLight(0xfff4e6, 0x8a6a4a, 1.5))
    const key = new THREE.DirectionalLight(0xffffff, 2.1)
    key.position.set(9, 8, 5)
    scene.add(key)
    const camera = new THREE.PerspectiveCamera(22, 1, 0.1, 200)

    let disposed = false
    let root: THREE.Object3D | null = null
    const lifts = [0, 0, 0, 0]
    let yaw = 0
    let yawTarget = 0
    interface Tip {
      bones: THREE.Object3D[]
      rest: number[]
      loop: THREE.Mesh
    }
    const tips: Tip[] = []
    let order: number[] = [0, 1, 2, 3] // rank -> index in `tips`
    let restTipY: number[] = [0, 0, 0, 0] // fingertip rest height (ndc), by rank
    const tipNdc: Point[] = [0, 1, 2, 3].map(() => ({ x: 0, y: 0 })) // fingertips: drive the tag movement
    const loopNdc: Point[] = [0, 1, 2, 3].map(() => ({ x: 0, y: 0 })) // loop at the finger base: where the thread starts
    const v = new THREE.Vector3()
    const q = new THREE.Quaternion()
    const axis = new THREE.Vector3()
    const toCam = new THREE.Vector3()

    const placeCamera = () => {
      const az = AZIMUTH + yaw
      camera.position.set(
        TARGET.x + CAMERA_DISTANCE * Math.sin(az) * Math.cos(ELEVATION),
        TARGET.y + CAMERA_DISTANCE * Math.sin(ELEVATION),
        TARGET.z + CAMERA_DISTANCE * Math.cos(az) * Math.cos(ELEVATION),
      )
      camera.lookAt(TARGET)
      camera.updateMatrixWorld(true)
    }

    /** Pose the fingers, then measure where the thread loops and fingertips land in screen space. */
    const pose = () => {
      tips.forEach((t, i) => {
        t.bones.forEach((bone, s) => {
          bone.rotation.z = t.rest[s] + lifts[order.indexOf(i)] * SEGMENT_GAIN[s]
        })
      })
      root?.updateMatrixWorld(true)
      placeCamera()
      tips.forEach((t, i) => {
        const tip = t.bones[2]
        tip.getWorldPosition(v)
        tip.getWorldQuaternion(q)
        v.add(axis.set(0, TIP_LENGTH, 0).applyQuaternion(q)).project(camera)
        tipNdc[i] = { x: v.x, y: v.y }

        // The thread leaves the front of the loop, the point facing the camera.
        t.loop.getWorldPosition(v)
        t.bones[0].getWorldQuaternion(q)
        axis.set(0, 1, 0).applyQuaternion(q)
        toCam.copy(camera.position).sub(v)
        toCam.addScaledVector(axis, -toCam.dot(axis)).normalize()
        v.addScaledVector(toCam, LOOP_RADIUS).project(camera)
        loopNdc[i] = { x: v.x, y: v.y }
      })
    }

    const draw = () => {
      pose()
      renderer.render(scene, camera)
    }

    // Render resolution (device pixels per CSS pixel). It drops automatically if frames get slow,
    // so weak or GPU-less devices stay responsive.
    let quality = Math.min(window.devicePixelRatio || 1, 2)
    let lastFrame = 0
    let slowAvg = 0
    let slowFrames = 0
    const adaptQuality = () => {
      const now = performance.now()
      const dt = lastFrame ? now - lastFrame : 16
      lastFrame = now
      if (dt > 400) return // tab was hidden or paused, not a real measurement
      slowAvg = slowAvg ? slowAvg * 0.85 + dt * 0.15 : dt
      slowFrames += 1
      if (slowFrames >= 20 && slowAvg > 45 && quality > 0.5) {
        quality = Math.max(0.5, quality * 0.75)
        slowFrames = 0
        slowAvg = 0
        resize()
      }
    }

    const resize = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (!w || !h) return
      renderer.setPixelRatio(quality)
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      if (root) draw()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    resize()

    new GLTFLoader().load(
      `${import.meta.env.BASE_URL}models/puppet-hand.glb`,
      (gltf) => {
        if (disposed) return
        root = gltf.scene
        scene.add(root)
        const thread = new THREE.MeshStandardMaterial({ color: THREAD_COLOR, roughness: 0.55, metalness: 0 })
        const loopGeometry = new THREE.TorusGeometry(LOOP_RADIUS, LOOP_TUBE, 10, 40)

        for (const name of FINGER_NAMES) {
          const bones = [1, 2, 3].map((n) => {
            let found: THREE.Object3D | null = null
            root!.traverse((o) => {
              if (o.name.startsWith(`${name}${n}_`)) found = o
            })
            return found as THREE.Object3D | null
          })
          if (bones.some((b) => !b)) {
            onFail()
            return
          }
          const list = bones as THREE.Object3D[]
          // A thin torus around the first finger segment, with its axis along the finger.
          const loop = new THREE.Mesh(loopGeometry, thread)
          loop.position.set(0, LOOP_ALONG, 0)
          loop.rotation.x = Math.PI / 2
          list[0].add(loop)
          tips.push({ bones: list, rest: list.map((b) => b.rotation.z), loop })
        }

        // Measure the resting layout once: which finger is leftmost on screen, and where each tip rests.
        pose()
        order = tips.map((_, i) => i).sort((a, b) => loopNdc[a].x - loopNdc[b].x)
        restTipY = order.map((i) => tipNdc[i].y)
        draw()
        host.dataset.ready = 'true'

        const controller: HandController = {
          setLift(rank, value) {
            lifts[rank] = value
          },
          look(nx) {
            yawTarget = nx * 0.16
          },
          update() {
            yaw += (yawTarget - yaw) * 0.08
            adaptQuality()
            draw()
          },
          anchorsClient() {
            const r = canvas.getBoundingClientRect()
            return order.map((i) => ({
              x: r.left + (loopNdc[i].x * 0.5 + 0.5) * r.width,
              y: r.top + (-loopNdc[i].y * 0.5 + 0.5) * r.height,
            }))
          },
          tagOffset(rank) {
            const r = canvas.getBoundingClientRect()
            return -(tipNdc[order[rank]].y - restTipY[rank]) * 0.5 * r.height * 0.75
          },
        }
        onReady(controller)
      },
      undefined,
      () => {
        if (!disposed) onFail()
      },
    )

    return () => {
      disposed = true
      observer.disconnect()
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.isMesh) {
          mesh.geometry.dispose()
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
          mats.forEach((m) => {
            Object.values(m).forEach((val) => {
              if (val instanceof THREE.Texture) val.dispose()
            })
            m.dispose()
          })
        }
      })
      renderer.dispose()
      renderer.forceContextLoss()
      canvas.remove()
    }
    // onReady / onFail are stable callbacks from the stage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={hostRef} className="hand3d" role="img" aria-label="A wooden puppet hand with four threads looped around the base of its fingers, each leading to a career path" />
  )
}
