
import { ArrowUpRight } from 'lucide-react'
import { PageHeader, Panel, RiskBadge } from '../components/common/Primitives.jsx'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'
import '../styles/vendors.css'

export function Vendors(props) {
  const context = useApp()
  const vendors = props.vendors || context.vendors
  const openVendor = props.openVendor || context.openVendor

  return (
    <div className="vendors-page-container">
      <PageHeader
        eyebrow="PAYMENTS & VENDORS"
        title="Vendor Intelligence"
        subtitle="Review cross-project payment behaviour without labelling conclusions as findings of fraud."
      />

      <Panel
        title="Vendor register"
        subtitle="Elevated risk indicates a need for verification."
      >
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Projects</th>
                <th>Total payments</th>
                <th>Flagged</th>
                <th>Risk</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td>
                    <button
                      className="project-link"
                      onClick={() => openVendor(vendor.id)}
                    >
                      <strong>{vendor.name}</strong>
                      <small>{vendor.id}</small>
                    </button>
                  </td>

                  <td>{vendor.projects}</td>

                  <td>{formatCurrency(vendor.value)}</td>

                  <td>{vendor.flagged}</td>

                  <td>
                    <RiskBadge score={vendor.risk} />
                  </td>

                  <td>
                    <button
                      className="text-button"
                      onClick={() => openVendor(vendor.id)}
                    >
                      Investigate
                      <ArrowUpRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}

export default Vendors;

