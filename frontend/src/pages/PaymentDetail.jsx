import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'
import { riskColor, riskLabel } from '../utils/formatters.js'
import '../styles/payment-detail.css'

const statusColor = (s) =>
  s === 'Flagged' ? '#dc2626'
  : s === 'Under Review' ? '#d97706'
  : s === 'On Hold' ? '#7c3aed'
  : '#16a34a'

const statusBg = (s) =>
  s === 'Flagged' ? '#fef2f2'
  : s === 'Under Review' ? '#fffbeb'
  : s === 'On Hold' ? '#f5f3ff'
  : '#f0fdf4'

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
    openProject,
    openPayment,
  } = useApp()

  const payment =
    payments.find((item) => item.id === activePaymentId) || payments[0]
  const project =
    projects.find((item) => item.id === payment?.projectId) || projects[0]
  const vendor =
    vendors.find((item) => item.id === payment?.vendorId) || vendors[0]

  if (!payment || !project || !vendor) return null

  // Related payments: same project or same vendor (excluding current)
  const relatedPayments = payments.filter(
    (p) =>
      p.id !== payment.id &&
      (p.projectId === payment.projectId || p.vendorId === payment.vendorId)
  ).slice(0, 5)

  const gap = (project.expenditure || 0) - (project.physical || 0)
  const projectRiskColor = riskColor(project.score)

  const handleHold = () => {
    setPayments((items) =>
      items.map((item) =>
        item.id === payment.id
          ? { ...item, status: 'On Hold', heldBy: 'State Officer', heldDate: '14 Sep 2026' }
          : item
      )
    )

    setAudit((items) => [
      {
        time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        actor: 'State Officer',
        action: 'Payment Placed On Hold',
        detail: `Transaction ${payment.id} (${formatCurrency(payment.amount)}) on hold for project ${project.name}.`,
        tone: 'human',
        projectId: project.id,
      },
      ...items,
    ])

    showToast(`Transaction ${payment.id} has been placed ON HOLD. Audit record updated.`)
  }

  return (
    <div className="payment-detail-container">

      {/* ── BREADCRUMB + BACK ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div className="breadcrumb-line" style={{ margin: 0, fontSize: 13 }}>
          Payments / <span style={{ fontWeight: 700 }}>{payment.id}</span>
        </div>
        <button className="secondary-btn" onClick={() => navigate('payments')}>
          <ArrowLeft size={15} /> Back to Payments
        </button>
      </div>

      {/* ── TRANSACTION HEADER ── */}
      <div style={{
        background: payment.flagged ? '#1a1a2e' : '#133845',
        color: '#fff',
        borderRadius: 14,
        padding: '24px 30px',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 24,
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: payment.flagged ? '#fca5a5' : '#a9db6e', marginBottom: 8, textTransform: 'uppercase' }}>
            {payment.flagged ? '⚑ Anomaly Detected · Payment Intelligence' : 'Payment Record'}
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
            Transaction {payment.id}
          </h1>
          <p style={{ fontSize: 14, color: '#a9c8bf', marginTop: 8, lineHeight: 1.5 }}>
            {payment.type} payment · {payment.date} · {vendor.name}
          </p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#a9c8bf', marginBottom: 4, textTransform: 'uppercase' }}>Amount</div>
          <div style={{ fontSize: 38, fontWeight: 800, color: payment.flagged ? '#fca5a5' : '#a9db6e', lineHeight: 1 }}>
            {formatCurrency(payment.amount)}
          </div>
          <div style={{
            marginTop: 8,
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 800,
            background: payment.status === 'On Hold' ? '#7c3aed' : payment.flagged ? '#dc2626' : '#2a8a6e',
            color: '#fff',
          }}>
            {payment.status}
          </div>
        </div>
      </div>

      {/* ── TRANSACTION KPI STRIP ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 10,
        marginBottom: 20,
        background: '#fff',
        border: '1px solid #dce7e3',
        borderRadius: 12,
        padding: '14px 20px',
      }}>
        {[
          { label: 'Transaction ID', value: payment.id, mono: true },
          { label: 'Payment Type', value: payment.type },
          { label: 'Date', value: payment.date },
          { label: 'Vendor Risk Score',
            value: `${vendor.risk}/100`,
            color: vendor.risk >= 75 ? '#dc2626' : vendor.risk >= 50 ? '#d97706' : '#16a34a' },
          { label: 'Risk Signal',
            value: payment.flagged ? 'FLAGGED ANOMALY' : 'NORMAL',
            color: payment.flagged ? '#dc2626' : '#16a34a' },
        ].map((k) => (
          <div key={k.label} style={{ borderRight: '1px solid #e7efec' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#67807a', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k.label}</div>
            <div style={{
              fontSize: 15,
              fontWeight: 800,
              color: k.color || '#1b3c43',
              fontFamily: k.mono ? 'DM Mono, monospace' : 'inherit',
            }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* ── MAIN GRID ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

        {/* WHY FLAGGED */}
        {payment.flagged ? (
          <div style={{
            background: '#fff',
            border: '1px solid #fecaca',
            borderLeft: '4px solid #dc2626',
            borderRadius: 12,
            padding: '20px 24px',
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
              <AlertTriangle size={20} style={{ color: '#dc2626', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#dc2626', textTransform: 'uppercase' }}>Payment Anomaly Detected</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#1b3c43', marginTop: 2 }}>Why this payment was flagged</div>
              </div>
            </div>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '14px 16px', marginBottom: 14 }}>
              <p style={{ fontSize: 14, color: '#991b1b', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                {payment.reason}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                `Amount ${formatCurrency(payment.amount)} matches a repeated cluster pattern`,
                `Payment type: ${payment.type} — milestone-linked disbursement`,
                `Vendor ${vendor.name} has risk score ${vendor.risk}/100 (${vendor.riskExposure} exposure)`,
                vendor.flagged > 0 ? `${vendor.flagged} flagged transactions on this vendor's record` : null,
              ].filter(Boolean).map((point, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#7f1d1d', alignItems: 'flex-start' }}>
                  <span style={{ color: '#dc2626', flexShrink: 0, marginTop: 2 }}>•</span>
                  {point}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: '10px 14px', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, fontSize: 13, color: '#9a3412', lineHeight: 1.5 }}>
              <strong>Verification recommendation:</strong> Verify milestone progress certificates and payment advice before further disbursement.
            </div>
          </div>
        ) : (
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderLeft: '4px solid #16a34a',
            borderRadius: 12,
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <CheckCircle2 size={36} style={{ color: '#16a34a', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#14532d' }}>No anomaly detected</div>
              <p style={{ fontSize: 13, color: '#166534', marginTop: 4, lineHeight: 1.5 }}>
                This payment falls within normal parameters for this project and vendor. No risk signals triggered.
              </p>
            </div>
          </div>
        )}

        {/* RISK SUMMARY */}
        <div style={{
          background: '#fff',
          border: '1px solid #dce7e3',
          borderRadius: 12,
          padding: '20px 24px',
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#67807a', textTransform: 'uppercase', marginBottom: 14 }}>Risk Summary</div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: 11, color: '#67807a', marginBottom: 4 }}>Vendor Risk</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: vendor.risk >= 75 ? '#dc2626' : vendor.risk >= 50 ? '#d97706' : '#16a34a' }}>{vendor.risk}<span style={{ fontSize: 14 }}>/100</span></div>
            </div>
            <div style={{ width: 1, background: '#e7efec' }} />
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: 11, color: '#67807a', marginBottom: 4 }}>Project Risk</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: projectRiskColor }}>{project.score}<span style={{ fontSize: 14 }}>/100</span></div>
            </div>
          </div>
          <div style={{ padding: '10px 14px', background: riskColor(project.score) + '12', border: `1px solid ${riskColor(project.score)}30`, borderRadius: 8, marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: riskColor(project.score) }}>
              {riskLabel(project.score)} RISK · {payment.flagged ? 'Payment Anomaly' : 'No anomaly'}
            </div>
            <div style={{ fontSize: 12, color: '#47635e', marginTop: 4 }}>
              {payment.flagged
                ? 'This payment is part of a cluster pattern associated with a high-risk project.'
                : 'Payment is within normal parameters for the project risk level.'}
            </div>
          </div>
          {payment.status !== 'On Hold' ? (
            <button
              className="danger-btn"
              style={{ width: '100%', padding: '11px', fontSize: 13, fontWeight: 800 }}
              onClick={handleHold}
            >
              <ShieldAlert size={16} /> Place Payment On Hold
            </button>
          ) : (
            <div style={{ padding: '11px', background: '#f5f3ff', border: '1px solid #c4b5fd', borderRadius: 8, textAlign: 'center', fontSize: 13, fontWeight: 800, color: '#7c3aed' }}>
              ⊘ Payment Currently On Hold
            </div>
          )}
        </div>
      </div>

      {/* ── ASSOCIATED PROJECT ── */}
      <div style={{
        background: '#fff',
        border: '1px solid #dce7e3',
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#67807a', textTransform: 'uppercase', marginBottom: 16 }}>
          Associated Project
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1b3c43', marginBottom: 4 }}>
              {project.name}
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: '#47635e' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <MapPin size={13} /> {project.district}, {project.state}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Building2 size={13} /> {project.agency}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <CreditCard size={13} /> {formatCurrency(project.amount)} sanctioned
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Calendar size={13} /> ID: {project.id}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            <div style={{ textAlign: 'center', padding: '8px 16px', background: gap >= 25 ? '#fef2f2' : '#f8faf9', border: `1px solid ${gap >= 25 ? '#fecaca' : '#dce7e3'}`, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: '#67807a', marginBottom: 2 }}>Exp–Progress Gap</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: gap >= 25 ? '#dc2626' : '#1b3c43' }}>{gap}pp</div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px 16px', background: '#f8faf9', border: '1px solid #dce7e3', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: '#67807a', marginBottom: 2 }}>Physical Progress</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#1b3c43' }}>{project.physical}%</div>
            </div>
            <button
              style={{
                background: '#176551',
                color: '#fff',
                border: 0,
                borderRadius: 8,
                padding: '10px 18px',
                fontSize: 13,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
              }}
              onClick={() => openProject(project.id)}
            >
              Open Project <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── RELATED PAYMENTS ── */}
      {relatedPayments.length > 0 && (
        <div style={{
          background: '#fff',
          border: '1px solid #dce7e3',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#67807a', textTransform: 'uppercase', marginBottom: 4 }}>
            Related Payments
          </div>
          <p style={{ fontSize: 13, color: '#47635e', marginBottom: 16, lineHeight: 1.5 }}>
            Other transactions sharing the same project or vendor — examining these together reveals relationship patterns.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {relatedPayments.map((p) => {
              const relProject = projects.find((pr) => pr.id === p.projectId)
              return (
                <button
                  key={p.id}
                  onClick={() => openPayment(p.id)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '110px 1fr 130px 100px 90px',
                    gap: 12,
                    padding: '12px 14px',
                    background: p.flagged ? '#fef9f9' : '#f8faf9',
                    border: `1px solid ${p.flagged ? '#fecaca' : '#dce7e3'}`,
                    borderLeft: `3px solid ${p.flagged ? '#dc2626' : '#2a8a6e'}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    alignItems: 'center',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, fontWeight: 700, color: '#1b3c43' }}>{p.id}</span>
                  <span style={{ fontSize: 13, color: '#47635e', fontWeight: 500 }}>
                    {relProject?.name || p.projectId}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1b3c43' }}>{formatCurrency(p.amount)}</span>
                  <span style={{ fontSize: 12, color: '#67807a' }}>{p.date}</span>
                  <span style={{
                    display: 'inline-block',
                    padding: '3px 9px',
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 800,
                    background: statusBg(p.status),
                    color: statusColor(p.status),
                    textAlign: 'center',
                  }}>
                    {p.flagged ? '⚑ ' : ''}{p.status}
                  </span>
                </button>
              )
            })}
          </div>
          <button className="nir-link" style={{ marginTop: 14, fontSize: 13 }} onClick={() => navigate('payments')}>
            <TrendingUp size={14} /> View all payments
          </button>
        </div>
      )}

      {/* ── VENDOR CONTEXT ── */}
      <div style={{
        background: '#f8faf9',
        border: '1px solid #dce7e3',
        borderRadius: 12,
        padding: '16px 24px',
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#67807a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Vendor Context</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#1b3c43' }}>{vendor.name}</div>
          <div style={{ fontSize: 13, color: '#47635e', marginTop: 3 }}>
            {vendor.states} · {vendor.districts} · {vendor.activeProjects} active projects · {vendor.flagged} flagged payments
          </div>
          <div style={{ fontSize: 12, color: vendor.risk >= 70 ? '#dc2626' : '#47635e', marginTop: 4, fontWeight: vendor.risk >= 70 ? 700 : 400 }}>
            {vendor.finding}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <button className="nir-outline" style={{ fontSize: 12 }} onClick={() => navigate('vendors')}>
            View Vendor Profile
          </button>
          <button className="nir-outline" style={{ fontSize: 12 }} onClick={() => navigate('payments')}>
            All Payments
          </button>
        </div>
      </div>

    </div>
  )
}

export default PaymentDetail
