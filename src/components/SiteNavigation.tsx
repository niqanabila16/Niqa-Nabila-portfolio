import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { profile, roles } from '../data'
import { DocViewer } from './DocActions'

export default function SiteNavigation() {
  const { pathname } = useLocation()
  // The menu is "open for a given path", so it closes by itself after any navigation.
  const [openPath, setOpenPath] = useState<string | null>(null)
  const open = openPath === pathname
  const cv = profile.documents.cv
  const [cvOpen, setCvOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenPath(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="site-header">
      <div className="nav-pill">
        <Link to="/" className="brand" aria-label={`${profile.name}, home`}>
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">{profile.shortName} Nabila</span>
        </Link>

        <nav id="primary-nav" className="primary-nav" data-open={open} aria-label="Primary">
          <ul>
            {roles.map((role) => (
              <li key={role.id}>
                <NavLink to={`/role/${role.slug}`}>{role.title}</NavLink>
              </li>
            ))}
            <li>
              <Link to="/#contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          {cv.url ? (
            <>
              <button type="button" className="btn btn--sun btn--sm" onClick={() => setCvOpen(true)} aria-haspopup="dialog">
                View CV
              </button>
              <DocViewer doc={cv} open={cvOpen} onClose={() => setCvOpen(false)} />
            </>
          ) : (
            <Link className="btn btn--sun btn--sm" to="/#contact">Contact</Link>
          )}
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className="nav-toggle__bars" aria-hidden="true" />
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
