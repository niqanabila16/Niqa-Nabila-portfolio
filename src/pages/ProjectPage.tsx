import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import BlockView from '../components/blocks/BlockView'
import ProjectArt from '../components/ProjectArt'
import StatusBadge from '../components/StatusBadge'
import { CASE_STUDY_SECTIONS, getProject, getRole } from '../data'
import type { Block, Project } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'
import NotFound from './NotFound'

/** Links and downloads sit in the header so they are the first thing a visitor can use. */
function ProjectLinks({ project }: { project: Project }) {
  const links = project.links.filter((l) => l.url)
  if (links.length === 0) return null
  return (
    <ul className="project-links" aria-label="Links and downloads">
      {links.map((l) => (
        <li key={l.label}>
          {l.download ? (
            <a className="btn btn--sun btn--sm" href={l.url} download>
              {l.label}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
            </a>
          ) : (
            <a className="btn btn--dark btn--sm" href={l.url} target="_blank" rel="noreferrer noopener">
              {l.label}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ProjectPage() {
  const { projectId } = useParams()
  const project = getProject(projectId)
  const ref = useRef<HTMLElement>(null)
  useScrollReveal(ref, projectId)

  if (!project) return <NotFound />

  const role = getRole(project.primaryRole)
  const sections = CASE_STUDY_SECTIONS.filter((s) => s.key !== 'links' && (project.caseStudy[s.key]?.length ?? 0) > 0)
  const related = project.relatedProjectId ? getProject(project.relatedProjectId) : undefined

  return (
    <article ref={ref} className={`case-study tone-${role?.accent ?? 'terracotta'}`}>
      <section className="container role-hero" aria-labelledby="case-title">
        <div className="role-hero__card" data-reveal="up">
          <span className="role-hero__blob role-hero__blob--a" aria-hidden="true" />
          <span className="role-hero__blob role-hero__blob--b" aria-hidden="true" />
          <div className="role-hero__text">
            {role && (
              <Link className="pill pill--soft" to={`/role/${role.slug}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="flip"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                {role.title}
              </Link>
            )}
            <div className="case-study__badges">
              <StatusBadge status={project.status} />
            </div>
            <h1 id="case-title">{project.title}</h1>
            <p className="role-hero__headline">{project.summary}</p>
            <p className="chip-row">
              <span className="chip-pill">{project.context}</span>
              {project.period && <span className="chip-pill chip-pill--soft">{project.period}</span>}
            </p>
            <ul className="chip-row" aria-label="Skills used">
              {project.tags.map((t) => (
                <li key={t} className="chip-pill chip-pill--soft">{t}</li>
              ))}
            </ul>
            <ProjectLinks project={project} />
          </div>
          <div className="role-hero__art">
            {project.cover ? (
              <img className="cover-img cover-img--hero" src={project.cover} alt="" decoding="async" />
            ) : (
              <ProjectArt art={project.art} />
            )}
          </div>
        </div>
      </section>

      <div className="container case-study__layout">
        <nav className="case-toc bubble" aria-label="Case study sections">
          <ol>
            {sections.map((s, i) => (
              <li key={s.key}>
                <a href={`#${s.key}`}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span> {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="case-study__content">
          {sections.map((s, i) => {
            const blocks: Block[] = project.caseStudy[s.key] ?? []
            return (
              <section key={s.key} id={s.key} className="case-section bubble" aria-labelledby={`${s.key}-h`} data-reveal="up">
                <h2 id={`${s.key}-h`}>
                  <span className="case-section__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {s.label}
                </h2>
                <div className="block-stack">
                  {blocks.map((b, j) => <BlockView key={`${s.key}-${j}`} block={b} />)}
                </div>
              </section>
            )
          })}

          {related && (
            <Link className="pill-link related" to={`/projects/${related.id}`}>
              {related.title}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
