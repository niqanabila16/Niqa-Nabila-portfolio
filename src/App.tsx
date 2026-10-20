import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import PaperDefs from './components/illustrations/PaperDefs'
import ScrollManager from './components/ScrollManager'
import SiteNavigation from './components/SiteNavigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import ProjectPage from './pages/ProjectPage'
import RolePage from './pages/RolePage'

export default function App() {
  const { pathname } = useLocation()
  return (
    <>
      <PaperDefs />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <SiteNavigation />
      <main id="main" tabIndex={-1}>
        <div key={pathname} className="page-in">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/role/:roleSlug" element={<RolePage />} />
            <Route path="/projects/:projectId" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  )
}
