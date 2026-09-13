import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  MapPin,
  Network,
  ShieldAlert,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency, riskColor, riskLabel } from '../utils/formatters.js'
import '../styles/nirikshan.css'

function RiskBar({ value }) {
  const col = riskColor(value)
  return (
    <div style={{ height: 6, background: '#e7efec', borderRadius: 3 }}>
      <div style={{ width: `${value}%`, height: '100%', background: col, borderRadius: 3, transition: 'width 0.3s' }} />
    </div>
  )
}

export default function Vendors() {
  const { vendors, projects, payments, openVendor } = useApp()
  const [sortBy, setSortBy] = useState('risk')

  const enrichedVendors = vendors.map(v => ({
    ...v,
    vendorProjects: projects.filter(p => p.vendorId === v.id),
    flaggedPayments: payments.filter(p => p.vendorId === v.id && p.flagged),
    totalPaid: payments.filter(p => p.vendorId === v.id).reduce((s, p) => s + p.amount, 0),
  })).sort((a, b) => sortBy === 'risk' ? b.risk - a.risk : a.name.localeCompare(b.name))

  const highRisk = vendors.filter(v => v.risk >= 70).length

  return (
    <div className="nir-page">
      {/* HEADER */}
      <section className="nir-command-hero" style={{ background: '#1c2939', marginBottom: 20 }}>
        <div>
          <span className="nir-eyebrow" style={{ color: '#88aec8' }}>
            <Network size={13} /> VENDOR INTELLIGENCE
          </span>
          <h1>Implementing Agency Analysis</h1>
          <p>
            Cross-project vendor behavior analysis surfaces shared risk patterns.
            A contractor with anomalous payment patterns on one project may indicate systemic risk across the portfolio.
          </p>
        </div>
        <div className="nir-hero-action" style={{ borderLeftColor: '#2c4255' }}>
          <span style={{ color: '#88aec8' }}>HIGH-RISK VENDORS</span>
          <strong style={{ fontSize: 38, display: 'block', color: highRisk > 0 ? '#efc18b' : '#a9db6e' }}>
            {highRisk}
          </strong>
          <small style={{ color: '#a0bcd1', fontSize: 11 }}>
            Risk score ≥ 70 · Require scrutiny
          </small>
        </div>
      </section>

      {/* SORT BAR */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#67807a', fontWeight: 600 }}>Sort by:</span>
        {['risk', 'name'].map(s => (
          <button key={s} onClick={() => setSortBy(s)}
            style={{
              padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700,
              border: `1px solid ${sortBy === s ? '#10834b' : '#dce7e3'}`,
              background: sortBy === s ? '#10834b' : '#fff',
              color: sortBy === s ? '#fff' : '#47635e',
              cursor: 'pointer',
            }}>
            {s === 'risk' ? 'Risk Score' : 'Name'}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: 12, color: '#67807a' }}>
          {vendors.length} vendors in portfolio
        </div>
      </div>

      {/* VENDOR CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {enrichedVendors.map(v => {
          const col = riskColor(v.risk)
          const lbl = riskLabel(v.risk)
          const isHighRisk = v.risk >= 70

          return (
            <div key={v.id} style={{
              background: '#fff',
              border: `1px solid ${isHighRisk ? '#edb5a2' : '#dce7e3'}`,
              borderLeft: `4px solid ${col}`,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, padding: '18px 20px', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                    <strong style={{ fontSize: 16, color: '#1b3c43' }}>{v.name}</strong>
                    <span style={{
                      padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 800,
                      background: `${col}18`, color: col, border: `1px solid ${col}33`,
                    }}>
                      {lbl} RISK
                    </span>
                    {v.flaggedPayments.length > 0 && (
                      <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 800, background: '#faece8', color: '#ae4438', border: '1px solid #edb5a2' }}>
                        ⚑ {v.flaggedPayments.length} flagged
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: 11, color: '#67807a', marginBottom: 10, fontFamily: 'DM Mono, monospace' }}>{v.id}</div>

                  <div style={{ fontSize: 12, color: '#47635e', marginBottom: 12, lineHeight: 1.5, padding: '8px 12px', background: isHighRisk ? '#fff9f5' : '#f8faf9', borderRadius: 6, border: `1px solid ${isHighRisk ? '#edb5a2' : '#dce7e3'}` }}>
                    {v.finding}
                  </div>

                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 11, color: '#67807a' }}>
                      <span style={{ fontWeight: 600, color: '#1b3c43' }}>{v.vendorProjects.length}</span> active projects
                    </div>
                    <div style={{ fontSize: 11, color: '#67807a' }}>
                      <span style={{ fontWeight: 600, color: '#1b3c43' }}>{formatCurrency(v.totalPaid)}</span> paid
                    </div>
                    <div style={{ fontSize: 11, color: '#67807a' }}>
                      <MapPin size={11} style={{ verticalAlign: 'middle' }} /> {v.states} · {v.districts}
                    </div>
                    {v.riskExposure === 'High' && (
                      <div style={{ fontSize: 11, color: '#ae4438', fontWeight: 700 }}>
                        <ShieldAlert size={11} style={{ verticalAlign: 'middle' }} /> Cross-project risk exposure
                      </div>
                    )}
                  </div>

                  {/* Related projects */}
                  {v.vendorProjects.length > 0 && (
                    <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {v.vendorProjects.map(p => (
                        <span key={p.id} style={{
                          fontSize: 10, padding: '2px 8px', borderRadius: 4,
                          background: riskColor(p.score) + '15', color: riskColor(p.score),
                          border: `1px solid ${riskColor(p.score)}30`, fontWeight: 600,
                        }}>
                          {p.id} · {p.score}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#67807a', letterSpacing: '.06em', marginBottom: 4 }}>VENDOR RISK SCORE</div>
                    <div style={{ fontSize: 38, fontWeight: 800, color: col }}>{v.risk}</div>
                    <div style={{ fontSize: 10, color: '#8ca59f' }}>out of 100</div>
                  </div>
                  <RiskBar value={v.risk} />
                  <button
                    className="nir-link"
                    style={{ marginTop: 12, display: 'inline-flex' }}
                    onClick={() => openVendor(v.id)}
                  >
                    Investigate vendor <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {isHighRisk && (
                <div style={{ padding: '10px 20px', background: '#fff9f5', borderTop: '1px solid #edb5a2', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <AlertTriangle size={14} style={{ color: '#dc4a38', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#795019' }}>
                    This vendor requires enhanced verification. Cross-project payment clustering was detected.
                  </span>
                  <button className="nir-link" style={{ marginLeft: 'auto', fontSize: 11, whiteSpace: 'nowrap' }} onClick={() => openVendor(v.id)}>
                    View full profile <ArrowRight size={11} />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
