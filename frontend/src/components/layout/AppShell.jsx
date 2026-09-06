import { useState } from 'react'
import { Bell, ChevronDown, Menu, Search, User, X } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'
import { Sidebar } from './Sidebar.jsx'

export default function AppShell(props) {
  const {
    view,
    navigate,
    mobileNav,
    setMobileNav,
    userRole,
    setUserRole,
    notifications,
    markNotificationRead,
    openProject,
    openInspection,
    openPayment,
    projects,
  } = useApp()

  const [showNotifications, setShowNotifications] = useState(false)
  const [showRoleMenu, setShowRoleMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)

  const children = props.children

  const unreadCount = notifications.filter((n) => n.unread).length

  const pageTitleMap = {
    dashboard: 'Overview Dashboard',
    projects: 'Projects',
    detail: 'Project Details',
    progress: 'Project Progress Update',
    verification: 'Supervisor Verification',
    alerts: 'Risk & Alerts Center',
    funds: 'Fund Monitoring & Allocation',
    analytics: 'Analytics & Multi-Scope Intelligence',
    field: 'Field Operations',
    inspections: 'Field Inspections',
    'inspection-detail': 'Field Inspection Detail',
    payments: 'Payment Monitoring',
    'payment-detail': 'Payment Investigation',
    vendors: 'Vendor Intelligence',
    'vendor-detail': 'Vendor Investigation',
    map: 'Interactive GIS Map of India',
    reports: 'Reports & Compliance Archives',
    compliance: 'Compliance & Audit Trail',
    settings: 'System Settings',
  }

  const title = pageTitleMap[view] || 'Overview Dashboard'

  const searchResults = searchQuery.trim()
    ? projects.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.district.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handleNotificationClick = (item) => {
    markNotificationRead(item.id)
    setShowNotifications(false)
    if (item.projectId) {
      openProject(item.projectId)
    } else if (item.inspectionId) {
      openInspection(item.inspectionId)
    } else if (item.paymentId) {
      openPayment(item.paymentId)
    }
  }

  return (
    <div className="app-shell">
      <Sidebar view={view} navigate={navigate} mobileNav={mobileNav} setMobileNav={setMobileNav} />
      <div className="app-main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open navigation">
              <Menu size={20} />
            </button>
            <h1 className="header-page-title">{title}</h1>
          </div>

          {/* GLOBAL SEARCH IN HEADER */}
          <div style={{ position: 'relative', flex: '0 1 320px', margin: '0 16px' }}>
            <div className="filter-search-input" style={{ background: '#f8fafc' }}>
              <Search size={16} style={{ color: '#94a3b8' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSearchDropdown(true)
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Global search projects, IDs..."
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ border: 0, background: 'transparent', color: '#94a3b8' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {showSearchDropdown && searchResults.length > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  zIndex: 50,
                  marginTop: 4,
                  maxHeight: 260,
                  overflowY: 'auto',
                }}
              >
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      openProject(item.id)
                      setShowSearchDropdown(false)
                      setSearchQuery('')
                    }}
                    style={{
                      padding: '10px 14px',
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      fontSize: 12,
                    }}
                  >
                    <strong style={{ color: '#0f172a', display: 'block' }}>{item.name}</strong>
                    <span style={{ color: '#64748b', fontSize: 11 }}>
                      {item.id} · {item.district} ({item.score} Risk)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* HEADER ACTIONS */}
          <div className="topbar-actions">
            {/* NOTIFICATION BELL POPOVER */}
            <div style={{ position: 'relative' }}>
              <button
                className="icon-button notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <Bell size={19} />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>

              {showNotifications && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '120%',
                    width: 320,
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                    zIndex: 50,
                    padding: 14,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e2e8f0' }}>
                    <strong style={{ fontSize: 13, color: '#0f172a' }}>Live System Alerts</strong>
                    <span style={{ fontSize: 11, color: '#64748b' }}>{unreadCount} new</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleNotificationClick(item)}
                        style={{
                          padding: 10,
                          background: item.unread ? '#f0f9ff' : '#f8fafc',
                          borderRadius: 6,
                          cursor: 'pointer',
                          borderLeft: item.unread ? '3px solid #2563eb' : '3px solid transparent',
                        }}
                      >
                        <strong style={{ fontSize: 12, display: 'block', color: '#0f172a' }}>{item.title}</strong>
                        <p style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{item.detail}</p>
                        <span style={{ fontSize: 10, color: '#94a3b8', display: 'block', marginTop: 4 }}>{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ROLE SWITCHER CHIP MATCHING SPEC */}
            <div style={{ position: 'relative' }}>
              <div className="user-profile-chip" onClick={() => setShowRoleMenu(!showRoleMenu)}>
                <div className="avatar-circle">
                  <User size={16} />
                </div>
                <div className="user-info">
                  <strong className="user-role">{userRole}</strong>
                  <span className="user-location">
                    {userRole.includes('Ministry') ? 'National HQ (New Delhi)' : userRole.includes('State') ? 'State Level' : 'District Level'}
                  </span>
                </div>
                <ChevronDown size={14} className="dropdown-caret" />
              </div>

              {showRoleMenu && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '120%',
                    width: 220,
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                    zIndex: 50,
                    padding: 6,
                  }}
                >
                  <div style={{ padding: '6px 10px', fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>
                    SWITCH OFFICER ROLE (MoSPI Scope)
                  </div>
                  {['Ministry (DIID) Official', 'Hon\'ble MP', 'State Nodal Authority', 'District Authority', 'Field Officer'].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setUserRole(r)
                        setShowRoleMenu(false)
                        if (r === 'Field Officer') navigate('inspections')
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 10px',
                        border: 0,
                        background: userRole === r ? '#eff6ff' : 'transparent',
                        color: userRole === r ? '#2563eb' : '#0f172a',
                        fontWeight: userRole === r ? 700 : 500,
                        borderRadius: 4,
                        fontSize: 12,
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}
