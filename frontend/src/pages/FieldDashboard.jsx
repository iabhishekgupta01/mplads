import { AlertTriangle, CheckSquare, Clock, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export function FieldDashboard() {
  const { inspections, projects, openInspection } = useApp()


  const pending = inspections.filter((item) => item.status !== 'Verified')
  const completed = inspections.filter((item) => item.status === 'Submitted' || item.status === 'Verified')

  return (
    <div className="field-dashboard-container">
      {/* 4 KPI CARDS */}
      <div className="kpi-5-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-label">Pending Inspections</span>
            <div className="kpi-icon-box amber">
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-value">{pending.length}</div>
          <div className="kpi-meta amber">Needs field visit</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-label">Due Today</span>
            <div className="kpi-icon-box red">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="kpi-value">2</div>
          <div className="kpi-meta red">Priority visits</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-label">Completed Inspections</span>
            <div className="kpi-icon-box green">
              <CheckSquare size={18} />
            </div>
          </div>
          <div className="kpi-value">{completed.length}</div>
          <div className="kpi-meta">Submitted</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-label">Discrepancies Found</span>
            <div className="kpi-icon-box teal">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="kpi-value">3</div>
          <div className="kpi-meta amber">Reported &lt; Observed</div>
        </div>
      </div>

      {/* INSPECTIONS TABLE */}
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="panel-head" style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', marginBottom: 0 }}>
          <h2>Assigned Field Inspections</h2>
        </div>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Inspection ID</th>
                <th>Project Name</th>
                <th>District</th>
                <th>Priority</th>
                <th>Officer</th>
                <th>Scheduled Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((item) => {
                const project = projects.find((entry) => entry.id === item.projectId)
                return (
                  <tr key={item.id} onClick={() => openInspection(item.id)}>
                    <td style={{ fontWeight: 700 }}>{item.id}</td>
                    <td style={{ fontWeight: 600 }}>{project?.name || 'Road Work'}</td>
                    <td>{project?.district || 'Sehore'}</td>
                    <td>
                      <span className={`badge-pill ${item.priority === 'High' ? 'high' : 'medium'}`}>
                        <i /> {item.priority}
                      </span>
                    </td>
                    <td>{item.officer}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className="status-badge-clean ongoing">{item.status}</span>
                    </td>
                    <td>
                      <button
                        className="primary-btn"
                        style={{ padding: '4px 10px', fontSize: 12 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          openInspection(item.id)
                        }}
                      >
                        Start Inspection
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FieldDashboard
