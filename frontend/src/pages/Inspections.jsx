import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Eye,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import '../styles/nirikshan.css'

const statusConfig = {
  Submitted: { bg: '#e9f5ef', color: '#216454', icon: CheckCircle2 },
  Pending: { bg: '#fff5e4', color: '#b77b1e', icon: Clock3 },
  Scheduled: { bg: '#eff6ff', color: '#2563eb', icon: ClipboardCheck },
  'Under Review': { bg: '#f5f0ff', color: '#7c3aed', icon: Eye },
  Escalated: { bg: '#faece8', color: '#ae4438', icon: AlertTriangle },
  Resolved: { bg: '#f0fdf4', color: '#166534', icon: ShieldCheck },
}

const priorityBg = { High: '#faece8', Medium: '#fff5e4', Low: '#f8faf9' }
const priorityColor = { High: '#ae4438', Medium: '#b77b1e', Low: '#67807a' }

export default function Inspections() {
  const { inspections, projects, openInspection, setSelectedId, navigate } = useApp()
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? inspections
    : inspections.filter(i => i.status === filter)

  const statuses = ['All', ...new Set(inspections.map(i => i.status))]
  const submitted = inspections.filter(i => i.status === 'Submitted').length
  const pending = inspections.filter(i => i.status === 'Pending' || i.status === 'Scheduled').length
  const escalated = inspections.filter(i => i.status === 'Escalated').length
  const withDiscrepancy = inspections.filter(i => i.observed != null && i.reported - i.observed >= 5).length
  const avgGap = withDiscrepancy > 0
    ? Math.round(
        inspections
          .filter(i => i.observed != null && i.reported - i.observed >= 5)
          .reduce((sum, i) => sum + (i.reported - i.observed), 0) / withDiscrepancy
      )
    : 0

  const openFieldEvidence = (inspection) => {
    const project = projects.find(p => p.id === inspection.projectId)
    if (project) {
      setSelectedId(project.id)
      navigate('verification')
    }
  }

  return (
    <div className="nir-page">

      {/* HEADER */}
      <section className="nir-command-hero" style={{ background: '#1a2c35', marginBottom: 20 }}>
        <div>
          <span className="nir-eyebrow" style={{ color: '#82c9b4' }}>
            <ClipboardCheck size={13} /> STAGE 05 · FIELD VERIFICATION
          </span>
          <h1>Field Inspections &amp; Evidence</h1>
          <p>
            Physical evidence from the field is the final check on AI risk signals.
            Inspections close the loop between data-driven detection and human-confirmed verification.
          </p>
        </div>
        <div className="nir-hero-action">
          <span style={{ color: '#82c9b4' }}>EVIDENCE SUBMITTED</span>
          <strong style={{ fontSize: 42, display: 'block' }}>{submitted}</strong>
          <small style={{ color: '#a9c8bf', fontSize: 13 }}>{pending} pending · {withDiscrepancy} discrepancies confirmed</small>
        </div>
      </section>

      {/* COMPACT KPI STRIP */}
      <div style={{
        display: 'flex',
        background: '#fff',
        border: '1px solid #dce7e3',
        borderRadius: 12,
        marginBottom: 18,
        overflow: 'hidden',
      }}>
        {[
          { label: 'PENDING', value: pending, note: 'Awaiting field visit', color: '#b77b1e' },
          { label: 'VERIFIED', value: submitted, note: 'Evidence submitted', color: '#216454' },
          { label: 'ESCALATED', value: escalated, note: 'Awaiting decision', color: '#ae4438' },
          { label: 'AVG. VERIFICATION GAP', value: withDiscrepancy > 0 ? `${avgGap}pp` : '—', note: 'Among confirmed discrepancies', color: '#1b3c43' },
        ].map((k, i) => (
          <div key={k.label} style={{
            flex: 1,
            padding: '14px 22px',
            borderRight: i < 3 ? '1px solid #e7efec' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: k.color, lineHeight: 1, minWidth: 40 }}>{k.value}</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#8ca59f', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{k.label}</div>
              <div style={{ fontSize: 12, color: '#67807a', marginTop: 2 }}>{k.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER BAR */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#67807a', marginRight: 4 }}>FILTER:</span>
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: `1px solid ${filter === s ? '#10834b' : '#dce7e3'}`,
              background: filter === s ? '#10834b' : '#fff',
              color: filter === s ? '#fff' : '#47635e',
              fontSize: 13,
              fontWeight: filter === s ? 700 : 500,
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* INSPECTION CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(item => {
          const project = projects.find(p => p.id === item.projectId)
          const discrepancy = item.observed != null ? item.reported - item.observed : null
          const hasDiscrepancy = discrepancy != null && discrepancy >= 5

          return (
            <div
              key={item.id}
              style={{
                background: '#fff',
                border: `1px solid ${hasDiscrepancy ? '#edb5a2' : '#dce7e3'}`,
                borderLeft: `4px solid ${hasDiscrepancy ? '#dc4a38' : item.status === 'Submitted' ? '#2a8a6e' : '#b77b1e'}`,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, padding: '16px 20px', alignItems: 'start' }}>

                {/* LEFT: Inspection info */}
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#67807a', fontFamily: 'DM Mono, monospace' }}>{item.id}</span>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 800,
                      background: statusConfig[item.status]?.bg || '#f8faf9',
                      color: statusConfig[item.status]?.color || '#67807a',
                    }}>
                      {item.status}
                    </span>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 800,
                      background: priorityBg[item.priority] || '#f8faf9',
                      color: priorityColor[item.priority] || '#67807a',
                    }}>
                      {item.priority} Priority
                    </span>
                    {hasDiscrepancy && (
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#ae4438', background: '#faece8', padding: '3px 10px', borderRadius: 4 }}>
                        ⚑ {discrepancy}pp Discrepancy
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1b3c43', marginBottom: 5, lineHeight: 1.3 }}>
                    {project?.name || item.projectId}
                  </div>

                  {project && (
                    <div style={{ fontSize: 13, color: '#67807a', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {project.district}, {project.state}</span>
                      <span>· {project.category}</span>
                      <span>· {project.agency}</span>
                    </div>
                  )}

                  {item.reason && (
                    <div style={{ fontSize: 13, color: '#47635e', marginBottom: 10, padding: '8px 12px', background: '#f5f9f7', borderRadius: 6, lineHeight: 1.55 }}>
                      <strong style={{ color: '#1b3c43' }}>Reason:</strong> {item.reason}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 13 }}>
                      <UserCheck size={13} style={{ color: '#67807a' }} />
                      <span style={{ color: '#67807a' }}>Officer:</span>
                      <strong style={{ color: '#1b3c43' }}>{item.officer}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 13 }}>
                      <Clock3 size={13} style={{ color: '#67807a' }} />
                      <span style={{ color: '#67807a' }}>Date:</span>
                      <strong style={{ color: '#1b3c43' }}>{item.date}</strong>
                    </div>
                    {project && (
                      <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 13 }}>
                        <span style={{ color: '#67807a' }}>Project Risk:</span>
                        <strong style={{ color: project.score >= 80 ? '#ae4438' : project.score >= 60 ? '#b77b1e' : '#216454' }}>
                          {project.score}/100
                        </strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT: Progress comparison */}
                <div style={{ textAlign: 'right', minWidth: 200, flexShrink: 0 }}>
                  {item.observed != null ? (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center' }}>
                        <div style={{ textAlign: 'center', padding: '10px 14px', background: '#fff5e4', borderRadius: 8, border: '1px solid #e6cdab' }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: '#67807a', marginBottom: 3 }}>REPORTED</div>
                          <div style={{ fontSize: 26, fontWeight: 800, color: '#b77b1e' }}>{item.reported}%</div>
                        </div>
                        <div style={{ fontSize: 12, color: hasDiscrepancy ? '#dc4a38' : '#2a8a6e', fontWeight: 800 }}>VS</div>
                        <div style={{ textAlign: 'center', padding: '10px 14px', background: hasDiscrepancy ? '#faece8' : '#e9f5ef', borderRadius: 8, border: `1px solid ${hasDiscrepancy ? '#edb5a2' : '#a5d0c1'}` }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: '#67807a', marginBottom: 3 }}>OBSERVED</div>
                          <div style={{ fontSize: 26, fontWeight: 800, color: hasDiscrepancy ? '#ae4438' : '#216454' }}>{item.observed}%</div>
                        </div>
                      </div>
                      {hasDiscrepancy && (
                        <div style={{ marginTop: 8, padding: '5px 12px', background: '#faece8', border: '1px solid #edb5a2', borderRadius: 6, fontSize: 12, color: '#ae4438', fontWeight: 800, textAlign: 'center' }}>
                          ⚑ {discrepancy}pp verification gap
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ padding: '12px 18px', background: '#f8faf9', borderRadius: 8, border: '1px solid #dce7e3', textAlign: 'center' }}>
                      <Camera size={18} style={{ color: '#8ca59f', marginBottom: 5 }} />
                      <div style={{ fontSize: 12, color: '#67807a' }}>Reported</div>
                      <div style={{ fontSize: 26, fontWeight: 800, color: '#1b3c43' }}>{item.reported}%</div>
                      <div style={{ fontSize: 11, color: '#8ca59f', marginTop: 4 }}>Evidence pending</div>
                    </div>
                  )}
                </div>
              </div>

              {/* FIELD FINDING */}
              {item.verificationResult && (
                <div style={{ padding: '10px 20px', background: '#f5f9f7', borderTop: '1px solid #dce7e3', fontSize: 13, color: '#47635e', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <ShieldCheck size={14} style={{ color: '#2a8a6e', flexShrink: 0, marginTop: 2 }} />
                  <div><strong style={{ color: '#1b3c43' }}>Field finding:</strong> {item.verificationResult}</div>
                </div>
              )}

              {/* ACTION ROW */}
              <div style={{ padding: '10px 20px', background: '#fafcfb', borderTop: '1px solid #f0f5f2', display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  className="nir-link"
                  onClick={() => openInspection(item.id)}
                  style={{ fontSize: 13 }}
                >
                  Open inspection detail <ArrowRight size={12} />
                </button>
                {project && (
                  <button
                    className="nir-link"
                    onClick={() => openFieldEvidence(item)}
                    style={{ fontSize: 13 }}
                  >
                    <Eye size={12} /> Field evidence &amp; verification <ArrowRight size={12} />
                  </button>
                )}
                {hasDiscrepancy && (
                  <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 800, color: '#ae4438', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ShieldAlert size={13} /> Requires officer decision
                  </span>
                )}
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ padding: 48, textAlign: 'center', background: '#f8faf9', borderRadius: 10, border: '1px dashed #dce7e3' }}>
            <ClipboardCheck size={36} style={{ color: '#a5c3bc', marginBottom: 12 }} />
            <p style={{ fontSize: 14, color: '#67807a' }}>No inspections match current filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
