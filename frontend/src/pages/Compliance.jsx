import { FileText, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export function Compliance() {
  const { audit, downloadProjectsCSV, projects } = useApp()

  return (
    <div className="compliance-page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Compliance & Audit Trail</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Transparent, immutable record of all system signals and officer decisions.
          </p>
        </div>
        <button className="secondary-btn" onClick={() => downloadProjectsCSV(projects)}>
          <FileText size={15} /> Export Audit Trail
        </button>
      </div>

      <div className="compliance-banner">
        <ShieldCheck size={22} />
        <div>
          <strong>Audit integrity active</strong>
          <p>All risk score changes, inspection submissions, verification actions, and payment holds are recorded.</p>
        </div>
        <span>● Live trail</span>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Officer & System Event Timeline</h2>
        </div>
        <div className="timeline">
          {audit.map((event, index) => (
            <div className="timeline-item" key={`${event.time}-${index}`}>
              <div className={`timeline-dot ${event.tone || 'human'}`}>
                <span />
              </div>
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span>{event.time}</span>
                  <b>{event.actor}</b>
                </div>
                <h3>{event.action}</h3>
                <p>{event.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Compliance
