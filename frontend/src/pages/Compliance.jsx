import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import '../styles/compliance.css'

function escapeCsv(value) {
  const text = String(value ?? '')
  return `"${text.replace(/"/g, '""')}"`
}

export function Compliance() {
  const { audit = [] } = useApp()

  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const eventTypes = useMemo(() => {
    const types = new Set()

    audit.forEach((event) => {
      if (event.tone === 'ai') {
        types.add('AI')
      } else {
        types.add('Officer')
      }
    })

    return ['All', ...Array.from(types)]
  }, [audit])

  const filteredAudit = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return audit.filter((event) => {
      const type = event.tone === 'ai' ? 'AI' : 'Officer'

      const matchesType =
        typeFilter === 'All' || type === typeFilter

      const searchableText = [
        event.time,
        event.actor,
        event.action,
        event.detail,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch =
        !query || searchableText.includes(query)

      return matchesType && matchesSearch
    })
  }, [audit, searchQuery, typeFilter])

  const officerEvents = audit.filter(
    (event) => event.tone !== 'ai'
  ).length

  const aiEvents = audit.filter(
    (event) => event.tone === 'ai'
  ).length

  const exportAuditTrail = () => {
    if (!audit.length) return

    const headers = [
      'Timestamp',
      'Actor',
      'Event Type',
      'Action',
      'Details',
    ]

    const rows = audit.map((event) => [
      event.time,
      event.actor,
      event.tone === 'ai' ? 'AI System' : 'Officer',
      event.action,
      event.detail,
    ])

    const csv = [
      headers.map(escapeCsv).join(','),
      ...rows.map((row) =>
        row.map(escapeCsv).join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'mplads-compliance-audit-trail.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="compliance-page-container">
      {/* HEADER */}
      <div className="compliance-header">
        <div>
          <span className="compliance-eyebrow">
            GOVERNANCE & ACCOUNTABILITY
          </span>

          <h1>Compliance & Action Trail</h1>

          <p>
            Chronological record of AI risk signals and officer
            decisions across project monitoring.
          </p>
        </div>

        <button
          className="compliance-export-btn"
          onClick={exportAuditTrail}
          disabled={!audit.length}
        >
          <FileText size={16} />
          Export Audit Trail
        </button>
      </div>

      {/* INTEGRITY BANNER */}
      <div className="compliance-integrity">
        <div className="compliance-integrity-icon">
          <ShieldCheck size={20} />
        </div>

        <div className="compliance-integrity-copy">
          <strong>Audit trail active</strong>
          <span>
            Risk changes, officer actions, inspections and payment
            decisions are recorded for review.
          </span>
        </div>

        <div className="compliance-live">
          <span />
          Live trail
        </div>
      </div>

      {/* SUMMARY */}
      <div className="compliance-summary">
        <div className="compliance-summary-card">
          <span>Total Events</span>
          <strong>{audit.length}</strong>
          <small>Recorded system activity</small>
        </div>

        <div className="compliance-summary-card">
          <span>Officer Actions</span>
          <strong>{officerEvents}</strong>
          <small>Human decisions recorded</small>
        </div>

        <div className="compliance-summary-card">
          <span>AI Signals</span>
          <strong>{aiEvents}</strong>
          <small>Automated risk events</small>
        </div>
      </div>

      {/* FILTERS */}
      <div className="compliance-toolbar">
        <div className="compliance-search">
          <Search size={16} />

          <input
            type="text"
            placeholder="Search actor, action or event..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />
        </div>

        <div className="compliance-filter-group">
          {eventTypes.map((type) => (
            <button
              key={type}
              className={`compliance-filter-btn ${
                typeFilter === type ? 'active' : ''
              }`}
              onClick={() => setTypeFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <section className="compliance-panel">
        <div className="compliance-panel-head">
          <div>
            <h2>Activity Timeline</h2>
            <p>
              {filteredAudit.length} event
              {filteredAudit.length === 1 ? '' : 's'} shown
            </p>
          </div>

          <div className="compliance-panel-label">
            <CheckCircle2 size={15} />
            Audit records
          </div>
        </div>

        {filteredAudit.length > 0 ? (
          <div className="compliance-timeline">
            {filteredAudit.map((event, index) => {
              const isAi = event.tone === 'ai'

              return (
                <div
                  className="compliance-event"
                  key={`${event.time}-${event.actor}-${event.action}-${index}`}
                >
                  <div
                    className={`compliance-event-marker ${
                      isAi ? 'ai' : 'officer'
                    }`}
                  >
                    {isAi ? (
                      <Sparkles size={15} />
                    ) : (
                      <UserCheck size={15} />
                    )}
                  </div>

                  <div className="compliance-event-body">
                    <div className="compliance-event-top">
                      <div className="compliance-event-meta">
                        <span>{event.time}</span>

                        <span
                          className={`compliance-event-type ${
                            isAi ? 'ai' : 'officer'
                          }`}
                        >
                          {isAi ? 'AI SYSTEM' : 'OFFICER'}
                        </span>
                      </div>

                      <strong>{event.actor}</strong>
                    </div>

                    <h3>{event.action}</h3>

                    <p>{event.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="compliance-empty">
            <div className="compliance-empty-icon">
              <Search size={20} />
            </div>

            <h3>No audit events found</h3>

            <p>
              Try changing the search text or event filter.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Compliance