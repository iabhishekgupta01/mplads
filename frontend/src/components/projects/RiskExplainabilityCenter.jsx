import {
  Brain,
  CheckCircle,
  ChevronRight,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'

export default function RiskExplainabilityCenter({
  project,
  risk,
  riskScore,
  riskText,
  detectedSignals = [],
  availableEvidence = [],
  evidenceSources = [],
  onReviewEvidence,
  onRequestAudit,
}) {
  const confidence = Math.max(
    0,
    Math.min(
      100,
      Number(
        risk?.confidence ??
        Math.min(96, 58 + detectedSignals.length * 8 + availableEvidence.length * 4)
      )
    )
  )

  const confidenceLabel =
    confidence >= 80 ? 'High confidence' :
    confidence >= 60 ? 'Moderate confidence' :
    'Limited confidence'

  const evidenceCoverage = evidenceSources.length
    ? Math.round((availableEvidence.length / evidenceSources.length) * 100)
    : 0

  const sortedSignals = [...detectedSignals]
    .sort((a, b) => Number(b?.score || 0) - Number(a?.score || 0))
    .slice(0, 4)

  const totalContribution = sortedSignals.reduce(
    (sum, signal) => sum + Number(signal?.score || 0),
    0
  )

  const action =
    risk?.recommendation ||
    'Review the strongest risk signals and validate the supporting evidence before taking action.'

  return (
    <section className={`ai-explainability-card ${riskText.toLowerCase()}`}>
      <div className="ai-explainability-pattern" />

      <div className="ai-explainability-top">
        <div className="ai-explainability-heading">
          <div className="ai-explainability-icon">
            <Brain size={21} />
          </div>

          <div>
            <span className="ai-explainability-eyebrow">
              AI EXPLAINABILITY
            </span>

            <h3>
              Why this project received a {riskScore}/100 risk score
            </h3>

            <p>
              The assessment combines independent signals and available evidence.
              Each detected signal below contributes to the overall risk picture.
            </p>
          </div>
        </div>

        <div className="ai-confidence-panel">
          <span>MODEL CONFIDENCE</span>
          <strong>{confidence}%</strong>
          <small>{confidenceLabel}</small>
        </div>
      </div>

      <div className="ai-explainability-grid">
        <div className="ai-risk-summary">
          <div className="ai-risk-score-ring">
            <strong>{riskScore}</strong>
            <span>/100</span>
          </div>

          <div>
            <span className={`ai-risk-label ${riskText.toLowerCase()}`}>
              {riskText} Risk
            </span>

            <h4>Explainable assessment</h4>

            <p>
              {risk?.summary ||
                'Risk is assessed from financial, physical, payment, timeline and compliance evidence.'}
            </p>
          </div>
        </div>

        <div className="ai-evidence-coverage">
          <div className="ai-mini-heading">
            <FileCheck2 size={17} />
            <span>Evidence coverage</span>
          </div>

          <strong>{evidenceCoverage}%</strong>

          <div className="ai-progress-track">
            <div
              className="ai-progress-fill"
              style={{ width: `${evidenceCoverage}%` }}
            />
          </div>

          <small>
            {availableEvidence.length} of {evidenceSources.length} evidence sources available
          </small>
        </div>

        <div className="ai-priority-panel">
          <div className="ai-mini-heading">
            <Target size={17} />
            <span>Recommended priority</span>
          </div>

          <strong>{risk?.priority || 'Review Required'}</strong>

          <small>
            Focus first on the highest-contributing detected signals.
          </small>
        </div>
      </div>

      <div className="ai-contributors-section">
        <div className="ai-section-heading">
          <div>
            <span>TOP CONTRIBUTING SIGNALS</span>
            <h4>What is driving the risk?</h4>
          </div>

          <span className="ai-signal-count">
            {detectedSignals.length} detected
          </span>
        </div>

        {sortedSignals.length ? (
          <div className="ai-contributor-list">
            {sortedSignals.map((signal, index) => {
              const score = Number(signal?.score || 0)
              const contribution =
                totalContribution > 0
                  ? Math.round((score / totalContribution) * 100)
                  : 0

              return (
                <div className="ai-contributor-row" key={signal.id || index}>
                  <div className="ai-contributor-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="ai-contributor-main">
                    <div className="ai-contributor-title">
                      <strong>{signal.name}</strong>
                      <span>+{score} risk points</span>
                    </div>

                    <p>
                      {signal.explanation || 'Detected from available project evidence.'}
                    </p>

                    <div className="ai-contributor-bar">
                      <div style={{ width: `${Math.min(100, contribution)}%` }} />
                    </div>
                  </div>

                  <div className="ai-contributor-evidence">
                    {signal.evidence ? (
                      <>
                        <CheckCircle size={15} />
                        <span>Evidence linked</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={15} />
                        <span>Signal only</span>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="ai-empty-state">
            <Sparkles size={18} />
            <span>No detected risk signals are currently available.</span>
          </div>
        )}
      </div>

      <div className="ai-decision-strip">
        <div className="ai-decision-icon">
          <ShieldCheck size={18} />
        </div>

        <div className="ai-decision-copy">
          <span>RECOMMENDED NEXT ACTION</span>
          <strong>{action}</strong>
          <small>
            AI output supports officer review; final decisions remain human-verified.
          </small>
        </div>

        <div className="ai-decision-actions">
          <button
            type="button"
            className="ai-secondary-action"
            onClick={onReviewEvidence}
          >
            Review Evidence
            <ChevronRight size={15} />
          </button>

          <button
            type="button"
            className="ai-primary-action"
            onClick={onRequestAudit}
          >
            Request Audit
          </button>
        </div>
      </div>

      <div className="ai-prototype-note">
        <Sparkles size={14} />
        <span>
          Explainability layer is prototype-ready. In production, signal weights,
          confidence and evidence attribution should come from the deployed ML pipeline.
        </span>
      </div>
    </section>
  )
}
