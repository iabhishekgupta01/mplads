import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'
import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { generateProjectIntelligence } from '../data/mockData.js'
import { formatCurrency } from '../utils/formatters.js'
import '../styles/nirikshan.css'

const rCol = (s) =>
  s >= 80 ? '#ae4438' : s >= 60 ? '#b77b1e' : '#2a8a6e'

const rupee = (n) => `₹${(n / 100000).toFixed(1)}L`

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
  if (
    status === 'Escalated' ||
    status === 'Resolved' ||
    status === 'Funds Halted'
  )
    return 5

  return 0
}

/*
 * IMPORTANT:
 * These are ONLY fallback preview images.
 * If your actual evidence object contains `image`, `imageUrl`,
 * `src` or `url`, that local/real source is used first.
 */
const FALLBACK_EVIDENCE_IMAGES = [
  'https://dynamic.realestateindia.com/prop_images/4006820/1457635_7.jpg',
  'https://magarticles.magzter.com/articles/1153/377339/5db7dd91e0b39/Restoring-Rural-Roads.jpg',
]

function getEvidenceImage(ev, index) {
  return (
    ev.image ||
    ev.imageUrl ||
    ev.src ||
    ev.url ||
    FALLBACK_EVIDENCE_IMAGES[index % FALLBACK_EVIDENCE_IMAGES.length]
  )
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
  } = useApp()

  const [decision, setDecision] = useState(null)
  const [actionDone, setActionDone] = useState(false)

  if (!p) return null

  const inspection = inspections.find((i) => i.projectId === p.id)

  const projectPayments = payments.filter(
    (x) => x.projectId === p.id
  )

  const flaggedPayments = projectPayments.filter(
    (x) => x.flagged
  )

  const gap = (p.expenditure || 0) - (p.physical || 0)

  const observedProgress =
    p.observedProgress ?? inspection?.observed

  const progressVariance =
    observedProgress != null
      ? p.physical - observedProgress
      : null

  const {
    aiFinding,
    recommendation,
    drivers,
  } = generateProjectIntelligence(p)

  const stageIdx = getStageIndex(inspection?.status)

  const hasEvidence = (p.evidence || []).length > 0

  const checks = p.verificationChecks || []

  const doAction = (type) => {
    if (actionDone) return

    const now = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    })

    const actionMap = {
      verify: {
        status: 'Resolved',
        auditAction: 'Verification approved',
        detail: `${p.name} — physical progress verified by officer. Audit record created.`,
      },

      escalate: {
        status: 'Escalated',
        auditAction: 'Escalated to senior authority',
        detail: `${p.name} — evidence discrepancy escalated. Further fund release suspended pending review.`,
      },

      clarify: {
        status: 'Under Review',
        auditAction: 'Clarification requested',
        detail: `${p.name} — implementing agency contacted for additional documentation.`,
      },

      resolve: {
        status: 'Resolved',
        auditAction: 'Marked resolved',
        detail: `${p.name} — officer satisfied with evidence. Case closed.`,
      },
    }

    const act = actionMap[type] || actionMap.clarify

    setProjects((xs) =>
      xs.map((x) =>
        x.id === p.id
          ? {
              ...x,
              status: act.status,
              verificationStatus: type,
            }
          : x
      )
    )

    setInspections((xs) =>
      xs.map((i) =>
        i.projectId === p.id
          ? {
              ...i,
              status: 'Submitted',
              observed: observedProgress || p.physical,
            }
          : i
      )
    )

    setAudit((xs) => [
      {
        time: now,
        actor: userRole || 'Field Officer',
        action: act.auditAction,
        detail: act.detail,
        tone: 'human',
        projectId: p.id,
      },
      ...xs,
    ])

    showToast(
      `${act.auditAction} — recorded in audit trail.`
    )

    setDecision(type)
    setActionDone(true)
  }

  return (
    <div className="nir-page vfy-page">

      <button
        className="nir-back vfy-back"
        onClick={() => navigate('detail')}
      >
        <ArrowLeft size={15} />
        Back to Project Intelligence
      </button>

      {/* =====================================================
          PROJECT HEADER
      ===================================================== */}
      <section className="vfy-banner">

        <div className="vfy-banner-left">

          <span
            className="nir-eyebrow"
            style={{ color: '#88c9b4' }}
          >
            <Eye size={13} />
            FIELD EVIDENCE VERIFICATION · HUMAN-IN-THE-LOOP
          </span>

          <h1>{p.name}</h1>

          <p>
            <MapPin size={14} />
            {p.district}, {p.state} · {p.category} · {p.agency}
          </p>

          <div className="vfy-header-pills">

            <span className="nir-pill vfy-header-pill">
              Sanctioned: {rupee(p.amount)}
            </span>

            <span className="nir-pill vfy-header-pill">
              Expenditure: {p.expenditure}%
            </span>

            <span
              className="nir-pill vfy-header-pill"
              style={{
                background:
                  gap >= 30
                    ? '#dc4a38'
                    : 'rgba(255,255,255,0.1)',
                color: '#fff',
              }}
            >
              Gap: {gap}pp
            </span>

            {inspection?.officer && (
              <span className="nir-pill vfy-header-pill">
                Officer: {inspection.officer}
              </span>
            )}

          </div>
        </div>

        <div className="vfy-risk-block">

          <span>AI RISK SCORE</span>

          <strong style={{ color: rCol(p.score) }}>
            {p.score}
            <small>/100</small>
          </strong>

          <b style={{ color: rCol(p.score) }}>
            {p.score >= 80
              ? 'CRITICAL'
              : p.score >= 60
                ? 'HIGH'
                : 'MEDIUM'}
            {' · '}
            VERIFICATION REQUIRED
          </b>

          {actionDone && decision && (
            <div
              className={`vfy-decision-badge ${
                decision === 'escalate'
                  ? 'is-red'
                  : 'is-green'
              }`}
            >
              {decision === 'escalate'
                ? '↑ ESCALATED'
                : decision === 'verify'
                  ? '✓ VERIFIED'
                  : decision === 'resolve'
                    ? '✓ RESOLVED'
                    : '⚑ CLARIFICATION REQUESTED'}
            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          WORKFLOW
      ===================================================== */}
      <div className="vfy-workflow">

        {STAGES.map((s, i) => (
          <div
            key={s.id}
            className={`vfy-stage ${
              i <= stageIdx ? 'active' : ''
            } ${i === stageIdx ? 'current' : ''}`}
          >
            <div className="vfy-stage-dot">
              {i < stageIdx ? '✓' : i + 1}
            </div>

            <span>{s.label}</span>

            {i < STAGES.length - 1 && (
              <div className="vfy-stage-arrow" />
            )}
          </div>
        ))}

      </div>

      {/* =====================================================
          AI SIGNAL
      ===================================================== */}
      <div className="vfy-signal-banner">

        <AlertTriangle
          size={22}
          style={{
            color: '#b77b1e',
            flexShrink: 0,
          }}
        />

        <div>

          <span>
            AI-GENERATED RISK SIGNAL — AWAITING HUMAN VERIFICATION
          </span>

          <strong>{aiFinding}</strong>

        </div>
      </div>

      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}
      <div className="vfy-grid">

        {/* ===================================================
            LEFT / MAIN
        =================================================== */}
        <main className="vfy-main">

          {/* FIELD EVIDENCE — PRIMARY */}
          {/* =================================================
    FIELD EVIDENCE — COMPACT HORIZONTAL
================================================= */}
<section className="vfy-panel vfy-evidence-panel">

  <div className="vfy-section-head">

    <div>
      <span className="nir-eyebrow">
        <Camera size={13} />
        FIELD EVIDENCE RECORDS
      </span>

      <h2>On-site photographic evidence</h2>

      <p>
        Location, timestamp and field observations captured during inspection.
      </p>
    </div>

    {hasEvidence && (
      <span className="nir-pill vfy-record-count">
        {p.evidence.length} RECORDS
      </span>
    )}

  </div>

  {hasEvidence ? (

    <div className="vfy-evidence-horizontal">

      {p.evidence.map((ev, index) => {

        const imageSrc = getEvidenceImage(ev, index)

        return (
          <article
            key={ev.id}
            className="vfy-evidence-card"
          >

            {/* IMAGE */}
            <div className="vfy-image-wrap">

              <img
                src={imageSrc}
                alt={`Field evidence ${ev.id}`}
                className="vfy-evidence-image"
                loading="eager"
              />

              <div className="vfy-image-overlay" />

              <div className="vfy-image-top">

                <span className="vfy-evidence-id">
                  {ev.id}
                </span>

                <span
                  className={
                    ev.visualReview === 'VERIFIED'
                      ? 'vfy-status verified'
                      : 'vfy-status review'
                  }
                >
                  {ev.visualReview === 'VERIFIED'
                    ? '✓ VERIFIED'
                    : '⚑ REVIEW'}
                </span>

              </div>

              <div className="vfy-image-caption">
                <strong>
                  {index === 0
                    ? 'Field Capture'
                    : 'Follow-up Capture'}
                </strong>

                <span>{ev.file}</span>
              </div>

            </div>

            {/* COMPACT DETAILS */}
            <div className="vfy-compact-evidence-info">

              <div className="vfy-compact-evidence-head">

                <div>
                  <strong>{ev.file}</strong>

                  <span>
                    {ev.timestamp}
                  </span>
                </div>

                <button
                  className="nir-link"
                  onClick={() =>
                    openGisAt(
                      p.latitude,
                      p.longitude,
                      p.id
                    )
                  }
                >
                  <MapPin size={12} />
                  GIS
                </button>

              </div>

              <div className="vfy-compact-meta">

                <span>
                  <b>GPS</b>
                  {ev.gps}
                </span>

                <span>
                  <b>LOCATION</b>
                  <em className="green">
                    {ev.locationMatch}
                  </em>
                </span>

                <span>
                  <b>VISUAL</b>
                  <em
                    className={
                      ev.visualReview === 'VERIFIED'
                        ? 'green'
                        : 'amber'
                    }
                  >
                    {ev.visualReview === 'VERIFIED'
                      ? 'VERIFIED'
                      : 'REVIEW'}
                  </em>
                </span>

              </div>

              <div className="vfy-compact-observation">
                <b>FIELD OBSERVATION</b>
                <span>{ev.description}</span>
              </div>

            </div>

          </article>
        )
      })}

    </div>

  ) : (

    <div className="vfy-no-evidence">
      <Camera size={38} />

      <strong>No field evidence on record</strong>

      <span>
        Request a field inspection to collect photographic evidence.
      </span>
    </div>

  )}

</section>

          {/* =================================================
              VERIFICATION CHECKS
          ================================================= */}
          {checks.length > 0 && (
            <section className="vfy-panel">

              <span className="nir-eyebrow">
                <ShieldCheck size={13} />
                VERIFICATION CHECKS
              </span>

              <h2>Evidence cross-check results</h2>

              <div className="vfy-check-grid">

                {checks.map((c) => (

                  <div
                    key={c.label}
                    className={`vfy-check ${
                      c.status === 'warn'
                        ? 'warning'
                        : 'success'
                    }`}
                  >

                    {c.status === 'ok'
                      ? <CheckCircle2 size={18} />
                      : <TriangleAlert size={18} />}

                    <div>
                      <strong>{c.label}</strong>
                      <span>{c.note}</span>
                    </div>

                    <b>
                      {c.status === 'ok'
                        ? '✓ OK'
                        : '⚑ WARN'}
                    </b>

                  </div>

                ))}

              </div>
            </section>
          )}

          {/* =================================================
              PAYMENT INTELLIGENCE
          ================================================= */}
          {flaggedPayments.length > 0 && (
            <section className="vfy-panel">

              <span className="nir-eyebrow">
                PAYMENT INTELLIGENCE SUMMARY
              </span>

              <h2>
                Flagged payments · {flaggedPayments.length} anomalies
                <span className="nir-pill critical vfy-inline-pill">
                  {flaggedPayments.length} FLAGGED
                </span>
              </h2>

              <div className="vfy-payment-list">

                {flaggedPayments.map((pay) => (

                  <div
                    key={pay.id}
                    className="vfy-payment-row"
                  >

                    <strong>
                      {pay.id} · {pay.date}
                    </strong>

                    <span>{pay.reason}</span>

                    <b>
                      {formatCurrency(pay.amount)}
                    </b>

                  </div>

                ))}

              </div>

              {flaggedPayments.length >= 2 && (
                <div className="vfy-warning-note">
                  <strong>Split-payment pattern:</strong>{' '}
                  {flaggedPayments.length} identical or
                  near-identical payments detected.
                </div>
              )}

            </section>
          )}

        </main>

        {/* ===================================================
            RIGHT RAIL
        =================================================== */}
        <aside className="vfy-rail">

          {/* COMPACT PROGRESS */}
          <section className="vfy-card vfy-progress-card">

            <span className="nir-eyebrow">
              REPORTED VS FIELD OBSERVED
            </span>

            <h2>Progress verification</h2>

            <div className="vfy-compact-progress">

              <ProgressMini
                label="REPORTED"
                value={p.physical}
                color="#b77b1e"
              />

              <div className="vfy-mini-variance">

                <strong>
                  {progressVariance != null
                    ? `-${progressVariance}pp`
                    : '—'}
                </strong>

                <span>VARIANCE</span>

              </div>

              <ProgressMini
                label="FIELD OBSERVED"
                value={observedProgress ?? '?'}
                color={
                  progressVariance >= 7
                    ? '#dc4a38'
                    : '#2a8a6e'
                }
              />

            </div>

            <div className="vfy-financial-mini">

              <div>
                <span>EXPENDITURE</span>
                <strong>{p.expenditure}%</strong>
              </div>

              <div>
                <span>FIN. GAP</span>
                <strong className="danger">
                  {gap}pp
                </strong>
              </div>

            </div>

            {gap >= 25 && (
              <div className="vfy-mini-warning">
                <strong>Mismatch detected</strong>
                <span>
                  Financial progress is significantly ahead
                  of physical progress.
                </span>
              </div>
            )}

          </section>

          {/* AI FINDING */}
          <section className="vfy-card ai-card">

            <div className="vfy-card-title">
              <ShieldAlert size={18} />
              <span className="nir-eyebrow">
                AI-ASSISTED FINDING
              </span>
            </div>

            <p className="vfy-ai-text">
              {aiFinding}
            </p>

            <div className="vfy-recommendation">
              <strong>Recommendation</strong>
              <span>{recommendation}</span>
            </div>

            <small className="vfy-ai-note">
              AI detects. Human verifies. Human acts.
              Every decision is recorded.
            </small>

          </section>

          {/* RISK DRIVERS */}
          {drivers.length > 0 && (
            <section className="vfy-card">

              <span className="nir-eyebrow">
                RISK DRIVERS DETECTED
              </span>

              <div className="vfy-driver-list">

                {drivers.map((d) => (

                  <div
                    key={d.id}
                    className={`vfy-driver ${
                      d.severity === 'HIGH'
                        ? 'high'
                        : ''
                    }`}
                  >
                    <span>{d.label}</span>

                    <b>
                      +{d.score}
                    </b>
                  </div>

                ))}

              </div>

            </section>
          )}

          {/* INSPECTION */}
          {inspection && (
            <section className="vfy-card">

              <span className="nir-eyebrow">
                INSPECTION RECORD
              </span>

              <div className="vfy-inspection-list">

                {[
                  ['Inspection ID', inspection.id],
                  ['Assigned Officer', inspection.officer],
                  ['Priority', inspection.priority],
                  ['Date', inspection.date],
                  ['Status', inspection.status],
                  ['Reported %', `${inspection.reported}%`],
                  [
                    'Observed %',
                    inspection.observed
                      ? `${inspection.observed}%`
                      : 'Pending',
                  ],
                ].map(([k, v]) => (

                  <div key={k}>
                    <span>{k}</span>
                    <b>{v}</b>
                  </div>

                ))}

              </div>

            </section>
          )}

          {/* DECISION */}
          <section className="vfy-card action-card">

            <span className="nir-eyebrow">
              OFFICER DECISION
            </span>

            <p className="vfy-action-copy">
              Review the submitted evidence and make an
              administrative decision. Every action is
              recorded in the audit trail.
            </p>

            {actionDone ? (

              <div className="vfy-action-done">

                <CheckCircle2 size={30} />

                <strong>Action Recorded</strong>

                <span>
                  {decision === 'escalate'
                    ? 'Escalated to senior authority'
                    : decision === 'verify'
                      ? 'Verification submitted for decision'
                      : decision === 'resolve'
                        ? 'Marked resolved'
                        : 'Clarification requested'}
                  {' — audit trail updated.'}
                </span>

                <button
                  className="nir-link"
                  onClick={() => navigate('compliance')}
                >
                  View audit trail
                  <ArrowRight size={13} />
                </button>

              </div>

            ) : (

              <div className="vfy-actions">

                <button
                  className="nir-primary wide"
                  onClick={() => doAction('verify')}
                >
                  <ClipboardCheck size={16} />
                  Submit for officer decision
                </button>

                <button
                  className="nir-outline wide vfy-red-button"
                  onClick={() => doAction('escalate')}
                >
                  <TriangleAlert size={16} />
                  Escalate to senior authority
                </button>

                <button
                  className="nir-outline wide"
                  onClick={() => doAction('clarify')}
                >
                  <ShieldAlert size={16} />
                  Request clarification
                </button>

                <button
                  className="nir-outline wide vfy-green-button"
                  onClick={() => doAction('resolve')}
                >
                  <BadgeCheck size={16} />
                  Mark resolved
                </button>

              </div>

            )}

          </section>

          {/* CONNECTED WORKFLOW */}
          <section className="vfy-card vfy-connected">

            <span className="nir-eyebrow">
              CONNECTED WORKFLOW
            </span>

            <button
              className="nir-link"
              onClick={() => navigate('detail')}
            >
              <ArrowRight size={14} />
              Return to project file
            </button>

            <button
              className="nir-link"
              onClick={() => navigate('connected')}
            >
              <ArrowRight size={14} />
              Connected risk signals
            </button>

            <button
              className="nir-link"
              onClick={() =>
                openGisAt(
                  p.latitude,
                  p.longitude,
                  p.id
                )
              }
            >
              <MapPin size={14} />
              View location on map
            </button>

            <button
              className="nir-link"
              onClick={() => navigate('compliance')}
            >
              <ShieldCheck size={14} />
              Audit trail
            </button>

          </section>

        </aside>
      </div>
    </div>
  )
}

function ProgressMini({ label, value, color }) {
  return (
    <div className="vfy-progress-mini">

      <span>{label}</span>

      <strong style={{ color }}>
        {value}
        {typeof value === 'number' && '%'}
      </strong>

      {typeof value === 'number' && (
        <div className="vfy-mini-bar">
          <i
            style={{
              width: `${Math.min(value, 100)}%`,
              background: color,
            }}
          />
        </div>
      )}

    </div>
  )
}

function EvidenceMeta({
  label,
  value,
  highlight,
  warn,
}) {
  return (
    <div className="vfy-meta-item">

      <span>{label}</span>

      <strong
        className={
          highlight
            ? 'green'
            : warn
              ? 'amber'
              : ''
        }
      >
        {value}
      </strong>

    </div>
  )
}