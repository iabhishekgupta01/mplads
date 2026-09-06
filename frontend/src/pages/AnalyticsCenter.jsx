import { useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Download,
  IndianRupee,
  Layers,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'

import { useApp } from '../context/AppContext.jsx'
import { riskLabel } from '../utils/formatters.js'
import '../styles/analytics.css'

export function AnalyticsCenter(props) {
  const context = useApp()

  const projects = props.projects || context.projects || []
  const vendors = props.vendors || context.vendors || []
  const payments = props.payments || context.payments || []

  const openProject = props.openProject || context.openProject
  const openVendor = props.openVendor || context.openVendor
  const openPayment = props.openPayment || context.openPayment
  const downloadProjectsCSV = context.downloadProjectsCSV

  const [scope, setScope] = useState('National')
  const [stateFilter, setStateFilter] = useState('All')
  const [districtFilter, setDistrictFilter] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')

  /* =====================================================
     STATES
     ===================================================== */

  const statesList = useMemo(() => {
    return Array.from(
      new Set(
        projects
          .map((project) => project.state)
          .filter(Boolean)
      )
    ).sort()
  }, [projects])

  /* =====================================================
     DISTRICTS
     ===================================================== */

  const districtsList = useMemo(() => {
    const sourceProjects =
      stateFilter === 'All'
        ? projects
        : projects.filter(
            (project) =>
              project.state === stateFilter
          )

    return Array.from(
      new Set(
        sourceProjects
          .map((project) => project.district)
          .filter(Boolean)
      )
    ).sort()
  }, [projects, stateFilter])

  /* =====================================================
     FILTERED PROJECTS
     ===================================================== */

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      let matchesLocation = true

      if (scope === 'State') {
        matchesLocation =
          stateFilter === 'All' ||
          project.state === stateFilter
      }

      if (scope === 'District') {
        matchesLocation =
          (stateFilter === 'All' ||
            project.state === stateFilter) &&
          (districtFilter === 'All' ||
            project.district === districtFilter)
      }

      const matchesRisk =
        riskFilter === 'All' ||
        riskLabel(project.score).toUpperCase() ===
          riskFilter.toUpperCase()

      return (
        matchesLocation &&
        matchesRisk
      )
    })
  }, [
    projects,
    scope,
    stateFilter,
    districtFilter,
    riskFilter,
  ])

  /* =====================================================
     PROJECT IDS IN CURRENT GEOGRAPHIC SCOPE
     ===================================================== */

  const scopedProjectIds = useMemo(() => {
    return new Set(
      filteredProjects.map(
        (project) => project.id
      )
    )
  }, [filteredProjects])

  /* =====================================================
     SCOPED PAYMENTS
     ===================================================== */

  const scopedPayments = useMemo(() => {
    /*
      National / Vendor / Payment:
      Payment scope itself should show all payments.

      State / District:
      Only payments belonging to projects
      inside the selected geographic scope.
    */

    if (
      scope === 'National' ||
      scope === 'Vendor' ||
      scope === 'Payment'
    ) {
      return payments
    }

    return payments.filter((payment) =>
      scopedProjectIds.has(
        payment.projectId
      )
    )
  }, [
    payments,
    scope,
    scopedProjectIds,
  ])

  const flaggedPayments = useMemo(() => {
    return scopedPayments.filter(
      (payment) => payment.flagged
    )
  }, [scopedPayments])

  /* =====================================================
     SCOPED VENDORS
     ===================================================== */

  const scopedVendors = useMemo(() => {
    /*
      National / Vendor / Payment:
      Keep the complete vendor network.

      State / District:
      Find vendors connected to projects
      inside the selected geographic scope.
    */

    if (
      scope === 'National' ||
      scope === 'Vendor' ||
      scope === 'Payment'
    ) {
      return vendors
    }

    const vendorIds = new Set(
      filteredProjects
        .map(
          (project) => project.vendorId
        )
        .filter(Boolean)
    )

    return vendors.filter((vendor) =>
      vendorIds.has(vendor.id)
    )
  }, [
    vendors,
    filteredProjects,
    scope,
  ])

  const highRiskVendors = useMemo(() => {
    return scopedVendors.filter(
      (vendor) =>
        Number(vendor.risk || 0) >= 60
    )
  }, [scopedVendors])

  /* =====================================================
     BASIC METRICS
     ===================================================== */

  const metrics = useMemo(() => {
    const count = filteredProjects.length

    if (!count) {
      return {
        avgRisk: 0,
        avgPhysical: 0,
        avgExpenditure: 0,
        averageGap: 0,
        highRisk: 0,
        mediumRisk: 0,
        lowRisk: 0,
        financialAhead: 0,
        delayed: 0,
        critical: 0,
        totalAmount: 0,
      }
    }

    let risk = 0
    let physical = 0
    let expenditure = 0
    let financialAhead = 0
    let delayed = 0
    let critical = 0
    let totalAmount = 0

    let highRisk = 0
    let mediumRisk = 0
    let lowRisk = 0

    filteredProjects.forEach((project) => {
      const score = Number(
        project.score || 0
      )

      const physicalValue = Number(
        project.physical || 0
      )

      const expenditureValue = Number(
        project.expenditure || 0
      )

      risk += score
      physical += physicalValue
      expenditure += expenditureValue
      totalAmount += Number(
        project.amount || 0
      )

      if (score >= 70) {
        highRisk += 1
      } else if (score >= 40) {
        mediumRisk += 1
      } else {
        lowRisk += 1
      }

      if (
        expenditureValue -
          physicalValue >=
        25
      ) {
        financialAhead += 1
      }

      if (
        project.status === 'Delayed' ||
        project.status === 'Under Review'
      ) {
        delayed += 1
      }

      if (score >= 80) {
        critical += 1
      }
    })

    const avgPhysical = Math.round(
      physical / count
    )

    const avgExpenditure = Math.round(
      expenditure / count
    )

    return {
      avgRisk: Math.round(
        risk / count
      ),
      avgPhysical,
      avgExpenditure,
      averageGap:
        avgExpenditure -
        avgPhysical,
      highRisk,
      mediumRisk,
      lowRisk,
      financialAhead,
      delayed,
      critical,
      totalAmount,
    }
  }, [filteredProjects])

  /* =====================================================
     PREDICTIVE SIGNALS
     ===================================================== */

  const predictiveSignals = useMemo(() => {
    return [...filteredProjects]
      .map((project) => {
        const gap =
          Number(
            project.expenditure || 0
          ) -
          Number(
            project.physical || 0
          )

        let probability = 0

        if (project.score >= 80) {
          probability += 42
        } else if (project.score >= 70) {
          probability += 32
        } else if (project.score >= 40) {
          probability += 18
        }

        if (gap >= 30) {
          probability += 28
        } else if (gap >= 20) {
          probability += 18
        } else if (gap >= 10) {
          probability += 8
        }

        if (
          project.status ===
          'Delayed'
        ) {
          probability += 20
        }

        if (
          project.status ===
          'Under Review'
        ) {
          probability += 12
        }

        if (
          Number(
            project.physical || 0
          ) < 40
        ) {
          probability += 8
        }

        probability = Math.min(
          probability,
          96
        )

        return {
          ...project,
          gap,
          probability,
        }
      })
      .filter(
        (project) =>
          project.probability >= 45
      )
      .sort(
        (a, b) =>
          b.probability -
          a.probability
      )
      .slice(0, 5)
  }, [filteredProjects])

  /* =====================================================
     RISK DISTRIBUTION
     ===================================================== */

  const total =
    filteredProjects.length || 1

  const highPercentage =
    (metrics.highRisk / total) *
    100

  const mediumPercentage =
    (metrics.mediumRisk / total) *
    100

  const lowPercentage =
    (metrics.lowRisk / total) *
    100

  /* =====================================================
     SCOPE LABEL
     ===================================================== */

  const scopeLabel =
    scope === 'National'
      ? 'All India'
      : scope === 'State'
        ? stateFilter === 'All'
          ? 'All States'
          : stateFilter
        : scope === 'District'
          ? districtFilter === 'All'
            ? stateFilter === 'All'
              ? 'All Districts'
              : `All districts · ${stateFilter}`
            : `${districtFilter} · ${stateFilter}`
          : scope === 'Vendor'
            ? 'Vendor Network'
            : 'Payment Network'

  /* =====================================================
     SCOPE CHANGE
     ===================================================== */

  const handleScopeChange = (
    value
  ) => {
    setScope(value)

    if (
      value === 'National' ||
      value === 'Vendor' ||
      value === 'Payment'
    ) {
      setStateFilter('All')
      setDistrictFilter('All')
    }

    if (value === 'State') {
      setDistrictFilter('All')
    }
  }

  /* =====================================================
     STATE CHANGE
     ===================================================== */

  const handleStateChange = (
    value
  ) => {
    setStateFilter(value)
    setDistrictFilter('All')
  }

  return (
    <div className="analytics-center-container">

      {/* HEADER */}

      <section className="analytics-hero">
        <div className="analytics-hero-copy">
          <span className="analytics-eyebrow">
            MOSPI · DIID / ANALYTICS
          </span>

          <h1>
            Implementation Intelligence
          </h1>

          <p>
            Analyse financial execution,
            physical progress, project risk,
            payment anomalies and
            early-warning signals across
            the selected MPLADS scope.
          </p>
        </div>

        <div className="analytics-hero-actions">
          <div className="analytics-scope-status">
            <span>
              CURRENT SCOPE
            </span>

            <strong>
              {scopeLabel}
            </strong>
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              downloadProjectsCSV?.(
                filteredProjects
              )
            }
          >
            <Download size={16} />
            Export Analysis
          </button>
        </div>
      </section>

      {/* FILTERS */}

      <section className="analytics-control-panel">

        <div className="analytics-control-heading">
          <Layers size={18} />

          <div>
            <strong>
              Analysis scope
            </strong>

            <span>
              Narrow the intelligence
              view before investigating
              individual works.
            </span>
          </div>
        </div>

        <div className="analytics-controls">

          <div className="analytics-control">
            <label>Scope</label>

            <select
              value={scope}
              onChange={(event) =>
                handleScopeChange(
                  event.target.value
                )
              }
            >
              <option value="National">
                National
              </option>

              <option value="State">
                State
              </option>

              <option value="District">
                District
              </option>

              <option value="Vendor">
                Vendor
              </option>

              <option value="Payment">
                Payment
              </option>
            </select>
          </div>

          {(scope === 'State' ||
            scope === 'District') && (
            <div className="analytics-control">
              <label>
                State
              </label>

              <select
                value={stateFilter}
                onChange={(event) =>
                  handleStateChange(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All States
                </option>

                {statesList.map(
                  (state) => (
                    <option
                      key={state}
                      value={state}
                    >
                      {state}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          {scope === 'District' && (
            <div className="analytics-control">
              <label>
                District
              </label>

              <select
                value={districtFilter}
                onChange={(event) =>
                  setDistrictFilter(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Districts
                </option>

                {districtsList.map(
                  (district) => (
                    <option
                      key={district}
                      value={district}
                    >
                      {district}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          <div className="analytics-control">
            <label>
              Risk threshold
            </label>

            <select
              value={riskFilter}
              onChange={(event) =>
                setRiskFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                All risk levels
              </option>

              <option value="High">
                High · 70+
              </option>

              <option value="Medium">
                Medium · 40–69
              </option>

              <option value="Low">
                Low · below 40
              </option>
            </select>
          </div>

          <div className="analytics-scope-result">
            <span>
              WORKS ANALYSED
            </span>

            <strong>
              {filteredProjects.length}
            </strong>
          </div>

        </div>
      </section>

      {/* KPI */}

      <section className="analytics-kpi-grid">

        <AnalyticsMetric
          icon={<Layers size={19} />}
          label="Works Analysed"
          value={
            filteredProjects.length
          }
          description="Inside selected scope"
        />

        <AnalyticsMetric
          icon={
            <ShieldAlert size={19} />
          }
          label="High Risk"
          value={metrics.highRisk}
          description="Priority supervisory review"
          tone="red"
        />

        <AnalyticsMetric
          icon={<Activity size={19} />}
          label="Average Risk"
          value={`${metrics.avgRisk}/100`}
          description="Scope-level risk index"
          tone={
            metrics.avgRisk >= 70
              ? 'red'
              : metrics.avgRisk >= 40
                ? 'amber'
                : 'green'
          }
        />

        <AnalyticsMetric
          icon={
            <IndianRupee size={19} />
          }
          label="Flagged Payments"
          value={
            flaggedPayments.length
          }
          description={
            scope === 'National'
              ? 'Transaction anomaly signals'
              : 'Anomalies in selected geography'
          }
          tone="red"
        />

        <AnalyticsMetric
          icon={<Users size={19} />}
          label="Risk Vendors"
          value={
            highRiskVendors.length
          }
          description={
            scope === 'National'
              ? 'Vendor verification signals'
              : 'Risk vendors linked to scope'
          }
          tone="amber"
        />

      </section>

      {/* FINANCIAL + RISK */}

      <section className="analytics-main-grid">

        <article className="analytics-card analytics-progress-card">

          <div className="analytics-card-header">
            <div>
              <span className="analytics-card-eyebrow">
                FINANCIAL CONTROL
              </span>

              <h2>
                Financial vs Physical Progress
              </h2>

              <p>
                A widening gap can indicate
                that expenditure is moving
                ahead of the physical work
                reported on ground.
              </p>
            </div>

            <BarChart3 size={21} />
          </div>

          <div className="progress-analysis">

            <ProgressMetric
              label="Physical completion"
              value={
                metrics.avgPhysical
              }
              type="physical"
            />

            <ProgressMetric
              label="Expenditure utilisation"
              value={
                metrics.avgExpenditure
              }
              type="financial"
            />

          </div>

          <div
            className={`analytics-gap ${
              metrics.averageGap >= 25
                ? 'warning'
                : 'normal'
            }`}
          >
            {metrics.averageGap >= 25 ? (
              <AlertTriangle size={18} />
            ) : (
              <CheckCircle2 size={18} />
            )}

            <div>
              <strong>
                {metrics.averageGap >=
                25
                  ? 'Material financial-to-physical deviation'
                  : 'Financial and physical progress are broadly aligned'}
              </strong>

              <span>
                Current average gap:{' '}
                <b>
                  {Math.abs(
                    metrics.averageGap
                  )}{' '}
                  percentage points
                </b>
              </span>
            </div>
          </div>

        </article>

        <article className="analytics-card">

          <div className="analytics-card-header">
            <div>
              <span className="analytics-card-eyebrow">
                RISK LANDSCAPE
              </span>

              <h2>
                Risk Distribution
              </h2>

              <p>
                Current distribution of
                works by AI-assisted risk
                classification.
              </p>
            </div>

            <ShieldCheck size={21} />
          </div>

          <div className="risk-profile">

            <RiskRow
              label="High risk"
              count={metrics.highRisk}
              percentage={
                highPercentage
              }
              tone="high"
            />

            <RiskRow
              label="Medium risk"
              count={metrics.mediumRisk}
              percentage={
                mediumPercentage
              }
              tone="medium"
            />

            <RiskRow
              label="Low risk"
              count={metrics.lowRisk}
              percentage={
                lowPercentage
              }
              tone="low"
            />

          </div>

          <div className="risk-summary">
            <strong>
              {metrics.critical}
            </strong>

            <span>
              critical works currently
              scoring 80 or above
            </span>
          </div>

        </article>

      </section>

      {/* PREDICTIVE */}

      <section className="analytics-card analytics-prediction-card">

        <div className="analytics-card-header prediction-header">

          <div>
            <span className="analytics-card-eyebrow">
              EARLY WARNING
            </span>

            <h2>
              Predictive Implementation Signals
            </h2>

            <p>
              Prototype risk projection
              using current risk score,
              physical progress, expenditure
              deviation and execution status.
              These are decision-support
              signals, not confirmed findings.
            </p>
          </div>

          <div className="prediction-header-badge">
            MODEL SIGNAL
          </div>

        </div>

        {predictiveSignals.length >
        0 ? (
          <div className="prediction-list">

            {predictiveSignals.map(
              (project) => (
                <div
                  className="prediction-row"
                  key={project.id}
                >
                  <div className="prediction-project">
                    <strong>
                      {project.name}
                    </strong>

                    <span>
                      {project.id} ·{' '}
                      {project.district},{' '}
                      {project.state}
                    </span>
                  </div>

                  <div className="prediction-reason">
                    <span>
                      Risk score
                    </span>

                    <strong>
                      {project.score}
                    </strong>
                  </div>

                  <div className="prediction-reason">
                    <span>
                      Financial gap
                    </span>

                    <strong>
                      {project.gap > 0
                        ? `+${project.gap}%`
                        : `${project.gap}%`}
                    </strong>
                  </div>

                  <div className="prediction-probability">
                    <span>
                      Early-warning score
                    </span>

                    <strong>
                      {project.probability}%
                    </strong>
                  </div>

                  <button
                    className="analytics-text-button"
                    onClick={() =>
                      openProject?.(
                        project.id
                      )
                    }
                  >
                    Investigate
                    <ArrowUpRight
                      size={15}
                    />
                  </button>
                </div>
              )
            )}

          </div>
        ) : (
          <div className="analytics-empty">

            <CheckCircle2 size={22} />

            <div>
              <strong>
                No elevated predictive signals
              </strong>

              <span>
                Current filters do not
                contain projects requiring
                an early-warning review.
              </span>
            </div>

          </div>
        )}

      </section>

      {/* SIGNAL CARDS */}

      <section className="analytics-signal-grid">

        <SignalCard
          icon={
            <TrendingUp size={19} />
          }
          value={
            metrics.financialAhead
          }
          title="Financial progress ahead"
          description="Works with a ≥25 point expenditure-to-physical gap."
          tone="amber"
        />

        <SignalCard
          icon={
            <AlertTriangle size={19} />
          }
          value={metrics.delayed}
          title="Delayed / under review"
          description="Works requiring execution monitoring."
          tone="red"
        />

        <SignalCard
          icon={
            <ShieldAlert size={19} />
          }
          value={metrics.highRisk}
          title="High-risk works"
          description="Projects requiring supervisory attention."
          tone="red"
        />

        <SignalCard
          icon={
            <CreditCard size={19} />
          }
          value={
            flaggedPayments.length
          }
          title="Payment anomalies"
          description={
            scope === 'National'
              ? 'Flagged disbursement records in the system.'
              : 'Flagged payments linked to the selected geography.'
          }
          tone="amber"
        />

      </section>

      {/* SCOPE-SPECIFIC ANALYSIS */}

      {scope === 'Vendor' ? (
        <VendorAnalytics
          vendors={vendors}
          openVendor={openVendor}
        />
      ) : scope === 'Payment' ? (
        <PaymentAnalytics
          payments={payments}
          openPayment={openPayment}
        />
      ) : (
        <ProjectAnalytics
          projects={filteredProjects}
          openProject={openProject}
        />
      )}

    </div>
  )
}


/* =========================================================
   METRIC
   ========================================================= */

function AnalyticsMetric({
  icon,
  label,
  value,
  description,
  tone = 'green',
}) {
  return (
    <article className="analytics-metric">
      <div
        className={`analytics-metric-icon ${tone}`}
      >
        {icon}
      </div>

      <span>{label}</span>

      <strong>{value}</strong>

      <small>{description}</small>
    </article>
  )
}


/* =========================================================
   PROGRESS
   ========================================================= */

function ProgressMetric({
  label,
  value,
  type,
}) {
  const safeValue = Math.min(
    Math.max(
      Number(value || 0),
      0
    ),
    100
  )

  return (
    <div className="progress-metric">

      <div className="progress-metric-label">
        <span>{label}</span>

        <strong>
          {safeValue}%
        </strong>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${type}`}
          style={{
            width: `${safeValue}%`,
          }}
        />
      </div>

    </div>
  )
}


/* =========================================================
   RISK ROW
   ========================================================= */

function RiskRow({
  label,
  count,
  percentage,
  tone,
}) {
  const safePercentage =
    Math.min(
      Math.max(
        Number(
          percentage || 0
        ),
        0
      ),
      100
    )

  return (
    <div className="risk-row">

      <div className="risk-row-top">
        <div>
          <span
            className={`risk-indicator ${tone}`}
          />

          <span>{label}</span>
        </div>

        <strong>{count}</strong>
      </div>

      <div className="risk-row-track">
        <div
          className={`risk-row-fill ${tone}`}
          style={{
            width: `${safePercentage}%`,
          }}
        />
      </div>

    </div>
  )
}


/* =========================================================
   SIGNAL CARD
   ========================================================= */

function SignalCard({
  icon,
  value,
  title,
  description,
  tone,
}) {
  return (
    <article
      className={`analytics-signal-card ${tone}`}
    >
      <div className="analytics-signal-icon">
        {icon}
      </div>

      <strong>{value}</strong>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  )
}


/* =========================================================
   PROJECT ANALYTICS
   ========================================================= */

function ProjectAnalytics({
  projects,
  openProject,
}) {
  const highRiskProjects = [
    ...projects,
  ]
    .filter(
      (project) =>
        Number(
          project.score || 0
        ) >= 40
    )
    .sort(
      (a, b) =>
        Number(b.score || 0) -
        Number(a.score || 0)
    )

  return (
    <section className="analytics-card">

      <div className="analytics-card-header">
        <div>
          <span className="analytics-card-eyebrow">
            INVESTIGATION QUEUE
          </span>

          <h2>
            High-Risk Project Work Files
          </h2>

          <p>
            Prioritised projects where
            risk, expenditure and physical
            execution require closer review.
          </p>
        </div>
      </div>

      <div className="analytics-table-wrap">
        <table className="analytics-table">

          <thead>
            <tr>
              <th>Project</th>
              <th>Physical</th>
              <th>Expenditure</th>
              <th>Gap</th>
              <th>Risk</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>

            {highRiskProjects.map(
              (project) => {
                const gap =
                  Number(
                    project.expenditure ||
                      0
                  ) -
                  Number(
                    project.physical ||
                      0
                  )

                return (
                  <tr
                    key={project.id}
                  >
                    <td>
                      <strong>
                        {project.name}
                      </strong>

                      <span>
                        {project.id} ·{' '}
                        {project.district}
                      </span>
                    </td>

                    <td>
                      {project.physical}%
                    </td>

                    <td>
                      {project.expenditure}%
                    </td>

                    <td>
                      <span
                        className={
                          gap >= 25
                            ? 'analytics-gap-value warning'
                            : 'analytics-gap-value'
                        }
                      >
                        {gap > 0
                          ? `+${gap}%`
                          : `${gap}%`}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`analytics-risk-badge ${
                          project.score >= 70
                            ? 'high'
                            : project.score >=
                                40
                              ? 'medium'
                              : 'low'
                        }`}
                      >
                        {project.score}
                      </span>
                    </td>

                    <td>
                      {project.status}
                    </td>

                    <td>
                      <button
                        className="analytics-text-button"
                        onClick={() =>
                          openProject?.(
                            project.id
                          )
                        }
                      >
                        Inspect
                        <ArrowUpRight
                          size={14}
                        />
                      </button>
                    </td>
                  </tr>
                )
              }
            )}

            {highRiskProjects.length ===
              0 && (
              <tr>
                <td
                  colSpan={7}
                  className="analytics-table-empty"
                >
                  No elevated-risk projects
                  match the selected scope.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

    </section>
  )
}


/* =========================================================
   VENDOR ANALYTICS
   ========================================================= */

function VendorAnalytics({
  vendors,
  openVendor,
}) {
  return (
    <section className="analytics-card">

      <div className="analytics-card-header">
        <div>
          <span className="analytics-card-eyebrow">
            CONTRACTOR INTELLIGENCE
          </span>

          <h2>
            Vendor & Contractor Risk
          </h2>

          <p>
            Cross-project vendor behaviour
            and anomaly exposure requiring
            verification.
          </p>
        </div>
      </div>

      <div className="analytics-table-wrap">
        <table className="analytics-table">

          <thead>
            <tr>
              <th>Vendor</th>
              <th>Location</th>
              <th>Contract Value</th>
              <th>Active Works</th>
              <th>Risk</th>
              <th>Flags</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {vendors.map(
              (vendor) => (
                <tr
                  key={vendor.id}
                >
                  <td>
                    <strong>
                      {vendor.name}
                    </strong>

                    <span>
                      {vendor.id}
                    </span>
                  </td>

                  <td>
                    {vendor.location ||
                      vendor.states ||
                      '—'}
                  </td>

                  <td>
                    {vendor.value}
                  </td>

                  <td>
                    {vendor.worksCount ||
                      vendor.projects ||
                      0}
                  </td>

                  <td>
                    <span
                      className={`analytics-risk-badge ${
                        vendor.risk >= 70
                          ? 'high'
                          : vendor.risk >=
                              40
                            ? 'medium'
                            : 'low'
                      }`}
                    >
                      {vendor.risk}
                    </span>
                  </td>

                  <td>
                    <strong
                      className={
                        vendor.flagged > 0
                          ? 'analytics-danger-text'
                          : 'analytics-success-text'
                      }
                    >
                      {vendor.flagged ||
                        0}
                    </strong>{' '}
                    flags
                  </td>

                  <td>
                    <button
                      className="analytics-text-button"
                      onClick={() =>
                        openVendor?.(
                          vendor.id
                        )
                      }
                    >
                      Investigate
                      <ArrowUpRight
                        size={14}
                      />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>

        </table>
      </div>

    </section>
  )
}


/* =========================================================
   PAYMENT ANALYTICS
   ========================================================= */

function PaymentAnalytics({
  payments,
  openPayment,
}) {
  return (
    <section className="analytics-card">

      <div className="analytics-card-header">
        <div>
          <span className="analytics-card-eyebrow">
            FINANCIAL CONTROL
          </span>

          <h2>
            Payment & Disbursement Audit
          </h2>

          <p>
            Review transaction-level
            anomalies, rapid releases and
            flagged payouts.
          </p>
        </div>
      </div>

      <div className="analytics-table-wrap">
        <table className="analytics-table">

          <thead>
            <tr>
              <th>Transaction</th>
              <th>Project</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Anomaly</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {payments.map(
              (payment) => (
                <tr
                  key={payment.id}
                >
                  <td>
                    <strong>
                      {payment.id}
                    </strong>
                  </td>

                  <td>
                    {payment.projectName ||
                      payment.projectId}
                  </td>

                  <td>
                    <strong>
                      ₹ {payment.amount}
                    </strong>
                  </td>

                  <td>
                    {payment.date}
                  </td>

                  <td>
                    {payment.flagged ? (
                      <span className="analytics-anomaly">
                        {payment.reason ||
                          'Payment anomaly detected'}
                      </span>
                    ) : (
                      <span className="analytics-normal">
                        No anomaly
                      </span>
                    )}
                  </td>

                  <td>
                    {payment.flagged ? (
                      <span className="analytics-risk-badge high">
                        Flagged
                      </span>
                    ) : (
                      <span className="analytics-risk-badge low">
                        Normal
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      className="analytics-text-button"
                      onClick={() =>
                        openPayment?.(
                          payment.id
                        )
                      }
                    >
                      Investigate
                      <ArrowUpRight
                        size={14}
                      />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>

        </table>
      </div>

    </section>
  )
}

export default AnalyticsCenter