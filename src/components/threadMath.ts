export interface Point {
  x: number
  y: number
}

/**
 * Cubic path from a fingertip to a tag eyelet.
 * - `leave` is the direction the thread leaves the finger,
 * - `arrive` is the direction pointing away from the tag at its eyelet,
 *   so the thread meets the tag head-on rather than cutting across it.
 * - `slack` (0..1) controls curvature: lower is taut, higher is looser.
 *   Hovering a tag lowers it, which makes its thread visibly tighten.
 * - `sway` nudges the lower control point sideways to follow the tag's tilt.
 */
export function threadPath(
  from: Point,
  to: Point,
  leave: Point,
  arrive: Point,
  slack: number,
  sway = 0,
): string {
  const dist = Math.hypot(to.x - from.x, to.y - from.y)
  const reach = dist * (0.18 + slack * 0.55)
  const c1x = from.x + leave.x * reach
  const c1y = from.y + leave.y * reach
  const c2x = to.x + arrive.x * reach + sway
  const c2y = to.y + arrive.y * reach
  const f = (n: number) => n.toFixed(1)
  return `M${f(from.x)} ${f(from.y)} C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(to.x)} ${f(to.y)}`
}
