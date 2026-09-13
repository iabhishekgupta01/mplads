import { Landmark, X } from 'lucide-react'
import { bottomNavItems, navItems } from '../../constants/navigation.js'
import { useApp } from '../../context/AppContext.jsx'

// Group nav items by their group property
function groupNavItems(items) {
  const groups = {}
  const order = []
  items.forEach((item) => {
    const g = item.group || 'OTHER'
    if (!groups[g]) {
      groups[g] = []
      order.push(g)
    }
    groups[g].push(item)
  })
  return order.map((g) => ({ group: g, items: groups[g] }))
}

const navGroups = groupNavItems(navItems)

export function Sidebar(props) {
  const context = useApp()
  const view = props.view || context.view
  const navigate = props.navigate || context.navigate
  const mobileNav = props.mobileNav !== undefined ? props.mobileNav : context.mobileNav
  const setMobileNav = props.setMobileNav || context.setMobileNav
  const setLoggedIn = context.setLoggedIn
  const setEntry = context.setEntry

  const isActive = (itemView) => {
    if (view === itemView) return true
    if (itemView === 'projects' && (view === 'detail' || view === 'progress' || view === 'verification')) return true
    return false
  }

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
            <strong className="brand-title">NIRIKSHAN</strong>
            <span className="brand-subtitle">MPLADS Risk Intelligence</span>
          </div>
        </div>
        <button className="icon-button close-nav" onClick={() => setMobileNav(false)} aria-label="Close navigation">
          <X size={18} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map(({ group, items }) => (
          <div key={group} className="nav-group">
            <span className="nav-group-label">{group}</span>
            {items.map(({ label, icon: Icon, view: itemView }) => (
              <button
                key={`${group}-${itemView}`}
                className={`nav-item ${isActive(itemView) ? 'active' : ''}`}
                onClick={() => handleNavClick(itemView)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        ))}

        <div className="nav-divider" />

        {bottomNavItems.map(({ label, icon: Icon, view: itemView }) => (
          <button
            key={itemView}
            className={`nav-item ${view === itemView ? 'active' : ''}`}
            onClick={() => handleNavClick(itemView)}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-scope-footer">
        <div className="scope-badge">
          <span>INTELLIGENCE LAYER</span>
          <strong>MPLADS monitoring + verification</strong>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
