import { useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { getProject, getRoleBySlug, profile, roles } from '../data'
import type { Role } from '../data'
import { DocViewer } from './DocActions'
import Modal from './Modal'

/** The role the visitor is currently looking at, from the address: /role/<slug> or /projects/<id>. */
function useCurrentRole(): Role | undefined {
  const { pathname } = useLocation()
  const [, section, key] = pathname.split('/')
  if (section === 'role') return getRoleBySlug(key)
  if (section === 'projects') {
    const project = getProject(key)
    return roles.find((r) => r.id === project?.primaryRole)
  }
  return undefined
}

/**
 * Every role has its own CV. On a role or project page the button opens that role's CV;
 * elsewhere it opens a short list so the visitor picks the CV that fits.
 */
export default function CvButton({ className, children }: { className: string; children: ReactNode }) {
  const current = useCurrentRole()
  const [open, setOpen] = useState(false)
  const [viewing, setViewing] = useState<Role | null>(null)
  const available = roles.filter((r) => profile.documents.cvs[r.id]?.url)
  if (available.length === 0) return null

  const direct = current && profile.documents.cvs[current.id]?.url ? current : null
  return (
    <>
      <button type="button" className={className} onClick={() => (direct ? setViewing(direct) : setOpen(true))} aria-haspopup="dialog">
        {children}
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Choose a CV" size="md">
        <p className="modal__note">One CV per role. Pick the one that fits.</p>
        <ul className="cv-list">
          {available.map((r) => (
            <li key={r.id} className="cv-list__row">
              <span className="cv-list__name">{r.title}</span>
              <span className="cv-list__actions">
                <button type="button" className="btn btn--dark btn--sm" onClick={() => { setOpen(false); setViewing(r) }}>
                  Preview
                </button>
                <a className="btn btn--sun btn--sm" href={profile.documents.cvs[r.id].url} download>
                  Download
                </a>
              </span>
            </li>
          ))}
        </ul>
      </Modal>

      {viewing && (
        <DocViewer
          doc={{ ...profile.documents.cvs[viewing.id], label: `CV, ${viewing.title}` }}
          open
          onClose={() => setViewing(null)}
        />
      )}
    </>
  )
}
