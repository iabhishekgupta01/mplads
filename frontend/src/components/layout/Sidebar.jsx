import { ShieldCheck, X } from 'lucide-react'
import { navItems } from '../../constants/navigation.js'

export function Sidebar({ view, navigate, mobileNav, setMobileNav }) {
  return <aside className={`sidebar ${mobileNav ? 'open' : ''}`}><div className="sidebar-brand"><div className="brand-mark">M</div><div><strong>MPLADS AI</strong><span>Monitoring System</span></div><button className="icon-button close-nav" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={19} /></button></div><div className="sidebar-rule" /><div className="scope"><span>ACTIVE SCOPE</span><strong>Madhya Pradesh</strong><small>FY 2025–26</small></div><nav>{navItems.map(({ label, icon: Icon, view: itemView, badge }) => <button key={itemView} className={`nav-item ${view === itemView ? 'active' : ''}`} onClick={() => navigate(itemView)}><Icon size={18} /><span>{label}</span>{badge && <b>{badge}</b>}</button>)}</nav><div className="sidebar-footer"><div className="footer-line"><ShieldCheck size={16} /><span>Prototype environment</span></div><p>Transparent development,<br />stronger India.</p><small>v0.1 · SIH 26102</small></div></aside>
}
