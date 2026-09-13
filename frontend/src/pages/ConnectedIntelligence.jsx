import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CreditCard,
  GitCompare,
  MapPin,
  Network,
  ShieldAlert,
  User,
  Wallet,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'
import { compareProjects } from '../services/duplicateWorkEngine.jsx'

export default function ConnectedIntelligence() {
  const { projects, payments, vendors, openProject, navigate, openVendor } = useApp()

  // Center on demo project
  const [focusId, setFocusId] = useState('MP-2024-1001')

  const focusProject = useMemo(
    () => projects.find((p) => p.id === focusId) || projects[0],
    [projects, focusId]
  )

  const focusVendor = useMemo(
    () => vendors.find((v) => v.id === focusProject?.vendorId),
    [vendors, focusProject]
  )

  const focusPayments = useMemo(
    () => payments.filter((p) => p.projectId === focusId),
    [payments, focusId]
  )

  // Find similar/related projects
  const relatedProjects = useMemo(() => {
    if (!focusProject) return []
    return projects
      .filter((p) => p.id !== focusId)
      .map((p) => {
        let comparison = null
        try { comparison = compareProjects(focusProject, p) } catch (e) { /* silent */ }
        const sameVendor = p.vendorId === focusProject.vendorId
        const sameDistrict = p.district === focusProject.district
        const score = comparison?.score || 0
        return { ...p, comparison, sameVendor, sameDistrict, connectionScore: score + (sameVendor ? 20 : 0) + (sameDistrict ? 10 : 0) }
      })
      .filter((p) => p.connectionScore >= 15)
      .sort((a, b) => b.connectionScore - a.connectionScore)
      .slice(0, 5)
  }, [projects, focusProject, focusId])

  const vendorProjects = useMemo(() => {
    if (!focusVendor) return []
    return projects.filter((p) => p.vendorId === focusVendor.id && p.id !== focusId)
  }, [projects, focusVendor, focusId])

  if (!focusProject) return null

  const gap = (focusProject.expenditure || 0) - (focusProject.physical || 0)
  const riskColor = focusProject.score >= 70 ? '#dc4a38' : focusProject.score >= 40 ? '#d9890f' : '#2a8a6e'

  return (
    <div className="nir-page">

      {/* HEADER */}
      <section className="nir-command-hero" style={{ background: '#1a1f2e' }}>
        <div>
          <span className="nir-eyebrow" style={{ color: '#93b4d4' }}>
            <Network size={13} /> STAGE 03 · CONNECTED INTELLIGENCE
          </span>
          <h1>
            One project is not an <em>isolated record.</em>
          </h1>
          <p>
            NIRIKSHAN connects projects to vendors, payments, similar works and spatial
            locations to reveal hidden risk relationships. What looks like an isolated
            anomaly often connects to a wider pattern.
          </p>
        </div>
        <div className="nir-hero-action" style={{ borderLeftColor: '#2d3a50' }}>
          <span style={{ color: '#93b4d4' }}>FOCUS PROJECT</span>
          <strong style={{ fontSize: 15 }}>{focusProject.name}</strong>
          <small style={{ color: '#b0c9de' }}>{focusProject.id} · Risk {focusProject.score}</small>
        </div>
      </section>

      {/* PROJECT SELECTOR */}
      <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#67807a' }}>FOCUS ON:</span>
        {projects.filter(p => p.score >= 60).slice(0, 6).map((p) => (
          <button
            key={p.id}
            onClick={() => setFocusId(p.id)}
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              border: `1px solid ${focusId === p.id ? '#185a49' : '#dce7e3'}`,
              background: focusId === p.id ? '#185a49' : '#fff',
              color: focusId === p.id ? '#fff' : '#1b3c43',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {p.name.split(' ').slice(0, 3).join(' ')} ({p.score})
          </button>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginTop: 20 }}>

        {/* LEFT — RELATIONSHIP GRAPH (visual representation) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* CENTER PROJECT NODE */}
          <div
            style={{
              padding: '24px',
              background: '#1b3c43',
              borderRadius: 12,
              color: '#fff',
              display: 'flex',
              gap: 20,
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: riskColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                flexDirection: 'column',
              }}
            >
              <strong style={{ fontSize: 20 }}>{focusProject.score}</strong>
              <span style={{ fontSize: 9 }}>RISK</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#7ba79a', letterSpacing: '.06em', marginBottom: 4 }}>
                CENTER NODE · FOCUS PROJECT
              </div>
              <h2 style={{ fontSize: 20, margin: '0 0 4px', color: '#fff' }}>{focusProject.name}</h2>
              <p style={{ fontSize: 12, color: '#a5d0c1', margin: 0 }}>
                {focusProject.id} · {focusProject.district}, {focusProject.state} · {focusProject.category}
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, padding: '3px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                  Expenditure: {focusProject.expenditure}%
                </span>
                <span style={{ fontSize: 11, padding: '3px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                  Physical: {focusProject.physical}%
                </span>
                <span style={{ fontSize: 11, padding: '3px 8px', background: gap >= 20 ? '#dc4a38' : 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                  Gap: {gap > 0 ? `+${gap}` : gap} pts
                </span>
                <span style={{ fontSize: 11, padding: '3px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                  Delay: {focusProject.delay}
                </span>
              </div>
            </div>
            <button className="nir-outline" style={{ flexShrink: 0, color: '#a5d0c1', borderColor: '#2c4b55' }} onClick={() => openProject(focusProject.id)}>
              Investigate <ArrowRight size={14} />
            </button>
          </div>

          {/* CONNECTIONS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

            {/* VENDOR */}
            {focusVendor && (
              <ConnectionCard
                type="VENDOR"
                icon={<Building2 size={18} />}
                color="#7c3aed"
                title={focusVendor.name}
                subtitle={`Vendor ID: ${focusVendor.id}`}
                tags={[
                  `Risk score: ${focusVendor.risk || 'N/A'}`,
                  `${focusVendor.flagged || 0} flagged projects`,
                  `${vendorProjects.length} other works`,
                ]}
                signal={focusVendor.risk >= 70 ? 'HIGH RISK VENDOR' : focusVendor.risk >= 50 ? 'ELEVATED VENDOR RISK' : 'VERIFIED VENDOR'}
                signalTone={focusVendor.risk >= 70 ? 'danger' : focusVendor.risk >= 50 ? 'warn' : 'ok'}
                onClick={() => openVendor(focusVendor.id)}
              />
            )}

            {/* PAYMENTS */}
            <ConnectionCard
              type="PAYMENTS"
              icon={<Wallet size={18} />}
              color="#0369a1"
              title={`${focusPayments.length} transactions`}
              subtitle={`Total: ${formatCurrency(focusPayments.reduce((s, p) => s + (p.amount || 0), 0))}`}
              tags={[
                `${focusPayments.filter(p => p.flagged).length} flagged payments`,
                focusPayments.filter(p => p.flagged).length >= 2 ? 'Split-payment pattern' : 'No cluster detected',
                'Payment timeline: active',
              ]}
              signal={focusPayments.filter(p => p.flagged).length >= 2 ? 'PAYMENT ANOMALY' : 'NORMAL PATTERN'}
              signalTone={focusPayments.filter(p => p.flagged).length >= 2 ? 'danger' : 'ok'}
              onClick={() => navigate('payments')}
            />

            {/* LOCATION */}
            <ConnectionCard
              type="LOCATION"
              icon={<MapPin size={18} />}
              color="#b45309"
              title={`${focusProject.district}, ${focusProject.state}`}
              subtitle={`Lat: ${focusProject.latitude?.toFixed(4) || 'N/A'} · Lng: ${focusProject.longitude?.toFixed(4) || 'N/A'}`}
              tags={[
                `${relatedProjects.filter(p => p.sameDistrict).length} other works in district`,
                'Geo-proximity analysis active',
                'Spatial anomaly detection enabled',
              ]}
              signal={relatedProjects.filter(p => p.sameDistrict).length >= 2 ? 'DISTRICT CLUSTER' : 'NORMAL DISTRIBUTION'}
              signalTone={relatedProjects.filter(p => p.sameDistrict).length >= 2 ? 'warn' : 'ok'}
              onClick={() => navigate('map')}
            />

            {/* AGENCY */}
            <ConnectionCard
              type="IMPLEMENTING AGENCY"
              icon={<User size={18} />}
              color="#0f766e"
              title={focusProject.agency || 'Not specified'}
              subtitle="Implementing authority"
              tags={[
                `Category: ${focusProject.category}`,
                `Status: ${focusProject.status}`,
                `Works in same agency: ${projects.filter(p => p.agency === focusProject.agency).length}`,
              ]}
              signal="AGENCY ACTIVE"
              signalTone="ok"
              onClick={() => {}}
            />
          </div>

          {/* RELATED PROJECTS */}
          {relatedProjects.length > 0 && (
            <div className="nir-panel">
              <div className="nir-panel-head">
                <div>
                  <span className="nir-eyebrow"><GitCompare size={12} /> RELATED / SIMILAR WORKS</span>
                  <h2>Projects connected by risk signals</h2>
                </div>
                <button className="nir-link" onClick={() => navigate('duplicates')}>
                  Full analysis <ArrowRight size={14} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
                {relatedProjects.map((p) => {
                  const reasons = []
                  if (p.sameVendor) reasons.push('Same vendor')
                  if (p.sameDistrict) reasons.push('Same district')
                  if (p.comparison?.score >= 40) reasons.push(`${p.comparison.score}% work similarity`)
                  if (p.comparison?.reasons?.length) reasons.push(...p.comparison.reasons.slice(0, 1))

                  return (
                    <div
                      key={p.id}
                      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: '#f8faf9', borderRadius: 8, border: '1px solid #dce7e3', cursor: 'pointer' }}
                      onClick={() => openProject(p.id)}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 6,
                          background: p.score >= 70 ? '#faece8' : '#fff5e4',
                          color: p.score >= 70 ? '#ae4438' : '#b77b1e',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: 13,
                          flexShrink: 0,
                        }}
                      >
                        {p.score}
                      </div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ fontSize: 13, color: '#1b3c43', display: 'block' }}>{p.name}</strong>
                        <span style={{ fontSize: 11, color: '#67807a' }}>{p.id} · {p.district}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                        {reasons.map((r) => (
                          <span key={r} style={{ fontSize: 10, padding: '2px 7px', background: '#e9f5ef', color: '#216454', borderRadius: 3, fontWeight: 700 }}>
                            {r}
                          </span>
                        ))}
                      </div>
                      <ArrowRight size={15} style={{ color: '#8ca59f', flexShrink: 0 }} />
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR — Signal Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* WHY CONNECTED */}
          <div className="nir-panel">
            <span className="nir-eyebrow"><ShieldAlert size={12} /> DETECTED CONNECTIONS</span>
            <h2 style={{ fontSize: 15 }}>Why these are linked</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
              {[
                { icon: Building2, label: 'Vendor: ABC Infrastructure', note: 'Same contractor for multiple works', risk: true },
                { icon: MapPin, label: 'Location: Sehore, MP', note: `${relatedProjects.filter(p => p.sameDistrict).length} works in same district`, risk: relatedProjects.filter(p => p.sameDistrict).length >= 2 },
                { icon: GitCompare, label: 'Similar category work', note: `${relatedProjects.filter(p => p.comparison?.score >= 40).length} overlapping scope projects detected`, risk: true },
                { icon: CreditCard, label: 'Payment cluster', note: '3 identical ₹5L payments in 48 hrs', risk: true },
              ].map(({ icon: Icon, label, note, risk }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    gap: 10,
                    padding: '10px 12px',
                    background: risk ? '#faece8' : '#f5f9f7',
                    border: `1px solid ${risk ? '#eeb3aa' : '#dce7e3'}`,
                    borderRadius: 8,
                  }}
                >
                  <Icon size={16} style={{ color: risk ? '#ae4438' : '#387166', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong style={{ fontSize: 12, color: '#1b3c43', display: 'block' }}>{label}</strong>
                    <span style={{ fontSize: 11, color: '#47635e' }}>{note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VENDOR OTHER WORKS */}
          {vendorProjects.length > 0 && (
            <div className="nir-panel">
              <span className="nir-eyebrow">VENDOR'S OTHER WORKS</span>
              <h2 style={{ fontSize: 14 }}>{focusVendor?.name || 'ABC Infrastructure'}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {vendorProjects.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: '#f8faf9', border: '1px solid #dce7e3', borderRadius: 6, cursor: 'pointer', textAlign: 'left', width: '100%' }}
                    onClick={() => openProject(p.id)}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: p.score >= 70 ? '#ae4438' : '#b77b1e',
                        background: p.score >= 70 ? '#faece8' : '#fff5e4',
                        padding: '2px 6px',
                        borderRadius: 4,
                        flexShrink: 0,
                      }}
                    >
                      {p.score}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#1b3c43' }}>{p.name.substring(0, 30)}{p.name.length > 30 ? '…' : ''}</div>
                      <div style={{ fontSize: 10, color: '#67807a' }}>{p.district} · {p.status}</div>
                    </div>
                    <ArrowRight size={13} style={{ color: '#8ca59f' }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENT SIGNALS */}
          <div className="nir-panel">
            <span className="nir-eyebrow"><CreditCard size={12} /> PAYMENT SIGNALS</span>
            <h2 style={{ fontSize: 14 }}>Transaction pattern</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {focusPayments.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 10px',
                    background: p.flagged ? '#faece8' : '#f8faf9',
                    border: `1px solid ${p.flagged ? '#eeb3aa' : '#dce7e3'}`,
                    borderRadius: 6,
                    fontSize: 11,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#1b3c43' }}>{p.id}</div>
                    <div style={{ color: '#67807a', fontSize: 10 }}>{p.date} · {p.type}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: '#1b3c43' }}>{formatCurrency(p.amount)}</div>
                    {p.flagged && <div style={{ fontSize: 10, color: '#ae4438', fontWeight: 700 }}>⚑ Flagged</div>}
                  </div>
                </div>
              ))}
              {focusPayments.filter(p => p.flagged).length >= 2 && (
                <div style={{ padding: '8px 10px', background: '#fff5e4', borderRadius: 6, border: '1px solid #e6cdab', fontSize: 11, color: '#795019', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span><strong>Split-payment pattern:</strong> {focusPayments.filter(p => p.flagged).length} identical amounts within 48 hours. Possible threshold avoidance.</span>
                </div>
              )}
            </div>
            <button className="nir-link" style={{ marginTop: 10 }} onClick={() => navigate('payments')}>
              Full payment intelligence <ArrowRight size={13} />
            </button>
          </div>

          {/* NEXT STEP */}
          <div className="nir-panel" style={{ background: '#1b3c43', color: '#fff' }}>
            <span className="nir-eyebrow" style={{ color: '#7ba79a' }}>NEXT STEP IN WORKFLOW</span>
            <h2 style={{ fontSize: 15, color: '#fff', marginTop: 8 }}>Prioritize & Verify</h2>
            <p style={{ fontSize: 12, color: '#a5d0c1', marginTop: 4 }}>
              Connections detected. The AI priority queue ranks this case for human officer review.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              <button className="nir-primary wide" onClick={() => openProject(focusProject.id)}>
                Open Project Intelligence <ArrowRight size={14} />
              </button>
              <button style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('verification')}>
                Go to Evidence Verification <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConnectionCard({ type, icon, color, title, subtitle, tags, signal, signalTone, onClick }) {
  const toneMap = {
    danger: { bg: '#faece8', color: '#ae4438', border: '#eeb3aa' },
    warn: { bg: '#fff5e4', color: '#b77b1e', border: '#e6cdab' },
    ok: { bg: '#e9f5ef', color: '#216454', border: '#a5d0c1' },
  }
  const t = toneMap[signalTone] || toneMap.ok

  return (
    <div
      onClick={onClick}
      style={{ padding: '16px', background: '#fff', border: '1px solid #dce7e3', borderRadius: 10, borderTop: `3px solid ${color}`, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color, padding: 6, background: `${color}12`, borderRadius: 6 }}>{icon}</span>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#67807a', letterSpacing: '.05em' }}>{type}</span>
        </div>
        <span style={{ fontSize: 10, padding: '3px 7px', borderRadius: 4, background: t.bg, color: t.color, border: `1px solid ${t.border}`, fontWeight: 700 }}>
          {signal}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1b3c43' }}>{title}</div>
        <div style={{ fontSize: 11, color: '#67807a' }}>{subtitle}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {tags.map((tag) => (
          <span key={tag} style={{ fontSize: 11, color: '#47635e', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: color, flexShrink: 0 }} />
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
