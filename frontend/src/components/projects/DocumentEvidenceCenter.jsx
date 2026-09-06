import { useMemo } from 'react'
import {
  FileCheck2,
  FileText,
  CreditCard,
  TrendingUp,
  UserCheck,
  Camera,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  Search,
  CheckCircle,
} from 'lucide-react'

export default function DocumentEvidenceCenter({ project, onReviewEvidence, onRequestAudit }) {
  const documents = useMemo(() => {
    const source = project?.documents || {}

    return [
      {
        id: 'sanctionOrder',
        title: 'Sanction Order',
        description: 'Approval order and sanctioned amount supporting project authorization.',
        available: Boolean(source.sanctionOrder),
        type: 'Approval',
        icon: <FileCheck2 size={18} />,
      },
      {
        id: 'estimateDocument',
        title: 'Cost Estimate',
        description: 'Approved estimate used to establish the project cost baseline.',
        available: Boolean(source.estimateDocument),
        type: 'Financial',
        icon: <FileText size={18} />,
      },
      {
        id: 'workOrder',
        title: 'Work Order',
        description: 'Execution order linking the implementing agency and assigned work.',
        available: Boolean(source.workOrder),
        type: 'Execution',
        icon: <FileText size={18} />,
      },
      {
        id: 'paymentRecords',
        title: 'Payment Records',
        description: 'Project-linked transaction trail used for financial verification.',
        available: Boolean(source.paymentRecords),
        type: 'Financial',
        icon: <CreditCard size={18} />,
      },
      {
        id: 'progressReports',
        title: 'Progress Reports',
        description: 'Reported physical progress and milestone evidence.',
        available: Boolean(source.progressReports),
        type: 'Progress',
        icon: <TrendingUp size={18} />,
      },
      {
        id: 'inspectionReport',
        title: 'Inspection Report',
        description: 'Field inspection record supporting ground-level verification.',
        available: Boolean(source.inspectionReport),
        type: 'Field',
        icon: <UserCheck size={18} />,
      },
      {
        id: 'completionCertificate',
        title: 'Completion Certificate',
        description: 'Formal evidence of work completion and asset readiness.',
        available: Boolean(source.completionCertificate),
        type: 'Completion',
        icon: <ShieldCheck size={18} />,
      },
      {
        id: 'assetVerification',
        title: 'Asset Verification',
        description: 'Ground verification evidence connecting the reported work to the asset.',
        available: Boolean(source.assetVerification),
        type: 'Verification',
        icon: <MapPin size={18} />,
      },
    ]
  }, [project])

  const availableCount = documents.filter((item) => item.available).length
  const missingCount = documents.length - availableCount
  const completeness = Math.round((availableCount / documents.length) * 100)

  const evidenceLinks = [
    {
      title: 'Project photographs',
      description: 'Visual evidence for work progress and asset creation.',
      available: Boolean(project?.documents?.photographs || project?.documents?.projectPhotographs),
      icon: <Camera size={18} />,
    },
    {
      title: 'Geo-location evidence',
      description: 'Location evidence for the project site and asset.',
      available: Boolean(project?.location?.geoVerified),
      icon: <MapPin size={18} />,
    },
    {
      title: 'Field inspection',
      description: 'Inspection evidence linked to reported physical progress.',
      available: Boolean(project?.documents?.inspectionReport),
      icon: <UserCheck size={18} />,
    },
  ]

  return (
    <div className="document-evidence-page">
      <div className="document-evidence-header">
        <div>
          <span className="section-eyebrow">08 · DOCUMENT & EVIDENCE CONTROL</span>
          <h2>Documents & Evidence Management</h2>
          <p>
            Review the evidence trail supporting sanction, expenditure, progress,
            field verification and final asset creation.
          </p>
        </div>

        <div className="document-completeness-card">
          <div className="document-completeness-ring">
            <strong>{completeness}%</strong>
          </div>
          <div>
            <span>Evidence completeness</span>
            <strong>{availableCount} of {documents.length} available</strong>
          </div>
        </div>
      </div>

      <div className="document-summary-grid">
        <div className="document-summary-item">
          <span>Available</span>
          <strong>{availableCount}</strong>
        </div>
        <div className="document-summary-item warning">
          <span>Missing</span>
          <strong>{missingCount}</strong>
        </div>
        <div className="document-summary-item">
          <span>Project ID</span>
          <strong>{project?.id || '—'}</strong>
        </div>
      </div>

      <div className="document-control-note">
        <div className="document-note-icon">
          <ShieldCheck size={18} />
        </div>
        <div>
          <strong>Evidence should support every material decision</strong>
          <p>
            Missing or unavailable records are surfaced before an officer closes an
            investigation or approves the next control action.
          </p>
        </div>
      </div>

      <div className="document-section">
        <div className="document-section-heading">
          <div>
            <span className="section-eyebrow">DOCUMENT REGISTER</span>
            <h3>Project-linked records</h3>
          </div>
          <span className="document-count">{documents.length} records</span>
        </div>

        <div className="document-grid">
          {documents.map((document) => (
            <div
              className={`document-card ${document.available ? 'available' : 'missing'}`}
              key={document.id}
            >
              <div className="document-card-top">
                <div className="document-icon">{document.icon}</div>
                <span className={`document-status ${document.available ? 'available' : 'missing'}`}>
                  {document.available ? 'Available' : 'Missing'}
                </span>
              </div>

              <h4>{document.title}</h4>
              <p>{document.description}</p>

              <div className="document-card-meta">
                <span>{document.type}</span>
                {document.available ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="document-section">
        <div className="document-section-heading">
          <div>
            <span className="section-eyebrow">EVIDENCE SOURCES</span>
            <h3>Supporting field evidence</h3>
          </div>
        </div>

        <div className="evidence-link-grid">
          {evidenceLinks.map((item) => (
            <div className={`evidence-link-card ${item.available ? 'available' : 'missing'}`} key={item.title}>
              <div className="document-icon">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <span className={`evidence-link-status ${item.available ? 'available' : 'missing'}`}>
                  {item.available ? 'Evidence available' : 'Evidence pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {missingCount > 0 && (
        <div className="document-missing-panel">
          <div className="document-missing-icon">
            <AlertTriangle size={19} />
          </div>
          <div>
            <strong>{missingCount} document record(s) require attention</strong>
            <p>
              Missing evidence does not automatically mean non-compliance. It means the
              investigation should not treat the corresponding evidence as verified yet.
            </p>
          </div>
        </div>
      )}

      <div className="document-action-panel">
        <div>
          <span className="section-eyebrow">CONTROL ACTION</span>
          <h3>Continue the evidence review</h3>
          <p>
            Review the evidence chain first, or request a field audit when documentary
            evidence is insufficient to support the project status.
          </p>
        </div>

        <div className="document-action-buttons">
          <button className="secondary-btn" type="button" onClick={onReviewEvidence}>
            <Search size={16} />
            Review Evidence
          </button>
          <button className="primary-btn" type="button" onClick={onRequestAudit}>
            <ShieldCheck size={16} />
            Request Field Audit
          </button>
        </div>
      </div>
    </div>
  )
}
