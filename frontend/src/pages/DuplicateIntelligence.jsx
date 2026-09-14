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
import { formatCurrency, riskColor } from '../utils/formatters.js'

export default function DuplicateIntelligence() {
  const { projects, openProject, openComparison, setSelectedId, navigate } = useApp()
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
  const related = pairs.filter((p) => p.score >= 30 && p.score < 50).length

  const severityConfig = {
    high: { bg: '#faece8', color: '#ae4438', border: '#eeb3aa', label: 'Possible Duplicate' },
    medium: { bg: '#fff5e4', color: '#b77b1e', border: '#e6cdab', label: 'Potential Overlap' },
    low: { bg: '#e9f5ef', color: '#216454', border: '#a5d0c1', label: 'Related Work' },
    clear: { bg: '#f5f9f7', color: '#67807a', border: '#dce7e3', label: 'Low Similarity' },
  }

  const handleCompare = (pair) => {
    setSelectedId(pair.a.id)
    openComparison(pair.b.id)
  }

  return (
    <div className="nir-page">

      {/* HEADER */}
      <section className="nir-command-hero" style={{ background: '#1a1235', marginBottom: 20 }}>
        <div>
          <span className="nir-eyebrow" style={{ color: '#c4b5fd' }}>
            <GitCompare size={13} /> SIMILAR WORK DETECTION · DUPLICATE INTELLIGENCE
          </span>
          <h1>
            Are two works the <em style={{ color: '#a9db6e' }}>same project?</em>
          </h1>
          <p>
            NIRIKSHAN compares work names, categories, locations, vendors, and financial
            parameters across the MPLADS portfolio to detect possible duplicate works,
            overlapping scope, or related projects that may indicate accountability risks.
          </p>
        </div>
        <div className="nir-hero-action" style={{ borderLeftColor: '#2e2055' }}>
          <span style={{ color: '#c4b5fd' }}>PORTFOLIO SCAN</span>
          <strong style={{ fontSize: 38, display: 'block' }}>{filteredPairs.length}</strong>
          <small style={{ color: '#a5c3d6', fontSize: 12 }}>{critical} possible duplicates · {potential} potential overlaps</small>
        </div>
      </section>

      {/* COMPACT KPI STRIP */}
      <div style={{
        display: 'flex',
        gap: 0,
        background: '#fff',
        border: '1px solid #dce7e3',
        borderRadius: 12,
        marginBottom: 18,
        overflow: 'hidden',
      }}>
        {[
          { label: 'SIMILAR WORK CASES', value: pairs.length, note: 'All combinations', color: '#1b3c43' },
          { label: 'POSSIBLE DUPLICATES', value: critical, note: 'Similarity ≥ 70%', color: '#ae4438' },
          { label: 'POTENTIAL OVERLAPS', value: potential, note: 'Similarity 50–69%', color: '#b77b1e' },
          { label: 'RELATED WORKS', value: related, note: 'Similarity 30–49%', color: '#216454' },
        ].map((k, i) => (
          <div key={k.label} style={{
            flex: 1,
            padding: '14px 20px',
            borderRight: i < 3 ? '1px solid #e7efec' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <div style={{
              fontSize: 34,
              fontWeight: 800,
              color: k.color,
              lineHeight: 1,
              minWidth: 44,
            }}>{k.value}</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#8ca59f', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{k.label}</div>
              <div style={{ fontSize: 12, color: '#67807a', marginTop: 2 }}>{k.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: '#fff', border: '1px solid #dce7e3', borderRadius: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 180 }}>
          <Search size={15} style={{ color: '#8ca59f' }} />
          <input
            type="text"
            placeholder="Search projects, IDs, districts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: 13, color: '#1b3c43' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#67807a' }}>MIN SCORE:</span>
          {[20, 30, 50, 70].map((v) => (
            <button
              key={v}
              onClick={() => setMinScore(v)}
              style={{ padding: '5px 12px', borderRadius: 4, border: '1px solid #dce7e3', background: minScore === v ? '#185a49' : '#fff', color: minScore === v ? '#fff' : '#47635e', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
            >
              {v}%+
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#67807a' }}>SORT:</span>
          {[['score', 'By Score'], ['name', 'By Name']].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setSortBy(v)}
              style={{ padding: '5px 12px', borderRadius: 4, border: '1px solid #dce7e3', background: sortBy === v ? '#185a49' : '#fff', color: sortBy === v ? '#fff' : '#47635e', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* METHODOLOGY NOTE */}
      <div style={{ padding: '10px 16px', background: '#f8faf9', border: '1px solid #dce7e3', borderRadius: 8, marginBottom: 16, fontSize: 13, color: '#47635e', display: 'flex', alignItems: 'center', gap: 10 }}>
        <CheckCircle2 size={16} style={{ color: '#2a8a6e', flexShrink: 0 }} />
        <span>
          <strong style={{ color: '#1b3c43' }}>Methodology:</strong> Similarity scoring uses weighted combination of
          name/description text similarity, category match, location overlap, shared vendor, and financial parameter comparison.
          A high score is a risk signal — not a confirmed finding of fraud or duplication.
        </span>
      </div>

      {/* PAIRS LIST */}
      {filteredPairs.length === 0 ? (
        <div className="nir-panel" style={{ textAlign: 'center', padding: 40, color: '#8ca59f' }}>
          No matching pairs found for current filters.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredPairs.map((pair, idx) => {
            const sev = severityConfig[pair.classification?.severity || pair.severity || 'low'] || severityConfig.low
            const reasons = pair.reasons || []
            const breakdown = pair.signals || {}

            return (
              <div
                key={`${pair.a.id}-${pair.b.id}`}
                style={{
                  background: '#fff',
                  border: '1px solid #dce7e3',
                  borderLeft: `4px solid ${sev.color}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                {/* PAIR HEADER */}
                <div style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'center',
                  padding: '14px 20px',
                  background: sev.bg + '60',
                  borderBottom: '1px solid #e7efec',
                  flexWrap: 'wrap',
                }}>
                  {/* SCORE BADGE */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#8ca59f', fontFamily: 'monospace' }}>#{String(idx + 1).padStart(2, '0')}</div>
                    <div style={{
                      width: 58,
                      height: 58,
                      borderRadius: '50%',
                      background: sev.bg,
                      border: `2px solid ${sev.border}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <strong style={{ fontSize: 20, fontWeight: 800, color: sev.color, lineHeight: 1 }}>{pair.score}</strong>
                      <span style={{ fontSize: 9, color: sev.color, fontWeight: 700 }}>SCORE</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: sev.color }}>{sev.label}</div>
                      <div style={{ fontSize: 12, color: '#67807a', marginTop: 2 }}>Similarity {pair.score}%</div>
                    </div>
                  </div>

                  <div style={{ flex: 1 }} />

                  {/* ACTIONS */}
                  <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleCompare(pair)}
                      style={{
                        background: sev.color,
                        color: '#fff',
                        border: 0,
                        borderRadius: 8,
                        padding: '9px 16px',
                        fontSize: 13,
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7,
                      }}
                    >
                      <GitCompare size={14} /> Compare &amp; Investigate <ArrowRight size={13} />
                    </button>
                    <button
                      onClick={() => navigate('map')}
                      style={{
                        background: '#fff',
                        color: '#47635e',
                        border: '1px solid #dce7e3',
                        borderRadius: 8,
                        padding: '9px 14px',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <MapPin size={13} /> View on Map
                    </button>
                  </div>
                </div>

                {/* PAIR BODY */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto', gap: 0, padding: '16px 20px', alignItems: 'stretch' }}>

                  {/* PROJECT A */}
                  <ProjectCard project={pair.a} onClick={() => openProject(pair.a.id)} label="PROJECT A" />

                  {/* VS */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#8ca59f' }}>VS</span>
                  </div>

                  {/* PROJECT B */}
                  <ProjectCard project={pair.b} onClick={() => openProject(pair.b.id)} label="PROJECT B" />

                  {/* SIMILARITY BREAKDOWN */}
                  <div style={{ paddingLeft: 20, borderLeft: '1px solid #e7efec', minWidth: 200 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#67807a', marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Similarity Breakdown</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {Object.entries(breakdown).filter(([, v]) => v != null).map(([key, value]) => (
                        <div key={key}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#47635e', marginBottom: 3 }}>
                            <span style={{ textTransform: 'capitalize' }}>{key}</span>
                            <b style={{ color: value >= 70 ? '#ae4438' : '#1b3c43' }}>{Math.round(value)}%</b>
                          </div>
                          <div style={{ height: 5, background: '#edf1ef', borderRadius: 2 }}>
                            <div style={{ height: '100%', width: `${Math.round(value)}%`, background: value >= 70 ? '#dc4a38' : value >= 40 ? '#d9890f' : '#65a98f', borderRadius: 2 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {reasons.length > 0 && (
                      <div style={{ marginTop: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#67807a', display: 'block', marginBottom: 5 }}>REASONS FLAGGED</span>
                        {reasons.map((r) => (
                          <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: '#47635e', marginBottom: 4 }}>
                            <AlertTriangle size={11} style={{ color: sev.color, flexShrink: 0, marginTop: 2 }} />
                            {r}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* GUIDANCE NOTE */}
      <div style={{ marginTop: 20, padding: '14px 20px', background: '#f5f9f7', borderRadius: 10, border: '1px solid #dce7e3', fontSize: 13, color: '#47635e' }}>
        <strong style={{ color: '#1b3c43', display: 'block', marginBottom: 6 }}>
          How to act on detected similar works
        </strong>
        <p style={{ margin: 0, lineHeight: 1.65 }}>
          A high similarity score is a risk signal that warrants review — not a confirmed finding of fraud or duplication.
          Use <strong>Compare &amp; Investigate</strong> to examine each pair side by side. If a genuine overlap is confirmed,
          escalate to the appropriate authority. All investigation actions must be recorded in the audit trail.
        </p>
        <button className="nir-link" style={{ marginTop: 10, fontSize: 13 }} onClick={() => navigate('compliance')}>
          View audit trail <ArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}

function ProjectCard({ project: p, onClick, label }) {
  const rc = riskColor(p.score)
  const gap = (p.expenditure || 0) - (p.physical || 0)
  return (
    <div
      onClick={onClick}
      style={{
        padding: '12px 16px',
        background: '#f8faf9',
        border: '1px solid #dce7e3',
        borderRadius: 10,
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = '#eef7f3'}
      onMouseLeave={(e) => e.currentTarget.style.background = '#f8faf9'}
    >
      <div style={{ fontSize: 10, fontWeight: 800, color: '#67807a', letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: '#1b3c43', marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
      <div style={{ fontSize: 12, color: '#67807a', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
        <MapPin size={11} /> {p.district}, {p.state}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        <span style={{ fontSize: 12, padding: '3px 8px', background: '#f0f0f0', borderRadius: 4, color: '#47635e' }}>{p.category}</span>
        <span style={{ fontSize: 12, padding: '3px 8px', borderRadius: 4, background: rc + '18', color: rc, fontWeight: 700 }}>Risk {p.score}</span>
        <span style={{ fontSize: 12, padding: '3px 8px', background: '#f0f0f0', borderRadius: 4, color: '#47635e' }}>{formatCurrency(p.amount)}</span>
      </div>
      <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#67807a' }}>
        <span>Exp: <strong style={{ color: '#1b3c43' }}>{p.expenditure}%</strong></span>
        <span>Phy: <strong style={{ color: '#1b3c43' }}>{p.physical}%</strong></span>
        <span>Gap: <strong style={{ color: gap >= 20 ? '#ae4438' : '#1b3c43' }}>{gap}pp</strong></span>
      </div>
      {p.vendor && (
        <div style={{ fontSize: 12, color: '#67807a', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Building2 size={11} /> {p.vendor}
        </div>
      )}
    </div>
  )
}
