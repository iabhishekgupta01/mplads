import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Filter,
  MapPin,
  Network,
  ShieldAlert,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { trendData, fundData, earlyWarningData } from '../data/mockData.js'
import { riskLabel, riskColor } from '../utils/formatters.js'
import '../styles/nirikshan.css'
import '../styles/analytics.css'

// ── MINI BAR ──────────────────────────────────────────────────
function MiniBar({ value, max, color }) {
  return (
    <div style={{ height: 6, background: '#e7efec', borderRadius: 3 }}>
      <div style={{ width: `${Math.min(100, (value / max) * 100)}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.3s' }} />
    </div>
  )
}

// ── RISK BADGE ─────────────────────────────────────────────────
function RiskBadge({ score }) {
  const col = riskColor(score)
  const lbl = riskLabel(score)
  return (
    <span style={{ display: 'inline-flex', padding: '2px 8px', background: `${col}18`, color: col, borderRadius: 12, fontSize: 10, fontWeight: 800, border: `1px solid ${col}33` }}>
      {lbl}
    </span>
  )
}

export default function AnalyticsCenter() {
  const { projects, payments, vendors, navigate, openProject, openVendor } = useApp()
  const [stateFilter, setStateFilter] = useState('All')
  const [districtFilter, setDistrictFilter] = useState('All')
  const [hoveredPoint, setHoveredPoint] = useState(null)

  const states = useMemo(() => ['All', ...new Set(projects.map(p => p.state))], [projects])
  const districts = useMemo(() =>
    ['All', ...new Set(projects.filter(p => stateFilter === 'All' || p.state === stateFilter).map(p => p.district))],
    [projects, stateFilter]
  )

  const filteredProjects = useMemo(() =>
    projects.filter(p =>
      (stateFilter === 'All' || p.state === stateFilter) &&
      (districtFilter === 'All' || p.district === districtFilter)
    ), [projects, stateFilter, districtFilter]
  )

  // Risk distribution
  const critical = filteredProjects.filter(p => p.score >= 80)
  const high = filteredProjects.filter(p => p.score >= 60 && p.score < 80)
  const medium = filteredProjects.filter(p => p.score >= 40 && p.score < 60)
  const low = filteredProjects.filter(p => p.score < 40)
  const anomalies = payments.filter(p => p.flagged)

  const maxFund = Math.max(...fundData.map(d => d.allocated))

  // District risk data
  const districtRisk = useMemo(() => {
    const map = {}
    filteredProjects.forEach(p => {
      if (!map[p.district]) map[p.district] = { district: p.district, state: p.state, total: 0, highRisk: 0, maxScore: 0 }
      map[p.district].total++
      map[p.district].maxScore = Math.max(map[p.district].maxScore, p.score)
      if (p.score >= 60) map[p.district].highRisk++
    })
    return Object.values(map).sort((a, b) => b.maxScore - a.maxScore)
  }, [filteredProjects])

  // Category risk data
  const categoryRisk = useMemo(() => {
    const map = {}
    filteredProjects.forEach(p => {
      if (!map[p.category]) map[p.category] = { category: p.category, total: 0, highRisk: 0, maxScore: 0, avgScore: 0, scores: [] }
      map[p.category].total++
      map[p.category].scores.push(p.score)
      map[p.category].maxScore = Math.max(map[p.category].maxScore, p.score)
      if (p.score >= 60) map[p.category].highRisk++
    })
    Object.values(map).forEach(c => {
      c.avgScore = Math.round(c.scores.reduce((a, b) => a + b, 0) / c.scores.length)
    })
    return Object.values(map).sort((a, b) => b.avgScore - a.avgScore)
  }, [filteredProjects])

  // Vendor risk data
  const vendorRisk = useMemo(() =>
    vendors.map(v => ({
      ...v,
      projectCount: projects.filter(p => p.vendorId === v.id).length,
      flaggedPayments: payments.filter(pay => pay.vendorId === v.id && pay.flagged).length,
    })).sort((a, b) => b.risk - a.risk),
    [vendors, projects, payments]
  )

  return (
    <div className="nir-page">
      {/* HEADER */}
      <section className="nir-command-hero" style={{ background: '#172722', marginBottom: 20 }}>
        <div>
          <span className="nir-eyebrow" style={{ color: '#88c9b4' }}>
            <Activity size={13} /> RISK ANALYTICS CENTER
          </span>
          <h1>Intelligence & Anomaly Patterns</h1>
          <p>
            Macro-level view of financial disbursement against physical execution.
            Identify systematic risk vectors across states, districts, categories, vendors and payment patterns.
          </p>
        </div>
        <div className="nir-hero-action">
          <span style={{ color: '#88c9b4' }}>CRITICAL / HIGH RISK</span>
          <strong style={{ fontSize: 42, display: 'block', color: critical.length + high.length > 0 ? '#efc18b' : '#a9db6e' }}>
            {critical.length + high.length}
          </strong>
          <small style={{ color: '#a9c8bf', fontSize: 11 }}>
            Projects require immediate verification
          </small>
        </div>
      </section>

      {/* FILTERS */}
      <div className="nir-filter-bar" style={{ marginBottom: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Filter size={16} style={{ color: '#67807a' }} />
        <select className="nir-select" value={stateFilter} onChange={(e) => { setStateFilter(e.target.value); setDistrictFilter('All') }}>
          {states.map(s => <option key={s} value={s}>{s === 'All' ? 'All States' : s}</option>)}
        </select>
        <select className="nir-select" value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)} disabled={stateFilter === 'All'}>
          {districts.map(d => <option key={d} value={d}>{d === 'All' ? 'All Districts' : d}</option>)}
        </select>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: '#67807a', fontWeight: 600 }}>
          Analyzing {filteredProjects.length} projects
        </div>
      </div>

      {/* RISK DISTRIBUTION METRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'CRITICAL', count: critical.length, color: '#dc4a38', bg: '#faece8', list: critical },
          { label: 'HIGH', count: high.length, color: '#d9890f', bg: '#fff5e4', list: high },
          { label: 'MEDIUM', count: medium.length, color: '#b77b1e', bg: '#fffbeb', list: medium },
          { label: 'LOW', count: low.length, color: '#2a8a6e', bg: '#e9f5ef', list: low },
        ].map(item => (
          <div key={item.label} style={{ background: item.bg, border: `1px solid ${item.color}33`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer' }} onClick={() => item.list[0] && openProject(item.list[0].id)}>
            <div style={{ fontSize: 10, fontWeight: 800, color: item.color, letterSpacing: '.08em', marginBottom: 6 }}>{item.label} RISK</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.count}</div>
            <div style={{ fontSize: 11, color: '#67807a', marginTop: 4 }}>
              {item.count === 1 ? 'project' : 'projects'}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* SCATTER PLOT — FINANCIAL vs PHYSICAL */}
        <section className="nir-panel">
          <div style={{ marginBottom: 16 }}>
            <span className="nir-eyebrow">FINANCIAL VS PHYSICAL</span>
            <h2 style={{ fontSize: 16, marginTop: 4 }}>Anomaly Detection Scatter Matrix</h2>
            <p style={{ fontSize: 11, color: '#67807a', marginTop: 4 }}>
              Points in the top-left zone (high expenditure, low physical progress) are suspicious. Click any point to investigate.
            </p>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 280, background: '#f8faf9', borderLeft: '1px solid #dce7e3', borderBottom: '1px solid #dce7e3', marginTop: 10 }}>
            {/* Grid */}
            {[20, 40, 60, 80].map(val => (
              <div key={`y-${val}`} style={{ position: 'absolute', bottom: `${val}%`, left: 0, right: 0, height: 1, background: '#e7efec' }} />
            ))}
            {[20, 40, 60, 80].map(val => (
              <div key={`x-${val}`} style={{ position: 'absolute', left: `${val}%`, top: 0, bottom: 0, width: 1, background: '#e7efec' }} />
            ))}

            {/* Risk zone */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, background: 'linear-gradient(to top right, transparent 48%, rgba(220,74,56,0.05) 50%, rgba(220,74,56,0.15) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 9, fontWeight: 800, color: '#dc4a38', letterSpacing: '.05em' }}>
              ⚠ HIGH RISK ZONE (HIGH EXP, LOW PROGRESS)
            </div>

            {/* Axis labels */}
            {[0, 25, 50, 75, 100].map(v => (
              <div key={`xl-${v}`} style={{ position: 'absolute', bottom: -18, left: `${v}%`, fontSize: 9, color: '#8ca59f', transform: 'translateX(-50%)' }}>{v}%</div>
            ))}
            {[25, 50, 75, 100].map(v => (
              <div key={`yl-${v}`} style={{ position: 'absolute', left: -22, bottom: `${v}%`, fontSize: 9, color: '#8ca59f', transform: 'translateY(50%)' }}>{v}%</div>
            ))}

            {/* Dots */}
            {filteredProjects.map(p => {
              const exp = Math.min(100, Math.max(0, p.expenditure || 0))
              const phy = Math.min(100, Math.max(0, p.physical || 0))
              const isHighRisk = exp - phy >= 20
              const col = riskColor(p.score)
              return (
                <div
                  key={p.id}
                  title={`${p.name}\nExp: ${exp}% | Progress: ${phy}%\nRisk: ${p.score}`}
                  onClick={() => openProject(p.id)}
                  onMouseEnter={() => setHoveredPoint(p)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  style={{
                    position: 'absolute',
                    left: `${phy}%`,
                    bottom: `${exp}%`,
                    width: isHighRisk ? 14 : 9,
                    height: isHighRisk ? 14 : 9,
                    transform: 'translate(-50%, 50%)',
                    background: col,
                    borderRadius: '50%',
                    border: '2px solid #fff',
                    boxShadow: isHighRisk ? `0 0 0 3px ${col}40, 0 2px 4px rgba(0,0,0,0.2)` : '0 2px 4px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    zIndex: isHighRisk ? 10 : 1,
                    transition: 'transform 0.15s',
                  }}
                />
              )
            })}
          </div>
          {/* Tooltip */}
          {hoveredPoint && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: '#f0f8f4', border: '1px solid #a5d0c1', borderRadius: 8, fontSize: 12 }}>
              <strong style={{ color: '#1b3c43' }}>{hoveredPoint.name}</strong>
              <div style={{ color: '#67807a', marginTop: 4 }}>
                Expenditure: {hoveredPoint.expenditure}% | Progress: {hoveredPoint.physical}% | Risk: <strong style={{ color: riskColor(hoveredPoint.score) }}>{hoveredPoint.score}</strong>
              </div>
              <button className="nir-link" style={{ marginTop: 6 }} onClick={() => openProject(hoveredPoint.id)}>
                Investigate <ArrowRight size={11} />
              </button>
            </div>
          )}
          <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11, flexWrap: 'wrap' }}>
            {[['#dc4a38', 'Critical (≥80)'], ['#d9890f', 'High (60-79)'], ['#b77b1e', 'Medium (40-59)'], ['#2a8a6e', 'Low (<40)']].map(([c, l]) => (
              <span key={l} style={{ color: '#67807a', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, background: c, borderRadius: '50%' }} /> {l}
              </span>
            ))}
          </div>
        </section>

        {/* RISK TREND */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <section className="nir-panel">
            <span className="nir-eyebrow">TEMPORAL ANALYSIS</span>
            <h2 style={{ fontSize: 16, marginTop: 4, marginBottom: 16 }}>Risk Trend — Apr to Sep 2026</h2>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 110, paddingBottom: 6, borderBottom: '1px solid #dce7e3' }}>
              {trendData.map(d => (
                <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2, alignItems: 'center' }}>
                  <div style={{ background: '#dc4a38', width: '85%', height: `${d.critical * 5}px`, borderRadius: '2px 2px 0 0' }} title={`Critical: ${d.critical}`} />
                  <div style={{ background: '#d9890f', width: '85%', height: `${d.high * 5}px` }} title={`High: ${d.high}`} />
                  <div style={{ textAlign: 'center', fontSize: 9, color: '#67807a', marginTop: 4, width: '100%' }}>{d.month}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11 }}>
              <span style={{ color: '#dc4a38' }}><span style={{ display: 'inline-block', width: 8, height: 8, background: '#dc4a38', marginRight: 4, borderRadius: 2 }} />Critical</span>
              <span style={{ color: '#d9890f' }}><span style={{ display: 'inline-block', width: 8, height: 8, background: '#d9890f', marginRight: 4, borderRadius: 2 }} />High</span>
              <span style={{ color: '#67807a', marginLeft: 'auto', fontSize: 11 }}>↑ Risk increasing Q2–Q3</span>
            </div>
          </section>

          <section className="nir-panel">
            <span className="nir-eyebrow">FUND UTILIZATION BY STATE</span>
            <h2 style={{ fontSize: 16, marginTop: 4, marginBottom: 14 }}>Disbursement vs Execution</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {fundData.map(d => (
                <div key={d.state}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                    <span style={{ color: '#1b3c43', fontWeight: 600 }}>{d.state}</span>
                    <span style={{ color: '#67807a' }}>{d.utilized}% utilized of {d.allocated}% allocated</span>
                  </div>
                  <div style={{ height: 8, background: '#e7efec', borderRadius: 4, display: 'flex' }}>
                    <div style={{ width: `${(d.allocated / maxFund) * 100}%`, background: '#b4d1c6', borderRadius: 4, position: 'relative' }}>
                      <div style={{ width: `${(d.utilized / d.allocated) * 100}%`, height: '100%', background: '#2a8a6e', borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* DISTRICT RISK */}
        <section className="nir-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'flex-end' }}>
            <div>
              <span className="nir-eyebrow"><MapPin size={12} /> DISTRICT RISK MAP</span>
              <h2 style={{ fontSize: 16, marginTop: 4 }}>Risk by Location</h2>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {districtRisk.map(d => (
              <div key={d.district} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 70px', gap: 8, alignItems: 'center', padding: '10px 12px', background: d.maxScore >= 80 ? '#faece8' : d.maxScore >= 60 ? '#fff9f3' : '#f8faf9', border: `1px solid ${riskColor(d.maxScore)}22`, borderRadius: 8, cursor: 'pointer' }}
                onClick={() => { setDistrictFilter(d.district); setStateFilter(d.state) }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#1b3c43', fontSize: 13 }}>{d.district}</div>
                  <div style={{ fontSize: 10, color: '#67807a' }}>{d.state} · {d.total} project{d.total !== 1 ? 's' : ''}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: riskColor(d.maxScore) }}>{d.maxScore}</div>
                  <div style={{ fontSize: 9, color: '#8ca59f' }}>max risk</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <RiskBadge score={d.maxScore} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORY RISK */}
        <section className="nir-panel">
          <div style={{ marginBottom: 16 }}>
            <span className="nir-eyebrow"><Building2 size={12} /> CATEGORY RISK ANALYSIS</span>
            <h2 style={{ fontSize: 16, marginTop: 4 }}>Risk by Work Category</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {categoryRisk.map(c => (
              <div key={c.category}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1b3c43' }}>{c.category}</span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#67807a' }}>{c.total} projects</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: riskColor(c.avgScore) }}>{c.avgScore} avg</span>
                  </div>
                </div>
                <MiniBar value={c.avgScore} max={100} color={riskColor(c.avgScore)} />
                {c.highRisk > 0 && (
                  <div style={{ fontSize: 10, color: '#b77b1e', marginTop: 3 }}>
                    {c.highRisk} high-risk project{c.highRisk > 1 ? 's' : ''} require attention
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* PAYMENT INTELLIGENCE */}
        <section className="nir-panel">
          <div style={{ marginBottom: 14 }}>
            <span className="nir-eyebrow"><Wallet size={12} /> PAYMENT INTELLIGENCE</span>
            <h2 style={{ fontSize: 16, marginTop: 4 }}>Flagged Payment Anomalies</h2>
          </div>
          <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
            <div style={{ textAlign: 'center', padding: '10px 16px', background: '#faece8', borderRadius: 8, flex: 1 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#dc4a38' }}>{anomalies.length}</div>
              <div style={{ fontSize: 10, color: '#8ca59f' }}>Flagged</div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 16px', background: '#fff5e4', borderRadius: 8, flex: 1 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#d9890f' }}>
                {[...new Set(anomalies.map(p => p.projectId))].length}
              </div>
              <div style={{ fontSize: 10, color: '#8ca59f' }}>Projects affected</div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 16px', background: '#f8faf9', borderRadius: 8, flex: 1 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#1b3c43' }}>
                {[...new Set(anomalies.map(p => p.vendorId))].length}
              </div>
              <div style={{ fontSize: 10, color: '#8ca59f' }}>Vendors flagged</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {anomalies.slice(0, 4).map(pay => (
              <div key={pay.id} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 80px', gap: 8, padding: '8px 10px', background: '#fff9f5', border: '1px solid #edb5a2', borderRadius: 6, borderLeft: '3px solid #dc4a38', alignItems: 'center', fontSize: 11 }}>
                <strong style={{ color: '#1b3c43' }}>{pay.id}</strong>
                <span style={{ color: '#67807a', fontSize: 10 }} title={pay.reason}>{pay.reason?.substring(0, 50)}…</span>
                <span style={{ fontWeight: 800, color: '#ae4438', textAlign: 'right' }}>₹{(pay.amount / 100000).toFixed(1)}L</span>
              </div>
            ))}
          </div>
          <button className="nir-link" style={{ marginTop: 12 }} onClick={() => navigate('payments')}>
            View all payment records <ArrowRight size={12} />
          </button>
        </section>

        {/* VENDOR RISK */}
        <section className="nir-panel">
          <div style={{ marginBottom: 14 }}>
            <span className="nir-eyebrow"><Network size={12} /> VENDOR INTELLIGENCE</span>
            <h2 style={{ fontSize: 16, marginTop: 4 }}>Vendor Risk Exposure</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {vendorRisk.map(v => (
              <div key={v.id} style={{ display: 'grid', gridTemplateColumns: '1fr 50px 60px 70px', gap: 8, alignItems: 'center', padding: '10px 12px', background: '#f8faf9', border: '1px solid #dce7e3', borderRadius: 8, cursor: 'pointer' }}
                onClick={() => openVendor(v.id)}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12, color: '#1b3c43' }}>{v.name}</div>
                  <div style={{ fontSize: 10, color: '#67807a' }}>{v.projectCount} projects · {v.flaggedPayments} flagged payments</div>
                </div>
                <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 800, color: riskColor(v.risk) }}>{v.risk}</div>
                <div style={{ textAlign: 'center', fontSize: 10, color: '#67807a' }}>₹{(v.value / 100000).toFixed(0)}L</div>
                <div><RiskBadge score={v.risk} /></div>
              </div>
            ))}
          </div>
          <button className="nir-link" style={{ marginTop: 12 }} onClick={() => navigate('vendors')}>
            View all vendors <ArrowRight size={12} />
          </button>
        </section>
      </div>

      {/* EARLY WARNING */}
      <section className="nir-panel" style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 16 }}>
          <span className="nir-eyebrow"><ShieldAlert size={12} /> EARLY WARNING SYSTEM</span>
          <h2 style={{ fontSize: 16, marginTop: 4 }}>Risk Trajectory — Escalating Projects</h2>
          <p style={{ fontSize: 12, color: '#67807a', marginTop: 4 }}>Projects whose risk scores have been increasing over consecutive months.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
          {earlyWarningData.map(ew => {
            const project = projects.find(p => p.id === ew.projectId)
            return (
              <div key={ew.projectId} style={{ padding: '14px 16px', background: '#fff9f5', border: '1px solid #edb5a2', borderRadius: 10, borderLeft: '3px solid #dc4a38' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1, paddingRight: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1b3c43' }}>{ew.name}</div>
                    <div style={{ fontSize: 10, color: '#67807a', marginTop: 2 }}>{ew.projectId}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#dc4a38' }}>+{ew.delta}</div>
                    <div style={{ fontSize: 9, color: '#8ca59f' }}>3-month delta</div>
                  </div>
                </div>
                {/* Mini sparkline */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 36, marginBottom: 8 }}>
                  {ew.trend.map((score, i) => (
                    <div key={i} style={{ flex: 1, background: `linear-gradient(#dc4a38, #b77b1e)`, borderRadius: '2px 2px 0 0', height: `${(score / 100) * 36}px`, opacity: 0.6 + i * 0.13 }} title={`${ew.months[i]}: ${score}`} />
                  ))}
                </div>
                <div style={{ fontSize: 10, color: '#67807a', marginBottom: 8, lineHeight: 1.5 }}>{ew.warning}</div>
                <button className="nir-link" style={{ fontSize: 11 }} onClick={() => openProject(ew.projectId)}>
                  Investigate <ArrowRight size={10} />
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* HIGH PRIORITY LIST */}
      <section className="nir-panel">
        <span className="nir-eyebrow">ACTION REQUIRED</span>
        <h2 style={{ fontSize: 16, marginTop: 4, marginBottom: 16 }}>High-Priority Interventions</h2>

        {critical.length + high.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', background: '#f8faf9', borderRadius: 8, border: '1px dashed #dce7e3' }}>
            <CheckCircle2 size={32} style={{ color: '#2a8a6e', marginBottom: 10 }} />
            <div style={{ color: '#1b3c43', fontWeight: 700 }}>No high-risk projects in current filter</div>
          </div>
        ) : (
          <table className="nir-table">
            <thead>
              <tr>
                <th>Project / Location</th>
                <th>Category</th>
                <th>Expenditure</th>
                <th>Physical</th>
                <th>Gap</th>
                <th>Risk Score</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {[...critical, ...high].sort((a, b) => b.score - a.score).map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1b3c43', fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: '#67807a', marginTop: 2 }}><MapPin size={10} /> {p.district}, {p.state} · {p.id}</div>
                  </td>
                  <td style={{ color: '#47635e', fontSize: 12 }}>{p.category}</td>
                  <td>
                    <div style={{ fontWeight: 700, color: p.expenditure >= 80 ? '#b77b1e' : '#1b3c43' }}>{p.expenditure}%</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1b3c43' }}>{p.physical}%</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: p.expenditure - p.physical >= 25 ? '#dc4a38' : '#d9890f' }}>
                      {p.expenditure - p.physical}pp
                    </div>
                  </td>
                  <td>
                    <RiskBadge score={p.score} />
                    <span style={{ marginLeft: 6, fontWeight: 800, color: riskColor(p.score) }}>{p.score}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="nir-link" onClick={() => openProject(p.id)}>
                      Investigate <ArrowRight size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}