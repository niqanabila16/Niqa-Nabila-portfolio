import { Link } from 'react-router-dom'
import { profile } from '../data'
import ProjectArt from './ProjectArt'

/** Centred zig-zag timeline: each entry is an illustrated bubble with an arrow to more detail. */
export default function BackgroundTimeline() {
  return (
    <ol className="zigzag">
      <li className="zigzag__line" aria-hidden="true">
        <span className="zigzag__progress" data-grow />
      </li>
      {profile.background.map((item, i) => (
        <li key={item.id} className={`zig-item ${i % 2 ? 'is-right' : 'is-left'}`}>
          <span className="zig-item__dot" aria-hidden="true" data-reveal="pop" />
          <article className={`zig-card tone-${['terracotta', 'sage', 'blue', 'rose'][i % 4]}`} data-reveal={i % 2 ? 'right' : 'left'}>
            <div className="zig-card__panel">
              {item.image ? (
                <img className="cover-img" src={item.image} alt="" loading="lazy" decoding="async" draggable={false} />
              ) : (
                <ProjectArt art={item.art} />
              )}
            </div>
            <div className="zig-card__body">
              <p className="zig-card__meta">
                <span className="chip-pill">{item.place}</span>
                {item.period && <span className="chip-pill chip-pill--soft">{item.period}</span>}
              </p>
              <h3>{item.title}</h3>
              <p>{item.blurb}</p>
              <Link to={item.to} className="arrow-link">
                <span>More details</span>
                <span className="arrow-link__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
                <span className="sr-only"> about {item.title}</span>
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ol>
  )
}
