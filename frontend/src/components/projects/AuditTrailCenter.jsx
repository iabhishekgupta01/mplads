import { useMemo } from 'react'
import {
  Activity,
  Brain,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Gavel,
  History,
  Search,
  ShieldCheck,
  UserCheck,
  XCircle,
} from 'lucide-react'

function formatDate(value) {
  if (!value) return 'Not recorded'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function eventTone(type) {
  if (type === 'AI') return 'ai'
  if (type === 'ACTION') return 'action'
  if (type === 'VERIFY') return 'verify'
  if (type === 'EVIDENCE') return 'evidence'
  return 'system'
}

function eventIcon(type) {
  if (type === 'AI') return <Brain size={17} />
  if (type === 'ACTION') return <Gavel size={17} />
  if (type === 'VERIFY') return <UserCheck size={17} />
  if (type === 'EVIDENCE') return <FileCheck2 size={17} />
  return <Activity size={17} />
}

export default function AuditTrailCenter({ project, risk, payments = [], inspections = [], progress = [], onRequestAudit }) {
  const riskScore = Number(risk?.score ?? project?.score ?? 0)

  const events = useMemo(() => {
    const rows = []

    rows.push({
      id: 'risk-engine',
      type: 'AI',
      actor: 'AI Risk Engine',
      title: 'Project risk assessment generated',
      detail: `Risk score ${riskScore}/100 was generated from project progress, financial, payment and execution signals.`,
      date: project?.updatedAt || project?.createdAt || new Date().toISOString(),
      status: riskScore >= 55 ? 'Review required' : 'Monitoring',
    })

    const signals = risk?.signals || risk?.findings || []
    signals.slice?.(0, 4).forEach((signal, index) => {
      rows.push({
        id: `signal-${index}`,
        type: 'AI',
        actor: 'AI Risk Engine',
        title: signal?.name || signal?.title || 'Risk signal detected',
        detail: signal?.explanation || signal?.reason || 'Supporting evidence was correlated for investigation.',
        date: project?.updatedAt || new Date().toISOString(),
        status: 'Detected',
      })
    })

    ;[...payments]
      .sort((a, b) => String(b?.date || '').localeCompare(String(a?.date || '')))
      .slice(0, 3)
      .forEach((payment) => {
        rows.push({
          id: `payment-${payment?.id}`,
          type: payment?.status === 'Flagged' ? 'ACTION' : 'EVIDENCE',
          actor: payment?.status === 'Flagged' ? 'System Review Queue' : 'Payment Records',
          title: payment?.status === 'Flagged' ? 'Payment transaction flagged for review' : 'Payment transaction recorded',
          detail: `${payment?.id || 'Transaction'} · ${payment?.date || 'Date not recorded'} · ${payment?.amount ? `₹${Number(payment.amount).toLocaleString('en-IN')}` : 'Amount unavailable'}.`,
          date: payment?.date,
          status: payment?.status || 'Recorded',
        })
      })

    ;[...inspections]
      .sort((a, b) => String(b?.date || b?.inspectionDate || '').localeCompare(String(a?.date || a?.inspectionDate || '')))
      .slice(0, 2)
      .forEach((inspection) => {
        rows.push({
          id: `inspection-${inspection?.id}`,
          type: 'VERIFY',
          actor: inspection?.inspector || inspection?.officer || 'Field Inspection',
          title: 'Field verification record added',
          detail: `Inspection status: ${inspection?.status || 'Recorded'}${inspection?.observedCompletion != null ? ` · observed completion ${inspection.observedCompletion}%` : ''}.`,
          date: inspection?.date || inspection?.inspectionDate || inspection?.scheduledDate,
          status: inspection?.status || 'Recorded',
        })
      })

    ;[...progress]
      .sort((a, b) => String(b?.date || '').localeCompare(String(a?.date || '')))
      .slice(0, 2)
      .forEach((item) => {
        rows.push({
          id: `progress-${item?.id}`,
          type: 'EVIDENCE',
          actor: item?.submittedBy || item?.source || 'Progress Record',
          title: 'Progress evidence submitted',
          detail: `${item?.percent ?? item?.progress ?? item?.physical ?? '—'}% reported progress · ${item?.status || 'Status recorded'}.`,
          date: item?.date,
          status: item?.status || 'Recorded',
        })
      })

    return rows
      .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
      .map((event, index) => ({ ...event, sequence: index + 1 }))
  }, [project, risk, riskScore, payments, inspections, progress])

  const counts = useMemo(() => ({
    total: events.length,
    ai: events.filter((e) => e.type === 'AI').length,
    actions: events.filter((e) => e.type === 'ACTION').length,
    verification: events.filter((e) => e.type === 'VERIFY').length,
  }), [events])

  return (
    <section className="audit-trail-page">
      <header className="audit-trail-header">
        <div>
          <span className="section-eyebrow">09 · AUDIT & ACCOUNTABILITY</span>
          <h2>Audit Trail & Decision Accountability</h2>
          <p>
            A chronological record of how the system detected risk, what evidence supported it,
            and what review or verification activity followed.
          </p>
        </div>

        <div className="audit-trail-score">
          <span>Current Risk</span>
          <strong>{riskScore}/100</strong>
          <small>{risk?.priority || (riskScore >= 55 ? 'Review' : 'Monitor')}</small>
        </div>
      </header>

      <div className="audit-accountability-strip">
        <div><Brain size={18} /><strong>AI Detection</strong><span>{counts.ai} events</span></div>
        <div><FileCheck2 size={18} /><strong>Evidence</strong><span>{counts.total} recorded</span></div>
        <div><UserCheck size={18} /><strong>Verification</strong><span>{counts.verification} events</span></div>
        <div><Gavel size={18} /><strong>Actions</strong><span>{counts.actions} events</span></div>
      </div>

      <div className="audit-principle-grid">
        <div><span>WHO</span><strong>Actor / system</strong><p>Shows who created, reviewed or verified each record.</p></div>
        <div><span>WHAT</span><strong>Decision / event</strong><p>Shows the exact event recorded in the project trail.</p></div>
        <div><span>WHEN</span><strong>Timestamp</strong><p>Preserves the chronological sequence of activity.</p></div>
        <div><span>WHY</span><strong>Evidence context</strong><p>Connects risk and action to supporting project evidence.</p></div>
      </div>

      <div className="audit-trail-layout">
        <div className="audit-timeline-panel">
          <div className="audit-panel-heading">
            <div>
              <span className="section-eyebrow">ACTIVITY LOG</span>
              <h3>Decision & Evidence Timeline</h3>
            </div>
            <span className="audit-event-count">{events.length} events</span>
          </div>

          <div className="audit-timeline">
            {events.map((event) => (
              <article className={`audit-event audit-event-${eventTone(event.type)}`} key={event.id}>
                <div className="audit-event-marker">{eventIcon(event.type)}</div>
                <div className="audit-event-content">
                  <div className="audit-event-topline">
                    <span className="audit-event-type">{event.type}</span>
                    <time><Clock3 size={13} />{formatDate(event.date)}</time>
                  </div>
                  <h4>{event.title}</h4>
                  <p>{event.detail}</p>
                  <div className="audit-event-meta">
                    <span><UserCheck size={13} />{event.actor}</span>
                    <span className={`audit-event-status ${eventTone(event.type)}`}>{event.status}</span>
                  </div>
                </div>
              </article>
            ))}

            {!events.length && (
              <div className="audit-empty-state">
                <History size={28} />
                <strong>No audit events recorded yet</strong>
                <p>New risk, evidence and action events will appear here.</p>
              </div>
            )}
          </div>
        </div>

        <aside className="audit-control-panel">
          <div className="audit-control-icon"><ShieldCheck size={21} /></div>
          <span className="section-eyebrow">AUDIT READINESS</span>
          <h3>Decision trace is preserved</h3>
          <p>
            Every investigation should remain traceable from AI detection to evidence review,
            human verification and control action.
          </p>

          <div className="audit-check-list">
            <div><CheckCircle2 size={17} /><span>Risk detection recorded</span></div>
            <div><CheckCircle2 size={17} /><span>Evidence context available</span></div>
            <div><CheckCircle2 size={17} /><span>Human verification trace</span></div>
            <div><CheckCircle2 size={17} /><span>Action can be escalated</span></div>
          </div>

          <button type="button" className="audit-request-btn" onClick={onRequestAudit}>
            <Search size={16} /> Request Field Audit
          </button>
        </aside>
      </div>

      <div className="audit-disclaimer">
        <ShieldCheck size={17} />
        <div>
          <strong>Prototype audit layer</strong>
          <p>
            The displayed timeline combines available project records to demonstrate traceability.
            In production, each event should be persisted with an immutable timestamp, actor identity,
            source record and decision reference.
          </p>
        </div>
      </div>
    </section>
  )
}
