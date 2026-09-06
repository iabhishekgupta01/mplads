import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Clock3,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react'


import { useApp } from '../context/AppContext.jsx'
import { riskLabel } from '../utils/formatters.js'
import { calculateProjectRisk } from '../services/riskEngine.jsx'
import '../styles/alerts.css'

export function Alerts() {
  const {
    projects,
    payments,
    vendors,
    openProject,
  } = useApp()

  const [alertFilter, setAlertFilter] = useState('All')

  /*
   * Build alert intelligence from the same risk engine
   * used by the project investigation flow.
   */
  const alertProjects = useMemo(() => {
    return projects
      .map((project) => {
        const risk = calculateProjectRisk(project, {
          projects,
          payments,
          vendors,
        })

        return {
          project,
          risk,
        }
      })
      .filter(({ project, risk }) => {
        const score = risk?.score ?? project.score ?? 0

        if (alertFilter === 'All') return score >= 60
        if (alertFilter === 'High Risk') return score >= 80
        if (alertFilter === 'Medium Risk') return score >= 50 && score < 80
        if (alertFilter === 'Under Review') {
          return project.status === 'Under Review'
        }
        if (alertFilter === 'Resolved') {
          return project.status === 'Resolved'
        }

        return true
      })
      .sort(
        (a, b) =>
          (b.risk?.score ?? b.project.score ?? 0) -
          (a.risk?.score ?? a.project.score ?? 0),
      )
  }, [projects, payments, vendors, alertFilter])

  const summary = useMemo(() => {
    const calculated = projects.map((project) => {
      const risk = calculateProjectRisk(project, {
        projects,
        payments,
        vendors,
      })

      return {
        project,
        risk,
        score: risk?.score ?? project.score ?? 0,
      }
    })

    return {
      unresolved: calculated.filter(
        ({ project }) => project.status !== 'Resolved',
      ).filter(({ score }) => score >= 60).length,

      highRisk: calculated.filter(({ score }) => score >= 80).length,

      fieldReview: calculated.filter(
        ({ project }) => project.status === 'Under Review',
      ).length,

      resolved: calculated.filter(
        ({ project }) => project.status === 'Resolved',
      ).length,
    }
  }, [projects, payments, vendors])

  const getPrimarySignal = (project, risk) => {
    if (risk?.signals?.length) {
      return risk.signals[0]
    }

    if (
      Number(project.expenditure) -
        Number(project.physical) >=
      25
    ) {
      return {
        title: 'Financial-progress mismatch',
        description:
          'Expenditure is significantly ahead of reported physical progress.',
      }
    }

    return {
      title: project.finding || 'Elevated project risk',
      description:
        'The project requires additional review based on current monitoring indicators.',
    }
  }

  const getSignalDescription = (signal, project) => {
    if (!signal) return project.finding

    return (
      signal.description ||
      signal.detail ||
      signal.reason ||
      signal.title ||
      project.finding
    )
  }

  return (
    <div className="alerts-page-container">

      {/* -------------------------------------------------
          PAGE HEADER
      ------------------------------------------------- */}
      <header className="alerts-page-header">
        <div>
          <span className="alerts-eyebrow">
            MPLADS AI MONITORING SYSTEM
          </span>

          <h1>Risk & Alerts</h1>

          <p>
            Prioritize development projects requiring immediate
            officer investigation.
          </p>
        </div>

        <div className="alerts-header-status">
          <span className="alerts-status-dot" />
          AI MONITORING ACTIVE
        </div>
      </header>


      {/* -------------------------------------------------
          SUMMARY
      ------------------------------------------------- */}
      <section className="alert-summary">

        <div className="alert-summary-item">
          <span>Unresolved Alerts</span>
          <strong>{summary.unresolved}</strong>
          <small>requiring attention</small>
        </div>

        <div className="alert-summary-item critical">
          <span>High Risk Projects</span>
          <strong>{summary.highRisk}</strong>
          <small>priority investigation</small>
        </div>

        <div className="alert-summary-item review">
          <span>Under Field Review</span>
          <strong>{summary.fieldReview}</strong>
          <small>currently under review</small>
        </div>

        <div className="alert-summary-item resolved">
          <span>Resolved</span>
          <strong>{summary.resolved}</strong>
          <small>closed risk cases</small>
        </div>

      </section>


      {/* -------------------------------------------------
          FILTERS
      ------------------------------------------------- */}
      <div className="alerts-filter-bar">

        <div className="alerts-filter-label">
          <span>VIEW</span>
          <strong>Risk cases</strong>
        </div>

        <div className="alerts-filter-tabs">
          {[
            'All',
            'High Risk',
            'Medium Risk',
            'Under Review',
            'Resolved',
          ].map((tab) => (
            <button
              key={tab}
              className={`alerts-filter-btn ${
                alertFilter === tab ? 'active' : ''
              }`}
              onClick={() => setAlertFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>


      {/* -------------------------------------------------
          ALERT COUNT
      ------------------------------------------------- */}
      <div className="alerts-results-row">
        <div>
          <span className="alerts-results-kicker">
            AI PRIORITY QUEUE
          </span>

          <strong>
            {alertProjects.length} cases identified
          </strong>
        </div>

        <span className="alerts-sort-note">
          Highest risk first
        </span>
      </div>


      {/* -------------------------------------------------
          ALERT CARDS
      ------------------------------------------------- */}
      <div className="alert-grid">

        {alertProjects.map(({ project, risk }) => {
          const score = risk?.score ?? project.score ?? 0
          const category = riskLabel(score)
          const riskClass = category.toLowerCase()

          const signal = getPrimarySignal(project, risk)

          const expenditure = Number(project.expenditure) || 0
          const physical = Number(project.physical) || 0
          const mismatch = Math.max(
            0,
            expenditure - physical,
          )

          const delay =
            project.delay && project.delay !== 'On track'
              ? project.delay
              : 'No major delay recorded'

          return (
            <article
              className={`alert-card alert-card-${riskClass}`}
              key={project.id}
            >

              {/* TOP */}
              <div className="alert-card-top">

                <span className={`alert-risk-badge ${riskClass}`}>
                  <i />
                  {score} · {category} Risk
                </span>

                <span className="alert-detected">
                  <Clock3 size={11} />
                  AI detected
                </span>

              </div>


              {/* PROJECT */}
              <div className="alert-project-heading">

                <div>
                  <h2>{project.name}</h2>

                  <p>
                    {project.district}, {project.state}
                  </p>
                </div>

                <span className="alert-project-id">
                  {project.id}
                </span>

              </div>


              {/* AI FINDING */}
              <div className="alert-ai-finding">

                <div className="alert-ai-icon">
                  <Brain size={15} />
                </div>

                <div>
                  <span className="alert-ai-label">
                    PRIMARY AI SIGNAL
                  </span>

                  <strong>
                    {signal?.title || project.finding}
                  </strong>

                  <p>
                    {getSignalDescription(signal, project)}
                  </p>
                </div>

              </div>


              {/* EVIDENCE */}
              <div className="alert-evidence">

                <div className="alert-evidence-heading">
                  <span>DETECTED EVIDENCE</span>
                  <span>{risk?.signals?.length || 1} signal(s)</span>
                </div>

                <div className="alert-evidence-grid">

                  <div className="alert-evidence-item">
                    <span>Financial</span>
                    <strong>{expenditure}%</strong>
                    <small>
                      expenditure
                    </small>
                  </div>

                  <div className="alert-evidence-item">
                    <span>Physical</span>
                    <strong>{physical}%</strong>
                    <small>
                      progress
                    </small>
                  </div>

                  <div className="alert-evidence-item">
                    <span>Gap</span>
                    <strong>{mismatch}%</strong>
                    <small>
                      mismatch
                    </small>
                  </div>

                  <div className="alert-evidence-item">
                    <span>Delay</span>
                    <strong>{delay}</strong>
                    <small>
                      current signal
                    </small>
                  </div>

                </div>

              </div>


              {/* FOOTER */}
              <div className="alert-card-footer">

                <div className="alert-footer-status">

                  <span
                    className={`status-badge-clean ${
                      project.status === 'Under Review'
                        ? 'review'
                        : project.status === 'Resolved'
                          ? 'resolved'
                          : 'ongoing'
                    }`}
                  >
                    {project.status}
                  </span>

                  {risk?.confidence && (
                    <span className="alert-confidence">
                      Confidence {risk.confidence}%
                    </span>
                  )}

                </div>

                <button
                  className="alert-investigate-btn"
                  onClick={() => openProject(project.id)}
                >
                  Investigate
                  <ArrowRight size={14} />
                </button>

              </div>

            </article>
          )
        })}

      </div>


      {/* -------------------------------------------------
          EMPTY STATE
      ------------------------------------------------- */}
      {alertProjects.length === 0 && (
        <div className="alerts-empty-state">

          <div className="alerts-empty-icon">
            <ShieldAlert size={21} />
          </div>

          <h3>No matching risk cases</h3>

          <p>
            There are currently no projects matching the selected
            alert category.
          </p>

          <button
            onClick={() => setAlertFilter('All')}
          >
            View all alerts
            <ArrowRight size={14} />
          </button>

        </div>
      )}

    </div>
  )
}

export default Alerts