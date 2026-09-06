import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  BellRing,
  CheckCircle,
  CircleAlert,
  Clock3,
  FileWarning,
  ShieldCheck,
  WalletCards,
  Search,
} from 'lucide-react'
import { formatCurrency } from '../../utils/formatters.js'

function severityFromRisk(score) {
  const value = Number(score || 0)
  if (value >= 75) return 'Critical'
  if (value >= 55) return 'High'
  if (value >= 35) return 'Medium'
  return 'Low'
}

export default function ActionAlertCenter({
  project,
  risk,
  payments = [],
  inspections = [],
  progress = [],
  setModal,
  onReviewEvidence,
}) {
  const [resolved, setResolved] = useState({})

  const alerts = useMemo(() => {
    const list = []
    const riskScore = Number(risk?.score ?? project?.score ?? 0)
    const activeSignals = (risk?.activeSignals || []).filter(signal => signal?.detected)

    if (riskScore >= 75) {
      list.push({
        id: 'risk-score',
        severity: severityFromRisk(riskScore),
        title: 'High project risk requires review',
        detail: `Current risk score is ${riskScore}/100. Review the supporting evidence before the next project decision.`,
        source: 'Risk Engine',
        icon: <ShieldCheck size={18} />,
        action: 'audit',
        actionLabel: 'Request Field Audit',
      })
    }

    const mismatch = activeSignals.find(s => s.id === 'FINANCIAL_PHYSICAL_MISMATCH')
    if (mismatch || Number(project?.expenditure || 0) - Number(project?.physical || 0) >= 20) {
      list.push({
        id: 'progress-mismatch',
        severity: 'High',
        title: 'Financial vs physical progress mismatch',
        detail: `Reported expenditure is ${project?.expenditure ?? 0}% against ${project?.physical ?? 0}% physical progress.`,
        source: 'Progress + Financial Evidence',
        icon: <TrendingIcon />,
        action: 'evidence',
        actionLabel: 'Review Evidence',
      })
    }

    const flagged = payments.filter(payment => Boolean(payment?.flagged) || ['Flagged', 'Under Review', 'On Hold'].includes(payment?.status))
    if (flagged.length > 0) {
      list.push({
        id: 'payment-review',
        severity: 'High',
        title: `${flagged.length} payment transaction${flagged.length > 1 ? 's' : ''} require review`,
        detail: `Flagged transaction value is ${formatCurrency(flagged.reduce((sum, p) => sum + Number(p?.amount || 0), 0))}.`,
        source: 'Payment Intelligence',
        icon: <WalletCards size={18} />,
        action: 'payment',
        actionLabel: 'Investigate Payment',
      })
    }

    const inspectionPending = inspections.some(i => ['Pending', 'Scheduled'].includes(i?.status))
    if (inspectionPending || inspections.length === 0) {
      list.push({
        id: 'field-verification',
        severity: inspections.length === 0 ? 'High' : 'Medium',
        title: inspections.length === 0 ? 'Field verification is pending' : 'Scheduled field verification is not complete',
        detail: inspections.length === 0
          ? 'No linked inspection record is available for this project.'
          : 'A field inspection exists but has not yet produced a completed verification record.',
        source: 'Ground Verification',
        icon: <Search size={18} />,
        action: 'audit',
        actionLabel: 'Request Field Audit',
      })
    }

    const latestProgress = progress[progress.length - 1]
    if (!latestProgress && Number(project?.physical || 0) < 100) {
      list.push({
        id: 'progress-evidence',
        severity: 'Medium',
        title: 'Latest progress evidence is unavailable',
        detail: 'A current progress report should be linked before treating the reported completion as verified.',
        source: 'Progress Records',
        icon: <FileWarning size={18} />,
        action: 'evidence',
        actionLabel: 'Review Evidence',
      })
    }

    if (list.length === 0) {
      list.push({
        id: 'clear',
        severity: 'Low',
        title: 'No immediate action alert',
        detail: 'No actionable exception was identified from the currently available project evidence.',
        source: 'Project Monitoring',
        icon: <CheckCircle size={18} />,
        action: 'evidence',
        actionLabel: 'Review Evidence',
      })
    }

    return list
  }, [risk, project, payments, inspections, progress])

  const openAction = alert => {
    if (alert.action === 'audit') setModal?.('audit')
    if (alert.action === 'payment') setModal?.('payment')
    if (alert.action === 'evidence') onReviewEvidence?.()
  }

  const activeAlerts = alerts.filter(alert => !resolved[alert.id] && alert.id !== 'clear')
  const resolvedCount = alerts.filter(alert => resolved[alert.id]).length

  return (
    <div className="action-alert-page">
      <div className="action-alert-header">
        <div>
          <span className="section-eyebrow">07 · ACTION & ALERTS</span>
          <h2>Alert & Action Center</h2>
          <p>Convert detected project risks into traceable review, verification and corrective actions.</p>
        </div>
        <div className="action-alert-summary">
          <div><strong>{activeAlerts.length}</strong><span>Open Alerts</span></div>
          <div><strong>{resolvedCount}</strong><span>Resolved</span></div>
        </div>
      </div>

      <div className="action-alert-workflow">
        <div className="workflow-step"><span>01</span><strong>Detect</strong><small>Risk signal</small></div>
        <div className="workflow-arrow">→</div>
        <div className="workflow-step"><span>02</span><strong>Review</strong><small>Evidence</small></div>
        <div className="workflow-arrow">→</div>
        <div className="workflow-step"><span>03</span><strong>Act</strong><small>Official action</small></div>
        <div className="workflow-arrow">→</div>
        <div className="workflow-step"><span>04</span><strong>Audit</strong><small>Traceability</small></div>
      </div>

      <div className="action-alert-list">
        {alerts.map(alert => {
          const isResolved = Boolean(resolved[alert.id])
          return (
            <div className={`action-alert-card severity-${alert.severity.toLowerCase()} ${isResolved ? 'is-resolved' : ''}`} key={alert.id}>
              <div className="action-alert-icon">{alert.icon}</div>
              <div className="action-alert-content">
                <div className="action-alert-title-row">
                  <div>
                    <span className={`action-alert-badge ${alert.severity.toLowerCase()}`}>{alert.severity}</span>
                    <h3>{alert.title}</h3>
                  </div>
                  {isResolved && <span className="action-resolved"><CheckCircle size={15} /> Resolved</span>}
                </div>
                <p>{alert.detail}</p>
                <div className="action-alert-meta">
                  <span><BellRing size={14} /> Source: {alert.source}</span>
                  <span><Clock3 size={14} /> Project: {project?.id || 'Unknown'}</span>
                </div>
              </div>
              <div className="action-alert-actions">
                {!isResolved && alert.id !== 'clear' && (
                  <button className="secondary-btn" onClick={() => setResolved(prev => ({ ...prev, [alert.id]: true }))}>
                    <CheckCircle size={15} /> Mark Reviewed
                  </button>
                )}
                <button className="primary-btn" onClick={() => openAction(alert)}>
                  {alert.actionLabel}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="action-alert-governance">
        <div className="action-alert-governance-icon"><CircleAlert size={19} /></div>
        <div>
          <strong>Governance principle</strong>
          <p>Every alert should lead to evidence review, an accountable action or a documented resolution. This prototype records the decision flow in the project UI; production deployment should persist the action, actor, timestamp and supporting evidence in the audit log.</p>
        </div>
      </div>
    </div>
  )
}

function TrendingIcon() {
  return <AlertTriangle size={18} />
}
