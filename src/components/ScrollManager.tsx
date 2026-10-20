import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to the top on page changes, or to the element named in the URL hash. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
