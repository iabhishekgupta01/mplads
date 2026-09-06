import { useMemo, useState } from 'react'

import DuplicateWorkPanel from '../components/projects/DuplicateWorkPanel.jsx'
import "../styles/duplicateWork.css";
import "../styles/ProjectDetails.css";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Download,
  ShieldCheck,
  Brain,
  ChevronRight,
  CircleAlert,
  TrendingUp,
  Clock3,
  FileCheck2,
  MapPin,
  CreditCard,
  Building2,
  Activity,
  Search,
  UserCheck,
  Link2,
} from 'lucide-react'

import { useApp } from '../context/AppContext.jsx'
import {
  formatCurrency,
  riskLabel,
} from '../utils/formatters.js'


export function ProjectDetail() {

  const {
    selected,
    selectedRisk,
    projects,
    payments,
    vendors,
    inspections,
    progress,
    setModal,
    navigate,
  } = useApp()


  const [activeTab, setActiveTab] = useState('Overview')

  const [expandedEvidence, setExpandedEvidence] =
    useState(null)


  /* =========================================================
     PROJECT FALLBACK
  ========================================================= */

  const fallbackProject = {
    id: 'MP-2024-1001',
    name: 'Road Construction - Sehore',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    constituency: 'Sehore',
    category: 'Road',

    amount: 2000000,
    expenditure: 85,
    physical: 40,
    score: 82,
    status: 'Delayed',
    delay: '4 months',

    sanction: {
      sanctionOrderNo: 'MPLADS/MP/2024/1001',
      sanctionDate: '2024-08-14',
      sanctionedAmount: 2000000,
      sanctionStatus: 'Sanctioned',
    },

    cost: {
      estimatedCost: 1950000,
      sanctionedCost: 2000000,
      revisedEstimate: 2200000,
      actualExpenditure: 1700000,
      projectedFinalCost: 2280000,
    },

    financial: {
      releasedAmount: 1800000,
      utilizedAmount: 1700000,
      balanceAmount: 100000,
      expenditurePercent: 85,
      utilizationPercent: 94.44,
      lastPaymentDate: '2026-08-24',
    },

    timeline: {
      workOrderDate: '2024-09-02',
      commencementDate: '2024-09-15',
      expectedCompletionDate: '2026-06-30',
      revisedCompletionDate: '2026-10-31',
      delayMonths: 4,
    },

    milestones: [
      {
        id: 'MS-1001-01',
        name: 'Site preparation',
        expectedPercent: 20,
        reportedPercent: 20,
        status: 'Completed',
      },
      {
        id: 'MS-1001-02',
        name: 'Road base work',
        expectedPercent: 50,
        reportedPercent: 40,
        status: 'Delayed',
      },
      {
        id: 'MS-1001-03',
        name: 'Surface construction',
        expectedPercent: 80,
        reportedPercent: 40,
        status: 'Pending',
      },
      {
        id: 'MS-1001-04',
        name: 'Final completion',
        expectedPercent: 100,
        reportedPercent: 40,
        status: 'Pending',
      },
    ],

    asset: {
      assetId: 'ASSET-MP-1001',
      assetType: 'Rural Road',
      assetName: 'Sehore Village Connectivity Road',
      creationStatus: 'Under Execution',
      reportedCompletion: 40,
      verifiedCompletion: null,
      verificationStatus: 'Pending Verification',
      durableAsset: true,
      beneficiaryCount: 1850,
    },

    location: {
      village: 'Demo Village',
      block: 'Sehore Block',
      latitude: 23.2032,
      longitude: 77.0844,
      geoVerified: true,
    },

    vendorId: 'VEND-019',
    vendor: 'ABC Infrastructure',
    agency: 'MP Rural Works',

    implementingAgency: {
      name: 'MP Rural Works',
      type: 'State Implementing Agency',
    },

    beneficiary: {
      estimatedBeneficiaries: 1850,
      targetGroup: 'Rural Community',
      locality: 'Sehore Block',
    },

    documents: {
      sanctionOrder: true,
      estimateDocument: true,
      workOrder: true,
      paymentRecords: true,
      progressReports: true,
      inspectionReport: false,
      completionCertificate: false,
      assetVerification: false,
    },
  }


  const project =
    selected || fallbackProject


  /* =========================================================
     RELATED DATA
  ========================================================= */

  const projectPayments = useMemo(() => {

    if (!Array.isArray(payments)) {
      return []
    }

    return payments.filter(
      (payment) =>
        payment?.projectId === project.id
    )

  }, [payments, project.id])


  const projectInspections = useMemo(() => {

    if (!Array.isArray(inspections)) {
      return []
    }

    return inspections.filter(
      (inspection) =>
        inspection?.projectId === project.id
    )

  }, [inspections, project.id])


  const projectProgress = useMemo(() => {

    if (!Array.isArray(progress)) {
      return []
    }

    return progress.filter(
      (item) =>
        item?.projectId === project.id
    )

  }, [progress, project.id])


  const relatedVendor = useMemo(() => {

    if (!Array.isArray(vendors)) {
      return null
    }

    return vendors.find(
      (vendor) =>
        vendor?.id === project.vendorId ||
        vendor?.name === project.vendor
    ) || null

  }, [vendors, project.vendorId, project.vendor])


  /* =========================================================
     RISK FALLBACK
  ========================================================= */

  const risk = selectedRisk || {
    score: project.score || 0,
    riskLevel: riskLabel(
      project.score || 0
    ).toUpperCase(),

    confidence: 0,

    priority:
      'Review Required',

    signals: [],

    activeSignals: [],

    strongestSignals: [],

    recommendation:
      'Review project financial and physical progress.',

    summary:
      'Risk assessment is being prepared from available project data.',
  }


  const riskScore =
    Number(risk.score || 0)


  const riskText =
    risk.riskLevel === 'CRITICAL'
      ? 'Critical'
      : risk.riskLevel === 'HIGH'
        ? 'High'
        : risk.riskLevel === 'MEDIUM'
          ? 'Medium'
          : 'Low'


  const riskClass =
    riskText.toLowerCase()


  /* =========================================================
     DERIVED FINANCIAL DATA
  ========================================================= */

  const sanctionedAmount =
    Number(
      project?.sanction?.sanctionedAmount ??
      project?.amount ??
      0
    )


  const estimatedCost =
    Number(
      project?.cost?.estimatedCost ??
      0
    )


  const revisedEstimate =
    Number(
      project?.cost?.revisedEstimate ??
      sanctionedAmount
    )


  const actualExpenditure =
    Number(
      project?.cost?.actualExpenditure ??
      project?.financial?.utilizedAmount ??
      0
    )


  const projectedFinalCost =
    Number(
      project?.cost?.projectedFinalCost ??
      0
    )


  const expenditurePercent =
    Number(
      project?.financial?.expenditurePercent ??
      project?.expenditure ??
      0
    )


  const physicalPercent =
    Number(
      project?.physical ??
      project?.asset?.reportedCompletion ??
      0
    )


  const progressGap =
    Math.max(
      0,
      expenditurePercent -
      physicalPercent
    )


  const projectedCostVariance =
    revisedEstimate > 0
      ? (
        (
          projectedFinalCost -
          revisedEstimate
        ) /
        revisedEstimate
      ) * 100
      : 0


  /* =========================================================
     RISK SIGNALS
  ========================================================= */

  const detectedSignals =
    (risk.activeSignals || []).filter(
      (signal) =>
        signal?.detected
    )


  const progressSignal =
    risk.signals?.find(
      (signal) =>
        signal.id ===
        'FINANCIAL_PHYSICAL_MISMATCH'
    )


  const delaySignal =
    risk.signals?.find(
      (signal) =>
        signal.id ===
        'DELAY_RISK'
    )


  const paymentSignal =
    risk.signals?.find(
      (signal) =>
        signal.id ===
        'PAYMENT_ANOMALY'
    )


  const costSignal =
    risk.signals?.find(
      (signal) =>
        signal.id ===
        'COST_OVERRUN_RISK'
    )


  /* =========================================================
     PAYMENT ANALYSIS
  ========================================================= */

  const flaggedPayments =
    projectPayments.filter(
      (payment) =>
        payment?.flagged
    )


  const paymentTotal =
    projectPayments.reduce(
      (sum, payment) =>
        sum +
        Number(
          payment?.amount || 0
        ),
      0
    )


  const repeatedPaymentAmounts =
    useMemo(() => {

      const counts = {}

      projectPayments.forEach(
        (payment) => {

          const amount =
            Number(
              payment?.amount || 0
            )

          counts[amount] =
            (counts[amount] || 0) + 1

        }
      )

      return Object.entries(
        counts
      )
        .filter(
          ([, count]) =>
            count > 1
        )
        .map(
          ([amount, count]) => ({
            amount:
              Number(amount),
            count,
          })
        )

    }, [projectPayments])


  /* =========================================================
     GAP 5 — FINANCIAL TRAIL & PAYMENT INTELLIGENCE
  ========================================================= */

  const releasedAmount =
    Number(
      project?.financial?.releasedAmount ??
      projectPayments
        .filter(
          (payment) =>
            !['Rejected', 'Failed', 'Cancelled']
              .includes(payment?.status)
        )
        .reduce(
          (sum, payment) =>
            sum + Number(payment?.amount || 0),
          0
        )
    )

  const remainingBalance =
    Math.max(
      0,
      sanctionedAmount - releasedAmount
    )

  const releasedPercent =
    sanctionedAmount > 0
      ? (releasedAmount / sanctionedAmount) * 100
      : 0

  const paymentAverage =
    projectPayments.length > 0
      ? paymentTotal / projectPayments.length
      : 0

  const paymentRiskCount =
    projectPayments.filter(
      (payment) =>
        Boolean(payment?.flagged) ||
        ['Under Review', 'Flagged', 'On Hold']
          .includes(payment?.status)
    ).length

  const paymentVendorBreakdown =
    useMemo(() => {
      const grouped = {}

      projectPayments.forEach((payment) => {
        const vendor =
          payment?.vendor ||
          payment?.vendorName ||
          relatedVendor?.name ||
          project.vendor ||
          'Vendor unavailable'

        if (!grouped[vendor]) {
          grouped[vendor] = {
            vendor,
            count: 0,
            amount: 0,
          }
        }

        grouped[vendor].count += 1
        grouped[vendor].amount +=
          Number(payment?.amount || 0)
      })

      return Object.values(grouped)
        .sort((a, b) => b.amount - a.amount)
    }, [
      projectPayments,
      relatedVendor?.name,
      project.vendor,
    ])

  const paymentClusters =
    useMemo(() => {
      const dated = projectPayments
        .filter((payment) => payment?.date)
        .map((payment) => ({
          ...payment,
          parsedDate: new Date(payment.date),
        }))
        .filter(
          (payment) =>
            !Number.isNaN(
              payment.parsedDate.getTime()
            )
        )
        .sort(
          (a, b) =>
            a.parsedDate - b.parsedDate
        )

      const clusters = []
      let current = []

      dated.forEach((payment, index) => {
        if (index === 0) {
          current = [payment]
          return
        }

        const previous = dated[index - 1]
        const diffDays =
          Math.abs(
            payment.parsedDate -
            previous.parsedDate
          ) /
          (1000 * 60 * 60 * 24)

        if (diffDays <= 1) {
          current.push(payment)
        } else {
          if (current.length > 1) {
            clusters.push(current)
          }
          current = [payment]
        }
      })

      if (current.length > 1) {
        clusters.push(current)
      }

      return clusters
    }, [projectPayments])

  const suspiciousPaymentReasons =
    useMemo(() => {
      const reasons = []

      if (flaggedPayments.length > 0) {
        reasons.push(
          `${flaggedPayments.length} transaction(s) are explicitly flagged for review.`
        )
      }

      if (repeatedPaymentAmounts.length > 0) {
        reasons.push(
          `${repeatedPaymentAmounts.length} repeated payment amount pattern(s) detected.`
        )
      }

      if (paymentClusters.length > 0) {
        reasons.push(
          `${paymentClusters.length} same-day/consecutive-day payment cluster(s) detected.`
        )
      }

      if (
        sanctionedAmount > 0 &&
        releasedPercent >= 90 &&
        physicalPercent < 60
      ) {
        reasons.push(
          `High fund release (${releasedPercent.toFixed(0)}%) is ahead of reported physical progress (${physicalPercent}%).`
        )
      }

      if (
        paymentVendorBreakdown.length === 1 &&
        projectPayments.length >= 3
      ) {
        reasons.push(
          'All linked transactions are concentrated with the same vendor.'
        )
      }

      return reasons
    }, [
      flaggedPayments,
      repeatedPaymentAmounts,
      paymentClusters,
      sanctionedAmount,
      releasedPercent,
      physicalPercent,
      paymentVendorBreakdown.length,
      projectPayments.length,
    ])

  const financialRiskLevel =
    suspiciousPaymentReasons.length >= 3
      ? 'High'
      : suspiciousPaymentReasons.length >= 1
        ? 'Review'
        : 'Low'


  /* =========================================================
     EVIDENCE STRENGTH
  ========================================================= */

  const evidenceSources = [

    {
      id: 'project',
      label: 'Project Data',
      available: true,
      icon: <Activity size={15} />,
      detail:
        'Sanction, execution status and project metadata.',
    },

    {
      id: 'payments',
      label: 'Payment Transactions',
      available:
        projectPayments.length > 0,
      icon: <CreditCard size={15} />,
      detail:
        `${projectPayments.length} payment records available.`,
    },

    {
      id: 'vendor',
      label: 'Vendor History',
      available:
        Boolean(relatedVendor),
      icon: <Building2 size={15} />,
      detail:
        relatedVendor
          ? `${relatedVendor.projects || 0} projects linked to vendor.`
          : 'Vendor history unavailable.',
    },

    {
      id: 'progress',
      label: 'Progress Reports',
      available:
        projectProgress.length > 0 ||
        Boolean(project.documents?.progressReports),
      icon: <TrendingUp size={15} />,
      detail:
        `${projectProgress.length} progress records available.`,
    },

    {
      id: 'inspection',
      label: 'Inspection Records',
      available:
        projectInspections.length > 0 ||
        Boolean(project.documents?.inspectionReport),
      icon: <UserCheck size={15} />,
      detail:
        `${projectInspections.length} inspection record(s) linked.`,
    },

    {
      id: 'location',
      label: 'Geo Location',
      available:
        Boolean(project.location?.geoVerified),
      icon: <MapPin size={15} />,
      detail:
        project.location?.geoVerified
          ? 'Project location is geo-verified.'
          : 'Geo-verification pending.',
    },

  ]


  const availableEvidence =
    evidenceSources.filter(
      (item) =>
        item.available
    )


  const evidenceStrength =
    Math.min(
      100,
      35 +
      availableEvidence.length * 10 +
      (flaggedPayments.length > 0
        ? 10
        : 0)
    )


  /* =========================================================
     SIGNAL ICON
  ========================================================= */

  const getSignalIcon = (
    signalId
  ) => {

    if (
      signalId ===
      'DELAY_RISK'
    ) {
      return <Clock3 size={16} />
    }

    if (
      signalId ===
      'COST_OVERRUN_RISK'
    ) {
      return <TrendingUp size={16} />
    }

    if (
      signalId ===
      'PAYMENT_ANOMALY'
    ) {
      return <CircleAlert size={16} />
    }

    if (
      signalId ===
      'SIMILAR_WORK'
    ) {
      return <Link2 size={16} />
    }

    return <AlertTriangle size={16} />
  }


  /* =========================================================
     SIGNAL EVIDENCE CONTENT
  ========================================================= */

  const renderSignalEvidence =
    (signal) => {

      if (!signal?.evidence) {
        return null
      }


      if (
        signal.id ===
        'FINANCIAL_PHYSICAL_MISMATCH'
      ) {

        return (

          <div className="investigation-data-grid">

            <DataPoint
              label="Expenditure"
              value={`${signal.evidence.expenditure ?? expenditurePercent}%`}
            />

            <DataPoint
              label="Physical Progress"
              value={`${signal.evidence.physicalProgress ?? physicalPercent}%`}
            />

            <DataPoint
              label="Progress Gap"
              value={`${signal.evidence.gap ?? progressGap} percentage points`}
            />

            <DataPoint
              label="Actual Expenditure"
              value={formatCurrency(
                actualExpenditure
              )}
            />

          </div>

        )
      }


      if (
        signal.id ===
        'PAYMENT_ANOMALY'
      ) {

        return (

          <div className="investigation-data-grid">

            <DataPoint
              label="Flagged Payments"
              value={
                signal.evidence.flaggedPayments ??
                flaggedPayments.length
              }
            />

            <DataPoint
              label="Total Payments"
              value={
                signal.evidence.totalPayments ??
                projectPayments.length
              }
            />

            <DataPoint
              label="Payment Value"
              value={formatCurrency(
                paymentTotal
              )}
            />

            <DataPoint
              label="Repeated Amounts"
              value={
                repeatedPaymentAmounts.length
              }
            />

          </div>

        )
      }


      if (
        signal.id ===
        'DELAY_RISK'
      ) {

        return (

          <div className="investigation-data-grid">

            <DataPoint
              label="Delay"
              value={`${signal.evidence.delayMonths ?? project.timeline?.delayMonths ?? 0} months`}
            />

            <DataPoint
              label="Expected Completion"
              value={
                project.timeline
                  ?.expectedCompletionDate ||
                '—'
              }
            />

            <DataPoint
              label="Revised Completion"
              value={
                project.timeline
                  ?.revisedCompletionDate ||
                '—'
              }
            />

            <DataPoint
              label="Prediction"
              value={`${signal.evidence.probability ?? 0}%`}
            />

          </div>

        )
      }


      if (
        signal.id ===
        'COST_OVERRUN_RISK'
      ) {

        return (

          <div className="investigation-data-grid">

            <DataPoint
              label="Revised Estimate"
              value={formatCurrency(
                revisedEstimate
              )}
            />

            <DataPoint
              label="Actual Expenditure"
              value={formatCurrency(
                actualExpenditure
              )}
            />

            <DataPoint
              label="Projected Final"
              value={formatCurrency(
                projectedFinalCost
              )}
            />

            <DataPoint
              label="Projected Variance"
              value={`${projectedCostVariance.toFixed(1)}%`}
            />

          </div>

        )
      }


      if (
        signal.id ===
        'SIMILAR_WORK'
      ) {

        return (

          <div className="investigation-data-grid">

            <DataPoint
              label="Similar Works"
              value={
                signal.evidence
                  ?.similarProjectCount ??
                0
              }
            />

            <DataPoint
              label="District"
              value={
                project.district ||
                '—'
              }
            />

            <DataPoint
              label="Work Type"
              value={
                project.category ||
                '—'
              }
            />

          </div>

        )
      }


      return null
    }


  return (

    <div className="project-detail-container">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          gap: 16,
        }}
      >

        <div
          className="breadcrumb-line"
          style={{
            margin: 0,
          }}
        >
          Home / Projects /{' '}
          <span>
            {project.name}
          </span>
        </div>


        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >

          <button
            className="secondary-btn"
            onClick={() =>
              alert(
                'Downloading official monitoring report PDF...'
              )
            }
          >

            <Download size={15} />

            Download Report

          </button>


          <button
            className="secondary-btn"
            onClick={() =>
              navigate('projects')
            }
          >

            <ArrowLeft size={15} />

            Back

          </button>

        </div>

      </div>



      {/* =====================================================
          PROJECT HEADER
      ===================================================== */}

      <div className="project-header-card">

        <div className="project-header-top">

          <div className="project-title-box">

            <h1>

              {project.name}

              <span
                className={`badge-pill ${riskClass}`}
              >

                <i />

                {riskText} Risk

              </span>

            </h1>


            <div className="project-meta-line">

              Project ID:{' '}
              <strong>
                {project.id}
              </strong>

              {' | '}

              State:{' '}
              <strong>
                {project.state}
              </strong>

              {' | '}

              District:{' '}
              <strong>
                {project.district}
              </strong>

              {' | '}

              Work Type:{' '}
              <strong>
                {project.category}
              </strong>

            </div>

          </div>


          <div className="ai-assessment-mini">

            <Brain size={15} />

            <span>
              AI Assessment
            </span>

            <strong>
              {risk.confidence}% confidence
            </strong>

          </div>

        </div>

      </div>



      {/* =====================================================
          KPI STRIP
      ===================================================== */}

      <div className="kpi-6-strip">

        <div className="kpi-6-item">

          <span>
            Sanctioned Amount
          </span>

          <strong>
            {formatCurrency(
              sanctionedAmount
            )}
          </strong>

        </div>


        <div className="kpi-6-item">

          <span>
            Released Amount
          </span>

          <strong>
            {formatCurrency(
              releasedAmount
            )}
          </strong>

        </div>


        <div className="kpi-6-item">

          <span>
            Actual Expenditure
          </span>

          <strong>

            {formatCurrency(
              actualExpenditure
            )}

            <small
              style={{
                fontSize: 12,
                color:
                  '#dc2626',
                fontWeight: 600,
              }}
            >
              ({expenditurePercent}%)
            </small>

          </strong>

        </div>


        <div className="kpi-6-item">

          <span>
            Physical Progress
          </span>

          <strong>
            {physicalPercent}%
          </strong>

        </div>


        <div className="kpi-6-item">

          <span>
            Expected Completion
          </span>

          <strong>
            {project.timeline
              ?.expectedCompletionDate ||
              '—'}
          </strong>

        </div>


        <div className="kpi-6-item critical">

          <span>
            Delay
          </span>

          <strong>
            {project.delay ||
              `${project.timeline?.delayMonths || 0} months`}
          </strong>

        </div>

      </div>



      {/* =====================================================
          INVESTIGATION SUMMARY
      ===================================================== */}

      <div className="investigation-summary-panel">

        <div className="investigation-summary-main">

          <div className="investigation-summary-icon">
            <Search size={18} />
          </div>

          <div>

            <span className="section-eyebrow">
              INVESTIGATION CASE
            </span>

            <h3>
              Why this project requires attention
            </h3>

            <p>
              The system has correlated project,
              financial, execution, payment and
              verification data to identify
              potentially abnormal patterns.
            </p>

          </div>

        </div>


        <div className="investigation-summary-stats">

          <div>

            <span>
              Risk
            </span>

            <strong>
              {riskScore}/100
            </strong>

          </div>


          <div>

            <span>
              Signals
            </span>

            <strong>
              {detectedSignals.length}
            </strong>

          </div>


          <div>

            <span>
              Evidence
            </span>

            <strong>
              {availableEvidence.length}/
              {evidenceSources.length}
            </strong>

          </div>


          <div>

            <span>
              Priority
            </span>

            <strong>
              {risk.priority}
            </strong>

          </div>

        </div>

      </div>



      {/* =====================================================
          TABS
      ===================================================== */}

      <div className="project-tabs-bar">

        {[
          'Overview',
          'Evidence & Investigation',
          'Progress & Fund',
          'Payments',
          'Risk Analysis',
          'Duplicate Work',
          'Alerts',
          'Documents',
        ].map((tab) => (

          <button
            key={tab}
            className={`tab-btn ${activeTab === tab
                ? 'active'
                : ''
              }`}
            onClick={() =>
              setActiveTab(tab)
            }
          >

            {tab}

          </button>

        ))}

      </div>



      {/* =====================================================
          OVERVIEW
      ===================================================== */}

      {activeTab === 'Overview' && (

        <>

          <div className="detail-overview-grid">


            {/* =================================================
                AI RISK SCORE
            ================================================= */}

            <div
              className="panel"
              style={{
                textAlign: 'center',
              }}
            >

              <div className="panel-head">

                <h2>
                  AI Risk Score
                </h2>

                <span className="ai-powered-label">

                  <Brain size={13} />

                  AI

                </span>

              </div>


              <div className="risk-gauge-box">

                <div
                  className="half-gauge-ring"
                  style={{
                    background:
                      `conic-gradient(
                        from 270deg,
                        var(--sl-red) 0% ${riskScore}%,
                        #e2e8f0 ${riskScore}% 100%
                      )`,
                  }}
                >

                  <div className="half-gauge-inner" />

                </div>


                <div className="gauge-score-value">

                  <strong>
                    {riskScore}
                  </strong>

                  <span
                    style={{
                      fontSize: 13,
                      color:
                        '#64748b',
                    }}
                  >
                    / 100
                  </span>


                  <span
                    style={{
                      color:
                        '#dc2626',
                      fontSize: 14,
                      fontWeight: 800,
                      marginTop: 4,
                    }}
                  >
                    {riskText} Risk
                  </span>


                  <small className="risk-confidence">
                    {risk.confidence}% confidence
                  </small>

                </div>

              </div>


              <div className="risk-priority-box">

                <span>
                  Priority
                </span>

                <strong>
                  {risk.priority}
                </strong>

              </div>

            </div>



            {/* =================================================
                WHY FLAGGED
            ================================================= */}

            <div className="panel">

              <div className="panel-head">

                <h2>
                  Why is this project flagged?
                </h2>

                <span className="signal-count">
                  {detectedSignals.length}
                  {' '}signals
                </span>

              </div>


              <div className="evidence-bullet-list">

                {detectedSignals.length === 0 && (

                  <div className="risk-empty-state">

                    <CheckCircle size={18} />

                    <span>
                      No significant anomaly detected
                      from available project data.
                    </span>

                  </div>

                )}


                {detectedSignals.map(
                  (signal) => {

                    const expanded =
                      expandedEvidence ===
                      signal.id


                    return (

                      <div
                        className={`evidence-item ai-evidence-item ${expanded
                            ? 'expanded'
                            : ''
                          }`}
                        key={signal.id}
                      >

                        <div className="evidence-icon">

                          {getSignalIcon(
                            signal.id
                          )}

                        </div>


                        <div
                          className="evidence-content"
                        >

                          <div
                            className="evidence-title-row"
                          >

                            <strong>
                              {signal.name}
                            </strong>

                            <span className="signal-score">
                              +{signal.score}
                            </span>

                          </div>


                          <span>
                            {signal.explanation}
                          </span>


                          {signal.evidence && (

                            <>

                              <button
                                type="button"
                                className="evidence-expand-btn"
                                onClick={() =>
                                  setExpandedEvidence(
                                    expanded
                                      ? null
                                      : signal.id
                                  )
                                }
                              >

                                {expanded
                                  ? 'Hide evidence'
                                  : 'View supporting evidence'}

                                <ChevronRight
                                  size={13}
                                  className={
                                    expanded
                                      ? 'rotated'
                                      : ''
                                  }
                                />

                              </button>


                              {expanded && (

                                <div className="signal-evidence-detail">

                                  {renderSignalEvidence(
                                    signal
                                  )}

                                </div>

                              )}

                            </>

                          )}

                        </div>

                      </div>

                    )

                  }
                )}

              </div>

            </div>



            {/* =================================================
                EARLY WARNING
            ================================================= */}

            <div className="panel">

              <div className="panel-head">

                <h2>
                  Early Warning
                </h2>

                <span className="ai-powered-label">

                  <Brain size={13} />

                  Predictive

                </span>

              </div>


              <div className="predictions-list">

                <div className="prediction-row">

                  <span>

                    <Clock3 size={14} />

                    Delay Probability

                  </span>

                  <strong>
                    {delaySignal
                      ?.evidence
                      ?.probability ??
                      0}%
                  </strong>

                </div>


                <div className="prediction-row">

                  <span>

                    <TrendingUp size={14} />

                    Cost Overrun Probability

                  </span>

                  <strong>
                    {costSignal
                      ?.evidence
                      ?.probability ??
                      0}%
                  </strong>

                </div>


                <div className="prediction-row">

                  <span>

                    <AlertTriangle size={14} />

                    Current Anomaly Score

                  </span>

                  <strong>
                    {riskScore}
                  </strong>

                </div>

              </div>


              <div className="prediction-note">

                Current prototype uses explainable
                risk signals. Production ML models
                can consume the same structured
                project features through the
                backend intelligence service.

              </div>

            </div>

          </div>



          {/* =================================================
              FINANCIAL VS PHYSICAL
          ================================================= */}

          <div className="gap-comparison-box">

            <div className="section-heading-with-badge">

              <h3>
                Financial vs Physical Progress
              </h3>

              {progressGap >= 25 && (

                <span className="warning-badge">
                  Significant mismatch
                </span>

              )}

            </div>


            <div className="bar-comp-row">

              <label>

                <span>
                  Financial Expenditure
                </span>

                <span>
                  {expenditurePercent}%
                </span>

              </label>


              <div className="bar-comp-track">

                <div
                  className="bar-comp-fill blue"
                  style={{
                    width:
                      `${Math.min(
                        100,
                        expenditurePercent
                      )}%`,
                  }}
                />

              </div>

            </div>


            <div className="bar-comp-row">

              <label>

                <span>
                  Physical Progress
                </span>

                <span>
                  {physicalPercent}%
                </span>

              </label>


              <div className="bar-comp-track">

                <div
                  className="bar-comp-fill amber"
                  style={{
                    width:
                      `${Math.min(
                        100,
                        physicalPercent
                      )}%`,
                  }}
                />

              </div>

            </div>


            <div className="gap-callout-clean">

              <AlertTriangle size={15} />

              <span>

                Progress Gap:{' '}

                <strong>
                  {progressGap}
                  {' '}percentage points.
                </strong>

                {' '}

                Expenditure is materially
                ahead of reported physical work.

              </span>

            </div>

          </div>



          {/* =================================================
              AI SUMMARY
          ================================================= */}

          <div className="ai-summary-panel">

            <div className="ai-summary-icon">

              <Brain size={20} />

            </div>


            <div className="ai-summary-content">

              <div className="ai-summary-header">

                <strong>
                  AI Assessment
                </strong>

                <span>
                  {risk.confidence}% confidence
                </span>

              </div>


              <p>
                {risk.summary}
              </p>


              <div className="ai-recommendation">

                <span>
                  Recommended next step
                </span>

                <strong>
                  {risk.recommendation}
                </strong>

              </div>

            </div>

          </div>



          {/* =================================================
              ACTION
          ================================================= */}

          <div className="recommended-action-banner">

            <div className="action-banner-text">

              <strong>
                Recommended Action
              </strong>

              <p>
                {risk.recommendation}
              </p>

            </div>


            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >

              <button
                className="primary-btn"
                onClick={() =>
                  setModal('audit')
                }
              >

                <ShieldCheck size={16} />

                Request Field Audit

              </button>


              <button
                className="danger-btn"
                onClick={() =>
                  setModal('halt')
                }
              >

                <AlertTriangle size={16} />

                Halt Payment

              </button>


              <button
                className="secondary-btn"
                onClick={() =>
                  setModal('resolve')
                }
              >

                <CheckCircle size={16} />

                Mark Resolved

              </button>

            </div>

          </div>

        </>

      )}



      {/* =====================================================
          EVIDENCE & INVESTIGATION
      ===================================================== */}

      {activeTab ===
        'Evidence & Investigation' && (

          <div className="investigation-page">


            {/* =================================================
              CASE HEADER
          ================================================= */}

            <div className="investigation-case-header">

              <div>

                <span className="section-eyebrow">
                  ANOMALY INVESTIGATION
                </span>

                <h2>
                  Evidence supporting this risk case
                </h2>

                <p>
                  Independent project records are
                  correlated to help an officer understand
                  why the system raised this case.
                </p>

              </div>


              <div className="evidence-strength-box">

                <span>
                  Evidence Strength
                </span>

                <strong>
                  {evidenceStrength}%
                </strong>

                <small>
                  {availableEvidence.length}
                  {' '}of{' '}
                  {evidenceSources.length}
                  {' '}sources available
                </small>

              </div>

            </div>



            {/* =================================================
              EVIDENCE SOURCE GRID
          ================================================= */}

            <div className="investigation-section">

              <div className="investigation-section-heading">

                <div>

                  <span className="section-eyebrow">
                    01 · DATA SOURCES
                  </span>

                  <h3>
                    Evidence available to the investigator
                  </h3>

                </div>

              </div>


              <div className="evidence-source-grid">

                {evidenceSources.map(
                  (source) => (

                    <div
                      key={source.id}
                      className={`evidence-source-card ${source.available
                          ? 'available'
                          : 'unavailable'
                        }`}
                    >

                      <div className="evidence-source-icon">

                        {source.icon}

                      </div>


                      <div>

                        <strong>
                          {source.label}
                        </strong>

                        <p>
                          {source.detail}
                        </p>

                      </div>


                      <span className="evidence-source-status">

                        {source.available
                          ? 'Available'
                          : 'Missing'}

                      </span>

                    </div>

                  )
                )}

              </div>

            </div>



            {/* =================================================
              EVIDENCE CHAIN
          ================================================= */}

            <div className="investigation-section">

              <div className="investigation-section-heading">

                <div>

                  <span className="section-eyebrow">
                    02 · EVIDENCE CHAIN
                  </span>

                  <h3>
                    How the system reached this case
                  </h3>

                </div>

              </div>


              <div className="evidence-chain">

                <EvidenceChainStep
                  number="01"
                  icon={<FileCheck2 size={16} />}
                  title="Project sanctioned"
                  detail={`${formatCurrency(
                    sanctionedAmount
                  )} sanctioned for ${project.category || 'MPLADS work'}.`}
                  status="Source available"
                />


                <EvidenceChainStep
                  number="02"
                  icon={<CreditCard size={16} />}
                  title="Financial execution"
                  detail={`${expenditurePercent}% expenditure reported against ${physicalPercent}% physical progress.`}
                  status={
                    progressGap >= 25
                      ? 'Mismatch detected'
                      : 'Within review range'
                  }
                  warning={
                    progressGap >= 25
                  }
                />


                <EvidenceChainStep
                  number="03"
                  icon={<CircleAlert size={16} />}
                  title="Payment pattern"
                  detail={
                    flaggedPayments.length > 0
                      ? `${flaggedPayments.length} payment(s) are currently flagged for review.`
                      : `${projectPayments.length} payment records available.`
                  }
                  status={
                    flaggedPayments.length > 0
                      ? 'Anomaly detected'
                      : 'No flagged payment'
                  }
                  warning={
                    flaggedPayments.length > 0
                  }
                />


                <EvidenceChainStep
                  number="04"
                  icon={<Clock3 size={16} />}
                  title="Execution timeline"
                  detail={
                    project.timeline?.delayMonths
                      ? `${project.timeline.delayMonths} month(s) behind expected completion.`
                      : 'Project currently within expected schedule.'
                  }
                  status={
                    project.timeline?.delayMonths > 0
                      ? 'Schedule risk'
                      : 'On track'
                  }
                  warning={
                    project.timeline?.delayMonths > 0
                  }
                />


                <EvidenceChainStep
                  number="05"
                  icon={<MapPin size={16} />}
                  title="Ground verification"
                  detail={
                    project.asset?.verificationStatus ||
                    'Field verification pending.'
                  }
                  status={
                    project.asset?.verificationStatus ===
                      'Verified'
                      ? 'Verified'
                      : 'Verification required'
                  }
                  warning={
                    project.asset?.verificationStatus !==
                    'Verified'
                  }
                />

              </div>

            </div>



            {/* =================================================
              PAYMENT EVIDENCE
          ================================================= */}

            <div className="investigation-section">

              <div className="investigation-section-heading">

                <div>

                  <span className="section-eyebrow">
                    03 · PAYMENT EVIDENCE
                  </span>

                  <h3>
                    Transactions linked to this project
                  </h3>

                </div>


                <span className="investigation-count">
                  {projectPayments.length}
                  {' '}records
                </span>

              </div>


              <div className="investigation-table-wrap">

                <table className="investigation-table">

                  <thead>

                    <tr>

                      <th>
                        Transaction
                      </th>

                      <th>
                        Date
                      </th>

                      <th>
                        Amount
                      </th>

                      <th>
                        Type
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        AI Finding
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {projectPayments.length === 0 ? (

                      <tr>

                        <td
                          colSpan={6}
                          className="investigation-empty"
                        >
                          No payment records linked
                          to this project.
                        </td>

                      </tr>

                    ) : (

                      projectPayments.map(
                        (payment) => (

                          <tr
                            key={
                              payment.id
                            }
                          >

                            <td>
                              <strong>
                                {payment.id}
                              </strong>
                            </td>

                            <td>
                              {payment.date ||
                                '—'}
                            </td>

                            <td>
                              <strong>
                                {formatCurrency(
                                  payment.amount
                                )}
                              </strong>
                            </td>

                            <td>
                              {payment.type ||
                                '—'}
                            </td>

                            <td>

                              <span
                                className={`investigation-status ${payment.flagged
                                    ? 'warning'
                                    : 'normal'
                                  }`}
                              >
                                {payment.status ||
                                  'Processed'}
                              </span>

                            </td>

                            <td>

                              {payment.flagged ? (

                                <div className="finding-inline">

                                  <AlertTriangle
                                    size={13}
                                  />

                                  <span>
                                    {payment.reason ||
                                      'Payment pattern requires review.'}
                                  </span>

                                </div>

                              ) : (

                                <span
                                  style={{
                                    color:
                                      '#64748b',
                                    fontSize:
                                      11,
                                  }}
                                >
                                  No immediate concern
                                </span>

                              )}

                            </td>

                          </tr>

                        )
                      )

                    )}

                  </tbody>

                </table>

              </div>

            </div>



            {/* =================================================
              VENDOR CONNECTION
          ================================================= */}

            <div className="investigation-two-column">


              <div className="investigation-section">

                <div className="investigation-section-heading">

                  <div>

                    <span className="section-eyebrow">
                      04 · ENTITY CONNECTION
                    </span>

                    <h3>
                      Vendor linked to project
                    </h3>

                  </div>

                </div>


                <div className="linked-entity-card">

                  <div className="linked-entity-icon">

                    <Building2 size={18} />

                  </div>


                  <div className="linked-entity-content">

                    <strong>
                      {relatedVendor?.name ||
                        project.vendor ||
                        'Vendor not available'}
                    </strong>

                    <span>
                      {project.agency ||
                        project.implementingAgency?.name ||
                        'Implementing agency unavailable'}
                    </span>


                    {relatedVendor && (

                      <div className="linked-entity-metrics">

                        <div>

                          <span>
                            Vendor Risk
                          </span>

                          <strong>
                            {relatedVendor.risk ??
                              '—'}
                            /100
                          </strong>

                        </div>


                        <div>

                          <span>
                            Projects
                          </span>

                          <strong>
                            {relatedVendor.projects ??
                              '—'}
                          </strong>

                        </div>


                        <div>

                          <span>
                            Flagged
                          </span>

                          <strong>
                            {relatedVendor.flagged ??
                              0}
                          </strong>

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              </div>



              {/* ===============================================
                ASSET VERIFICATION
            =============================================== */}

              <div className="investigation-section">

                <div className="investigation-section-heading">

                  <div>

                    <span className="section-eyebrow">
                      05 · ASSET VERIFICATION
                    </span>

                    <h3>
                      Ground truth status
                    </h3>

                  </div>

                </div>


                <div className="asset-investigation-card">

                  <div className="asset-investigation-header">

                    <div>

                      <strong>
                        {project.asset?.assetName ||
                          project.asset?.assetType ||
                          'Asset'}
                      </strong>

                      <span>
                        {project.asset?.assetId ||
                          'Asset ID unavailable'}
                      </span>

                    </div>


                    <span
                      className={`investigation-status ${project.asset?.verificationStatus ===
                          'Verified'
                          ? 'normal'
                          : 'warning'
                        }`}
                    >
                      {project.asset?.verificationStatus ||
                        'Pending Verification'}
                    </span>

                  </div>


                  <div className="asset-progress-comparison">

                    <div>

                      <span>
                        Reported
                      </span>

                      <strong>
                        {project.asset
                          ?.reportedCompletion ??
                          physicalPercent}%
                      </strong>

                    </div>


                    <div>

                      <span>
                        Field Verified
                      </span>

                      <strong>
                        {project.asset
                          ?.verifiedCompletion != null
                          ? `${project.asset.verifiedCompletion}%`
                          : 'Pending'}
                      </strong>

                    </div>

                  </div>


                  <p>

                    {project.asset
                      ?.verificationStatus ===
                      'Verified'
                      ? 'Reported asset progress has been verified against available field evidence.'
                      : 'Field verification is required to confirm whether reported physical progress matches the asset actually created on ground.'}

                  </p>

                </div>

              </div>

            </div>



            {/* =================================================
              RECOMMENDED INVESTIGATION
          ================================================= */}

            <div className="investigation-recommendation">

              <div>

                <span className="section-eyebrow">
                  INVESTIGATOR GUIDANCE
                </span>

                <h3>
                  Recommended next step
                </h3>

                <p>
                  {risk.recommendation}
                </p>

              </div>


              <button
                className="primary-btn"
                onClick={() =>
                  setModal('audit')
                }
              >

                <ShieldCheck size={16} />

                Request Field Audit

              </button>

            </div>

          </div>

        )}



      {/* =====================================================
          RISK ANALYSIS
      ===================================================== */}

      {activeTab ===
        'Risk Analysis' && (

          <div className="risk-analysis-page">

            <div className="risk-analysis-header">

              <div>

                <span className="eyebrow">
                  AI RISK INTELLIGENCE
                </span>

                <h2>
                  Explainable Project Risk Assessment
                </h2>

                <p>
                  Risk score is derived from independent
                  signals across financial execution,
                  physical progress, payments, timelines
                  and compliance indicators.
                </p>

              </div>


              <div className="risk-analysis-score">

                <strong>
                  {riskScore}
                </strong>

                <span>
                  /100
                </span>

                <small>
                  {riskText} Risk
                </small>

              </div>

            </div>



            <div className="risk-signal-grid">

              {risk.signals?.map(
                (signal) => (

                  <div
                    className={`risk-signal-card ${signal.detected
                        ? 'detected'
                        : 'normal'
                      }`}
                    key={signal.id}
                  >

                    <div className="risk-signal-card-top">

                      <div className="risk-signal-icon">

                        {getSignalIcon(
                          signal.id
                        )}

                      </div>

                      <span>
                        {signal.detected
                          ? `+${signal.score}`
                          : 'Clear'}
                      </span>

                    </div>


                    <h3>
                      {signal.name}
                    </h3>

                    <small>
                      {signal.category}
                    </small>

                    <p>
                      {signal.explanation}
                    </p>


                    {signal.detected &&
                      signal.evidence && (

                        <div className="risk-signal-evidence-preview">

                          {renderSignalEvidence(
                            signal
                          )}

                        </div>

                      )}


                    <div className="risk-signal-footer">

                      <span>
                        {signal.detected
                          ? signal.severity
                          : 'No concern'}
                      </span>

                      {signal.detected && (
                        <ChevronRight
                          size={14}
                        />
                      )}

                    </div>

                  </div>

                )
              )}

            </div>



            <div className="investigation-path">

              <div className="investigation-path-header">

                <h3>
                  Investigation Priority
                </h3>

                <span>
                  {risk.priority}
                </span>

              </div>


              <div className="investigation-steps">

                <div className="investigation-step active">

                  <span>
                    1
                  </span>

                  <div>

                    <strong>
                      AI Detection
                    </strong>

                    <small>
                      Risk signals detected
                      automatically.
                    </small>

                  </div>

                </div>


                <div className="investigation-step active">

                  <span>
                    2
                  </span>

                  <div>

                    <strong>
                      Evidence Review
                    </strong>

                    <small>
                      Financial, payment,
                      vendor and execution
                      evidence correlated.
                    </small>

                  </div>

                </div>


                <div className="investigation-step">

                  <span>
                    3
                  </span>

                  <div>

                    <strong>
                      Field Verification
                    </strong>

                    <small>
                      Confirm reported physical
                      progress and asset creation.
                    </small>

                  </div>

                </div>


                <div className="investigation-step">

                  <span>
                    4
                  </span>

                  <div>

                    <strong>
                      Corrective Action
                    </strong>

                    <small>
                      Record and track officer
                      decision.
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      {activeTab === 'Duplicate Work' && (
        <DuplicateWorkPanel project={project} />
      )}



      {/* =====================================================
          GAP 5 — PAYMENTS / FINANCIAL TRAIL
      ===================================================== */}

      {activeTab === 'Payments' && (

        <div className="financial-trail-page">

          <div className="financial-trail-header">
            <div>
              <span className="section-eyebrow">
                01 · FINANCIAL TRAIL
              </span>

              <h2>Payment & Fund Intelligence</h2>

              <p>
                Trace sanctioned funds from release through
                transactions, vendor linkage and anomaly signals.
              </p>
            </div>

            <div className={`financial-risk-badge ${financialRiskLevel.toLowerCase()}`}>
              <CircleAlert size={14} />
              {financialRiskLevel} Payment Risk
            </div>
          </div>


          <div className="fund-flow-grid">

            <div className="fund-flow-card">
              <span>Sanctioned</span>
              <strong>{formatCurrency(sanctionedAmount)}</strong>
              <small>Approved project allocation</small>
            </div>

            <div className="fund-flow-arrow">→</div>

            <div className="fund-flow-card">
              <span>Released</span>
              <strong>{formatCurrency(releasedAmount)}</strong>
              <small>{releasedPercent.toFixed(1)}% of sanction</small>
            </div>

            <div className="fund-flow-arrow">→</div>

            <div className="fund-flow-card">
              <span>Recorded Expenditure</span>
              <strong>{formatCurrency(actualExpenditure)}</strong>
              <small>{expenditurePercent}% reported utilization</small>
            </div>

            <div className="fund-flow-arrow">→</div>

            <div className="fund-flow-card">
              <span>Balance</span>
              <strong>{formatCurrency(remainingBalance)}</strong>
              <small>Against sanctioned amount</small>
            </div>

          </div>


          <div className="financial-payment-kpis">

            <div className="financial-payment-kpi">
              <span>Total Transactions</span>
              <strong>{projectPayments.length}</strong>
            </div>

            <div className="financial-payment-kpi">
              <span>Transaction Value</span>
              <strong>{formatCurrency(paymentTotal)}</strong>
            </div>

            <div className="financial-payment-kpi warning">
              <span>Flagged / Review</span>
              <strong>{paymentRiskCount}</strong>
            </div>

            <div className="financial-payment-kpi">
              <span>Average Payment</span>
              <strong>{formatCurrency(paymentAverage)}</strong>
            </div>

            <div className="financial-payment-kpi">
              <span>Repeated Amounts</span>
              <strong>{repeatedPaymentAmounts.length}</strong>
            </div>

          </div>


          <div className="financial-intelligence-panel">

            <div className="financial-intelligence-title">
              <div className="financial-intelligence-icon">
                <Brain size={17} />
              </div>

              <div>
                <span className="section-eyebrow">
                  02 · PAYMENT INTELLIGENCE
                </span>

                <h3>Why the payment trail requires attention</h3>
              </div>
            </div>

            {suspiciousPaymentReasons.length === 0 ? (

              <div className="financial-clear-state">
                <CheckCircle size={17} />
                <span>
                  No material payment-pattern anomaly was identified
                  from the currently available transaction data.
                </span>
              </div>

            ) : (

              <div className="financial-reason-list">
                {suspiciousPaymentReasons.map((reason, index) => (
                  <div
                    className="financial-reason-item"
                    key={`${reason}-${index}`}
                  >
                    <AlertTriangle size={14} />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

            )}

            <div className="financial-prototype-note">
              Prototype intelligence uses explainable transaction rules.
              Production deployment can replace these rules with trained
              anomaly models while preserving the same evidence trail.
            </div>

          </div>


          <div className="financial-two-column">

            <div className="investigation-section">

              <div className="investigation-section-heading">
                <div>
                  <span className="section-eyebrow">
                    03 · REPEATED AMOUNTS
                  </span>
                  <h3>Transaction amount patterns</h3>
                </div>

                <span className="investigation-count">
                  {repeatedPaymentAmounts.length} pattern(s)
                </span>
              </div>

              {repeatedPaymentAmounts.length === 0 ? (

                <div className="investigation-empty">
                  No repeated transaction amount detected.
                </div>

              ) : (

                <div className="financial-pattern-list">

                  {repeatedPaymentAmounts.map((item) => (
                    <div
                      className="financial-pattern-row"
                      key={item.amount}
                    >
                      <div>
                        <strong>
                          {formatCurrency(item.amount)}
                        </strong>
                        <span>
                          Same amount used {item.count} times
                        </span>
                      </div>

                      <span className="financial-pattern-badge">
                        Repeated
                      </span>
                    </div>
                  ))}

                </div>

              )}

            </div>


            <div className="investigation-section">

              <div className="investigation-section-heading">
                <div>
                  <span className="section-eyebrow">
                    04 · PAYMENT CLUSTERS
                  </span>
                  <h3>Temporal transaction patterns</h3>
                </div>

                <span className="investigation-count">
                  {paymentClusters.length} cluster(s)
                </span>
              </div>

              {paymentClusters.length === 0 ? (

                <div className="investigation-empty">
                  No same-day or consecutive-day payment cluster detected.
                </div>

              ) : (

                <div className="financial-pattern-list">

                  {paymentClusters.map((cluster, index) => (
                    <div
                      className="financial-pattern-row"
                      key={`cluster-${index}`}
                    >
                      <div>
                        <strong>
                          {cluster.length} transactions
                        </strong>
                        <span>
                          {cluster[0]?.date}
                          {' → '}
                          {cluster[cluster.length - 1]?.date}
                        </span>
                      </div>

                      <span className="financial-pattern-badge warning">
                        Clustered
                      </span>
                    </div>
                  ))}

                </div>

              )}

            </div>

          </div>


          <div className="investigation-section">

            <div className="investigation-section-heading">
              <div>
                <span className="section-eyebrow">
                  05 · VENDOR CONCENTRATION
                </span>
                <h3>Where the project funds are flowing</h3>
              </div>

              <span className="investigation-count">
                {paymentVendorBreakdown.length} vendor(s)
              </span>
            </div>

            <div className="vendor-payment-list">

              {paymentVendorBreakdown.length === 0 ? (

                <div className="investigation-empty">
                  No payment-linked vendor data available.
                </div>

              ) : (

                paymentVendorBreakdown.map((item) => {

                  const share =
                    paymentTotal > 0
                      ? (item.amount / paymentTotal) * 100
                      : 0

                  return (
                    <div
                      className="vendor-payment-row"
                      key={item.vendor}
                    >

                      <div className="vendor-payment-main">
                        <div className="linked-entity-icon">
                          <Building2 size={16} />
                        </div>

                        <div>
                          <strong>{item.vendor}</strong>
                          <span>{item.count} transaction(s)</span>
                        </div>
                      </div>

                      <div className="vendor-payment-value">
                        <strong>
                          {formatCurrency(item.amount)}
                        </strong>
                        <span>
                          {share.toFixed(1)}% of transaction value
                        </span>
                      </div>

                      <div className="vendor-payment-bar">
                        <div
                          style={{
                            width:
                              `${Math.min(100, share)}%`,
                          }}
                        />
                      </div>

                    </div>
                  )
                })

              )}

            </div>

          </div>


          <div className="investigation-section">

            <div className="investigation-section-heading">
              <div>
                <span className="section-eyebrow">
                  06 · TRANSACTION LEDGER
                </span>
                <h3>Project-linked payment records</h3>
              </div>

              <span className="investigation-count">
                {projectPayments.length} records
              </span>
            </div>

            <div className="investigation-table-wrap">

              <table className="investigation-table financial-payment-table">

                <thead>
                  <tr>
                    <th>Transaction</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Vendor</th>
                    <th>Status</th>
                    <th>AI Finding</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {projectPayments.length === 0 ? (

                    <tr>
                      <td
                        colSpan={8}
                        className="investigation-empty"
                      >
                        No payment records linked to this project.
                      </td>
                    </tr>

                  ) : (

                    projectPayments.map((payment) => (

                      <tr key={payment.id}>

                        <td>
                          <strong>{payment.id}</strong>
                        </td>

                        <td>{payment.date || '—'}</td>

                        <td>
                          <strong>
                            {formatCurrency(payment.amount)}
                          </strong>
                        </td>

                        <td>{payment.type || '—'}</td>

                        <td>
                          {payment.vendor ||
                            payment.vendorName ||
                            relatedVendor?.name ||
                            project.vendor ||
                            '—'}
                        </td>

                        <td>
                          <span
                            className={`investigation-status ${payment.flagged ||
                                ['Under Review', 'Flagged', 'On Hold']
                                  .includes(payment.status)
                                ? 'warning'
                                : 'normal'
                              }`}
                          >
                            {payment.status || 'Processed'}
                          </span>
                        </td>

                        <td>
                          {payment.flagged ? (

                            <div className="finding-inline">
                              <AlertTriangle size={13} />
                              <span>
                                {payment.reason ||
                                  'Payment pattern requires review.'}
                              </span>
                            </div>

                          ) : (

                            <span className="financial-no-finding">
                              No immediate concern
                            </span>

                          )}
                        </td>

                        <td>
                          <button
                            type="button"
                            className="financial-investigate-btn"
                            onClick={() => setModal('payment')}
                          >
                            Investigate
                          </button>
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>


          <div className="investigation-recommendation financial-action-panel">

            <div>
              <span className="section-eyebrow">
                07 · CONTROL ACTION
              </span>

              <h3>Recommended financial control</h3>

              <p>
                {financialRiskLevel === 'High'
                  ? 'Place the payment trail under review and request field verification before further release.'
                  : financialRiskLevel === 'Review'
                    ? 'Review flagged transactions and supporting bills before approving the next payment.'
                    : 'Continue normal monitoring and retain the transaction trail for audit.'}
              </p>
            </div>

            <div className="financial-action-buttons">

              <button
                className="primary-btn"
                onClick={() => setModal('audit')}
              >
                <ShieldCheck size={15} />
                Request Field Audit
              </button>

              {(financialRiskLevel === 'High' ||
                flaggedPayments.length > 0) && (

                  <button
                    className="danger-btn"
                    onClick={() => setModal('halt')}
                  >
                    <AlertTriangle size={15} />
                    Hold Payment
                  </button>

                )}

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
    PAYMENTS TAB
===================================================== */}

      


      {/* =====================================================
          OTHER TABS
      ===================================================== */}

      {activeTab !== 'Overview' &&
        activeTab !== 'Risk Analysis' &&
        activeTab !== 'Evidence & Investigation' &&
        activeTab !== 'Duplicate Work' &&
        activeTab !== 'Payments' && (

          <div
            className="panel"
            style={{
              textAlign: 'center',
              padding: 40,
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              {activeTab} Details
            </h3>

            <p
              style={{
                fontSize: 13,
                color: '#64748b',
                marginTop: 8,
              }}
            >
              Detailed {activeTab.toLowerCase()}
              information is synchronized with the
              project's monitoring and investigation
              data.
            </p>
          </div>

        )}

    </div>
  )
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function DataPoint({
  label,
  value,
}) {

  return (

    <div className="investigation-data-point">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>

  )
}



function EvidenceChainStep({
  number,
  icon,
  title,
  detail,
  status,
  warning = false,
}) {

  return (

    <div
      className={`evidence-chain-step ${warning
          ? 'warning'
          : ''
        }`}
    >

      <div className="evidence-chain-number">

        {number}

      </div>


      <div className="evidence-chain-icon">

        {icon}

      </div>


      <div className="evidence-chain-content">

        <strong>
          {title}
        </strong>

        <p>
          {detail}
        </p>


        <span
          className={`evidence-chain-status ${warning
              ? 'warning'
              : 'normal'
            }`}
        >
          {status}
        </span>

      </div>

    </div>

  )
}


export default ProjectDetail