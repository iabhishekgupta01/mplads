import { useState } from 'react'
import { ArrowRight, Download, FileCheck, FileSpreadsheet, FileText, Layers, ShieldCheck, Wallet, X } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export function SecondaryPage() {
  const { view, navigate, downloadProjectsCSV, projects, userRole } = useApp()
  const [showReportPreview, setShowReportPreview] = useState(false)
  const [reportType, setReportType] = useState('Executive Executive Summary')

  const contentMap = {
    funds: {
      title: 'Fund Monitoring & Allocation',
      subtitle: 'Track sanctioned, released, and utilized MPLADS program funds across 28 States & 8 UTs.',
      sanctioned: '₹ 1,450.00 Cr',
      released: '₹ 1,280.00 Cr',
      utilized: '₹ 1,068.80 Cr (83.5%)',
      balance: '₹ 211.20 Cr Available',
    },
    reports: {
      title: 'Reports & Compliance Archives',
      subtitle: 'Generate official MoSPI DIID executive monitoring summaries and statutory compliance audit packages.',
      sanctioned: '1,248 Active Works',
      released: '427 High Risk Flags',
      utilized: '83.5% Fund Utilization',
      balance: '98 Delayed Works',
    },
    compliance: {
      title: 'Compliance & Statutory Audit Trail',
      subtitle: 'Transparent, immutable record of all system signals, risk triggers, and officer decisions.',
      sanctioned: '100% Audit Trace',
      released: 'Active Event Log',
      utilized: 'Officer Traceability Enabled',
      balance: 'Zero Data Gaps',
    },
    settings: {
      title: 'MoSPI DIID System Settings',
      subtitle: 'Manage administrative scope, AI risk model thresholds, and real-time alert dispatch preferences.',
      sanctioned: 'Risk Threshold: 70',
      released: 'Auto-Alerts: Enabled',
      utilized: 'Scope: All States & UTs',
      balance: `Role: ${userRole}`,
    },
  }

  const current = contentMap[view] || contentMap.funds

  return (
    <div className="secondary-page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{current.title}</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{current.subtitle}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="secondary-btn" onClick={() => downloadProjectsCSV(projects)}>
            <FileSpreadsheet size={15} /> Export Official CSV Report
          </button>
          <button className="primary-btn" onClick={() => setShowReportPreview(true)}>
            <Download size={15} /> Generate Executive PDF
          </button>
        </div>
      </div>

      {/* KPI METRIC BAR */}
      <div className="kpi-5-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="kpi-card">
          <span className="kpi-label">Sanctioned / Monitored Scope</span>
          <div className="kpi-value" style={{ fontSize: 20 }}>{current.sanctioned}</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Released / Status</span>
          <div className="kpi-value" style={{ fontSize: 20 }}>{current.released}</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Utilization / Execution Rate</span>
          <div className="kpi-value" style={{ fontSize: 20, color: '#16a34a' }}>{current.utilized}</div>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Balance / Alert Status</span>
          <div className="kpi-value" style={{ fontSize: 20, color: '#d97706' }}>{current.balance}</div>
        </div>
      </div>

      {/* MAIN OPERATIONAL PANEL */}
      <div className="panel">
        <div className="panel-head">
          <h2>MoSPI DIID National Scope Overview</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#f8fafc', padding: 20, borderRadius: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <Wallet size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <strong style={{ display: 'block', fontSize: 15, color: '#0f172a' }}>
              Active Jurisdiction: All 28 States & 8 UTs (Nationwide MoSPI DIID Scope)
            </strong>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
              Connected to real-time national project dataset (1,248 works). All financial execution data is synchronized with physical progress reports and AI anomaly detection models.
            </p>
          </div>
          <button className="secondary-btn" onClick={() => navigate('projects')}>
            View Projects List <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* ADDITIONAL CONTENT BASED ON VIEW */}
      {view === 'reports' && (
        <div className="panel">
          <div className="panel-head">
            <h2>Statutory Monitoring Report Catalog</h2>
            <p>Select report type to generate instantly formatted MoSPI compliant archives.</p>
          </div>
          <div className="dashboard-grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 }}>
              <FileCheck size={24} style={{ color: '#2563eb', marginBottom: 8 }} />
              <strong style={{ display: 'block', fontSize: 14, color: '#0f172a' }}>National Executive Summary</strong>
              <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 12px' }}>High-level overview of fund utilization, physical milestones, and severe risk clusters across all States.</p>
              <button className="secondary-btn" style={{ width: '100%', fontSize: 12 }} onClick={() => { setReportType('National Executive Summary'); setShowReportPreview(true); }}>
                Generate <Download size={13} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 }}>
              <ShieldCheck size={24} style={{ color: '#dc2626', marginBottom: 8 }} />
              <strong style={{ display: 'block', fontSize: 14, color: '#0f172a' }}>AI Anomaly Audit Package</strong>
              <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 12px' }}>Detailed breakdown of financial progress ahead of ground execution, duplicate invoices, and halted payments.</p>
              <button className="secondary-btn" style={{ width: '100%', fontSize: 12 }} onClick={() => { setReportType('AI Anomaly Audit Package'); setShowReportPreview(true); }}>
                Generate <Download size={13} />
              </button>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16 }}>
              <Layers size={24} style={{ color: '#16a34a', marginBottom: 8 }} />
              <strong style={{ display: 'block', fontSize: 14, color: '#0f172a' }}>Vendor Performance Archive</strong>
              <p style={{ fontSize: 12, color: '#64748b', margin: '4px 0 12px' }}>Contractor risk ratings, delay statistics, and verification audit trails for all registered execution vendors.</p>
              <button className="secondary-btn" style={{ width: '100%', fontSize: 12 }} onClick={() => { setReportType('Vendor Performance Archive'); setShowReportPreview(true); }}>
                Generate <Download size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT PREVIEW MODAL */}
      {showReportPreview && (
        <div className="modal-backdrop" onClick={() => setShowReportPreview(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 620 }}>
            <button className="modal-close icon-button" onClick={() => setShowReportPreview(false)}>
              <X size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, color: '#2563eb' }}>
              <FileText size={24} />
              <div>
                <h2 style={{ fontSize: 18, color: '#0f172a' }}>{reportType}</h2>
                <span style={{ fontSize: 11, color: '#64748b' }}>Ministry of Statistics & Programme Implementation (MoSPI) — DIID</span>
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#475569', background: '#f8fafc', border: '1px solid #e2e8f0', padding: 18, borderRadius: 8, marginBottom: 16, lineHeight: 1.6 }}>
              <strong>Scope:</strong> All 28 States & 8 UTs (National Level) | <strong>Generated:</strong> {new Date().toLocaleDateString()}<br />
              <strong>Total Monitored Works:</strong> {projects.length} | <strong>High Risk Anomaly Flagged:</strong> {projects.filter((p) => p.score >= 70).length} Works<br />
              <strong>Sanctioned Funds:</strong> ₹1,450.00 Cr | <strong>Utilized:</strong> ₹1,068.80 Cr (83.5%)<br />
              <strong>Summary Directive:</strong> Financial progress leads reported physical work in 18 projects. 3 ground field inspections have been verified with observed discrepancies. Officer action recorded.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="secondary-btn" onClick={() => setShowReportPreview(false)}>Close</button>
              <button className="primary-btn" onClick={() => { downloadProjectsCSV(projects); setShowReportPreview(false); }}>
                <Download size={15} /> Download Official Archive (CSV/PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SecondaryPage
