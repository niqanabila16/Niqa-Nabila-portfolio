import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container not-found">
      <div className="bubble">
        <h1>Page not found</h1>
        <Link className="btn btn--dark" to="/">
          Back home
        </Link>
      </div>
    </div>
  )
}
