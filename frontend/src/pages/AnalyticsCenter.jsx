import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Filter,
  IndianRupee,
  Layers,
  MapPin,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { trendData, fundData } from '../data/mockData.js'
import '../styles/nirikshan.css'

export default function AnalyticsCenter() {
  const { projects, payments, navigate, openProject, openGisAt } = useApp()
  const [stateFilter, setStateFilter] = useState('All')
  const [districtFilter, setDistrictFilter] = useState('All')

  const states = useMemo(() => ['All', ...new Set(projects.map(p => p.state))], [projects])
  const districts = useMemo(() => ['All', ...new Set(projects.filter(p => stateFilter === 'All' || p.state === stateFilter).map(p => p.district))], [projects, stateFilter])

  const filteredProjects = useMemo(() => {
    return projects.filter(p =>
      (stateFilter === 'All' || p.state === stateFilter) &&
      (districtFilter === 'All' || p.district === districtFilter)
    )
  }, [projects, stateFilter, districtFilter])

  const highRisk = filteredProjects.filter(p => p.score >= 60)
  const anomalies = payments.filter(p => p.flagged)

  const maxFund = Math.max(...fundData.map(d => d.allocated))

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
            Identify systematic risk vectors across states and districts.
          </p>
        </div>
        <div className="nir-hero-action">
          <span style={{ color: '#88c9b4' }}>CRITICAL / HIGH RISK</span>
          <strong style={{ fontSize: 42, display: 'block', color: highRisk.length > 0 ? '#efc18b' : '#a9db6e' }}>
            {highRisk.length}
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        
        {/* SCATTER PLOT */}
        <section className="nir-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <span className="nir-eyebrow">FINANCIAL VS PHYSICAL</span>
              <h2 style={{ fontSize: 16, marginTop: 4 }}>Anomaly Detection Scatter Matrix</h2>
            </div>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 300, background: '#f8faf9', borderLeft: '1px solid #dce7e3', borderBottom: '1px solid #dce7e3', marginTop: 10 }}>
            {/* Grid lines */}
            {[20, 40, 60, 80].map(val => (
              <div key={`y-${val}`} style={{ position: 'absolute', bottom: `${val}%`, left: 0, right: 0, height: 1, background: '#e7efec' }} />
            ))}
            {[20, 40, 60, 80].map(val => (
              <div key={`x-${val}`} style={{ position: 'absolute', left: `${val}%`, top: 0, bottom: 0, width: 1, background: '#e7efec' }} />
            ))}
            
            {/* Safe zone indicator */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, background: 'linear-gradient(to top right, transparent 48%, rgba(220,74,56,0.05) 50%, rgba(220,74,56,0.15) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 10, fontWeight: 800, color: '#dc4a38', letterSpacing: '.05em' }}>
              HIGH RISK ZONE (Exp &gt;&gt; Phy)
            </div>
            
            {/* Dots */}
            {filteredProjects.map(p => {
              const exp = Math.min(100, Math.max(0, p.expenditure || 0))
              const phy = Math.min(100, Math.max(0, p.physical || 0))
              const isHighRisk = exp - phy >= 20
              return (
                <div key={p.id} 
                  title={`${p.name}\nExp: ${exp}%\nPhy: ${phy}%`}
                  onClick={() => openProject(p.id)}
                  style={{
                    position: 'absolute',
                    left: `${phy}%`,
                    bottom: `${exp}%`,
                    width: isHighRisk ? 12 : 8,
                    height: isHighRisk ? 12 : 8,
                    transform: 'translate(-50%, 50%)',
                    background: isHighRisk ? '#dc4a38' : '#2a8a6e',
                    borderRadius: '50%',
                    border: '2px solid #fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    zIndex: isHighRisk ? 10 : 1
                  }} 
                />
              )
            })}
            
            {/* Axes Labels */}
            <div style={{ position: 'absolute', bottom: -24, left: 0, right: 0, textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#67807a' }}>PHYSICAL PROGRESS %</div>
            <div style={{ position: 'absolute', left: -24, top: 0, bottom: 0, writingMode: 'vertical-rl', transform: 'rotate(180deg)', textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#67807a' }}>EXPENDITURE %</div>
          </div>
        </section>

        {/* RISK TREND & FUNDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          <section className="nir-panel">
            <span className="nir-eyebrow">TEMPORAL ANALYSIS</span>
            <h2 style={{ fontSize: 16, marginTop: 4, marginBottom: 16 }}>Detected Anomaly Trends</h2>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120, paddingBottom: 10, borderBottom: '1px solid #dce7e3' }}>
              {trendData.map(d => (
                <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2 }}>
                  <div style={{ background: '#dc4a38', height: `${d.high * 4}px`, borderRadius: '2px 2px 0 0' }} title={`Critical: ${d.high}`} />
                  <div style={{ background: '#d9890f', height: `${d.medium * 4}px`, borderRadius: '2px 2px 0 0' }} title={`Medium: ${d.medium}`} />
                  <div style={{ textAlign: 'center', fontSize: 9, color: '#67807a', marginTop: 4 }}>{d.month}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11, fontWeight: 600 }}>
              <span style={{ color: '#dc4a38' }}><span style={{ display: 'inline-block', width: 8, height: 8, background: '#dc4a38', marginRight: 4, borderRadius: 2 }}/> High Risk</span>
              <span style={{ color: '#d9890f' }}><span style={{ display: 'inline-block', width: 8, height: 8, background: '#d9890f', marginRight: 4, borderRadius: 2 }}/> Medium Risk</span>
            </div>
          </section>

          <section className="nir-panel">
            <span className="nir-eyebrow">FUND UTILIZATION</span>
            <h2 style={{ fontSize: 16, marginTop: 4, marginBottom: 16 }}>Disbursement vs Execution</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {fundData.map(d => (
                <div key={d.state}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                    <span style={{ color: '#1b3c43', fontWeight: 600 }}>{d.state}</span>
                    <span style={{ color: '#67807a' }}>{d.utilized}% utilized</span>
                  </div>
                  <div style={{ height: 6, background: '#e7efec', borderRadius: 3, display: 'flex' }}>
                    <div style={{ width: `${(d.allocated / maxFund) * 100}%`, background: '#b4d1c6', borderRadius: 3, position: 'relative' }}>
                      <div style={{ width: `${(d.utilized / d.allocated) * 100}%`, height: '100%', background: '#2a8a6e', borderRadius: 3 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* HIGH RISK LIST */}
      <section className="nir-panel">
        <span className="nir-eyebrow">ACTION REQUIRED</span>
        <h2 style={{ fontSize: 16, marginTop: 4, marginBottom: 16 }}>High-Priority Interventions</h2>
        
        {highRisk.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', background: '#f8faf9', borderRadius: 8, border: '1px dashed #dce7e3' }}>
            <CheckCircle2 size={32} style={{ color: '#2a8a6e', marginBottom: 10 }} />
            <div style={{ color: '#1b3c43', fontWeight: 700 }}>No high-risk projects</div>
            <div style={{ color: '#67807a', fontSize: 12, marginTop: 4 }}>Current filter shows no projects requiring immediate intervention.</div>
          </div>
        ) : (
          <table className="nir-table">
            <thead>
              <tr>
                <th>Project / Location</th>
                <th>Category</th>
                <th>Expenditure</th>
                <th>Physical</th>
                <th>Risk Score</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {highRisk.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1b3c43' }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#67807a', marginTop: 2 }}><MapPin size={10}/> {p.district}, {p.state}</div>
                  </td>
                  <td style={{ color: '#47635e', fontSize: 12 }}>{p.category}</td>
                  <td>
                    <div style={{ fontWeight: 700, color: p.expenditure >= 80 ? '#b77b1e' : '#1b3c43' }}>{p.expenditure}%</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1b3c43' }}>{p.physical}%</div>
                  </td>
                  <td>
                    <div style={{ display: 'inline-flex', padding: '2px 8px', background: '#fff5f3', color: '#ae4438', borderRadius: 12, fontSize: 11, fontWeight: 800 }}>
                      {p.score} · Critical
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="nir-link" onClick={() => openProject(p.id)}>
                      Investigate <ArrowRight size={12}/>
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