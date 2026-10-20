import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * Accessible modal built on the native <dialog> element: focus is trapped, Esc closes,
 * and focus returns to the opener. Clicking the dimmed backdrop also closes it.
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: 'md' | 'lg' | 'xl'
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={`modal modal--${size}`}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      {open && (
        <div className="modal__panel">
          <header className="modal__head">
            <h2>{title}</h2>
            <button type="button" className="round-btn" onClick={onClose} aria-label="Close">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </header>
          <div className="modal__body">{children}</div>
        </div>
      )}
    </dialog>
  )
}
