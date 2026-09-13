import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  Filter,
  Search,
  ShieldCheck
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { calculateProjectRisk } from '../services/riskEngine.jsx'
import '../styles/nirikshan.css'

export default function Alerts() {
  const { projects, payments, vendors, openProject } = useApp()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const queue = useMemo(() => {
    return projects
      .map(p => {
        const risk = calculateProjectRisk(p, { projects, payments, vendors })
        return { ...p, risk }
      })
      .filter(p => {
        const score = p.risk?.score || 0
        if (filter === 'High' && score < 80) return false
        if (filter === 'Medium' && (score < 50 || score >= 80)) return false
        if (search) {
          const s = search.toLowerCase()
          return p.name.toLowerCase().includes(s) || p.id.toLowerCase().includes(s) || p.district.toLowerCase().includes(s)
        }
        return score >= 40 // Only show projects with some risk
      })
      .sort((a, b) => (b.risk?.score || 0) - (a.risk?.score || 0))
  }, [projects, payments, vendors, filter, search])

  const highRiskCount = queue.filter(p => p.risk?.score >= 80).length

  return (
    <div className="nir-page">
      {/* HEADER */}
      <section className="nir-command-hero" style={{ background: '#2c1e16' }}>
        <div>
          <span className="nir-eyebrow" style={{ color: '#e5a882' }}>
            <BrainCircuit size={13} /> AI PRIORITY QUEUE
          </span>
          <h1>
            Cases requiring <em>immediate review</em>
          </h1>
          <p>
            NIRIKSHAN continuously monitors the portfolio, scoring projects
            across financial, physical, temporal and spatial dimensions to
            surface the highest-priority concerns for human verification.
          </p>
        </div>
        <div className="nir-hero-action" style={{ borderLeftColor: '#6b3a24' }}>
          <span style={{ color: '#e5a882' }}>ACTION REQUIRED</span>
          <strong>{highRiskCount} critical alerts</strong>
          <small style={{ color: '#baa093' }}>Risk score ≥ 80</small>
        </div>
      </section>

      {/* FILTER BAR */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          margin: '17px 0',
          padding: '12px 16px',
          background: '#fff',
          border: '1px solid #dce7e3',
          borderRadius: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
          <Search size={15} style={{ color: '#8ca59f' }} />
          <input
            type="text"
            placeholder="Search projects, IDs, districts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: 12 }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Filter size={14} style={{ color: '#8ca59f' }} />
          <span style={{ fontSize: 11, color: '#67807a', fontWeight: 700 }}>RISK TIER:</span>
          {['All', 'High', 'Medium'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '4px 10px',
                borderRadius: 4,
                border: '1px solid #dce7e3',
                background: filter === tab ? '#185a49' : '#fff',
                color: filter === tab ? '#fff' : '#47635e',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* QUEUE LIST */}
      <div className="nir-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f5f9f7', borderBottom: '2px solid #dce7e3', fontSize: 10, color: '#67807a', letterSpacing: '.05em' }}>
              <th style={{ padding: '12px 16px', width: 60 }}>RISK</th>
              <th style={{ padding: '12px 16px' }}>PROJECT & LOCATION</th>
              <th style={{ padding: '12px 16px', width: 200 }}>PRIMARY DRIVER</th>
              <th style={{ padding: '12px 16px', width: 140 }}>EVIDENCE STATUS</th>
              <th style={{ padding: '12px 16px', width: 180 }}>RECOMMENDED ACTION</th>
              <th style={{ padding: '12px 16px', width: 50 }}></th>
            </tr>
          </thead>
          <tbody>
            {queue.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: 40, textAlign: 'center', color: '#8ca59f', fontSize: 13 }}>
                  No cases match the current filters.
                </td>
              </tr>
            ) : (
              queue.map(p => {
                const isHigh = p.risk?.score >= 80
                const signal = p.risk?.strongestSignals?.[0] || { id: 'GENERAL', name: 'Elevated Risk Profile' }
                
                return (
                  <tr 
                    key={p.id}
                    style={{ borderBottom: '1px solid #e7efec', cursor: 'pointer', transition: 'background 0.2s' }}
                    onClick={() => openProject(p.id)}
                    className="nir-table-row-hover"
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        background: isHigh ? '#faece8' : '#fff5e4',
                        color: isHigh ? '#ae4438' : '#b77b1e',
                        fontWeight: 800,
                        fontSize: 13,
                        border: `1px solid ${isHigh ? '#eeb3aa' : '#e6cdab'}`
                      }}>
                        {p.risk?.score}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <strong style={{ display: 'block', color: '#1b3c43', fontSize: 13, marginBottom: 2 }}>{p.name}</strong>
                      <span style={{ color: '#67807a', fontSize: 11 }}>{p.id} · {p.district}, {p.state}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                        <AlertTriangle size={13} style={{ color: isHigh ? '#ae4438' : '#b77b1e', marginTop: 2, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: '#47635e', lineHeight: 1.3 }}>
                          <strong>{signal.name}</strong><br/>
                          <span style={{ fontSize: 10, color: '#8ca59f' }}>{p.risk?.summary?.split('.')[0] || 'Requires review'}</span>
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 11 }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        background: p.status === 'Under Review' ? '#e9f5ef' : '#f8faf9', 
                        color: p.status === 'Under Review' ? '#216454' : '#67807a',
                        border: `1px solid ${p.status === 'Under Review' ? '#a5d0c1' : '#dce7e3'}`,
                        borderRadius: 4,
                        fontWeight: 700
                      }}>
                        {p.status === 'Under Review' ? 'Verification Pending' : 'Awaiting Review'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 11, color: '#1b3c43', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                        <ShieldCheck size={13} style={{ color: '#387166' }}/>
                        {p.risk?.recommendation?.split(' ')[0] + ' ' + p.risk?.recommendation?.split(' ')[1] + '...'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <ArrowRight size={16} style={{ color: '#8ca59f' }} />
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}