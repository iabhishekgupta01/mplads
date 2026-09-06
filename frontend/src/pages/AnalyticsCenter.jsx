import { useState } from 'react'
import { Activity, AlertTriangle, ArrowUpRight, CreditCard, DollarSign, Download, Layers, ShieldCheck, Users } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { riskLabel } from '../utils/formatters.js'

export function AnalyticsCenter(props) {
  const context = useApp()
  const projects = props.projects || context.projects
  const vendors = props.vendors || context.vendors
  const payments = props.payments || context.payments
  const openProject = props.openProject || context.openProject
  const openVendor = props.openVendor || context.openVendor
  const openPayment = props.openPayment || context.openPayment
  const downloadProjectsCSV = context.downloadProjectsCSV

  const [scope, setScope] = useState('National')
  const [stateFilter, setStateFilter] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')

  const statesList = Array.from(new Set(projects.map((p) => p.state)))

  const filteredProjects = projects.filter((p) => {
    const matchState = scope === 'National' || stateFilter === 'All' || p.state === stateFilter
    const matchRisk = riskFilter === 'All' || riskLabel(p.score).toUpperCase() === riskFilter.toUpperCase()
    return matchState && matchRisk
  })

  const highRiskProjects = filteredProjects.filter((p) => p.score >= 70)
  const avgRiskScore = filteredProjects.length
    ? Math.round(filteredProjects.reduce((sum, p) => sum + p.score, 0) / filteredProjects.length)
    : 0

  const flaggedPayments = payments.filter((py) => py.flagged)
  const highRiskVendors = vendors.filter((v) => v.risk >= 60)

  return (
    <div className="analytics-center-container">
      {/* HEADER BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
            MoSPI DIID — Multi-Scope Intelligence & Analytics Center
          </h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>
            Nationwide AI Anomaly Intelligence: Perform cross-tier diagnostic analysis across National, State, District, Vendor & Payment scopes.
          </p>
        </div>
        <button className="primary-btn" onClick={() => downloadProjectsCSV(filteredProjects)}>
          <Download size={15} /> Export Scope Analytics CSV
        </button>
      </div>

      {/* MULTI-SCOPE DRILLDOWN BAR */}
      <div className="analytics-scope-bar">
        <div className="filter-group">
          <label style={{ fontSize: 12, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Layers size={15} style={{ color: '#2563eb' }} /> Analysis Scope Scope
          </label>
          <select
            value={scope}
            onChange={(e) => {
              setScope(e.target.value)
              if (e.target.value === 'National') setStateFilter('All')
            }}
            style={{ fontWeight: 700 }}
          >
            <option value="National">National Level Scope (All India)</option>
            <option value="State">State Level Drilldown</option>
            <option value="District">District Level Aggregation</option>
            <option value="Vendor">Vendor & Contractor Intelligence</option>
            <option value="Payment">Payment & Disbursement Audit</option>
          </select>
        </div>

        {scope !== 'National' && (
          <div className="filter-group">
            <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Select Jurisdiction State</label>
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
              <option value="All">All States in Scope</option>
              {statesList.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="filter-group">
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Risk Threshold Filter</label>
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
            <option value="All">All Risk Profiles</option>
            <option value="High">High Anomaly (&ge; 70)</option>
            <option value="Medium">Medium Anomaly (40-69)</option>
            <option value="Low">Normal Progress (&lt; 40)</option>
          </select>
        </div>

        <div style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 700, color: '#2563eb' }}>
          Active Scope: {scope.toUpperCase()} ({filteredProjects.length} Projects Analyzed)
        </div>
      </div>

      {/* KPI METRIC CARDS GRID */}
      <div className="kpi-5-grid" style={{ marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-label">Analyzed Works</span>
            <div className="kpi-icon-box blue">
              <Layers size={18} />
            </div>
          </div>
          <div className="kpi-value">{filteredProjects.length}</div>
          <span className="kpi-meta">100% Data Integrity Synchronized</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-label">High-Risk Anomalies</span>
            <div className="kpi-icon-box red">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#dc2626' }}>
            {highRiskProjects.length}
          </div>
          <span className="kpi-meta red">Requires Supervisory Field Action</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-label">Average Risk Index</span>
            <div className="kpi-icon-box amber">
              <Activity size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: avgRiskScore > 50 ? '#d97706' : '#16a34a' }}>
            {avgRiskScore}/100
          </div>
          <span className="kpi-meta amber">Cross-District Risk Metric</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-label">Flagged Disbursements</span>
            <div className="kpi-icon-box red">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#dc2626' }}>
            {flaggedPayments.length}
          </div>
          <span className="kpi-meta red">Duplicate / Rapid Tranche Alerts</span>
        </div>

        <div className="kpi-card">
          <div className="kpi-card-top">
            <span className="kpi-label">High-Risk Vendors</span>
            <div className="kpi-icon-box teal">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value">{highRiskVendors.length}</div>
          <span className="kpi-meta">Cross-Contractor Capacity Warning</span>
        </div>
      </div>

      {/* SCOPE DRILLDOWN VIEWS */}
      {scope === 'Vendor' ? (
        <div className="panel">
          <div className="panel-head">
            <h2>Vendor & Contractor Risk Matrix</h2>
            <p>Monitored contractor performance, delay history, and anomaly flags across works.</p>
          </div>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Vendor ID & Name</th>
                  <th>District / State</th>
                  <th>Contract Value</th>
                  <th>Active Works</th>
                  <th>Risk Score</th>
                  <th>Flagged Anomalies</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v.id} onClick={() => openVendor(v.id)}>
                    <td>
                      <strong style={{ display: 'block', color: '#0f172a' }}>{v.name}</strong>
                      <span style={{ fontSize: 11, color: '#64748b' }}>{v.id}</span>
                    </td>
                    <td>{v.location}</td>
                    <td><strong>{v.value}</strong></td>
                    <td>{v.worksCount || 4} Works</td>
                    <td>
                      <span className={`badge-pill ${v.risk >= 70 ? 'high' : v.risk >= 40 ? 'medium' : 'low'}`}>
                        <i /> {v.risk} Score
                      </span>
                    </td>
                    <td style={{ color: v.flagged > 0 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>
                      {v.flagged} Flags
                    </td>
                    <td>
                      <button className="secondary-btn" style={{ padding: '4px 10px', fontSize: 11 }}>
                        Investigate Vendor <ArrowUpRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : scope === 'Payment' ? (
        <div className="panel">
          <div className="panel-head">
            <h2>Payment & Financial Transaction Audit</h2>
            <p>Real-time audit of released funds, milestone claims, and rapid payout alerts.</p>
          </div>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Project Work</th>
                  <th>Released Amount</th>
                  <th>Date & Time</th>
                  <th>Anomaly Type</th>
                  <th>Flagged Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((py) => (
                  <tr key={py.id} onClick={() => openPayment(py.id)}>
                    <td><strong style={{ color: '#2563eb' }}>{py.id}</strong></td>
                    <td>{py.projectName}</td>
                    <td><strong>₹ {py.amount} Lakhs</strong></td>
                    <td>{py.date}</td>
                    <td>
                      <span className="anomaly-risk-pill critical">{py.reason}</span>
                    </td>
                    <td>
                      {py.flagged ? (
                        <span className="badge-pill high"><i /> Flagged Anomaly</span>
                      ) : (
                        <span className="badge-pill low"><i /> Verified Payout</span>
                      )}
                    </td>
                    <td>
                      <button className="secondary-btn" style={{ padding: '4px 10px', fontSize: 11 }}>
                        View Investigation <ArrowUpRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* NATIONAL / STATE / DISTRICT SCOPE TABLE */
        <div className="dashboard-grid-3" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
          <div className="panel">
            <div className="panel-head">
              <h2>High Risk Project Work Files in Scope</h2>
              <p>Works where financial payout significantly exceeds physical completion on ground.</p>
            </div>
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Project & District</th>
                    <th>Sanctioned</th>
                    <th>Physical vs Paid</th>
                    <th>Risk</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((p) => (
                    <tr key={p.id} onClick={() => openProject(p.id)}>
                      <td>
                        <strong style={{ display: 'block', color: '#0f172a' }}>{p.name}</strong>
                        <span style={{ fontSize: 11, color: '#64748b' }}>{p.id} · {p.district}, {p.state}</span>
                      </td>
                      <td>₹ {p.amount} L</td>
                      <td>
                        <div style={{ fontSize: 11 }}>
                          <span style={{ color: '#16a34a' }}>Physical: {p.physical}%</span> | <span style={{ color: '#2563eb' }}>Paid: {p.expenditure}%</span>
                        </div>
                        <div className="bar-comp-track" style={{ height: 6, marginTop: 4 }}>
                          <div className="bar-comp-fill blue" style={{ width: `${p.expenditure}%` }}></div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge-pill ${p.score >= 70 ? 'high' : p.score >= 40 ? 'medium' : 'low'}`}>
                          <i /> {p.score}
                        </span>
                      </td>
                      <td>
                        <button className="secondary-btn" style={{ padding: '4px 8px', fontSize: 11 }}>
                          Inspect <ArrowUpRight size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h2>AI Intelligence Directives</h2>
              <p>System generated recommended supervisory intervention protocols.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ padding: 14, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#dc2626', fontWeight: 700, fontSize: 13 }}>
                  <AlertTriangle size={16} /> Expenditure Ahead of Ground Work
                </div>
                <p style={{ fontSize: 12, color: '#991b1b', marginTop: 4 }}>
                  In {highRiskProjects.length} works, financial releases precede physical completion by &gt; 25%. Initiate physical audit prior to next tranche disbursement.
                </p>
              </div>

              <div style={{ padding: 14, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#2563eb', fontWeight: 700, fontSize: 13 }}>
                  <CreditCard size={16} /> Duplicate Invoice Pattern Detected
                </div>
                <p style={{ fontSize: 12, color: '#1e40af', marginTop: 4 }}>
                  {flaggedPayments.length} payment claims share identical vendor bank accounts and invoice amounts within a 72-hour period.
                </p>
              </div>

              <div style={{ padding: 14, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#15803d', fontWeight: 700, fontSize: 13 }}>
                  <ShieldCheck size={16} /> Recommended Action Directive
                </div>
                <p style={{ fontSize: 12, color: '#166534', marginTop: 4 }}>
                  Issue formal Field Inspection requests for high-risk projects. Payments can be temporarily halted using the Action Modal.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnalyticsCenter
