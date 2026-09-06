
import { Activity, AlertTriangle, ClipboardCheck, IndianRupee } from 'lucide-react'
import { PageHeader, Panel, ProjectTable, RiskBadge, StatCard, StatusBadge } from '../components/common/Primitives.jsx'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'
import '../styles/vendor-details.css'

export function VendorDetail(props) {
  const context = useApp()
  const vendor =
    props.vendor ||
    context.vendors.find((item) => item.id === context.activeVendorId) ||
    context.vendors[0]
  const projects = props.projects || context.projects
  const payments = props.payments || context.payments
  const openProject = props.openProject || context.openProject
  const navigate = props.navigate || context.navigate

  if (!vendor) return null

  const vendorProjects = projects.filter((project) => project.vendorId === vendor.id)
  const vendorPayments = payments.filter((payment) => payment.vendorId === vendor.id)

  return (
    <div className="vendor-detail-page">
      <button className="back-link" onClick={() => navigate('vendors')}>
        ← Back to vendors
      </button>

      <PageHeader
        eyebrow="VENDOR INVESTIGATION"
        title={vendor.name}
        subtitle={`${vendor.id} · ${vendor.states} · ${vendor.districts}`}
        action={<RiskBadge score={vendor.risk} />}
      />

      <div className="stat-grid">
        <StatCard
          label="Projects handled"
          value={vendor.projects}
          trend="Cross-project"
          icon={ClipboardCheck}
        />

        <StatCard
          label="Payment value"
          value={formatCurrency(vendor.value)}
          trend="Recorded"
          icon={IndianRupee}
        />

        <StatCard
          label="Flagged transactions"
          value={vendor.flagged}
          trend="Requires review"
          icon={AlertTriangle}
          critical
        />

        <StatCard
          label="Average transaction"
          value={formatCurrency(vendor.value / Math.max(vendor.payments, 1))}
          trend="Calculated"
          icon={Activity}
        />
      </div>

      <div className="detail-grid">
        <Panel
          title="AI vendor analysis"
          subtitle="Prototype / synthetic model output"
        >
          <div className="reason">
            <span>
              <AlertTriangle size={16} />
            </span>

            <div>
              <strong>Elevated Vendor Risk</strong>
              <p>
                {vendor.finding}. Requires verification across projects and transactions.
              </p>
            </div>
          </div>
        </Panel>

        <Panel
          title="Projects handled"
          subtitle="Click through to project investigation"
        >
          <ProjectTable
            projects={vendorProjects}
            openProject={openProject}
          />
        </Panel>
      </div>

      <Panel
        title="Payment timeline"
        subtitle="Related transactions"
      >
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Status</th>
                <th>AI reason</th>
              </tr>
            </thead>

            <tbody>
              {vendorPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.projectId}</td>
                  <td>{formatCurrency(payment.amount)}</td>
                  <td>
                    <StatusBadge status={payment.status} />
                  </td>
                  <td>{payment.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}

export default VendorDetail

