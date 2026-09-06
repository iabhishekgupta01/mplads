import { useState } from 'react'
import { AlertTriangle, Eye, Search } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'

export function Payments() {
  const { payments, projects, vendors, openPayment } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.projectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.vendorId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'All' || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="payments-page-container">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Payment Monitoring</h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>Search transactions and identify unusual payment patterns.</p>
      </div>

      <div className="filter-bar-wrap">
        <div className="filter-group">
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Flagged">Flagged</option>
            <option value="Under Review">Under Review</option>
            <option value="Processed">Processed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        <div className="filter-search-input" style={{ marginLeft: 'auto' }}>
          <Search size={16} style={{ color: '#94a3b8' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transaction ID, project, vendor..."
          />
        </div>
      </div>

      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Project</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>AI Flag</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((payment) => {
                const project = projects.find((p) => p.id === payment.projectId)
                const vendor = vendors.find((v) => v.id === payment.vendorId)

                return (
                  <tr key={payment.id} onClick={() => openPayment(payment.id)}>
                    <td style={{ fontWeight: 700 }}>{payment.id}</td>
                    <td style={{ fontWeight: 600 }}>{project?.name || payment.projectId}</td>
                    <td>{vendor?.name || payment.vendorId}</td>
                    <td style={{ fontWeight: 700 }}>{formatCurrency(payment.amount)}</td>
                    <td>{payment.date}</td>
                    <td>
                      <span className={`status-badge-clean ${payment.status === 'On Hold' ? 'delayed' : 'ongoing'}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      {payment.flagged ? (
                        <span className="badge-pill high">
                          <AlertTriangle size={12} /> Payment Pattern
                        </span>
                      ) : (
                        <span style={{ fontSize: 11, color: '#64748b' }}>Normal</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="secondary-btn"
                        style={{ padding: 5 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          openPayment(payment.id)
                        }}
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Payments
