import { Link } from 'react-router-dom'
import type { Role } from '../data'

interface Props {
  role: Role
  index: number
  onHover: (index: number, active: boolean) => void
  onChoose: (event: React.MouseEvent<HTMLAnchorElement>, index: number) => void
}

/**
 * A real navigation link styled as a luggage-tag made of paper.
 * Layers (outer to inner), each owned by exactly one system so transforms never fight:
 *   a.tag            -> GSAP idle float
 *   .tag__enter      -> GSAP entrance / click animation
 *   .tag__paper      -> CSS hover, focus and resting tilt
 */
export default function CareerTag({ role, index, onHover, onChoose }: Props) {
  return (
    <Link
      to={`/role/${role.slug}`}
      className={`tag tag--${role.accent}`}
      data-tag={index}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(index, true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && onHover(index, false)}
      onFocus={() => onHover(index, true)}
      onBlur={() => onHover(index, false)}
      onClick={(e) => onChoose(e, index)}
    >
      <span className="tag__enter">
        <span className="tag__paper">
          <span className="tag__eyelet" aria-hidden="true" />
          <span className="tag__number" aria-hidden="true">
            0{index + 1}
          </span>
          <span className="tag__title">{role.tagTitle}</span>
          {/* Line and hint share one grid cell, so revealing the hint never changes the tag's size. */}
          <span className="tag__swap">
            <span className="tag__line">{role.tagLine}</span>
            <span className="tag__hint">
              {role.tagHint}
              <span aria-hidden="true"> &rarr;</span>
            </span>
          </span>
        </span>
      </span>
    </Link>
  )
}
