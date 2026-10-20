import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import DocActions from '../components/DocActions'
import HScroller from '../components/HScroller'
import ProjectArt from '../components/ProjectArt'
import ProjectCard from '../components/ProjectCard'
import PrototypeLinks from '../components/PrototypeLinks'
import ScrollCue from '../components/ScrollCue'
import TechIcon from '../components/TechIcon'
import { getRoleBySlug, profile, projectsForRole, roles } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'
import NotFound from './NotFound'

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export default function RolePage() {
  const { roleSlug } = useParams()
  const role = getRoleBySlug(roleSlug)
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref, role?.id)

  if (!role) return <NotFound />

  const projects = projectsForRole(role)
  const isQa = role.id === 'quality-assurance'
  const isSe = role.id === 'software-engineer'

  return (
    <article ref={ref} className={`role-page tone-${role.accent}`}>
      <section className="container role-hero" aria-labelledby="role-title">
        <div className="role-hero__card" data-reveal="up">
          <span className="role-hero__blob role-hero__blob--a" aria-hidden="true" />
          <span className="role-hero__blob role-hero__blob--b" aria-hidden="true" />
          <div className="role-hero__text">
            <Link className="pill pill--soft" to="/">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="flip"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              Home
            </Link>
            <h1 id="role-title">{role.title}</h1>
            <p className="role-hero__headline">{role.headline}</p>
            <p className="role-hero__intro">{role.intro}</p>
            <ul className="chip-row" aria-label="Focus areas">
              {role.focus.map((f) => (
                <li key={f} className="chip-pill">{f}</li>
              ))}
            </ul>
            <div className="role-hero__actions">
              <DocActions doc={profile.documents.cv} tone="sun" short="CV" />
              {isQa && <DocActions doc={profile.documents.qaPortfolio} tone="dark" short="QA portfolio" />}
            </div>
          </div>
          <div className="role-hero__art">
            <ProjectArt art={projects[0]?.art ?? 'srs'} />
          </div>
        </div>
        <div className="role-hero__cue">
          <ScrollCue target="details" label="More details" />
        </div>
      </section>

      <div id="details" className="container role-details">
        <section aria-labelledby="stack-title" className="role-block">
          <h2 id="stack-title" className="pill pill--lg" data-reveal="up">
            <span className="pill__dot" aria-hidden="true" />
            Tech stack
          </h2>
          <ul className="stack-grid">
            {role.stack.map((id, i) => (
              <li key={id} className="stack-grid__item" data-reveal="pop" data-delay={i * 0.06}>
                <TechIcon id={id} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="portfolio-title" className="role-block">
          <h2 id="portfolio-title" className="pill pill--lg" data-reveal="up">
            <span className="pill__dot" aria-hidden="true" />
            Portfolio
          </h2>
          <HScroller label={`${role.title} portfolio`}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </HScroller>

        </section>

        {isSe && <PrototypeLinks />}

        <section aria-labelledby="other-title" className="role-block">
          <h2 id="other-title" className="pill pill--lg" data-reveal="up">
            <span className="pill__dot" aria-hidden="true" />
            Other paths
          </h2>
          <ul className="pill-links" data-reveal="up">
            {roles
              .filter((r) => r.id !== role.id)
              .map((r) => (
                <li key={r.id}>
                  <Link className={`pill-link tone-${r.accent}`} to={`/role/${r.slug}`}>
                    {r.title}
                    <Arrow />
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
