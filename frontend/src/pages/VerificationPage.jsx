import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Eye,
  GitCompare,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { generateProjectIntelligence } from '../data/mockData.js'
import { formatCurrency } from '../utils/formatters.js'
import '../styles/nirikshan.css'

const rCol = (s) => (s >= 80 ? '#ae4438' : s >= 60 ? '#b77b1e' : '#2a8a6e')
const rBg = (s) => (s >= 80 ? '#faece8' : s >= 60 ? '#fff5e4' : '#e9f5ef')
const rupee = (n) => `₹${(n / 100000).toFixed(1)}L`

// ── WORKFLOW STAGES ────────────────────────────────────────────
const STAGES = [
  { id: 'flagged', label: 'AI Flagged' },
  { id: 'evidence_requested', label: 'Evidence Requested' },
  { id: 'evidence_submitted', label: 'Evidence Submitted' },
  { id: 'cross_check', label: 'Cross-Check' },
  { id: 'officer_review', label: 'Officer Review' },
  { id: 'decision', label: 'Decision' },
  { id: 'audit', label: 'Audit' },
]

function getStageIndex(status) {
  if (!status || status === 'Delayed' || status === 'Ongoing') return 0
  if (status === 'Pending') return 1
  if (status === 'Scheduled') return 2
  if (status === 'Submitted') return 3
  if (status === 'Under Review') return 4
  if (status === 'Escalated' || status === 'Resolved' || status === 'Funds Halted') return 5
  return 0
}

export default function VerificationPage() {
  const {
    selected: p,
    inspections,
    setInspections,
    setProjects,
    setAudit,
    showToast,
    navigate,
    userRole,
    openGisAt,
    payments,
    escalateProject,
  } = useApp()

  const [decision, setDecision] = useState(null)
  const [actionDone, setActionDone] = useState(false)

  if (!p) return null

  const inspection = inspections.find((i) => i.projectId === p.id)
  const projectPayments = payments.filter((x) => x.projectId === p.id)
  const flaggedPayments = projectPayments.filter((x) => x.flagged)
  const gap = (p.expenditure || 0) - (p.physical || 0)
  const observedProgress = p.observedProgress ?? inspection?.observed
  const progressVariance = observedProgress != null ? p.physical - observedProgress : null

  const { aiFinding, recommendation, drivers } = generateProjectIntelligence(p)
  const stageIdx = getStageIndex(inspection?.status)
  const hasEvidence = (p.evidence || []).length > 0
  const checks = p.verificationChecks || []

  const doAction = (type) => {
    if (actionDone) return
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const actionMap = {
      verify: { status: 'Resolved', auditAction: 'Verification approved', detail: `${p.name} — physical progress verified by officer. Audit record created.` },
      escalate: { status: 'Escalated', auditAction: 'Escalated to senior authority', detail: `${p.name} — evidence discrepancy escalated. Further fund release suspended pending review.` },
      clarify: { status: 'Under Review', auditAction: 'Clarification requested', detail: `${p.name} — implementing agency contacted for additional documentation.` },
      resolve: { status: 'Resolved', auditAction: 'Marked resolved', detail: `${p.name} — officer satisfied with evidence. Case closed.` },
    }
    const act = actionMap[type] || actionMap.clarify
    setProjects((xs) => xs.map((x) => (x.id === p.id ? { ...x, status: act.status, verificationStatus: type } : x)))
    setInspections((xs) => xs.map((i) => (i.projectId === p.id ? { ...i, status: 'Submitted', observed: observedProgress || p.physical } : i)))
    setAudit((xs) => [{ time: now, actor: userRole || 'Field Officer', action: act.auditAction, detail: act.detail, tone: 'human', projectId: p.id }, ...xs])
    showToast(`${act.auditAction} — recorded in audit trail.`)
    setDecision(type)
    setActionDone(true)
  }

  return (
    <div className="nir-page vfy-page">
      <button className="nir-back" onClick={() => navigate('detail')}>
        <ArrowLeft size={14} /> Back to Project Intelligence
      </button>

      {/* BANNER */}
      <section className="vfy-banner">
        <div className="vfy-banner-left">
          <span className="nir-eyebrow" style={{ color: '#88c9b4' }}>
            <Eye size={12} /> FIELD EVIDENCE VERIFICATION · HUMAN-IN-THE-LOOP
          </span>
          <h1>{p.name}</h1>
          <p>
            <MapPin size={13} style={{ verticalAlign: 'middle' }} /> {p.district}, {p.state} · {p.category} · {p.agency}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
            <span className="nir-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#c9ddd8' }}>
              Sanctioned: {rupee(p.amount)}
            </span>
            <span className="nir-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#c9ddd8' }}>
              Expenditure: {p.expenditure}%
            </span>
            <span className="nir-pill" style={{ background: gap >= 30 ? '#dc4a38' : 'rgba(255,255,255,0.1)', color: '#fff' }}>
              Gap: {gap}pp
            </span>
            {inspection?.officer && (
              <span className="nir-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#c9ddd8' }}>
                Officer: {inspection.officer}
              </span>
            )}
          </div>
        </div>
        <div className="vfy-risk-block">
          <span>AI RISK SCORE</span>
          <strong style={{ color: rCol(p.score) }}>{p.score}<small>/100</small></strong>
          <b style={{ color: rCol(p.score), fontSize: 10, letterSpacing: '.07em' }}>
            {p.score >= 80 ? 'CRITICAL' : p.score >= 60 ? 'HIGH' : 'MEDIUM'} · VERIFICATION REQUIRED
          </b>
          {actionDone && decision && (
            <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, background: decision === 'escalate' ? '#ae4438' : '#2a8a6e', color: '#fff', fontSize: 11, fontWeight: 800 }}>
              {decision === 'escalate' ? '⬆ ESCALATED' : decision === 'verify' ? '✓ VERIFIED' : decision === 'resolve' ? '✓ RESOLVED' : '⚑ CLARIFICATION REQUESTED'}
            </div>
          )}
        </div>
      </section>

      {/* WORKFLOW STAGE */}
      <div className="vfy-workflow">
        {STAGES.map((s, i) => (
          <div key={s.id} className={`vfy-stage ${i <= stageIdx ? 'active' : ''} ${i === stageIdx ? 'current' : ''}`}>
            <div className="vfy-stage-dot">{i < stageIdx ? '✓' : i + 1}</div>
            <span>{s.label}</span>
            {i < STAGES.length - 1 && <div className="vfy-stage-arrow" />}
          </div>
        ))}
      </div>

      {/* AI SIGNAL */}
      <div className="vfy-signal-banner">
        <AlertTriangle size={20} style={{ color: '#b77b1e', flexShrink: 0 }} />
        <div>
          <span>AI-GENERATED RISK SIGNAL — AWAITING HUMAN VERIFICATION</span>
          <strong>{aiFinding}</strong>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="vfy-grid">
        {/* LEFT COLUMN */}
        <div className="vfy-main">

          {/* REPORTED vs OBSERVED */}
          <section className="vfy-panel">
            <span className="nir-eyebrow">REPORTED VS FIELD-OBSERVED PROGRESS</span>
            <h2 style={{ marginTop: 8, marginBottom: 16 }}>The core discrepancy</h2>

            <div className="vfy-progress-compare">
              <ProgressCard
                label="REPORTED (System)"
                value={p.physical}
                note={`As per district progress update · ${inspection?.date || 'Sep 2026'}`}
                color="#b77b1e"
              />
              <div className="vfy-vs">
                {progressVariance != null ? (
                  <>
                    <div style={{ fontSize: 22, fontWeight: 800, color: progressVariance >= 7 ? '#dc4a38' : '#2a8a6e' }}>
                      -{progressVariance}pp
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#67807a' }}>VARIANCE</div>
                    {progressVariance >= 7 && (
                      <div style={{ fontSize: 10, color: '#ae4438', fontWeight: 700, marginTop: 4 }}>
                        Significant
                      </div>
                    )}
                  </>
                ) : (
                  <span style={{ fontSize: 11, color: '#8ca59f' }}>VS</span>
                )}
              </div>
              <ProgressCard
                label="FIELD-OBSERVED (Evidence)"
                value={observedProgress ?? '?'}
                note={observedProgress != null ? 'Field inspection assessment' : 'Pending field inspection'}
                color={progressVariance >= 7 ? '#dc4a38' : '#2a8a6e'}
                highlight={progressVariance >= 7}
              />
            </div>

            {/* Financial row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 16 }}>
              {[
                { label: 'Sanctioned Amount', value: rupee(p.amount), color: '#1b3c43' },
                { label: 'Expenditure', value: `${p.expenditure}%`, color: p.expenditure >= 80 ? '#b77b1e' : '#1b3c43' },
                { label: 'Expenditure–Progress Gap', value: `${gap}pp`, color: gap >= 25 ? '#ae4438' : gap >= 10 ? '#b77b1e' : '#2a8a6e' },
              ].map((item) => (
                <div key={item.label} style={{ padding: '12px', background: '#f8faf9', borderRadius: 8, border: '1px solid #dce7e3' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: '#67807a', letterSpacing: '.04em', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>

            {gap >= 25 && (
              <div style={{ marginTop: 14, padding: '10px 14px', background: '#fff5e4', border: '1px solid #e6cdab', borderRadius: 8, fontSize: 12, color: '#795019' }}>
                <strong>Interpretation:</strong> {gap}pp financial–physical mismatch. ₹{((p.expenditure / 100) * p.amount / 100000).toFixed(1)} lakh disbursed
                against {p.physical}% reported progress suggests possible premature billing or reporting irregularity.
              </div>
            )}
          </section>

          {/* FIELD EVIDENCE */}
          <section className="vfy-panel">
            <span className="nir-eyebrow"><Camera size={12} /> FIELD EVIDENCE RECORDS</span>
            <h2 style={{ marginTop: 8, marginBottom: 16 }}>
              On-site photographic evidence
              {hasEvidence
                ? <span className="nir-pill" style={{ marginLeft: 8, fontSize: 10 }}>{p.evidence.length} records</span>
                : <span className="nir-pill amber" style={{ marginLeft: 8, fontSize: 10 }}>No records</span>
              }
            </h2>

            {hasEvidence ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {p.evidence.map((ev) => (
                  <div key={ev.id} style={{ border: '1px solid #dce7e3', borderRadius: 10, overflow: 'hidden' }}>
                    {/* Evidence image placeholder */}
                    <div style={{ height: 200, background: `linear-gradient(135deg, #1a3d35 0%, #2a6b5a 50%, #1a3d35 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
                        <Camera size={40} style={{ marginBottom: 10 }} />
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{ev.file}</div>
                        <div style={{ fontSize: 11, marginTop: 4, opacity: 0.8 }}>{p.category} · Field Evidence</div>
                      </div>
                      <div style={{ position: 'absolute', top: 10, right: 10, padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 800, background: ev.visualReview === 'VERIFIED' ? '#2a8a6e' : '#d97706', color: '#fff' }}>
                        {ev.visualReview === 'VERIFIED' ? '✓ Verified' : '⚑ Review Required'}
                      </div>
                    </div>
                    {/* Evidence metadata */}
                    <div style={{ padding: '14px 16px', background: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                      <EvidenceMeta label="Evidence ID" value={ev.id} />
                      <EvidenceMeta label="Captured" value={ev.timestamp} />
                      <EvidenceMeta label="GPS Coordinates" value={ev.gps} />
                      <EvidenceMeta label="Location Match" value={ev.locationMatch} highlight={ev.locationMatch === 'VERIFIED'} />
                      <EvidenceMeta label="Visual Review" value={ev.visualReview === 'VERIFIED' ? 'Verified' : 'Requires Review'} warn={ev.visualReview !== 'VERIFIED'} />
                      <EvidenceMeta label="Description" value={ev.description} />
                    </div>
                    <div style={{ padding: '10px 16px', background: '#f5f9f7', borderTop: '1px solid #e7efec', display: 'flex', gap: 8 }}>
                      <button className="nir-link" style={{ fontSize: 11 }}
                        onClick={() => openGisAt(p.latitude, p.longitude, p.id)}>
                        <MapPin size={12} /> View on GIS map
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '30px', textAlign: 'center', background: '#f8faf9', border: '2px dashed #dce7e3', borderRadius: 10 }}>
                <Camera size={36} style={{ color: '#a5c3bc', marginBottom: 12 }} />
                <p style={{ fontSize: 13, color: '#67807a', margin: 0 }}>No field evidence on record for this project.</p>
                <p style={{ fontSize: 12, color: '#8ca59f', marginTop: 6 }}>Request a field inspection to collect photographic evidence.</p>
              </div>
            )}
          </section>

          {/* VERIFICATION CHECKS */}
          {checks.length > 0 && (
            <section className="vfy-panel">
              <span className="nir-eyebrow"><ShieldCheck size={12} /> VERIFICATION CHECKS</span>
              <h2 style={{ marginTop: 8, marginBottom: 16 }}>Evidence cross-check results</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {checks.map((c) => (
                  <div key={c.label} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: c.status === 'warn' ? '#fff9f0' : '#f5fbf7', border: `1px solid ${c.status === 'warn' ? '#e6cdab' : '#c8e6d8'}`, borderRadius: 8, alignItems: 'flex-start' }}>
                    <span style={{ marginTop: 2, flexShrink: 0 }}>
                      {c.status === 'ok' ? <CheckCircle2 size={16} style={{ color: '#2a8a6e' }} /> : <TriangleAlert size={16} style={{ color: '#d97706' }} />}
                    </span>
                    <div>
                      <strong style={{ fontSize: 12, color: '#1b3c43', display: 'block' }}>{c.label}</strong>
                      <span style={{ fontSize: 11, color: '#67807a' }}>{c.note}</span>
                    </div>
                    <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 800, color: c.status === 'ok' ? '#2a8a6e' : '#b77b1e', flexShrink: 0, paddingTop: 2 }}>
                      {c.status === 'ok' ? '✓ OK' : '⚑ WARN'}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PAYMENT SNAPSHOT */}
          {flaggedPayments.length > 0 && (
            <section className="vfy-panel">
              <span className="nir-eyebrow">PAYMENT INTELLIGENCE SUMMARY</span>
              <h2 style={{ marginTop: 8, marginBottom: 16 }}>
                Flagged payments · {flaggedPayments.length} anomalies
                <span className="nir-pill critical" style={{ marginLeft: 8, fontSize: 10 }}>{flaggedPayments.length} Flagged</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {flaggedPayments.map((pay) => (
                  <div key={pay.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 120px', gap: 8, padding: '10px 12px', background: '#fff9f5', border: '1px solid #edb5a2', borderRadius: 8, borderLeft: '3px solid #dc4a38', alignItems: 'center', fontSize: 12 }}>
                    <strong style={{ color: '#1b3c43' }}>{pay.id} · {pay.date}</strong>
                    <span style={{ color: '#67807a' }}>{pay.reason}</span>
                    <span style={{ fontWeight: 800, color: '#ae4438', textAlign: 'right' }}>{formatCurrency(pay.amount)}</span>
                  </div>
                ))}
              </div>
              {flaggedPayments.length >= 2 && (
                <div style={{ marginTop: 10, padding: '10px 14px', background: '#fff5e4', border: '1px solid #e6cdab', borderRadius: 8, fontSize: 12, color: '#795019' }}>
                  <strong>Split-payment pattern:</strong> {flaggedPayments.length} identical or near-identical payments detected. This pattern is a known threshold-avoidance technique.
                </div>
              )}
            </section>
          )}
        </div>

        {/* RIGHT RAIL */}
        <aside className="vfy-rail">

          {/* AI FINDING */}
          <section className="vfy-card ai-card">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
              <ShieldAlert size={18} style={{ color: '#ae4438' }} />
              <span className="nir-eyebrow" style={{ color: '#ae4438' }}>AI-ASSISTED FINDING</span>
            </div>
            <p style={{ fontSize: 13, color: '#1b3c43', lineHeight: 1.55, fontWeight: 600, marginBottom: 10 }}>{aiFinding}</p>
            <div style={{ padding: '8px 10px', background: '#f5f9f7', borderRadius: 6, fontSize: 11, color: '#47635e', marginBottom: 10, lineHeight: 1.45 }}>
              <strong>Recommendation:</strong> {recommendation}
            </div>
            <p style={{ fontSize: 10, color: '#8ca59f', margin: 0 }}>AI detects. Human verifies. Human acts. Every decision is recorded.</p>
          </section>

          {/* RISK DRIVERS */}
          {drivers.length > 0 && (
            <section className="vfy-card">
              <span className="nir-eyebrow" style={{ marginBottom: 12, display: 'block' }}>RISK DRIVERS DETECTED</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {drivers.map((d) => (
                  <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: d.severity === 'HIGH' ? '#fff5f3' : '#f8faf9', borderRadius: 6, border: `1px solid ${d.severity === 'HIGH' ? '#edb5a2' : '#dce7e3'}` }}>
                    <span style={{ fontSize: 12, color: '#1b3c43', fontWeight: 600 }}>{d.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: d.severity === 'HIGH' ? '#ae4438' : d.severity === 'MEDIUM' ? '#b77b1e' : '#2a8a6e' }}>+{d.score}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* INSPECTION INFO */}
          {inspection && (
            <section className="vfy-card">
              <span className="nir-eyebrow" style={{ marginBottom: 10, display: 'block' }}>INSPECTION RECORD</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['Inspection ID', inspection.id],
                  ['Assigned Officer', inspection.officer],
                  ['Priority', inspection.priority],
                  ['Date', inspection.date],
                  ['Status', inspection.status],
                  ['Reported %', `${inspection.reported}%`],
                  ['Observed %', inspection.observed ? `${inspection.observed}%` : 'Pending'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '5px 0', borderBottom: '1px solid #e7efec' }}>
                    <span style={{ color: '#67807a' }}>{k}</span>
                    <b style={{ color: '#1b3c43' }}>{v}</b>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ACTION BUTTONS */}
          <section className="vfy-card action-card">
            <span className="nir-eyebrow" style={{ marginBottom: 12, display: 'block' }}>OFFICER DECISION</span>
            <p style={{ fontSize: 12, color: '#67807a', marginBottom: 14, lineHeight: 1.5 }}>
              The authorized officer must now review evidence and make an administrative decision. All actions are tamper-evidently recorded.
            </p>
            {actionDone ? (
              <div style={{ padding: '16px', background: '#e9f5ef', borderRadius: 8, textAlign: 'center', border: '1px solid #a5d0c1' }}>
                <CheckCircle2 size={28} style={{ color: '#2a8a6e', marginBottom: 8 }} />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1b3c43', marginBottom: 4 }}>Action Recorded</div>
                <div style={{ fontSize: 12, color: '#47635e' }}>
                  {decision === 'escalate' ? 'Escalated to senior authority' : decision === 'verify' ? 'Verification submitted for decision' : decision === 'resolve' ? 'Marked resolved' : 'Clarification requested'} — audit trail updated.
                </div>
                <button className="nir-link" style={{ marginTop: 12, display: 'block' }} onClick={() => navigate('compliance')}>
                  View audit trail <ArrowRight size={12} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button className="nir-primary wide" onClick={() => doAction('verify')}>
                  <ClipboardCheck size={15} /> Submit for officer decision
                </button>
                <button className="nir-outline wide" style={{ borderColor: '#dc4a38', color: '#dc4a38' }} onClick={() => doAction('escalate')}>
                  <TriangleAlert size={15} /> Escalate to senior authority
                </button>
                <button className="nir-outline wide" onClick={() => doAction('clarify')}>
                  <ShieldAlert size={15} /> Request clarification
                </button>
                <button className="nir-outline wide" style={{ borderColor: '#2a8a6e', color: '#2a8a6e' }} onClick={() => doAction('resolve')}>
                  <BadgeCheck size={15} /> Mark resolved
                </button>
              </div>
            )}
          </section>

          {/* NEXT STEPS */}
          <section className="vfy-card" style={{ background: '#f5f9f7' }}>
            <span className="nir-eyebrow" style={{ marginBottom: 10, display: 'block' }}>CONNECTED WORKFLOW</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="nir-link" onClick={() => navigate('detail')}>
                <ArrowRight size={13} /> Return to project file
              </button>
              <button className="nir-link" onClick={() => navigate('connected')}>
                <ArrowRight size={13} /> Connected risk signals
              </button>
              <button className="nir-link" onClick={() => openGisAt(p.latitude, p.longitude, p.id)}>
                <MapPin size={13} /> View location on map
              </button>
              <button className="nir-link" onClick={() => navigate('compliance')}>
                <ShieldCheck size={13} /> Audit trail
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function ProgressCard({ label, value, note, color, highlight }) {
  return (
    <div style={{ flex: 1, textAlign: 'center', padding: '18px 16px', background: highlight ? '#fff5f3' : '#f8faf9', border: `2px solid ${highlight ? '#edb5a2' : '#dce7e3'}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: '#67807a', letterSpacing: '.05em', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 52, fontWeight: 800, color, lineHeight: 1 }}>
        {value}{typeof value === 'number' ? <span style={{ fontSize: 22 }}>%</span> : ''}
      </div>
      <div style={{ height: 6, background: '#e8efec', borderRadius: 3, margin: '12px auto', width: '80%' }}>
        {typeof value === 'number' && <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 3 }} />}
      </div>
      <div style={{ fontSize: 11, color: '#67807a', marginTop: 8 }}>{note}</div>
    </div>
  )
}

function EvidenceMeta({ label, value, highlight, warn }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#8ca59f', letterSpacing: '.04em', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: highlight ? '#2a8a6e' : warn ? '#b77b1e' : '#1b3c43' }}>{value}</div>
    </div>
  )
}
