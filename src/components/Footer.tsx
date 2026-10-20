import { Link } from 'react-router-dom'
import { profile, roles } from '../data'
import { resetIntroSeen } from '../hooks/useIntroSeen'

export default function Footer() {
  const replay = () => {
    resetIntroSeen()
    window.location.assign(import.meta.env.BASE_URL)
  }
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-bubble">
          <p className="footer-bubble__name">{profile.name}</p>
          <ul className="pill-links pill-links--light" aria-label="Career paths">
            {roles.map((r) => (
              <li key={r.id}>
                <Link className="pill-link" to={`/role/${r.slug}`}>{r.title}</Link>
              </li>
            ))}
          </ul>
          <button type="button" className="pill-link pill-link--button" onClick={replay}>
            Replay intro
          </button>
        </div>
      </div>
    </footer>
  )
}
