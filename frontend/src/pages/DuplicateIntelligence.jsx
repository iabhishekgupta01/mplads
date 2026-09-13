import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  GitCompare,
  MapPin,
  Search,
  Building2,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { compareProjects } from '../services/duplicateWorkEngine.jsx'
import { formatCurrency } from '../utils/formatters.js'

export default function DuplicateIntelligence() {
  const { projects, openProject, navigate } = useApp()
  const [search, setSearch] = useState('')
  const [minScore, setMinScore] = useState(30)
  const [sortBy, setSortBy] = useState('score')

  const pairs = useMemo(() => {
    const results = []
    for (let i = 0; i < projects.length; i++) {
      for (let j = i + 1; j < projects.length; j++) {
        try {
          const result = compareProjects(projects[i], projects[j])
          if (result && result.score >= minScore) {
            results.push({
              a: projects[i],
              b: projects[j],
              ...result,
            })
          }
        } catch (_) { /* skip */ }
      }
    }
    return results.sort((a, b) => sortBy === 'score' ? b.score - a.score : a.a.name.localeCompare(b.a.name))
  }, [projects, minScore, sortBy])

  const filteredPairs = useMemo(() => {
    if (!search) return pairs
    const s = search.toLowerCase()
    return pairs.filter((p) =>
      p.a.name.toLowerCase().includes(s) ||
      p.b.name.toLowerCase().includes(s) ||
      p.a.id.toLowerCase().includes(s) ||
      p.b.id.toLowerCase().includes(s) ||
      p.a.district.toLowerCase().includes(s) ||
      p.b.district.toLowerCase().includes(s)
    )
  }, [pairs, search])

  const critical = pairs.filter((p) => p.score >= 70).length
  const potential = pairs.filter((p) => p.score >= 50 && p.score < 70).length

  const severityConfig = {
    high: { bg: '#faece8', color: '#ae4438', border: '#eeb3aa', label: 'Possible Duplicate' },
    medium: { bg: '#fff5e4', color: '#b77b1e', border: '#e6cdab', label: 'Potential Overlap' },
    low: { bg: '#e9f5ef', color: '#216454', border: '#a5d0c1', label: 'Related Work' },
    clear: { bg: '#f5f9f7', color: '#67807a', border: '#dce7e3', label: 'Low Similarity' },
  }

  return (
    <div className="nir-page">

      {/* HEADER */}
      <section className="nir-command-hero" style={{ background: '#1a1235' }}>
        <div>
          <span className="nir-eyebrow" style={{ color: '#c4b5fd' }}>
            <GitCompare size={13} /> SIMILAR WORK DETECTION · DUPLICATE INTELLIGENCE
          </span>
          <h1>
            Are two works the <em>same project?</em>
          </h1>
          <p>
            NIRIKSHAN compares work names, categories, locations, vendors, and financial
            parameters across the entire MPLADS portfolio to detect possible duplicate
            works, overlapping scope, or related projects that may indicate fund diversion.
          </p>
        </div>
        <div className="nir-hero-action" style={{ borderLeftColor: '#2e2055' }}>
          <span style={{ color: '#c4b5fd' }}>PORTFOLIO SCAN</span>
          <strong>{filteredPairs.length} pairs</strong>
          <small style={{ color: '#a5c3d6' }}>{critical} possible duplicates · {potential} potential overlaps</small>
        </div>
      </section>

      {/* KPI ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 13, margin: '17px 0' }}>
        {[
          { label: 'Total pairs analyzed', value: pairs.length, note: 'All project combinations' },
          { label: 'Possible duplicates', value: critical, note: 'Similarity ≥ 70%', red: true },
          { label: 'Potential overlaps', value: potential, note: 'Similarity 50–69%', amber: true },
          { label: 'Related works', value: pairs.filter(p => p.score >= 30 && p.score < 50).length, note: 'Similarity 30–49%' },
        ].map((k) => (
          <div key={k.label} className={`nir-metric ${k.red ? 'red' : k.amber ? 'amber' : ''}`}>
            <span>{k.label}</span>
            <strong>{k.value}</strong>
            <small>{k.note}</small>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: '#fff', border: '1px solid #dce7e3', borderRadius: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
          <Search size={15} style={{ color: '#8ca59f' }} />
          <input
            type="text"
            placeholder="Search projects, IDs, districts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: 13 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#67807a' }}>MIN SCORE:</span>
          {[20, 30, 50, 70].map((v) => (
            <button
              key={v}
              onClick={() => setMinScore(v)}
              style={{ padding: '4px 10px', borderRadius: 4, border: '1px solid #dce7e3', background: minScore === v ? '#185a49' : '#fff', color: minScore === v ? '#fff' : '#47635e', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
            >
              {v}%+
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#67807a' }}>SORT:</span>
          {[['score', 'By Score'], ['name', 'By Name']].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setSortBy(v)}
              style={{ padding: '4px 10px', borderRadius: 4, border: '1px solid #dce7e3', background: sortBy === v ? '#185a49' : '#fff', color: sortBy === v ? '#fff' : '#47635e', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* METHODOLOGY NOTE */}
      <div style={{ padding: '10px 16px', background: '#f8faf9', border: '1px solid #dce7e3', borderRadius: 8, marginBottom: 16, fontSize: 12, color: '#47635e', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CheckCircle2 size={16} style={{ color: '#2a8a6e', flexShrink: 0 }} />
        <span>
          <strong style={{ color: '#1b3c43' }}>Methodology:</strong> Similarity scoring uses weighted combination of
          name/description text similarity, category match, location overlap, shared vendor, and financial parameter comparison.
          A high score is a risk signal for review — not a confirmed finding of fraud.
        </span>
      </div>

      {/* PAIRS LIST */}
      {filteredPairs.length === 0 ? (
        <div className="nir-panel" style={{ textAlign: 'center', padding: 40, color: '#8ca59f' }}>
          No matching pairs found for current filters.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredPairs.map((pair, idx) => {
            const sev = severityConfig[pair.classification?.severity || pair.severity || 'low'] || severityConfig.low
            const reasons = pair.reasons || []
            const breakdown = pair.signals || {}
            const severity = pair.severity || 'low'

            return (
              <div
                key={`${pair.a.id}-${pair.b.id}`}
                className="nir-panel"
                style={{ borderLeft: `4px solid ${sev.color}` }}
              >
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>

                  {/* PAIR NUMBER + SCORE */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#8ca59f', fontFamily: 'monospace' }}>#{String(idx + 1).padStart(2, '0')}</div>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: sev.bg, border: `2px solid ${sev.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <strong style={{ fontSize: 22, fontWeight: 800, color: sev.color, lineHeight: 1 }}>{pair.score}</strong>
                      <span style={{ fontSize: 9, color: sev.color, fontWeight: 700 }}>SCORE</span>
                    </div>
                    <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 4, background: sev.bg, color: sev.color, border: `1px solid ${sev.border}`, fontWeight: 800, whiteSpace: 'nowrap', textAlign: 'center' }}>
                      {sev.label}
                    </span>
                  </div>

                  {/* PROJECT A */}
                  <ProjectCard project={pair.a} onClick={() => openProject(pair.a.id)} label="PROJECT A" />

                  {/* VS DIVIDER */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '8px 0', flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#8ca59f' }}>VS</span>
                  </div>

                  {/* PROJECT B */}
                  <ProjectCard project={pair.b} onClick={() => openProject(pair.b.id)} label="PROJECT B" />

                  {/* SIMILARITY BREAKDOWN */}
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#67807a', marginBottom: 8, letterSpacing: '0.06em' }}>SIMILARITY BREAKDOWN</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      {Object.entries(breakdown).filter(([, v]) => v != null).map(([key, value]) => (
                        <div key={key}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#47635e', marginBottom: 2 }}>
                            <span style={{ textTransform: 'capitalize' }}>{key}</span>
                            <b style={{ color: value >= 70 ? '#ae4438' : '#1b3c43' }}>{Math.round(value)}%</b>
                          </div>
                          <div style={{ height: 4, background: '#edf1ef', borderRadius: 2 }}>
                            <div style={{ height: '100%', width: `${Math.round(value)}%`, background: value >= 70 ? '#dc4a38' : value >= 40 ? '#d9890f' : '#65a98f', borderRadius: 2 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {reasons.length > 0 && (
                      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#67807a', letterSpacing: '.04em' }}>REASONS FLAGGED</span>
                        {reasons.map((r) => (
                          <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#47635e' }}>
                            <AlertTriangle size={11} style={{ color: sev.color, flexShrink: 0 }} />
                            {r}
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                      <button
                        className="nir-link"
                        onClick={() => { openProject(pair.a.id); }}
                        style={{ fontSize: 11 }}
                      >
                        Investigate A <ArrowRight size={12} />
                      </button>
                      <button
                        className="nir-link"
                        onClick={() => navigate('map')}
                        style={{ fontSize: 11 }}
                      >
                        <MapPin size={11} /> View map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* GUIDANCE NOTE */}
      <div style={{ marginTop: 20, padding: '14px 20px', background: '#f5f9f7', borderRadius: 10, border: '1px solid #dce7e3', fontSize: 12, color: '#47635e' }}>
        <strong style={{ color: '#1b3c43', display: 'block', marginBottom: 4 }}>
          How to act on detected duplicates
        </strong>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          A high similarity score does not automatically mean fraud or a duplicate work. It is a risk
          signal that warrants review. Compare project descriptions, site locations, physical scope
          and payment records. If a genuine overlap is found, escalate to the appropriate authority.
          All investigation actions must be recorded in the audit trail.
        </p>
        <button className="nir-link" style={{ marginTop: 10 }} onClick={() => navigate('compliance')}>
          View audit ledger <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}

function ProjectCard({ project: p, onClick, label }) {
  const riskColor = p.score >= 70 ? '#ae4438' : p.score >= 40 ? '#b77b1e' : '#2a8a6e'
  const riskBg = p.score >= 70 ? '#faece8' : p.score >= 40 ? '#fff5e4' : '#e9f5ef'
  return (
    <div
      onClick={onClick}
      style={{ flex: 1, minWidth: 180, padding: '12px 14px', background: '#f8faf9', border: '1px solid #dce7e3', borderRadius: 8, cursor: 'pointer' }}
    >
      <div style={{ fontSize: 10, fontWeight: 800, color: '#67807a', letterSpacing: '.05em', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 800, color: '#1b3c43', marginBottom: 4 }}>{p.name}</div>
      <div style={{ fontSize: 11, color: '#67807a', marginBottom: 8 }}>{p.id} · {p.district}, {p.state}</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, padding: '3px 7px', background: '#f0f0f0', borderRadius: 4, color: '#47635e' }}>
          {p.category}
        </span>
        <span style={{ fontSize: 11, padding: '3px 7px', borderRadius: 4, background: riskBg, color: riskColor, fontWeight: 700 }}>
          Risk {p.score}
        </span>
        <span style={{ fontSize: 11, padding: '3px 7px', background: '#f0f0f0', borderRadius: 4, color: '#47635e' }}>
          {formatCurrency(p.amount)}
        </span>
      </div>
      {p.vendor && (
        <div style={{ fontSize: 11, color: '#67807a', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Building2 size={11} /> {p.vendor}
        </div>
      )}
    </div>
  )
}
