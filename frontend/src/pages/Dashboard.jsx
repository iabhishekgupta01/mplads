import { useMemo } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  ClipboardCheck,
  Database,
  Eye,
  GitCompare,
  MapPinned,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'
import '../styles/nirikshan.css'

export default function Dashboard() {
  const { projects, payments, inspections, vendors, openProject, navigate } = useApp()

  const priority = useMemo(
    () => [...projects].filter((p) => p.score >= 60).sort((a, b) => b.score - a.score),
    [projects]
  )
  const critical = projects.filter((p) => p.score >= 80)
  const flaggedPayments = payments.filter((p) => p.flagged)
  const pendingInspections = inspections.filter(
    (i) => i.status === 'Pending' || i.status === 'Scheduled'
  )

  // Demo project — Community Hall / Road Construction Sehore
  const sehore = projects.find((p) => p.id === 'MP-2024-1001') || projects[0]

  const riskDistribution = useMemo(() => {
    const high = projects.filter((p) => p.score >= 70).length
    const medium = projects.filter((p) => p.score >= 40 && p.score < 70).length
    const low = projects.filter((p) => p.score < 40).length
    return { high, medium, low }
  }, [projects])

  const stateRisks = useMemo(() => {
    const stateMap = {}
    projects.forEach((p) => {
      if (!stateMap[p.state]) stateMap[p.state] = { total: 0, highRisk: 0, totalAmt: 0 }
      stateMap[p.state].total++
      stateMap[p.state].totalAmt += p.amount
      if (p.score >= 60) stateMap[p.state].highRisk++
    })
    return Object.entries(stateMap)
      .map(([state, data]) => ({ state, ...data }))
      .sort((a, b) => b.highRisk - a.highRisk)
  }, [projects])

  return (
    <div className="nir-page">

      {/* ====== COMMAND HERO ====== */}
      <section className="nir-command-hero">
        <div>
          <span className="nir-eyebrow">
            <Sparkles size={13} /> NIRIKSHAN · NATIONAL RISK INTELLIGENCE LAYER
          </span>
          <h1>
            From monitoring data to <em>verified action.</em>
          </h1>
          <p>
            NIRIKSHAN connects financial, execution, payment, spatial and field
            signals into explainable priorities for MPLADS monitoring
            authorities. AI assists detection — human officers determine action.
          </p>
        </div>
        <div className="nir-hero-action">
          <span>DEMO CASE READY</span>
          <strong>{sehore?.name || 'Road Construction — Sehore'}</strong>
          <small style={{ color: '#c6d6d6', fontSize: 11, marginBottom: 4 }}>
          {sehore?.score}/100 CRITICAL · Road work: financial-progress mismatch + payment anomaly
          </small>
          <button onClick={() => openProject(sehore?.id)}>
            Investigate critical case <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ====== DECISION FLOW ====== */}
      <section className="nir-flow" aria-label="NIRIKSHAN decision flow">
        {[
          ['01', 'DATA', Database, 'data'],
          ['02', 'DETECT', AlertTriangle, 'alerts'],
          ['03', 'CONNECT', Network, 'connected'],
          ['04', 'PRIORITIZE', BrainCircuit, 'alerts'],
          ['05', 'VERIFY', Eye, 'verification'],
          ['06', 'ACT & AUDIT', ShieldCheck, 'compliance'],
        ].map(([n, label, Icon, target], i) => (
          <button
            className="nir-flow-step"
            key={label}
            onClick={() => navigate(target)}
            title={`Go to ${label}`}
          >
            <span>{n}</span>
            <Icon size={18} />
            <strong>{label}</strong>
            {i < 5 && <i>→</i>}
          </button>
        ))}
      </section>

      {/* ====== KPI GRID ====== */}
      <section className="nir-kpis">
        <Metric
          label="AI priority cases"
          value={priority.length}
          note={`Risk score 60+ · needs review`}
          tone="red"
          onClick={() => navigate('alerts')}
        />
        <Metric
          label="Critical risk signals"
          value={critical.length}
          note="Score 80+ · immediate investigation"
          tone="amber"
          onClick={() => navigate('alerts')}
        />
        <Metric
          label="Payment patterns flagged"
          value={flaggedPayments.length}
          note={`${formatCurrency(flaggedPayments.reduce((s, p) => s + p.amount, 0))} exposed`}
          tone="blue"
          onClick={() => navigate('payments')}
        />
        <Metric
          label="Field verifications"
          value={pendingInspections.length}
          note="Awaiting ground evidence check"
          tone="green"
          onClick={() => navigate('inspections')}
        />
      </section>

      {/* ====== MAIN GRID: PRIORITY QUEUE + RISK FINGERPRINT ====== */}
      <section className="nir-grid-main">
        {/* LEFT: AI Priority Queue */}
        <article className="nir-panel nir-priority-panel">
          <div className="nir-panel-head">
            <div>
              <span className="nir-eyebrow">AI PRIORITY QUEUE</span>
              <h2>What needs attention now</h2>
            </div>
            <button className="nir-link" onClick={() => navigate('alerts')}>
              Open full queue <ArrowRight size={14} />
            </button>
          </div>
          <p className="nir-subtext">
            Ranked by cross-signal risk analysis. AI findings require human verification before action.
          </p>
          <div className="nir-priority-list">
            {priority.slice(0, 5).map((p, index) => (
              <button
                className="nir-priority-row"
                key={p.id}
                onClick={() => openProject(p.id)}
              >
                <b className="nir-rank">0{index + 1}</b>
                <div>
                  <strong>{p.name}</strong>
                  <span>
                    {p.id} · {p.district}, {p.state}
                  </span>
                </div>
                <div className="nir-signal">
                  <span>{p.finding}</span>
                  <small>
                    {p.expenditure}% spent · {p.physical}% physical
                  </small>
                </div>
                <b className={`nir-score ${p.score >= 80 ? 'critical' : ''}`}>
                  {p.score}
                  <small>/100</small>
                </b>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
        </article>

        {/* RIGHT: Demo Case Risk Fingerprint */}
        <article className="nir-panel nir-case-snapshot">
          <div className="nir-panel-head">
            <div>
              <span className="nir-eyebrow">
                RISK FINGERPRINT · DEMO CASE
              </span>
              <h2>Why {sehore?.district || 'Sehore'} is flagged</h2>
            </div>
            <span className="nir-pill critical">{sehore?.score} / 100 HIGH</span>
          </div>
          <div className="nir-fingerprint-summary">
            <div className="nir-ring">
              <strong>{sehore?.score || 82}</strong>
              <small>RISK</small>
            </div>
            <div>
              <strong>Multiple independent signals detected</strong>
              <p>
                Financial-physical mismatch, clustered payment pattern, schedule
                delay and nearby related work converge into a high-confidence
                risk assessment.
              </p>
            </div>
          </div>
          <div className="nir-driver-bars">
            <Driver label="Financial vs physical mismatch" value={45} />
            <Driver label="Clustered payment anomaly (3×₹5L)" value={24} />
            <Driver label="Schedule delay ({sehore?.delay || '4 months'})" value={18} />
            <Driver label="Vendor risk signal" value={8} />
            <Driver label="Nearby related work" value={5} />
          </div>
          <button
            className="nir-primary wide"
            onClick={() => openProject(sehore?.id)}
          >
            Review evidence & recommended action <ArrowRight size={16} />
          </button>
        </article>
      </section>

      {/* ====== BOTTOM GRID ====== */}
      <section className="nir-grid-bottom" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        {/* Connected Risk Intelligence */}
        <article className="nir-panel" style={{ cursor: 'pointer' }} onClick={() => navigate('connected')}>
          <span className="nir-eyebrow">
            <Network size={12} /> CONNECTED RISK INTELLIGENCE
          </span>
          <h2>One project is not an isolated record</h2>
          <div className="nir-network">
            <div className="node active">
              {sehore?.name?.split(' ').slice(0, 2).join(' ') || 'Road Construction'}
              <br />
              <small>Sehore · {sehore?.score || 82}</small>
            </div>
            <span>↔</span>
            <div className="node">
              ABC Infrastructure
              <br />
              <small>Vendor risk: 86</small>
            </div>
            <span>↔</span>
            <div className="node">
              Village Road
              <br />
              <small>Related · 76</small>
            </div>
          </div>
          <p className="nir-subtext">
            <MapPinned size={14} /> Same contractor, same work category, nearby
            GPS coordinates — a reviewable relationship signal.
          </p>
          <button className="nir-link" onClick={(e) => { e.stopPropagation(); navigate('connected') }}>
            Investigate connections <ArrowRight size={14} />
          </button>
        </article>

        {/* Evidence & Governance */}
        <article className="nir-panel">
          <span className="nir-eyebrow">
            <ClipboardCheck size={12} /> EVIDENCE & GOVERNANCE
          </span>
          <h2>Verification closes the loop</h2>
          <div className="nir-verify-mini">
            <div>
              <small>REPORTED</small>
              <strong>{sehore?.physical || 40}%</strong>
              <span>physical progress</span>
            </div>
            <b>vs</b>
            <div>
              <small>EVIDENCE-SUPPORTED</small>
              <strong style={{ color: '#b44b38' }}>31%</strong>
              <span>field evidence estimate</span>
            </div>
          </div>
          <div className="nir-status-line">
            <ClipboardCheck size={16} />
            <span>
              GPS matched · Timestamp verified · Image requires review
            </span>
          </div>
          <button className="nir-link" onClick={() => navigate('verification')}>
            Open verification workspace <ArrowRight size={14} />
          </button>
        </article>

        {/* Strategic Analytics Bridge */}
        <article className="nir-panel">
          <span className="nir-eyebrow">
            <BarChart3 size={12} /> PROGRAM ANALYTICS
          </span>
          <h2>Strategic risk patterns</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '14px 0' }}>
            <div className="nir-driver">
              <div>
                <span>Critical Risk (70+)</span>
                <b style={{ color: '#ae4438' }}>{riskDistribution.high}</b>
              </div>
              <i>
                <em
                  style={{
                    width: `${(riskDistribution.high / projects.length) * 100}%`,
                    background: '#dc4a38',
                  }}
                />
              </i>
            </div>
            <div className="nir-driver">
              <div>
                <span>Elevated Risk (40–69)</span>
                <b style={{ color: '#b77b1e' }}>{riskDistribution.medium}</b>
              </div>
              <i>
                <em
                  style={{
                    width: `${(riskDistribution.medium / projects.length) * 100}%`,
                    background: '#d9890f',
                  }}
                />
              </i>
            </div>
            <div className="nir-driver">
              <div>
                <span>Normal (&lt;40)</span>
                <b style={{ color: '#2a8a6e' }}>{riskDistribution.low}</b>
              </div>
              <i>
                <em
                  style={{
                    width: `${(riskDistribution.low / projects.length) * 100}%`,
                    background: '#65a98f',
                  }}
                />
              </i>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button className="nir-link" onClick={() => navigate('analytics')}>
              <TrendingUp size={13} /> Risk Analytics <ArrowRight size={12} />
            </button>
            <button className="nir-link" onClick={() => navigate('map')}>
              <MapPinned size={13} /> Spatial Map <ArrowRight size={12} />
            </button>
            <button className="nir-link" onClick={() => navigate('duplicates')}>
              <GitCompare size={13} /> Similar Works <ArrowRight size={12} />
            </button>
          </div>
        </article>
      </section>

      {/* ====== STATE RISK TABLE ====== */}
      <section className="nir-panel" style={{ marginTop: 17 }}>
        <div className="nir-panel-head">
          <div>
            <span className="nir-eyebrow">REGIONAL RISK CONCENTRATION</span>
            <h2>State-level vulnerability overview</h2>
          </div>
          <button className="nir-link" onClick={() => navigate('map')}>
            View spatial map <ArrowRight size={14} />
          </button>
        </div>
        <div style={{ overflowX: 'auto', marginTop: 14 }}>
          <table className="nir-table">
            <thead>
              <tr>
                <th>STATE</th>
                <th>PROJECTS</th>
                <th>HIGH RISK (60+)</th>
                <th>SANCTIONED VALUE</th>
                <th>RISK DENSITY</th>
              </tr>
            </thead>
            <tbody>
              {stateRisks.map((s) => (
                <tr key={s.state} className="nir-table-row-hover" style={{ cursor: 'pointer' }} onClick={() => navigate('analytics')}>
                  <td style={{ fontWeight: 700 }}>{s.state}</td>
                  <td>{s.total}</td>
                  <td>
                    <span
                      style={{
                        background: s.highRisk > 0 ? '#f9e9e5' : '#e9f5ef',
                        color: s.highRisk > 0 ? '#9b3e31' : '#216454',
                        padding: '3px 7px',
                        borderRadius: 4,
                        fontWeight: 700,
                        fontSize: 11,
                      }}
                    >
                      {s.highRisk}
                    </span>
                  </td>
                  <td>{formatCurrency(s.totalAmt)}</td>
                  <td>
                    <div style={{ height: 6, background: '#edf1ef', borderRadius: 3, width: 100 }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${s.total > 0 ? (s.highRisk / s.total) * 100 : 0}%`,
                          background: s.highRisk / s.total >= 0.5 ? '#dc4a38' : '#d9890f',
                          borderRadius: 3,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ====== LIVE ACTIVITY TICKER ====== */}
      <section className="nir-panel" style={{ marginTop: 17 }}>
        <div className="nir-panel-head">
          <span className="nir-eyebrow">LIVE THREAT STREAM</span>
          <span className="nir-muted-badge" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#2a8a6e', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
            Live
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
          {[
          { text: 'AI score updated: Rural Link Road Improvement – Sehore 68 → 82', time: '2 min ago', tone: 'ai' },
            { text: '3 identical ₹5L payments flagged on MP-2024-1001 (Sehore Road)', time: '15 min ago', tone: 'ai' },
            { text: 'Field inspection INSP-1001 assigned to Anita Sharma (Sehore)', time: '1 hr ago', tone: 'system' },
            { text: 'Community Hall Indore: risk score escalated to 92/100', time: '3 hrs ago', tone: 'ai' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                flex: '1 1 200px',
                padding: '10px 14px',
                background: item.tone === 'ai' ? '#fff8f0' : '#f5f9f7',
                borderRadius: 8,
                borderLeft: `3px solid ${item.tone === 'ai' ? '#d97706' : '#65a98f'}`,
                fontSize: 12,
                color: '#2d4a44',
              }}
            >
              <div style={{ fontWeight: 700 }}>{item.text}</div>
              <div style={{ color: '#8ca59f', marginTop: 3, fontSize: 11 }}>
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====== GOVERNANCE TRUST ====== */}
      <section style={{ marginTop: 17, display: 'flex', gap: 12, alignItems: 'center', padding: '14px 20px', background: '#f5f9f7', borderRadius: 10, border: '1px solid #dce7e3' }}>
        <BadgeCheck size={22} style={{ color: '#2a8a6e', flexShrink: 0 }} />
        <div>
          <strong style={{ fontSize: 13, color: '#1b3c43', display: 'block' }}>Human-in-the-loop governance</strong>
          <span style={{ fontSize: 12, color: '#47635e' }}>
            NIRIKSHAN is a decision-support tool. Every AI signal requires human verification. 
            Every officer decision is recorded in the tamper-evident audit trail.
          </span>
        </div>
        <button className="nir-link" style={{ whiteSpace: 'nowrap' }} onClick={() => navigate('compliance')}>
          View audit ledger <ArrowRight size={13} />
        </button>
      </section>
    </div>
  )
}

function Metric({ label, value, note, tone, onClick }) {
  return (
    <article className={`nir-metric ${tone}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}

function Driver({ label, value }) {
  return (
    <div className="nir-driver">
      <div>
        <span>{label}</span>
        <b>+{value}</b>
      </div>
      <i>
        <em style={{ width: `${Math.min(100, value * 2)}%` }} />
      </i>
    </div>
  )
}
