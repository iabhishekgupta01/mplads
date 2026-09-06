import { AlertTriangle, ArrowLeft, ShieldAlert } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'

export function PaymentDetail() {
  const {
    payments,
    projects,
    vendors,
    activePaymentId,
    setPayments,
    setAudit,
    showToast,
    navigate,
  } = useApp()

  const payment =
    payments.find((item) => item.id === activePaymentId) || payments[0]
  const project =
    projects.find((item) => item.id === payment?.projectId) || projects[0]
  const vendor =
    vendors.find((item) => item.id === payment?.vendorId) || vendors[0]

  if (!payment || !project || !vendor) return null

  const handleHold = () => {
    setPayments((items) =>
      items.map((item) =>
        item.id === payment.id
          ? { ...item, status: 'On Hold', heldBy: 'State Officer', heldDate: '06 Sep 2026' }
          : item
      )
    )

    setAudit((items) => [
      {
        time: '06 Sep 2026, 05:30 PM',
        actor: 'State Officer',
        action: 'Payment Placed On Hold',
        detail: `Transaction ${payment.id} (${formatCurrency(payment.amount)}) on hold for project ${project.name}.`,
        tone: 'human',
      },
      ...items,
    ])

    showToast(`Transaction ${payment.id} has been placed ON HOLD. Compliance record updated.`)
  }

  return (
    <div className="payment-detail-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="breadcrumb-line" style={{ margin: 0 }}>
          Home / Payments / <span>{payment.id}</span>
        </div>
        <button className="secondary-btn" onClick={() => navigate('payments')}>
          <ArrowLeft size={15} /> Back to Payments
        </button>
      </div>

      <div className="project-header-card">
        <div className="project-header-top">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
              Transaction: {payment.id}
            </h1>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
              Project: <strong>{project.name}</strong> ({project.id}) | Vendor: <strong>{vendor.name}</strong>
            </p>
          </div>
          <span className={`status-badge-clean ${payment.status === 'On Hold' ? 'delayed' : 'ongoing'}`}>
            {payment.status}
          </span>
        </div>
      </div>

      <div className="kpi-6-strip" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="kpi-6-item">
          <span>Transaction Amount</span>
          <strong style={{ fontSize: 20 }}>{formatCurrency(payment.amount)}</strong>
        </div>
        <div className="kpi-6-item">
          <span>Payment Date</span>
          <strong>{payment.date}</strong>
        </div>
        <div className="kpi-6-item">
          <span>Vendor Risk Score</span>
          <strong style={{ color: vendor.risk >= 75 ? '#dc2626' : '#d97706' }}>{vendor.risk} / 100</strong>
        </div>
        <div className="kpi-6-item">
          <span>AI Risk Signal</span>
          <strong style={{ color: payment.flagged ? '#dc2626' : '#16a34a' }}>
            {payment.flagged ? 'FLAGGED ANOMALY' : 'NORMAL'}
          </strong>
        </div>
      </div>

      <div className="dashboard-grid-3" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
        <div className="panel">
          <div className="panel-head">
            <h2>Payment Anomaly Intelligence</h2>
          </div>

          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#dc2626', fontWeight: 700, fontSize: 14 }}>
              <AlertTriangle size={18} /> PAYMENT ANOMALY DETECTED
            </div>
            <p style={{ fontSize: 13, color: '#991b1b', marginTop: 6, lineHeight: 1.5 }}>
              {payment.reason}. 3 identical payment amounts released within a 48-hour window to the same vendor account.
            </p>
          </div>

          <div style={{ fontSize: 12, color: '#64748b' }}>
            Verification Recommendation: Verify milestone progress certificates and bank payment advice prior to further disbursement.
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>Officer Hold Action</h2>
          </div>

          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16, lineHeight: 1.5 }}>
            Placing this payment on hold halts associated automated disbursement workflows until field verification is completed.
          </p>

          <button
            className="danger-btn"
            style={{ width: '100%', padding: 12, fontSize: 14 }}
            onClick={handleHold}
            disabled={payment.status === 'On Hold'}
          >
            <ShieldAlert size={16} /> {payment.status === 'On Hold' ? 'Payment Currently On Hold' : 'Confirm Payment Hold'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetail
