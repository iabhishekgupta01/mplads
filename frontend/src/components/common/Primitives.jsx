import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { riskLabel as getRiskLabel } from '../../utils/formatters.js'

export function PageHeader({ eyebrow, title, subtitle, action }) {
  return <div className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{subtitle}</p></div>{action}</div>
}

export function StatCard({ label, value, trend, icon: Icon, critical }) {
  return <div className={`stat-card ${critical ? 'critical' : ''}`}><div className="stat-top"><span>{label}</span><Icon size={19} /></div><strong>{value}</strong><div className="stat-meta"><TrendingUp size={14} /> {trend} <span>vs last period</span></div></div>
}

export function Panel({ title, subtitle, action, children, className = '' }) {
  return <section className={`panel ${className}`}><div className="panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>{children}</section>
}

export function Metric({ label, value, note, critical }) {
  return <div className={`metric ${critical ? 'critical' : ''}`}><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</div>
}

export function Progress({ label, value, tone }) {
  return <div className="progress-row"><div><span>{label}</span><strong>{value}%</strong></div><div className="progress-track"><i className={tone} style={{ width: `${value}%` }} /></div></div>
}

export function RiskBadge({ score }) {
  return <span className={`risk-badge ${getRiskLabel(score).toLowerCase()}`}><i /> {score} · {getRiskLabel(score)}</span>
}

export function StatusBadge({ status }) {
  return <span className={`status-badge ${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
}

export function ProjectTable({ projects, openProject }) {
  return <div className="table-wrap"><table><thead><tr><th>Project</th><th>Location</th><th>Utilized</th><th>Risk</th><th>Status</th><th /></tr></thead><tbody>{projects.map((project) => <tr key={project.id}><td><button className="project-link" onClick={() => openProject(project.id)}><strong>{project.name}</strong><small>{project.id}</small></button></td><td>{project.district}<small>{project.state}</small></td><td>{project.expenditure}%</td><td><RiskBadge score={project.score} /></td><td><StatusBadge status={project.status} /></td><td><button className="icon-button" onClick={() => openProject(project.id)} aria-label={`Open ${project.name}`}><ArrowUpRight size={16} /></button></td></tr>)}</tbody></table></div>
}
