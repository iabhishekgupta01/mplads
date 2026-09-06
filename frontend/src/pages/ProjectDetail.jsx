import { useMemo, useState } from 'react'
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
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency, riskLabel } from '../utils/formatters.js'

export function ProjectDetail() {
  const {
    selected,
    selectedRisk,
    setModal,
    navigate,
  } = useApp()

  const [activeTab, setActiveTab] = useState('Overview')

  const project = selected || {
    id: 'MP-2024-1001',
    name: 'Road Construction - Sehore',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    category: 'Road',
    amount: 2000000,
    expenditure: 85,
    physical: 40,
    score: 82,
    status: 'Delayed',
    delay: '4 Months',
  }

  const gap = Math.max(
    0,
    Number(project.expenditure || 0) - Number(project.physical || 0)
  )

  /*
   * selectedRisk comes from the central Risk Intelligence Engine.
   *
   * The fallback below only protects the page if the context has not
   * produced a risk assessment yet.
   */
  const risk = selectedRisk || {
    score: project.score || 0,
    riskLevel: riskLabel(project.score || 0).toUpperCase(),
    confidence: 0,
    priority: 'Review Required',
    signals: [],
    activeSignals: [],
    strongestSignals: [],
    recommendation:
      'Review project financial and physical progress.',
    summary:
      'Risk assessment is being prepared from available project data.',
  }

  const riskScore = Number(risk.score || 0)

  const riskText =
    risk.riskLevel === 'CRITICAL'
      ? 'Critical'
      : risk.riskLevel === 'HIGH'
        ? 'High'
        : risk.riskLevel === 'MEDIUM'
          ? 'Medium'
          : 'Low'

  const riskClass = riskText.toLowerCase()

  const progressSignal = useMemo(
    () =>
      risk.signals?.find(
        (signal) => signal.id === 'FINANCIAL_PHYSICAL_MISMATCH'
      ),
    [risk.signals]
  )

  const delaySignal = useMemo(
    () =>
      risk.signals?.find(
        (signal) => signal.id === 'DELAY_RISK'
      ),
    [risk.signals]
  )

  const paymentSignal = useMemo(
    () =>
      risk.signals?.find(
        (signal) => signal.id === 'PAYMENT_ANOMALY'
      ),
    [risk.signals]
  )

  const costSignal = useMemo(
    () =>
      risk.signals?.find(
        (signal) => signal.id === 'COST_OVERRUN_RISK'
      ),
    [risk.signals]
  )

  const detectedSignals = (risk.activeSignals || []).filter(
    (signal) => signal.detected
  )

  const getSignalIcon = (signalId) => {
    if (signalId === 'DELAY_RISK') return <Clock3 size={16} />
    if (signalId === 'COST_OVERRUN_RISK') return <TrendingUp size={16} />
    if (signalId === 'PAYMENT_ANOMALY') return <CircleAlert size={16} />
    return <AlertTriangle size={16} />
  }

  return (
    <div className="project-detail-container">

      {/* =========================================================
          BREADCRUMB + HEADER ACTIONS
      ========================================================= */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <div
          className="breadcrumb-line"
          style={{ margin: 0 }}
        >
          Home / Projects / <span>{project.name}</span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="secondary-btn"
            onClick={() =>
              alert('Downloading official monitoring report PDF...')
            }
          >
            <Download size={15} />
            Download Report
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate('projects')}
          >
            <ArrowLeft size={15} />
            Back
          </button>
        </div>
      </div>

      {/* =========================================================
          PROJECT HEADER
      ========================================================= */}

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
              Project ID: <strong>{project.id}</strong> |
              District: <strong>{project.district}</strong> |
              Work Type: <strong>{project.category}</strong>
            </div>
          </div>

          <div className="ai-assessment-mini">
            <Brain size={15} />
            <span>AI Assessment</span>
            <strong>{risk.confidence}% confidence</strong>
          </div>
        </div>
      </div>

      {/* =========================================================
          KPI STRIP
      ========================================================= */}

      <div className="kpi-6-strip">

        <div className="kpi-6-item">
          <span>Sanctioned Amount</span>
          <strong>
            {formatCurrency(project.amount)}
          </strong>
        </div>

        <div className="kpi-6-item">
          <span>Released Amount</span>
          <strong>₹ 18,00,000</strong>
        </div>

        <div className="kpi-6-item">
          <span>Expenditure</span>
          <strong>
            ₹ 17,00,000
            <small
              style={{
                fontSize: 12,
                color: '#dc2626',
                fontWeight: 600,
              }}
            >
              ({project.expenditure}%)
            </small>
          </strong>
        </div>

        <div className="kpi-6-item">
          <span>Physical Progress</span>
          <strong>{project.physical}%</strong>
        </div>

        <div className="kpi-6-item">
          <span>Expected Completion</span>
          <strong>June 2026</strong>
        </div>

        <div className="kpi-6-item critical">
          <span>Delay</span>
          <strong>{project.delay}</strong>
        </div>

      </div>

      {/* =========================================================
          TABS
      ========================================================= */}

      <div className="project-tabs-bar">
        {[
          'Overview',
          'Progress & Fund',
          'Payments',
          'Risk Analysis',
          'Alerts',
          'Documents',
        ].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${
              activeTab === tab ? 'active' : ''
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* =========================================================
          OVERVIEW
      ========================================================= */}

      {activeTab === 'Overview' && (
        <>
          <div className="detail-overview-grid">

            {/* ===================================================
                AI RISK SCORE
            =================================================== */}

            <div
              className="panel"
              style={{ textAlign: 'center' }}
            >
              <div className="panel-head">
                <h2>AI Risk Score</h2>

                <span className="ai-powered-label">
                  <Brain size={13} />
                  AI
                </span>
              </div>

              <div className="risk-gauge-box">

                <div
                  className="half-gauge-ring"
                  style={{
                    background: `conic-gradient(
                      from 270deg,
                      var(--sl-red) 0% ${riskScore}%,
                      #e2e8f0 ${riskScore}% 100%
                    )`,
                  }}
                >
                  <div className="half-gauge-inner" />
                </div>

                <div className="gauge-score-value">

                  <strong>{riskScore}</strong>

                  <span
                    style={{
                      fontSize: 13,
                      color: '#64748b',
                    }}
                  >
                    / 100
                  </span>

                  <span
                    style={{
                      color: '#dc2626',
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
                <span>Priority</span>
                <strong>{risk.priority}</strong>
              </div>
            </div>

            {/* ===================================================
                WHY FLAGGED
            =================================================== */}

            <div className="panel">

              <div className="panel-head">
                <h2>Why is this project flagged?</h2>

                <span className="signal-count">
                  {detectedSignals.length} signals
                </span>
              </div>

              <div className="evidence-bullet-list">

                {detectedSignals.length === 0 && (
                  <div className="risk-empty-state">
                    <CheckCircle size={18} />
                    <span>
                      No significant anomaly detected from
                      available project data.
                    </span>
                  </div>
                )}

                {detectedSignals.map((signal) => (
                  <div
                    className="evidence-item ai-evidence-item"
                    key={signal.id}
                  >
                    <div className="evidence-icon">
                      {getSignalIcon(signal.id)}
                    </div>

                    <div className="evidence-content">
                      <div className="evidence-title-row">
                        <strong>{signal.name}</strong>

                        <span className="signal-score">
                          +{signal.score}
                        </span>
                      </div>

                      <span>
                        {signal.explanation}
                      </span>

                      {signal.evidence && (
                        <div className="evidence-data">
                          {signal.id ===
                            'FINANCIAL_PHYSICAL_MISMATCH' && (
                            <>
                              <span>
                                Expenditure:{' '}
                                <strong>
                                  {signal.evidence.expenditure}%
                                </strong>
                              </span>

                              <span>
                                Physical:{' '}
                                <strong>
                                  {signal.evidence.physicalProgress}%
                                </strong>
                              </span>

                              <span>
                                Gap:{' '}
                                <strong>
                                  {signal.evidence.gap} pp
                                </strong>
                              </span>
                            </>
                          )}

                          {signal.id ===
                            'PAYMENT_ANOMALY' && (
                            <>
                              <span>
                                Flagged payments:{' '}
                                <strong>
                                  {signal.evidence.flaggedPayments}
                                </strong>
                              </span>

                              <span>
                                Total payments:{' '}
                                <strong>
                                  {signal.evidence.totalPayments}
                                </strong>
                              </span>
                            </>
                          )}

                          {signal.id ===
                            'DELAY_RISK' && (
                            <>
                              <span>
                                Delay:{' '}
                                <strong>
                                  {signal.evidence.delayMonths} months
                                </strong>
                              </span>

                              <span>
                                Probability:{' '}
                                <strong>
                                  {signal.evidence.probability}%
                                </strong>
                              </span>
                            </>
                          )}

                          {signal.id ===
                            'SIMILAR_WORK' && (
                            <span>
                              Similar works:{' '}
                              <strong>
                                {signal.evidence.similarProjectCount}
                              </strong>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===================================================
                AI PREDICTIONS
            =================================================== */}

            <div className="panel">

              <div className="panel-head">
                <h2>AI Predictions</h2>

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
                    {delaySignal?.evidence?.probability ?? 0}%
                  </strong>
                </div>

                <div className="prediction-row">
                  <span>
                    <TrendingUp size={14} />
                    Cost Overrun Risk
                  </span>

                  <strong>
                    {costSignal?.evidence?.probability ?? 0}%
                  </strong>
                </div>

                <div className="prediction-row">
                  <span>
                    <AlertTriangle size={14} />
                    Anomaly Score
                  </span>

                  <strong>{riskScore}</strong>
                </div>

              </div>

              <div className="prediction-note">
                Predictions are generated from current financial,
                execution and payment risk signals.
              </div>
            </div>
          </div>

          {/* =====================================================
              FINANCIAL VS PHYSICAL
          ===================================================== */}

          <div className="gap-comparison-box">

            <div className="section-heading-with-badge">
              <h3>
                Financial vs Physical Progress
              </h3>

              {gap >= 25 && (
                <span className="warning-badge">
                  Significant mismatch
                </span>
              )}
            </div>

            <div className="bar-comp-row">

              <label>
                <span>Financial Expenditure</span>
                <span>{project.expenditure}%</span>
              </label>

              <div className="bar-comp-track">
                <div
                  className="bar-comp-fill blue"
                  style={{
                    width: `${Math.min(
                      100,
                      project.expenditure
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="bar-comp-row">

              <label>
                <span>Physical Progress</span>
                <span>{project.physical}%</span>
              </label>

              <div className="bar-comp-track">
                <div
                  className="bar-comp-fill amber"
                  style={{
                    width: `${Math.min(
                      100,
                      project.physical
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="gap-callout-clean">

              <AlertTriangle size={15} />

              <span>
                Progress Gap:{' '}
                <strong>{gap} percentage points.</strong>{' '}
                Expenditure is materially ahead of reported
                physical work.
              </span>

            </div>
          </div>

          {/* =====================================================
              AI SUMMARY
          ===================================================== */}

          <div className="ai-summary-panel">

            <div className="ai-summary-icon">
              <Brain size={20} />
            </div>

            <div className="ai-summary-content">

              <div className="ai-summary-header">
                <strong>AI Assessment</strong>

                <span>
                  {risk.confidence}% confidence
                </span>
              </div>

              <p>{risk.summary}</p>

              <div className="ai-recommendation">
                <span>Recommended next step</span>
                <strong>{risk.recommendation}</strong>
              </div>

            </div>

          </div>

          {/* =====================================================
              RECOMMENDED ACTION
          ===================================================== */}

          <div className="recommended-action-banner">

            <div className="action-banner-text">

              <strong>Recommended Action</strong>

              <p>{risk.recommendation}</p>

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
                onClick={() => setModal('audit')}
              >
                <ShieldCheck size={16} />
                Request Field Audit
              </button>

              <button
                className="danger-btn"
                onClick={() => setModal('halt')}
              >
                <AlertTriangle size={16} />
                Halt Payment
              </button>

              <button
                className="secondary-btn"
                onClick={() => setModal('resolve')}
              >
                <CheckCircle size={16} />
                Mark Resolved
              </button>

            </div>
          </div>
        </>
      )}

      {/* =========================================================
          RISK ANALYSIS TAB
      ========================================================= */}

      {activeTab === 'Risk Analysis' && (
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
                Risk score is derived from independent signals
                across financial execution, physical progress,
                payments, timelines and compliance indicators.
              </p>
            </div>

            <div className="risk-analysis-score">
              <strong>{riskScore}</strong>
              <span>/100</span>
              <small>{riskText} Risk</small>
            </div>

          </div>

          <div className="risk-signal-grid">

            {risk.signals?.map((signal) => (
              <div
                className={`risk-signal-card ${
                  signal.detected ? 'detected' : 'normal'
                }`}
                key={signal.id}
              >

                <div className="risk-signal-card-top">

                  <div className="risk-signal-icon">
                    {getSignalIcon(signal.id)}
                  </div>

                  <span>
                    {signal.detected
                      ? `+${signal.score}`
                      : 'Clear'}
                  </span>

                </div>

                <h3>{signal.name}</h3>

                <small>{signal.category}</small>

                <p>{signal.explanation}</p>

                <div className="risk-signal-footer">

                  <span>
                    {signal.detected
                      ? signal.severity
                      : 'No concern'}
                  </span>

                  {signal.detected && (
                    <ChevronRight size={14} />
                  )}

                </div>

              </div>
            ))}

          </div>

          <div className="investigation-path">

            <div className="investigation-path-header">
              <h3>Investigation Priority</h3>
              <span>{risk.priority}</span>
            </div>

            <div className="investigation-steps">

              <div className="investigation-step active">
                <span>1</span>
                <div>
                  <strong>AI Detection</strong>
                  <small>
                    Risk signals detected automatically.
                  </small>
                </div>
              </div>

              <div className="investigation-step">
                <span>2</span>
                <div>
                  <strong>Evidence Review</strong>
                  <small>
                    Verify financial and execution records.
                  </small>
                </div>
              </div>

              <div className="investigation-step">
                <span>3</span>
                <div>
                  <strong>Field Verification</strong>
                  <small>
                    Confirm reported physical progress.
                  </small>
                </div>
              </div>

              <div className="investigation-step">
                <span>4</span>
                <div>
                  <strong>Corrective Action</strong>
                  <small>
                    Record and track officer decision.
                  </small>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* =========================================================
          OTHER TABS
      ========================================================= */}

      {activeTab !== 'Overview' &&
        activeTab !== 'Risk Analysis' && (
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
              Detailed breakdown for {activeTab} is
              synchronized with project monitoring data.
              Select Overview or Risk Analysis for the
              primary AI assessment.
            </p>
          </div>
        )}
    </div>
  )
}

export default ProjectDetail