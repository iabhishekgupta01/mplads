import { Landmark, X } from 'lucide-react'
import { bottomNavItems, navItems } from '../../constants/navigation.js'
import { useApp } from '../../context/AppContext.jsx'

export function Sidebar(props) {
  const context = useApp()
  const view = props.view || context.view
  const navigate = props.navigate || context.navigate
  const mobileNav = props.mobileNav !== undefined ? props.mobileNav : context.mobileNav
  const setMobileNav = props.setMobileNav || context.setMobileNav
  const setLoggedIn = context.setLoggedIn
  const setEntry = context.setEntry

  const handleNavClick = (itemView) => {
    if (itemView === 'logout') {
      setLoggedIn(false)
      setEntry('landing')
      window.history.pushState({}, '', '/')
      setMobileNav(false)
      return
    }
    navigate(itemView)
    setMobileNav(false)
  }

  return (
    <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand-box">
          <div className="brand-emblem-icon">
            <Landmark size={20} />
          </div>
          <div>
            <strong className="brand-title">MoSPI — DIID</strong>
            <span className="brand-subtitle">MPLADS AI Monitor</span>
          </div>
        </div>
        <button className="icon-button close-nav" onClick={() => setMobileNav(false)} aria-label="Close navigation">
          <X size={18} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ label, icon: Icon, view: itemView }) => {
          const isActive = view === itemView || (itemView === 'projects' && (view === 'detail' || view === 'progress' || view === 'verification'))
          return (
            <button
              key={itemView}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(itemView)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          )
        })}

        <div className="nav-divider" />

        {bottomNavItems.map(({ label, icon: Icon, view: itemView }) => (
          <button
            key={itemView}
            className={`nav-item ${view === itemView ? 'active' : ''}`}
            onClick={() => handleNavClick(itemView)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-scope-footer">
        <div className="scope-badge">
          <span>ACTIVE JURISDICTION</span>
          <strong>All States & UTs (National)</strong>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar