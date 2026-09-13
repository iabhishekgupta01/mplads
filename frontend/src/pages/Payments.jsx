import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CircleDollarSign,
  Eye,
  Filter,
  Search,
  TrendingUp,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'
import '../styles/nirikshan.css'

export default function Payments() {
  const { payments, projects, vendors, openPayment } = useApp()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const list = useMemo(() => {
    return payments
      .filter((p) => {
        if (filter === 'Flagged') return p.flagged
        if (filter === 'Clear') return !p.flagged
        if (search) {
          const s = search.toLowerCase()
          return (
            p.id.toLowerCase().includes(s) ||
            p.projectId.toLowerCase().includes(s) ||
            p.vendorId.toLowerCase().includes(s)
          )
        }
        return true
      })
      .sort((a, b) => (b.flagged ? 1 : 0) - (a.flagged ? 1 : 0) || new Date(b.date) - new Date(a.date))
  }, [payments, filter, search])

  const totalValue = payments.reduce((sum, p) => sum + p.amount, 0)
  const flaggedValue = payments.filter(p => p.flagged).reduce((sum, p) => sum + p.amount, 0)

  // Demo intelligence
  const identicalPayments = payments.filter(p => p.flagged).length

  return (
    <div className="nir-page">
      <section className="nir-command-hero" style={{ background: '#202f3a' }}>
        <div>
          <span className="nir-eyebrow" style={{ color: '#88aeb7' }}>
            <CircleDollarSign size={13} /> PAYMENT INTELLIGENCE
          </span>
          <h1>
            Transaction patterns requiring <em>review</em>
          </h1>
          <p>
            Detects threshold-avoidance splitting, unusual payment velocity, and vendor concentration across the entire portfolio.
          </p>
        </div>
        <div className="nir-hero-action" style={{ borderLeftColor: '#394d59' }}>
          <span style={{ color: '#88aeb7' }}>EXPOSED RISK</span>
          <strong>{formatCurrency(flaggedValue)}</strong>
          <small style={{ color: '#b9d2d8' }}>{identicalPayments} flagged transactions</small>
        </div>
      </section>

      {/* INTELLIGENCE METRICS */}
      <section className="nir-flow" style={{ marginTop: 17, gap: 14 }}>
        {[
          ['Total Transaction Volume', formatCurrency(totalValue), TrendingUp],
          ['Flagged Transactions', identicalPayments, AlertTriangle],
          ['Identical Amount Pattern', '₹5,00,000 × 3', CircleDollarSign]
        ].map(([label, value, Icon], i) => (
          <div className="nir-flow-step" key={label} style={{ flex: 1, padding: '16px 20px' }}>
            <Icon size={18} style={{ color: i === 1 ? '#dc4a38' : '#387166' }}/>
            <span style={{ fontSize: 11, letterSpacing: '.05em' }}>{label}</span>
            <strong style={{ fontSize: 18, color: i === 1 ? '#dc4a38' : '#1b3c43' }}>{value}</strong>
          </div>
        ))}
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
            placeholder="Search transaction ID, project, vendor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: 12 }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Filter size={14} style={{ color: '#8ca59f' }} />
          <span style={{ fontSize: 11, color: '#67807a', fontWeight: 700 }}>STATUS:</span>
          {['All', 'Flagged', 'Clear'].map((tab) => (
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

      <div className="nir-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f5f9f7', borderBottom: '2px solid #dce7e3', fontSize: 10, color: '#67807a', letterSpacing: '.05em' }}>
              <th style={{ padding: '12px 16px', width: 140 }}>TRANSACTION ID</th>
              <th style={{ padding: '12px 16px' }}>PROJECT</th>
              <th style={{ padding: '12px 16px' }}>VENDOR</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>AMOUNT</th>
              <th style={{ padding: '12px 16px' }}>DATE</th>
              <th style={{ padding: '12px 16px', width: 180 }}>AI SIGNAL</th>
              <th style={{ padding: '12px 16px', width: 50 }}></th>
            </tr>
          </thead>
          <tbody>
            {list.map(p => {
              const project = projects.find(x => x.id === p.projectId)
              const vendor = vendors.find(x => x.id === p.vendorId)
              return (
                <tr 
                  key={p.id} 
                  style={{ borderBottom: '1px solid #e7efec', cursor: 'pointer', background: p.flagged ? '#fffaf8' : 'transparent' }}
                  onClick={() => openPayment(p.id)}
                  className="nir-table-row-hover"
                >
                  <td style={{ padding: '12px 16px', fontWeight: 700, fontSize: 12, color: '#1b3c43' }}>{p.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <strong style={{ display: 'block', fontSize: 12, color: '#1b3c43' }}>{project?.name}</strong>
                    <span style={{ fontSize: 11, color: '#67807a' }}>{p.projectId}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 12, color: '#1b3c43' }}>{vendor?.name}</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, fontSize: 13, color: '#1b3c43' }}>
                    {formatCurrency(p.amount)}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#47635e' }}>{p.date}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {p.flagged ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#dc4a38', fontSize: 11, fontWeight: 700 }}>
                        <AlertTriangle size={13}/> Split Pattern
                      </div>
                    ) : (
                      <span style={{ fontSize: 11, color: '#67807a' }}>No anomaly detected</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <ArrowRight size={16} style={{ color: '#8ca59f' }} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
