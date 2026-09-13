import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Eye,
  MapPin,
  Network,
  SearchCheck,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'
import '../styles/nirikshan.css'

const rupees = (n) => `₹${(n / 100000).toFixed(1)} lakh`

export default function ProjectDetail() {
  const {
    selected: p,
    selectedRisk,
    payments,
    audit,
    inspections,
    openProject,
    navigate,
    setModal,
    userRole,
  } = useApp()

  if (!p) return null

  const rows = payments.filter((x) => x.projectId === p.id)
  const flaggedRows = rows.filter((r) => r.flagged)
  const gap = (p.expenditure || 0) - (p.physical || 0)
  const inspection = inspections.find((i) => i.projectId === p.id)

  const isHighRisk = p.score >= 70
  const riskColor = p.score >= 80 ? '#dc4a38' : p.score >= 60 ? '#d9890f' : '#2a8a6e'
  const riskLabel = p.score >= 80 ? 'CRITICAL' : p.score >= 60 ? 'HIGH' : p.score >= 40 ? 'MEDIUM' : 'LOW'

  // Find a related project
  const related = p.id === 'MP-2024-1001' ? 'MP-2025-1014' : 'MP-2024-1001'

  // Risk drivers
  const drivers = selectedRisk?.signals?.filter((s) => s.detected && s.score > 0) || []

  return (
    <div className="nir-page nir-detail">

      {/* BREADCRUMB */}
      <button className="nir-back" onClick={() => navigate('alerts')}>
        <ArrowLeft size={15} /> Back to AI Priority Queue
      </button>

      {/* PROJECT BANNER */}
      <section className="nir-project-banner">
        <div>
          <span className="nir-eyebrow">
            <BrainCircuit size={13} /> PROJECT INTELLIGENCE PROFILE · {p.id}
          </span>
          <h1>{p.name}</h1>
          <p>
            <MapPin size={14} style={{ verticalAlign: 'middle' }} />{' '}
            {p.district}, {p.state} · {p.category} · Implementing: {p.agency}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
            <span className="nir-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#d0e6e1' }}>
              Sanctioned: {rupees(p.amount)}
            </span>
            <span className="nir-pill" style={{ background: gap >= 30 ? '#dc4a38' : 'rgba(255,255,255,0.1)', color: '#fff' }}>
              Gap: {gap > 0 ? `+${gap}` : gap}pp (Exp. {p.expenditure}% vs Phy. {p.physical}%)
            </span>
            <span className="nir-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#d0e6e1' }}>
              Delay: {p.delay}
            </span>
            <span className="nir-pill" style={{ background: 'rgba(255,255,255,0.12)', color: '#d0e6e1' }}>
              Vendor: {p.vendor}
            </span>
          </div>
        </div>
        <div className="nir-risk-lockup">
          <span>EXPLAINABLE RISK SCORE</span>
          <strong style={{ color: riskColor, fontSize: 52 }}>
            {p.score}
            <small>/100</small>
          </strong>
          <b style={{ color: riskColor }}>{riskLabel} · HUMAN VERIFICATION REQUIRED</b>
        </div>
      </section>

      {/* AI SIGNAL CALLOUT */}
      <section className="nir-evidence-callout">
        <AlertTriangle size={22} style={{ color: '#b77b1e', flexShrink: 0 }} />
        <div>
          <span>AI-GENERATED RISK SIGNAL — NOT A CONFIRMED FINDING</span>
          <strong>
            {p.finding || 'Multiple risk dimensions converge on this project'}
          </strong>
          <p>
            {selectedRisk?.summary ||
              `${p.expenditure}% expenditure against ${p.physical}% physical progress — a ${p.delay} schedule deviation and clustered payment pattern detected.`}
          </p>
        </div>
        <button onClick={() => navigate('verification')}>
          Verify field evidence <ArrowRight size={15} />
        </button>
      </section>

      <div className="nir-detail-layout">
        {/* MAIN COLUMN */}
        <main>

          {/* RISK FINGERPRINT */}
          <section className="nir-panel">
            <div className="nir-panel-head">
              <div>
                <span className="nir-eyebrow">WHY FLAGGED — DYNAMIC RISK FINGERPRINT</span>
                <h2>How the risk score was computed</h2>
              </div>
              <span className="nir-muted-badge">Explainable AI — NIRIKSHAN rule engine</span>
            </div>
            <p className="nir-subtext" style={{ marginBottom: 16 }}>
              Each dimension is scored independently. Combined signal strength determines total risk.
            </p>
            <div className="nir-fingerprint-grid">
              <Fingerprint
                icon={<CircleDollarSign size={20} />}
                label="Financial"
                value={drivers.find((s) => s.id === 'FINANCIAL_PHYSICAL_MISMATCH')?.score || Math.round(gap * 0.45)}
                text={`${p.expenditure}% funds used vs ${p.physical}% physical progress — ${gap}pp gap`}
                isHigh={gap >= 20}
              />
              <Fingerprint
                icon={<TriangleAlert size={20} />}
                label="Payment Pattern"
                value={drivers.find((s) => s.id === 'PAYMENT_ANOMALY')?.score || (flaggedRows.length >= 2 ? 24 : 8)}
                text={
                  flaggedRows.length >= 2
                    ? `${flaggedRows.length} identical payments flagged (possible threshold avoidance)`
                    : 'Payment pattern requires cross-check'
                }
                isHigh={flaggedRows.length >= 2}
              />
              <Fingerprint
                icon={<Clock3 size={20} />}
                label="Schedule"
                value={drivers.find((s) => s.id === 'DELAY_RISK')?.score || 18}
                text={`${p.delay} schedule deviation — delay probability elevated`}
                isHigh
              />
              <Fingerprint
                icon={<Network size={20} />}
                label="Vendor / Relationship"
                value={drivers.find((s) => s.id === 'VENDOR_RISK')?.score || 8}
                text="Contractor linked to multiple flagged projects"
                isHigh={false}
              />
              <Fingerprint
                icon={<MapPin size={20} />}
                label="Spatial"
                value={drivers.find((s) => s.id === 'SPATIAL_PROXIMITY')?.score || 6}
                text="Nearby related work in same district — geographic cluster"
                isHigh={false}
              />
              <Fingerprint
                icon={<Eye size={20} />}
                label="Evidence Gap"
                value={drivers.find((s) => s.id === 'EVIDENCE_GAP')?.score || 8}
                text="Reported vs field-supported progress discrepancy"
                isHigh
              />
            </div>
          </section>

          {/* PROGRESS COMPARISON */}
          <section className="nir-panel">
            <div className="nir-panel-head">
              <div>
                <span className="nir-eyebrow">FINANCIAL vs PHYSICAL PROGRESS</span>
                <h2>The core anomaly</h2>
              </div>
              {gap >= 20 && (
                <span className="nir-pill critical">
                  {gap}pp MISMATCH
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 20, margin: '20px 0', alignItems: 'stretch', flexWrap: 'wrap' }}>
              <ProgressBlock label="EXPENDITURE" value={p.expenditure} total={100} color="#d9890f" />
              <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, fontWeight: 800, color: '#dc4a38' }}>VS</div>
              <ProgressBlock label="PHYSICAL PROGRESS" value={p.physical} total={100} color="#2a8a6e" />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
                <div style={{ fontSize: 13, color: '#67807a', fontWeight: 700 }}>INTERPRETATION</div>
                <p style={{ fontSize: 13, color: '#1b3c43', lineHeight: 1.5 }}>
                  {gap >= 30
                    ? `A ${gap} percentage-point gap between financial expenditure and physical progress strongly suggests either billing ahead of work completion, quality compromise, or diversion of funds. This warrants immediate field verification.`
                    : gap >= 15
                      ? `A ${gap} percentage-point gap between funds spent and work reported may indicate premature payment, execution delay, or reporting irregularities. Field evidence should be cross-checked.`
                      : `A ${gap} percentage-point gap exists. Monitor closely but this alone may not indicate fraud.`
                  }
                </p>
              </div>
            </div>
          </section>

          {/* TWO PANELS: CONNECTIONS + PAYMENTS */}
          <section className="nir-two-panels">
            <article className="nir-panel">
              <span className="nir-eyebrow">CONNECTED RISK SIGNALS</span>
              <h2>Relationship intelligence</h2>
              <div className="nir-relationship">
                <div className="rel-node focus">
                  {p.name.split(' ').slice(0, 3).join(' ')}
                  <small>Current case · {p.score}/100</small>
                </div>
                <i>↔</i>
                <div className="rel-node" style={{ cursor: 'pointer' }} onClick={() => navigate('vendors')}>
                  {p.vendor}
                  <small>Vendor · Risk 86/100</small>
                </div>
                <i>↔</i>
                <button
                  className="rel-node link"
                  onClick={() => openProject(related)}
                >
                  Village Road — Sehore
                  <small>Same category · nearby GPS</small>
                </button>
              </div>
              <p className="nir-subtext">
                This is a reviewable connection, not a confirmed conclusion. Same contractor and
                nearby similar work are risk signals that an officer should investigate.
              </p>
              <button className="nir-link" onClick={() => navigate('connected')}>
                Open full connection graph <ArrowRight size={14} />
              </button>
            </article>

            <article className="nir-panel">
              <span className="nir-eyebrow">PAYMENT INTELLIGENCE</span>
              <h2>
                Transaction pattern
                {flaggedRows.length >= 2 && (
                  <span className="nir-pill critical" style={{ marginLeft: 8, fontSize: 11 }}>
                    Anomaly detected
                  </span>
                )}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '12px 0' }}>
                {rows.length ? (
                  rows.map((row) => (
                    <div
                      className="nir-payment"
                      key={row.id}
                      style={{ borderLeft: row.flagged ? '3px solid #dc4a38' : '3px solid #dce7e3' }}
                    >
                      <b>{row.id}</b>
                      <span>{row.date} · {formatCurrency(row.amount)}</span>
                      <em style={{ color: row.flagged ? '#ae4438' : '#216454' }}>
                        {row.flagged ? '⚑ Flagged' : row.status}
                      </em>
                    </div>
                  ))
                ) : (
                  <p className="nir-subtext">No payment records for this project.</p>
                )}
              </div>
              {flaggedRows.length >= 2 && (
                <div style={{ padding: '8px 12px', background: '#fff5e4', border: '1px solid #e6cdab', borderRadius: 8, fontSize: 12, color: '#795019', marginBottom: 10 }}>
                  <strong>Split-payment pattern:</strong> {flaggedRows.length} identical payments within
                  48 hours. Possible threshold avoidance.
                </div>
              )}
              <button className="nir-link" onClick={() => navigate('payments')}>
                Full payment intelligence <ArrowRight size={14} />
              </button>
            </article>
          </section>

          {/* FIELD EVIDENCE STATUS */}
          <section className="nir-panel">
            <div className="nir-panel-head">
              <div>
                <span className="nir-eyebrow">FIELD EVIDENCE STATUS</span>
                <h2>
                  {inspection
                    ? `Inspection ${inspection.id} — ${inspection.status}`
                    : 'No field inspection on record'}
                </h2>
              </div>
              <button className="nir-secondary" onClick={() => navigate('verification')}>
                Open verification workspace
              </button>
            </div>
            {inspection ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginTop: 12 }}>
                {[
                  ['Assigned to', inspection.officer || 'Field Officer'],
                  ['Priority', inspection.priority || 'High'],
                  ['Inspection date', inspection.date],
                  ['Status', inspection.status],
                  ['Reported progress', `${p.physical}%`],
                  ['Evidence-supported', inspection.observed ? `${inspection.observed}%` : 'Pending'],
                ].map(([label, value]) => (
                  <div key={label} style={{ padding: '10px 12px', background: '#f8faf9', borderRadius: 8, border: '1px solid #dce7e3' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#67807a', letterSpacing: '.04em', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1b3c43' }}>{value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: 12 }}>
                <p className="nir-subtext">
                  No field inspection assigned yet. Use the action panel to request a field audit.
                </p>
              </div>
            )}
          </section>

          {/* AUDIT TRAIL */}
          <section className="nir-panel">
            <div className="nir-panel-head">
              <div>
                <span className="nir-eyebrow">DECISION & AUDIT TRAIL</span>
                <h2>Human decisions remain accountable</h2>
              </div>
              <button className="nir-secondary" onClick={() => navigate('compliance')}>
                Full audit ledger
              </button>
            </div>
            <div className="nir-audit-list">
              {audit.slice(0, 4).map((a, i) => (
                <div className="nir-audit" key={`${a.time}-${i}`}>
                  <span className={a.tone === 'ai' ? 'ai-badge' : 'human-badge'}>{i + 1}</span>
                  <div>
                    <strong>{a.action}</strong>
                    <p>{a.detail}</p>
                  </div>
                  <small>
                    {a.actor}
                    <br />
                    {a.time}
                  </small>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* ACTION RAIL */}
        <aside className="nir-action-rail">

          {/* PROJECT SNAPSHOT */}
          <section>
            <span className="nir-eyebrow">PROJECT SNAPSHOT</span>
            <div className="nir-snapshot">
              <span>
                Sanctioned <b>{rupees(p.amount)}</b>
              </span>
              <span>
                Expenditure <b style={{ color: p.expenditure > 80 ? '#d9890f' : '#1b3c43' }}>{p.expenditure}%</b>
              </span>
              <span>
                Physical progress <b style={{ color: '#1b3c43' }}>{p.physical}%</b>
              </span>
              <span>
                Fund-progress gap <b style={{ color: gap >= 20 ? '#dc4a38' : '#1b3c43' }}>{gap}pp</b>
              </span>
              <span>
                Status <b>{p.status}</b>
              </span>
              <span>
                Delay <b style={{ color: '#d9890f' }}>{p.delay}</b>
              </span>
            </div>
          </section>

          {/* AI RECOMMENDATION */}
          <section>
            <span className="nir-eyebrow">AI-RECOMMENDED ACTION</span>
            <h2 style={{ fontSize: 15, lineHeight: 1.4, margin: '8px 0' }}>
              {selectedRisk?.recommendation ||
                'Request field verification before further fund release.'}
            </h2>
            <p className="nir-subtext">
              AI assists prioritization. The authorized officer determines the administrative response.
              All actions are recorded in the audit trail.
            </p>
          </section>

          {/* ACTION BUTTONS */}
          <section>
            <span className="nir-eyebrow">HUMAN DECISION</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
              <button className="nir-primary wide" onClick={() => setModal('audit')}>
                <ClipboardCheck size={16} /> Request field audit
              </button>
              <button className="nir-outline wide" onClick={() => navigate('verification')}>
                <SearchCheck size={16} /> Review evidence first
              </button>
              <button
                className="nir-outline wide"
                style={{ borderColor: '#dc4a38', color: '#dc4a38' }}
                onClick={() => setModal('halt')}
              >
                <TriangleAlert size={16} /> Halt further payments
              </button>
              <button
                className="nir-outline wide"
                style={{ borderColor: '#2a8a6e', color: '#2a8a6e' }}
                onClick={() => setModal('resolve')}
              >
                <BadgeCheck size={16} /> Mark resolved
              </button>
            </div>
          </section>

          {/* NAVIGATION */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="nir-eyebrow">NEXT STEPS</span>
            <button className="nir-link" onClick={() => navigate('connected')}>
              <Network size={14} /> View connection graph <ArrowRight size={12} />
            </button>
            <button className="nir-link" onClick={() => navigate('map')}>
              <MapPin size={14} /> View on GIS map <ArrowRight size={12} />
            </button>
            <button className="nir-link" onClick={() => navigate('duplicates')}>
              View similar works <ArrowRight size={12} />
            </button>
          </section>

          {/* TRUST */}
          <section className="nir-trust">
            <ShieldCheck size={18} />
            <div>
              <strong>Tamper-evident governance record</strong>
              <span>
                Every officer decision is appended with timestamp, actor identity and action type.
                SHA-256 hash generated for compliance audit.
              </span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function Fingerprint({ icon, label, value, text, isHigh }) {
  return (
    <div className="nir-fingerprint" style={{ borderLeft: isHigh ? '3px solid #dc4a38' : '3px solid #dce7e3' }}>
      <div style={{ color: isHigh ? '#dc4a38' : '#387166' }}>
        {icon}
        <b style={{ color: isHigh ? '#ae4438' : '#387166' }}>+{value}</b>
      </div>
      <strong style={{ color: '#1b3c43' }}>{label}</strong>
      <p style={{ color: '#47635e' }}>{text}</p>
    </div>
  )
}

function ProgressBlock({ label, value, color }) {
  return (
    <div style={{ flex: 1, minWidth: 140 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#67807a', letterSpacing: '.05em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 48, fontWeight: 800, color, lineHeight: 1 }}>
        {value}
        <span style={{ fontSize: 20, fontWeight: 600 }}>%</span>
      </div>
      <div style={{ height: 8, background: '#edf1ef', borderRadius: 4, marginTop: 12, width: '100%' }}>
        <div
          style={{
            height: '100%',
            width: `${value}%`,
            background: color,
            borderRadius: 4,
            transition: 'width 0.6s ease',
          }}
        />
      </div>
    </div>
  )
}
