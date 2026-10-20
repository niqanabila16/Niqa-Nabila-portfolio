import { useRef } from 'react'
import { Link } from 'react-router-dom'
import BackgroundTimeline from '../components/BackgroundTimeline'
import ContactLinks from '../components/ContactLinks'
import HScroller from '../components/HScroller'
import PortfolioIntro from '../components/PortfolioIntro'
import ProjectCard from '../components/ProjectCard'
import PrototypeLinks from '../components/PrototypeLinks'
import { profile, projectsForRole, roles } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export default function HomePage() {
  const ref = useRef<HTMLDivElement>(null)
  useScrollReveal(ref)

  return (
    <>
      <PortfolioIntro />

      <div ref={ref} className="container home">
        <section className="about bubble" aria-labelledby="about-title" data-reveal="up">
          <h2 id="about-title">{profile.headline}</h2>
          <p>{profile.intro}</p>
          <ul className="pill-links">
            {roles.map((role) => (
              <li key={role.id}>
                <Link className={`pill-link tone-${role.accent}`} to={`/role/${role.slug}`}>
                  {role.title}
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="work" className="home-block" aria-labelledby="work-title">
          <h2 id="work-title" className="pill pill--lg" data-reveal="up">
            <span className="pill__dot" aria-hidden="true" />
            Work
          </h2>
          {roles.map((role) => (
            <div key={role.id} className="work-row">
              <div className="work-row__head" data-reveal="up">
                <Link className={`pill pill--link tone-${role.accent}`} to={`/role/${role.slug}`}>
                  {role.title}
                  <Arrow />
                </Link>
              </div>
              <HScroller label={`${role.title} projects`}>
                  {projectsForRole(role).map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </HScroller>
            </div>
          ))}
        </section>

 <PrototypeLinks />

        <section id="background" className="home-block" aria-labelledby="background-title">
          <h2 id="background-title" className="pill pill--lg pill--center" data-reveal="up">
            <span className="pill__dot" aria-hidden="true" />
            Background
          </h2>
          <BackgroundTimeline />
        </section>

        <section id="contact" className="contact bubble bubble--dark" aria-labelledby="contact-title" data-reveal="up">
          <h2 id="contact-title">Let&rsquo;s talk</h2>
          <ContactLinks />
        </section>
      </div>
    </>
  )
}
