import { Link } from 'react-router-dom'
import { getRole } from '../data'
import type { Project } from '../data'
import ProjectArt from './ProjectArt'
import StatusBadge from './StatusBadge'

/** Illustrated project bubble: pastel panel, number, title, one-line summary. */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tone = getRole(project.primaryRole)?.accent ?? 'terracotta'
  return (
    <article className={`proj-card tone-${tone}`} data-card data-reveal="up" data-delay={Math.min(index, 4) * 0.08}>
      <div className="proj-card__panel">
        {project.cover ? (
          <img className="cover-img" src={project.cover} alt="" loading="lazy" decoding="async" draggable={false} />
        ) : (
          <ProjectArt art={project.art} />
        )}
        <span className="proj-card__status">
          <StatusBadge status={project.status} />
        </span>
      </div>
      <p className="proj-card__num">{String(index + 1).padStart(2, '0')}</p>
      <h3 className="proj-card__title">
        <Link to={`/projects/${project.id}`} className="stretched" draggable={false}>
          {project.title}
        </Link>
      </h3>
      <p className="proj-card__summary">{project.summary}</p>
      <span className="proj-card__more" aria-hidden="true">
        <span>Case study</span>
        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </article>
  )
}
