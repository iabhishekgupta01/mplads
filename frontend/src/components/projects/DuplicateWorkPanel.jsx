// src/components/projects/DuplicateWorkPanel.jsx

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  FileSearch,
  MapPin,
  ShieldAlert,
  Users,
} from 'lucide-react'

import { useApp } from '../../context/AppContext.jsx'
import { formatCurrency } from '../../utils/formatters.js'
import { findRelatedProjects } from "../../services/duplicateWorkEngine.jsx"

export function DuplicateWorkPanel({ project }) {
  const {
    projects,
    openProject,
    setModal,
    showToast,
  } = useApp()

  const [expandedId, setExpandedId] = useState(null)

  const matches = useMemo(
    () => findRelatedProjects(project, projects),
    [project, projects]
  )

  const strongMatches = matches.filter(
    ({ comparison }) => comparison.score >= 55
  )

  const relatedMatches = matches.filter(
    ({ comparison }) => comparison.score >= 35
  )

  const handleFlag = (candidate) => {
    if (setModal) {
      setModal('audit')
    }

    if (showToast) {
      showToast(
        `Linked project ${candidate.id} marked for investigation.`
      )
    }
  }

  return (
    <section className="duplicate-work-panel panel">

      <div className="duplicate-panel-header">

        <div>
          <div className="duplicate-eyebrow">
            <ShieldAlert size={14} />
            AI SCREENING
          </div>

          <h2>
            Duplicate & Overlapping Work Detection
          </h2>

          <p>
            Compares this project with other registered works
            to identify possible duplicate, overlapping or
            closely related activities.
          </p>
        </div>

        <div className="duplicate-summary">
          <strong>{strongMatches.length}</strong>
          <span>strong matches</span>
        </div>

      </div>

      <div className="duplicate-method-row">

        <div className="duplicate-method">
          <MapPin size={15} />
          <span>Location</span>
          <strong>25%</strong>
        </div>

        <div className="duplicate-method">
          <Building2 size={15} />
          <span>Category</span>
          <strong>20%</strong>
        </div>

        <div className="duplicate-method">
          <FileSearch size={15} />
          <span>Description</span>
          <strong>15%</strong>
        </div>

        <div className="duplicate-method">
          <Users size={15} />
          <span>Vendor</span>
          <strong>15%</strong>
        </div>

        <div className="duplicate-method">
          <span className="duplicate-method-dot" />
          <span>Cost + timeline</span>
          <strong>20%</strong>
        </div>

      </div>

      {matches.length === 0 ? (
        <div className="duplicate-empty">

          <CheckCircle2 size={24} />

          <div>
            <strong>
              No related project detected
            </strong>

            <p>
              No meaningful similarity was found in the
              currently available project records.
            </p>
          </div>

        </div>
      ) : (
        <div className="duplicate-results">

          <div className="duplicate-results-head">
            <div>
              <strong>
                Related project candidates
              </strong>

              <span>
                {matches.length} candidates screened
              </span>
            </div>

            <span className="duplicate-disclaimer">
              Prototype similarity screening
            </span>
          </div>

          {matches.map(({ candidate, comparison }) => {

            const expanded =
              expandedId === candidate.id

            return (
              <div
                className={`duplicate-result-card ${comparison.colorClass}`}
                key={candidate.id}
              >

                <div className="duplicate-result-main">

                  <div className="duplicate-score">

                    <strong>
                      {comparison.score}
                    </strong>

                    <span>
                      similarity
                    </span>

                  </div>

                  <div className="duplicate-project-info">

                    <div className="duplicate-project-title">
                      <h3>
                        {candidate.name}
                      </h3>

                      <span
                        className={`duplicate-label ${comparison.colorClass}`}
                      >
                        {comparison.label}
                      </span>
                    </div>

                    <div className="duplicate-project-meta">

                      <span>
                        {candidate.id}
                      </span>

                      <span>
                        <MapPin size={13} />
                        {candidate.district},{' '}
                        {candidate.state}
                      </span>

                      <span>
                        {candidate.category}
                      </span>

                    </div>

                    <p className="duplicate-explanation">
                      <CircleAlert size={14} />
                      {comparison.explanation}
                    </p>

                  </div>

                  <button
                    className="duplicate-expand-btn"
                    onClick={() =>
                      setExpandedId(
                        expanded ? null : candidate.id
                      )
                    }
                  >
                    {expanded ? (
                      <>
                        Hide evidence
                        <ChevronUp size={15} />
                      </>
                    ) : (
                      <>
                        View evidence
                        <ChevronDown size={15} />
                      </>
                    )}
                  </button>

                </div>

                {expanded && (
                  <div className="duplicate-evidence">

                    <div className="duplicate-evidence-grid">

                      <EvidenceMetric
                        label="Location similarity"
                        value={comparison.signals.location}
                      />

                      <EvidenceMetric
                        label="Category similarity"
                        value={comparison.signals.category}
                      />

                      <EvidenceMetric
                        label="Description similarity"
                        value={comparison.signals.description}
                      />

                      <EvidenceMetric
                        label="Cost similarity"
                        value={comparison.signals.cost}
                      />

                      <EvidenceMetric
                        label="Vendor match"
                        value={comparison.signals.vendor}
                      />

                      <EvidenceMetric
                        label="Agency match"
                        value={comparison.signals.agency}
                      />

                      <EvidenceMetric
                        label="Timeline overlap"
                        value={comparison.signals.timeline}
                      />

                    </div>

                    <div className="duplicate-reason-box">

                      <strong>
                        Why was this project linked?
                      </strong>

                      <ul>
                        {comparison.reasons.length > 0 ? (
                          comparison.reasons.map(
                            (reason) => (
                              <li key={reason}>
                                <AlertTriangle size={13} />
                                {reason}
                              </li>
                            )
                          )
                        ) : (
                          <li>
                            Limited similarity across
                            available records.
                          </li>
                        )}
                      </ul>

                    </div>

                    <div className="duplicate-linked-details">

                      <div>
                        <span>Sanctioned value</span>
                        <strong>
                          {formatCurrency(
                            candidate.amount || 0
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>Vendor</span>
                        <strong>
                          {candidate.vendor || '—'}
                        </strong>
                      </div>

                      <div>
                        <span>Agency</span>
                        <strong>
                          {candidate.agency || '—'}
                        </strong>
                      </div>

                      <div>
                        <span>Current status</span>
                        <strong>
                          {candidate.status || '—'}
                        </strong>
                      </div>

                    </div>

                    <div className="duplicate-actions">

                      <button
                        className="secondary-btn"
                        onClick={() =>
                          openProject(candidate.id)
                        }
                      >
                        Investigate Linked Project
                        <ArrowRight size={15} />
                      </button>

                      <button
                        className="danger-outline-btn"
                        onClick={() =>
                          handleFlag(candidate)
                        }
                      >
                        <ShieldAlert size={15} />
                        Flag for Review
                      </button>

                    </div>

                  </div>
                )}

              </div>
            )
          })}

        </div>
      )}

      <div className="duplicate-panel-footer">

        <div>
          <strong>
            Investigation guidance
          </strong>

          <span>
            A similarity match is a screening signal, not
            proof of duplicate expenditure. Verify location,
            scope, beneficiary, sanction and field evidence
            before taking action.
          </span>
        </div>

        {relatedMatches.length > 0 && (
          <span className="duplicate-footer-count">
            {relatedMatches.length} related record
            {relatedMatches.length > 1 ? 's' : ''}
          </span>
        )}

      </div>

    </section>
  )
}

function EvidenceMetric({ label, value }) {
  return (
    <div className="duplicate-evidence-metric">

      <div>
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="duplicate-progress">
        <span
          style={{
            width: `${Math.min(
              100,
              Math.max(0, value)
            )}%`,
          }}
        />
      </div>

    </div>
  )
}

export default DuplicateWorkPanel