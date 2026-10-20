import { useEffect, useState } from 'react'
import type { DocumentLink } from '../data'
import Modal from './Modal'

type Check = 'checking' | 'ok' | 'missing'

/** The PDF must really exist: a dev server or SPA host answers 200 with index.html for unknown paths. */
function useDocCheck(url: string, active: boolean): Check {
  const [state, setState] = useState<Check>('checking')
  useEffect(() => {
    if (!active || !url) return
    let live = true
    fetch(url, { method: 'HEAD' })
      .then((r) => {
        const type = r.headers.get('content-type') ?? ''
        if (live) setState(r.ok && type.includes('pdf') ? 'ok' : 'missing')
      })
      .catch(() => live && setState('missing'))
    return () => {
      live = false
    }
  }, [url, active])
  return state
}

export function DocViewer({ doc, open, onClose }: { doc: DocumentLink; open: boolean; onClose: () => void }) {
  const status = useDocCheck(doc.url, open)
  return (
    <Modal open={open} onClose={onClose} title={doc.label} size="xl">
      {status === 'checking' && <p className="modal__note">Loading preview&hellip;</p>}
      {status === 'missing' && (
        <p className="modal__note" role="status">
          This document is not available right now.
        </p>
      )}
      {status === 'ok' && (
        <>
          <iframe className="modal__frame" src={`${doc.url}#view=FitH`} title={`${doc.label} preview`} />
          <p className="modal__note modal__note--small">
            The preview does not load on some phones. Use <strong>Open in new tab</strong> or <strong>Download</strong> instead.
          </p>
        </>
      )}
      <div className="modal__actions">
        {status === 'ok' && (
          <>
            <a className="btn btn--dark btn--sm" href={doc.url} target="_blank" rel="noreferrer noopener">
              Open in new tab
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </a>
            <a className="btn btn--sun btn--sm" href={doc.url} download>
              Download PDF
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
            </a>
          </>
        )}
      </div>
    </Modal>
  )
}

/**
 * Two clear options for one PDF: download it, or preview it in a pop-up.
 * Documents without a URL render nothing.
 */
export default function DocActions({ doc, tone = 'dark', short }: { doc: DocumentLink; tone?: 'dark' | 'sun'; short?: string }) {
  const [open, setOpen] = useState(false)
  if (!doc.url) return null
  const name = short ?? doc.label
  return (
    <span className="doc-actions">
      <a className={`btn btn--${tone}`} href={doc.url} download>
        Download {name}
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
      </a>
      <button type="button" className="btn btn--ghost" onClick={() => setOpen(true)} aria-haspopup="dialog">
        Preview
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /></svg>
      </button>
      <DocViewer doc={doc} open={open} onClose={() => setOpen(false)} />
    </span>
  )
}
