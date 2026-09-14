import { useMemo } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardCheck,
  Database,
  Eye,
  IndianRupee,
  MapPinned,
  Network,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'
import "../styles/dashboard.css"
import '../styles/nirikshan.css'

export default function Dashboard() {
  const { projects, payments, inspections, openProject, navigate } = useApp()

  const featuredProject = useMemo(() => {
    return [...projects]
      .sort((a, b) => Number(b.score || 0) - Number(a.score || 0))[0] || null
  }, [projects])

  const metrics = useMemo(() => {
    const monitoredValue = projects.reduce((sum, p) => sum + Number(p.amount || 0), 0)
    const priority = projects.filter((p) => Number(p.score || 0) >= 60)
    const critical = projects.filter((p) => Number(p.score || 0) >= 80)
    const flagged = payments.filter((p) => p.flagged)
    const flaggedValue = flagged.reduce((sum, p) => sum + Number(p.amount || 0), 0)
    const pending = inspections.filter((i) => i.status === 'Pending' || i.status === 'Scheduled')
    const delayed = projects.filter((p) => Number(p.delay || 0) > 0)

    return { monitoredValue, priority, critical, flagged, flaggedValue, pending, delayed }
  }, [projects, payments, inspections])

  const riskMix = useMemo(() => {
    const total = projects.length || 1
    return [
      { label: 'Critical', count: projects.filter((p) => Number(p.score || 0) >= 80).length, tone: 'critical' },
      { label: 'High', count: projects.filter((p) => Number(p.score || 0) >= 60 && Number(p.score || 0) < 80).length, tone: 'high' },
      { label: 'Medium', count: projects.filter((p) => Number(p.score || 0) >= 40 && Number(p.score || 0) < 60).length, tone: 'medium' },
      { label: 'Low', count: projects.filter((p) => Number(p.score || 0) < 40).length, tone: 'low' },
    ].map((item) => ({ ...item, percent: Math.round((item.count / total) * 100) }))
  }, [projects])

  const signalMix = useMemo(() => {
    const signals = [
      ['Financial–physical mismatch', (p) => /financial|physical|mismatch/i.test(p.finding || '')],
      ['Payment anomaly', (p) => /payment/i.test(p.finding || '')],
      ['Schedule delay', (p) => Number(p.delay || 0) > 0 || /delay/i.test(p.finding || '')],
      ['Connected / duplicate work', (p) => /duplicate|similar|related/i.test(p.finding || '')],
    ]
    return signals
      .map(([label, test]) => ({ label, count: projects.filter(test).length }))
      .sort((a, b) => b.count - a.count)
  }, [projects])

  const avgRisk = useMemo(() => {
    if (!projects.length) return 0
    return Math.round(projects.reduce((sum, p) => sum + Number(p.score || 0), 0) / projects.length)
  }, [projects])

  const openFeatured = () => {
    if (featuredProject?.id) openProject(featuredProject.id)
  }

  return (
    <div className="nir-page rc-dashboard">
      <section className="rc-dashboard-head">
        <div className="rc-map-lines" aria-hidden="true" />
        <div className="rc-head-copy">
          <span className="nir-eyebrow">
            <Sparkles size={14} /> NIRIKSHAN · MPLADS DASHBOARD
          </span>
          <h1>One view. Every signal. Smarter oversight.</h1>
          <p>
            Bring financial, payment, progress, spatial and field signals together to reveal
            <strong>where risk is building, what is driving it, and what needs verification.</strong>
          </p>
          <div className="rc-head-tags">
            <span>AI-powered risk detection</span>
            <span>Evidence-backed decisions</span>
            <span>Human-in-the-loop</span>
          </div>
        </div>

        <button className="rc-head-case" onClick={openFeatured} disabled={!featuredProject?.id}>
          <div className="rc-case-topline">
            <span>HIGHEST RISK CASE</span>
            <b>{featuredProject?.score || 0}/100</b>
          </div>
          <strong>{featuredProject?.name || 'No priority case available'}</strong>
          <small>
            {featuredProject?.district || '—'} · {featuredProject?.finding || 'Awaiting project intelligence'}
          </small>
          <b className="rc-case-link">Open investigation <ArrowRight size={14} /></b>
        </button>
      </section>

      <section className="rc-overview-kpis" aria-label="MPLADS risk overview">
        <OverviewKpi
          icon={WalletCards}
          label="PROJECT VALUE MONITORED"
          value={formatCurrency(metrics.monitoredValue)}
          detail="Total value across monitored works"
          tone="green"
        />
        <OverviewKpi
          icon={Building2}
          label="PROJECTS SCREENED"
          value={projects.length}
          detail="Financial + progress + field signals"
          tone="teal"
        />
        <OverviewKpi
          icon={AlertTriangle}
          label="PRIORITY RISK CASES"
          value={metrics.priority.length}
          detail={`${metrics.critical.length} critical · score 60+`}
          tone="red"
          onClick={() => navigate('alerts')}
        />
        <OverviewKpi
          icon={IndianRupee}
          label="FLAGGED PAYMENT VALUE"
          value={formatCurrency(metrics.flaggedValue)}
          detail={`${metrics.flagged.length} Payment anomalies requiring review`}
          tone="amber"
          onClick={() => navigate('payments')}
        />
        <OverviewKpi
          icon={ClipboardCheck}
          label="VERIFICATION QUEUE"
          value={metrics.pending.length}
          detail={`${metrics.delayed.length} Projects showing delay signals`}
          tone="blue"
          onClick={() => navigate('verification')}
        />
      </section>

      <section className="nir-flow rc-workflow" aria-label="NIRIKSHAN decision flow">
        {[
          ['01', 'DATA', Database, 'data'],
          ['02', 'DETECT', AlertTriangle, 'alerts'],
          ['03', 'CONNECT', Network, 'connected'],
          ['04', 'PRIORITIZE', BarChart3, 'alerts'],
          ['05', 'VERIFY', Eye, 'verification'],
          ['06', 'ACT & AUDIT', ShieldCheck, 'compliance'],
        ].map(([n, label, Icon, target], i) => (
          <button className="nir-flow-step" key={label} onClick={() => navigate(target)} title={`Go to ${label}`}>
            <span>{n}</span>
            <Icon size={19} />
            <strong>{label}</strong>
            {i < 5 && <i>→</i>}
          </button>
        ))}
      </section>

      <section className="rc-command-grid">
        <article className="nir-panel rc-risk-board">
          <PanelHeading
            kicker="RISK COMMAND"
            title="Where is risk coming from?"
            description="A portfolio view of risk severity and the signals pushing projects into review."
            action="Open risk queue"
            onAction={() => navigate('alerts')}
          />

          <div className="rc-risk-board-body">
            <div className="rc-risk-score-block">
              <span>AVERAGE RISK</span>
              <strong>{avgRisk}<small>/100</small></strong>
              <em>Portfolio risk index</em>
            </div>

            <div className="rc-risk-distribution">
              {riskMix.map((item) => (
                <div className="rc-risk-line" key={item.label}>
                  <div>
                    <span><i className={item.tone} />{item.label}</span>
                    <b>{item.count}</b>
                  </div>
                  <div className="rc-track">
                    <em className={item.tone} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rc-signal-strip">
            {signalMix.map((item, index) => (
              <button key={item.label} onClick={() => navigate('alerts')}>
                <span>0{index + 1}</span>
                <strong>{item.label}</strong>
                <b>{item.count}</b>
              </button>
            ))}
          </div>
        </article>

        <article className="nir-panel rc-featured-case">
          <PanelHeading
            kicker="FEATURED INVESTIGATION"
            title={featuredProject?.district ? `${featuredProject.district} · why flagged` : 'Why this case is flagged'}
            description="Independent signals converge into one reviewable risk case."
          />

          <div className="rc-case-summary">
            <div className="rc-case-score">
              <strong>{featuredProject?.score || 0}</strong>
              <span>/100 risk</span>
            </div>
            <div>
              <strong>Spend–progress gap detected</strong>
              <p>
                {featuredProject?.expenditure || 0}% expenditure against {featuredProject?.physical || 0}% physical progress,
                with supporting payment and connected-work signals.
              </p>
            </div>
          </div>

          <div className="rc-case-facts">
            <Fact label="Expenditure" value={`${featuredProject?.expenditure || 0}%`} />
            <Fact label="Physical progress" value={`${featuredProject?.physical || 0}%`} />
            <Fact label="Delay" value={featuredProject?.delay || '—'} />
            <Fact label="Vendor" value={featuredProject?.vendor || '—'} />
          </div>

          <button className="nir-primary wide rc-investigate" onClick={openFeatured} disabled={!featuredProject?.id}>
            Investigate project evidence <ArrowRight size={15} />
          </button>
        </article>
      </section>

      <section className="rc-action-grid">
        <article className="nir-panel rc-priority-panel">
          <PanelHeading
            kicker="PRIORITY QUEUE"
            title="What needs attention now?"
            description="Risk-ranked queue so officials can focus first on the cases with the strongest signals."
            action="View all"
            onAction={() => navigate('alerts')}
          />

          <div className="rc-priority-list">
            {!metrics.priority.length && (
              <div className="rc-empty-state">
                <ShieldCheck size={20} />
                <strong>No priority cases in the current dataset.</strong>
                <span>Continue monitoring as new project signals arrive.</span>
              </div>
            )}

            {metrics.priority.slice(0, 4).map((p, index) => (
              <button className="rc-priority-item" key={p.id} onClick={() => openProject(p.id)}>
                <span className="rc-priority-number">0{index + 1}</span>
                <span className="rc-priority-main">
                  <strong>{p.name}</strong>
                  <small>{p.id} · {p.district}, {p.state}</small>
                </span>
                <span className="rc-priority-finding">{p.finding || 'Multiple risk signals'}</span>
                <b className={p.score >= 80 ? 'critical' : p.score >= 60 ? 'high' : 'medium'}>
                  {p.score}<small>/100</small>
                </b>
                <ArrowRight size={15} />
              </button>
            ))}
          </div>
        </article>

        <article className="nir-panel rc-connect-panel">
          <PanelHeading
            kicker="CONNECT → VERIFY"
            title="From risk signal to verified evidence"
            description="Connect the signals, verify the evidence, then decide the action."
          />

          <div className="rc-chain">
            <button onClick={() => navigate('connected')}>
              <span className="rc-chain-icon"><Network size={17} /></span>
              <span>
                <strong>CONNECT RELATED SIGNALS</strong>
                <small>Project ↔ vendor ↔ agency ↔ related work</small>
              </span>
              <ArrowRight size={15} />
            </button>

            <div className="rc-chain-arrow">↓</div>

            <button onClick={() => navigate('verification')}>
              <span className="rc-chain-icon"><MapPinned size={17} /></span>
              <span>
                <strong>VERIFY AGAINST REALITY</strong>
                <small>GPS · image · timestamp · physical progress</small>
              </span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="rc-trust-note">
            <ClipboardCheck size={16} />
            <span><strong>Human verification is the final gate.</strong> AI prioritizes risk; officers validate evidence and decide action.</span>
          </div>
        </article>
      </section>
    </div>
  )
}

function OverviewKpi({ icon: Icon, label, value, detail, tone, onClick }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag className={`rc-overview-kpi ${tone}`} onClick={onClick} type={onClick ? 'button' : undefined}>
      <span className="rc-kpi-icon"><Icon size={18} /></span>
      <span className="rc-kpi-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </span>
    </Tag>
  )
}

function PanelHeading({ kicker, title, description, action, onAction }) {
  return (
    <div className="rc-panel-heading">
      <div>
        <span>{kicker}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && <button className="nir-link" onClick={onAction}>{action}<ArrowRight size={13} /></button>}
    </div>
  )
}

function Fact({ label, value }) {
  return (
    <div className="rc-fact">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
