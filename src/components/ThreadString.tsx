/**
 * One illustrated thread: a faint offset shadow plus the thread itself.
 * `pathLength={1}` normalises the stroke length, so the draw-on effect is a
 * simple 1 -> 0 dash offset no matter how the geometry changes. The `d`
 * attribute is written imperatively by the stage on every frame that matters.
 */
export default function ThreadString({ index }: { index: number }) {
  return (
    <g className="thread" data-thread={index}>
      <path className="thread__shadow" pathLength={1} transform="translate(1.6 3)" />
      <path className="thread__line" pathLength={1} />
    </g>
  )
}
