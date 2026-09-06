import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { riskLabel } from '../utils/formatters.js'



export function Alerts() {
  const { projects, openProject } = useApp()
  const [alertFilter, setAlertFilter] = useState('All')

  const flaggedProjects = projects.filter((project) => {
    if (alertFilter === 'All') return project.score >= 60
    if (alertFilter === 'High Risk') return project.score >= 80
    if (alertFilter === 'Medium Risk') return project.score >= 50 && project.score < 80
    if (alertFilter === 'Low Risk') return project.score < 50
    if (alertFilter === 'Under Review') return project.status === 'Under Review'
    if (alertFilter === 'Resolved') return project.status === 'Resolved'
    return true
  })

  return (
    <div className="alerts-page-container">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Risk & Alerts</h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
          Prioritize development projects requiring immediate officer investigation.
        </p>
      </div>

      {/* ALERT SUMMARY KPIS */}
      <div className="alert-summary">
        <div>
          <span>Unresolved Alerts</span>
          <strong>12</strong>
        </div>
        <div>
          <span>High Risk Projects</span>
          <strong className="red">7</strong>
        </div>
        <div>
          <span>Under Field Review</span>
          <strong>4</strong>
        </div>
        <div>
          <span>Resolved This Month</span>
          <strong className="green">18</strong>
        </div>
      </div>

      {/* FILTER TABS MATCHING SPEC */}
      <div className="project-tabs-bar" style={{ marginBottom: 20 }}>
        {['All', 'High Risk', 'Medium Risk', 'Under Review', 'Resolved'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${alertFilter === tab ? 'active' : ''}`}
            onClick={() => setAlertFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ALERTS GRID */}
      <div className="alert-grid">
        {flaggedProjects.map((project) => {
          const rCat = riskLabel(project.score).toLowerCase()
          return (
            <article className="alert-card" key={project.id}>
              <div className="alert-card-top">
                <span className={`badge-pill ${rCat}`}>
                  <i /> {project.score} · {riskLabel(project.score)} Risk
                </span>
                <span>Detected 2 hours ago</span>
              </div>
              <h2>{project.name}</h2>
              <p>
                {project.district}, {project.state} · ID: {project.id}
              </p>
              <div className="triggered">
                <strong>Triggered by</strong>
                <span>
                  • {project.expenditure}% expenditure vs {project.physical}% physical progress
                </span>
                <span>• {project.finding}</span>
                <span>• Milestone delay: {project.delay}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="status-badge-clean ongoing">{project.status}</span>
                <button className="primary-btn" onClick={() => openProject(project.id)}>
                  Investigate <ArrowRight size={14} />
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Alerts
