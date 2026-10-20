import { profile } from '../data'
import CvButton from './CvButton'

/** Contact pills come from src/data/profile.ts. Empty URLs render as disabled, never as fake links. */
export default function ContactLinks() {
  return (
    <ul className="pill-links" aria-label="Contact and profiles">
      {profile.links.filter((l) => l.url).map((link) => {
        const external = link.url.startsWith('http')
        return (
          <li key={link.label}>
            <a
                className="pill-link"
                href={link.url}
                {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              >
                {link.label}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
          </li>
        )
      })}
      <li>
        <CvButton className="pill-link pill-link--button">
          CV
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
        </CvButton>
      </li>
    </ul>
  )
}
