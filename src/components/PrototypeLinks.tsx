import { Link } from 'react-router-dom'
import { profile } from '../data'
import ProjectArt from './ProjectArt'

/** Figma prototypes (SUARA, GotoASEAN). Each card opens the Figma file; the link below it opens the case study. */
export default function PrototypeLinks({ heading = 'Design prototypes' }: { heading?: string }) {
  return (
    <section className="proto" aria-labelledby="proto-title">
      <h2 id="proto-title" className="pill pill--lg" data-reveal="up">
        <span className="pill__dot" aria-hidden="true" />
        {heading}
      </h2>
      <ul className="proto__list">
        {profile.prototypes.map((p, i) => (
          <li key={p.id} className="proto__item bubble" data-reveal="up" data-delay={i * 0.08}>
            <div className="proto__art">
              <ProjectArt art={p.art} />
            </div>
            <div className="proto__body">
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <div className="proto__actions">
                <a className="btn btn--sun btn--sm" href={p.url} target="_blank" rel="noreferrer noopener">
                  Open Figma prototype
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <Link className="pill-link" to={`/projects/${p.projectId}`}>
                  Read the case study
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
