import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  GitCompare,
  MapPin,
  MinusCircle,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { compareProjects } from '../services/duplicateWorkEngine.jsx'
import { generateProjectIntelligence } from '../data/mockData.js'
import { formatCurrency } from '../utils/formatters.js'
import '../styles/nirikshan.css'

const rupee = (n) => `₹${(n / 100000).toFixed(1)}L`
const rCol = (s) => (s >= 80 ? '#ae4438' : s >= 60 ? '#b77b1e' : '#2a8a6e')

export default function ComparisonPage() {
  const { selected, compareProjectId, projects, openProject, openGisAt, navigate } = useApp()
  const projectA = selected
  const projectB = projects.find((p) => p.id === compareProjectId)

  if (!projectA || !projectB) {
    return (
      <div className="nir-page">
        <button className="nir-back" onClick={() => navigate('duplicates')}>
          <ArrowLeft size={14} /> Back
        </button>
        <div className="nir-panel" style={{ textAlign: 'center', padding: 60 }}>
          <GitCompare size={48} style={{ color: '#dce7e3', marginBottom: 16 }} />
          <h2 style={{ color: '#8ca59f', fontSize: 18 }}>No projects selected for comparison</h2>
          <p style={{ color: '#8ca59f', marginTop: 8, fontSize: 13 }}>
            Open a project and select "Compare" from Similar Work Detection.
          </p>
          <button className="nir-primary" style={{ marginTop: 20 }} onClick={() => navigate('duplicates')}>
            <GitCompare size={15} /> Open Similar Work Detection
          </button>
        </div>
      </div>
    )
  }

  const comparison = compareProjects(projectA, projectB)
  const intelA = generateProjectIntelligence(projectA)
  const intelB = generateProjectIntelligence(projectB)
  const gapA = (projectA.expenditure || 0) - (projectA.physical || 0)
  const gapB = (projectB.expenditure || 0) - (projectB.physical || 0)

  const fields = [
    { label: 'Category', a: projectA.category, b: projectB.category },
    { label: 'District', a: projectA.district + ', ' + projectA.state, b: projectB.district + ', ' + projectB.state },
    { label: 'Sanctioned Amount', a: rupee(projectA.amount), b: rupee(projectB.amount), numeric: true, nA: projectA.amount, nB: projectB.amount },
    { label: 'Expenditure %', a: `${projectA.expenditure}%`, b: `${projectB.expenditure}%`, numeric: true, nA: projectA.expenditure, nB: projectB.expenditure, invert: true },
    { label: 'Physical Progress %', a: `${projectA.physical}%`, b: `${projectB.physical}%`, numeric: true, nA: projectA.physical, nB: projectB.physical },
    { label: 'Exp–Progress Gap', a: `${gapA}pp`, b: `${gapB}pp`, numeric: true, nA: gapA, nB: gapB, invert: true },
    { label: 'Schedule Delay', a: projectA.delay, b: projectB.delay },
    { label: 'Vendor', a: projectA.vendor, b: projectB.vendor, highlight: projectA.vendorId === projectB.vendorId },
    { label: 'Agency', a: projectA.agency, b: projectB.agency, highlight: projectA.agency === projectB.agency },
    { label: 'Risk Score', a: `${projectA.score}/100`, b: `${projectB.score}/100`, numeric: true, nA: projectA.score, nB: projectB.score, invert: true },
    { label: 'Status', a: projectA.status, b: projectB.status },
  ]

  return (
    <div className="nir-page">
      <button className="nir-back" onClick={() => navigate('duplicates')}>
        <ArrowLeft size={14} /> Back to Similar Work Detection
      </button>

      {/* HEADER */}
      <section className="nir-command-hero" style={{ background: '#1a1235', marginBottom: 20 }}>
        <div>
          <span className="nir-eyebrow" style={{ color: '#c4b5fd' }}>
            <GitCompare size={13} /> PROJECT COMPARISON · SIDE-BY-SIDE INTELLIGENCE
          </span>
          <h1>How do these two projects relate?</h1>
          <p>
            AI-detected similarity score: <strong style={{ color: '#a9db6e', fontSize: 18 }}>{comparison?.score ?? '—'}/100</strong> ·
            {' '}{comparison?.label ?? 'Similarity detected'} · {comparison?.reasons?.join(' · ')}
          </p>
        </div>
        <div className="nir-hero-action" style={{ borderLeftColor: '#2e2055' }}>
          <span style={{ color: '#c4b5fd' }}>SIMILARITY SCORE</span>
          <strong style={{ fontSize: 42, display: 'block', color: comparison?.score >= 70 ? '#ef4444' : comparison?.score >= 50 ? '#f59e0b' : '#a9db6e' }}>
            {comparison?.score ?? '—'}
          </strong>
          <small style={{ color: '#a5c3d6', fontSize: 11 }}>
            {comparison?.score >= 70 ? 'Possible duplicate — investigate' : comparison?.score >= 50 ? 'Potential overlap' : 'Related work'}
          </small>
        </div>
      </section>

      {/* SIDE-BY-SIDE HEADERS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <ProjectHeader project={projectA} label="PROJECT A" onClick={() => openProject(projectA.id)} onMap={() => openGisAt(projectA.latitude, projectA.longitude, projectA.id)} navigate={navigate} />
        <ProjectHeader project={projectB} label="PROJECT B" onClick={() => openProject(projectB.id)} onMap={() => openGisAt(projectB.latitude, projectB.longitude, projectB.id)} navigate={navigate} />
      </div>

      {/* COMPARISON TABLE */}
      <section className="nir-panel" style={{ marginBottom: 16 }}>
        <span className="nir-eyebrow" style={{ marginBottom: 12, display: 'block' }}>SIDE-BY-SIDE COMPARISON</span>
        <table className="nir-table" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Field</th>
              <th style={{ width: '36%' }}>{projectA.id}</th>
              <th style={{ width: '36%' }}>{projectB.id}</th>
              <th style={{ width: '6%' }}>Δ</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => {
              const same = f.a === f.b
              const higher = f.numeric ? (f.nA > f.nB ? 'A' : f.nA < f.nB ? 'B' : 'same') : 'same'
              const aIsRisk = f.invert ? higher === 'A' : false
              return (
                <tr key={f.label} className="nir-table-row-hover" style={{ background: f.highlight ? '#fff8e4' : 'transparent' }}>
                  <td style={{ color: '#67807a', fontSize: 12, fontWeight: 700 }}>{f.label}</td>
                  <td style={{ color: aIsRisk ? '#ae4438' : '#1b3c43', fontWeight: aIsRisk ? 700 : 500, fontSize: 13 }}>
                    {f.a}
                    {f.highlight && <span style={{ marginLeft: 6, fontSize: 10, color: '#b77b1e', fontWeight: 800 }}>↔ Same</span>}
                  </td>
                  <td style={{ color: !f.invert && f.numeric && higher === 'B' ? '#2a8a6e' : '#1b3c43', fontSize: 13 }}>
                    {f.b}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {same ? <MinusCircle size={14} style={{ color: '#a5c3bc' }} />
                      : f.highlight ? <AlertTriangle size={14} style={{ color: '#b77b1e' }} />
                        : higher === 'A' && f.invert ? <TrendingUp size={14} style={{ color: '#ae4438' }} />
                          : higher === 'B' && f.invert ? <TrendingDown size={14} style={{ color: '#2a8a6e' }} />
                            : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      {/* SIMILARITY BREAKDOWN */}
      {comparison?.signals && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <section className="nir-panel">
            <span className="nir-eyebrow" style={{ marginBottom: 12, display: 'block' }}>SIMILARITY BREAKDOWN</span>
            {Object.entries(comparison.signals).map(([key, val]) => (
              <div key={key} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span style={{ textTransform: 'capitalize', color: '#47635e' }}>{key}</span>
                  <b style={{ color: val >= 70 ? '#ae4438' : '#1b3c43' }}>{Math.round(val)}%</b>
                </div>
                <div style={{ height: 6, background: '#e7efec', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${Math.round(val)}%`, background: val >= 70 ? '#dc4a38' : val >= 40 ? '#d9890f' : '#65a98f', borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </section>

          <section className="nir-panel">
            <span className="nir-eyebrow" style={{ marginBottom: 12, display: 'block' }}>WHY THESE PROJECTS ARE RELATED</span>
            {comparison.reasons?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {comparison.reasons.map((r) => (
                  <div key={r} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#1b3c43', padding: '8px 12px', background: '#fff5e4', borderRadius: 6, border: '1px solid #e6cdab' }}>
                    <AlertTriangle size={14} style={{ color: '#b77b1e', flexShrink: 0, marginTop: 2 }} />
                    {r}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: 13, color: '#8ca59f' }}>Limited similarity reasoning — score based on aggregate signals.</p>
            )}
            <p style={{ fontSize: 11, color: '#8ca59f', marginTop: 12, lineHeight: 1.5 }}>
              High similarity is a risk signal for review — not a confirmed finding. An officer must investigate field conditions.
            </p>
          </section>
        </div>
      )}

      {/* RISK COMPARISON BARS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <RiskBar label="PROJECT A" project={projectA} intel={intelA} />
        <RiskBar label="PROJECT B" project={projectB} intel={intelB} />
      </div>

      {/* ACTIONS */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 8 }}>
        <button className="nir-primary" onClick={() => openProject(projectA.id)}>
          <ArrowRight size={15} /> Investigate Project A
        </button>
        <button className="nir-outline" onClick={() => openProject(projectB.id)}>
          <ArrowRight size={15} /> Investigate Project B
        </button>
        <button className="nir-outline" onClick={() => navigate('duplicates')}>
          <GitCompare size={15} /> Back to Similar Work
        </button>
      </div>
    </div>
  )
}

function ProjectHeader({ project: p, label, onClick, onMap }) {
  const gap = (p.expenditure || 0) - (p.physical || 0)
  return (
    <div style={{ background: '#1b3c43', color: '#fff', borderRadius: 12, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: '#a9db6e', letterSpacing: '.1em' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.2 }}>{p.name}</div>
      <div style={{ fontSize: 12, color: '#a9c8bf', display: 'flex', alignItems: 'center', gap: 4 }}>
        <MapPin size={12} /> {p.district}, {p.state} · {p.category}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: rCol(p.score) }}>{p.score}<small style={{ fontSize: 14 }}>/100</small></span>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, fontSize: 11, color: '#a9c8bf' }}>
          <span>Exp: {p.expenditure}% · Phy: {p.physical}% · Gap: <b style={{ color: gap >= 20 ? '#ef4444' : '#a9db6e' }}>{gap}pp</b></span>
          <span>Vendor: {p.vendor}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onClick} style={{ border: '0', background: '#a9db6e', color: '#183941', borderRadius: 6, padding: '7px 12px', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
          Open Project <ArrowRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </button>
        <button onClick={onMap} style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', borderRadius: 6, padding: '7px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
          <MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Map
        </button>
      </div>
    </div>
  )
}

function RiskBar({ label, project: p, intel }) {
  return (
    <section className="nir-panel">
      <span className="nir-eyebrow" style={{ marginBottom: 10, display: 'block' }}>{label} · RISK PROFILE</span>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 40, fontWeight: 800, color: rCol(p.score), lineHeight: 1 }}>{p.score}</div>
        <div>
          <div style={{ fontSize: 12, color: '#67807a' }}>Risk Score</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1b3c43', marginTop: 2 }}>{p.status}</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {intel.drivers.map((d) => (
          <div key={d.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#47635e', marginBottom: 2 }}>
              <span>{d.label}</span>
              <b style={{ color: rCol(d.score * 2) }}>+{d.score}</b>
            </div>
            <div style={{ height: 4, background: '#edf1ef', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${Math.min(100, d.score * 3)}%`, background: d.severity === 'HIGH' ? '#dc4a38' : '#d9890f', borderRadius: 2 }} />
            </div>
          </div>
        ))}
        {intel.drivers.length === 0 && <p style={{ fontSize: 12, color: '#8ca59f' }}>Low risk — no major drivers detected.</p>}
      </div>
    </section>
  )
}
