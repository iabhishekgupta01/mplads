import { useEffect, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileSearch,
  IndianRupee,
  LayoutDashboard,
  Map,
  Menu,
  Search,
  ShieldCheck,
  X
} from 'lucide-react'

import '../styles/landing.css'
import HeroSection from '../components/landing/HeroSection.jsx'


const categories = [
  ['Risk & Alerts', '427 High Risk', AlertTriangle, 'coral'],
  ['Fund Utilization', '73.3% Utilized', IndianRupee, 'green'],
  ['Project Execution', '4,800+ Projects', LayoutDashboard, 'blue'],
  ['Cost Monitoring', 'Cost Risk Signals', BarChart3, 'gold'],
  ['Time Monitoring', 'Delay Signals', Clock3, 'purple'],
  ['Payment Analysis', 'Transaction Alerts', Activity, 'coral'],
  ['Geographic Intelligence', 'State / District', Map, 'green'],
  ['Project Similarity', 'Similarity Signals', FileSearch, 'blue'],
  ['Field Inspection', 'Verification Queue', Search, 'gold'],
  ['Compliance', 'Action Trail', ShieldCheck, 'purple'],
  ['Reports', 'Monitoring Reports', BarChart3, 'green'],
  ['AI Insights', 'Risk Intelligence', Activity, 'coral'],
]


const faqs = [
  [
    'What is the MPLADS AI Monitoring System?',
    'It is an AI-assisted monitoring and decision-support prototype that connects financial, physical-progress, timeline and transaction signals for public development projects.'
  ],
  [
    'How does the AI identify project risk?',
    'The prototype combines multiple indicators, including financial-progress gaps, project delay, transaction patterns and similarity signals, to prioritize cases for human verification.'
  ],
  [
    'What types of anomalies can be detected?',
    'Examples include expenditure ahead of physical progress, repeated payment patterns, cost overrun risk, delay risk and possible project similarity.'
  ],
  [
    'Does the AI confirm fraud?',
    'No. The system produces risk indicators and anomaly signals to help prioritize projects for human verification and investigation. A model output is not, by itself, a legal determination of fraud.'
  ],
  [
    'Can an officer request an audit from the system?',
    'Yes. Authorized users can request an audit, place a payment workflow on hold, mark a case resolved and review the resulting compliance trail.'
  ],
  [
    'Can the system scale from district to national monitoring?',
    'The information architecture is designed for progressive drill-down from project to district, state and national views.'
  ],
]


export default function LandingPage({ onEnter }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [accessibilityOpen, setAccessibilityOpen] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [openFaq, setOpenFaq] = useState(3)
  const [activeCategory, setActiveCategory] = useState('Monitoring Areas')
  const [scrolled, setScrolled] = useState(false)


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])


  const scrollTo = (id) => {
    setMenuOpen(false)

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
  }


  return (
    <div
      className={`strict-landing ${
        largeText ? 'is-large' : ''
      } ${highContrast ? 'is-contrast' : ''}`}
    >

      {/* ACCESSIBILITY SKIP LINK */}
      <a className="strict-skip" href="#main-content">
        Skip to content
      </a>


      {/* TOP GOVERNMENT UTILITY BAR */}
      <div className="strict-utility">
        <span>Government of India</span>

        <span>MPLADS AI Monitoring System</span>

        <button
          onClick={() =>
            setAccessibilityOpen((value) => !value)
          }
          aria-expanded={accessibilityOpen}
        >
          Accessibility
        </button>

        <span>English</span>
      </div>


      {/* HEADER */}
      <header
        className={`strict-header ${
          scrolled ? 'is-scrolled' : ''
        }`}
      >

        <button
          className="strict-brand"
          onClick={() => scrollTo('hero')}
        >
          <span className="strict-emblem">M</span>

          <span>
            <strong>MPLADS AI</strong>
            <small>Monitoring System</small>
          </span>
        </button>


        <nav className={menuOpen ? 'is-open' : ''}>

          {[
            ['hero', 'Overview'],
            ['problem', 'Problem'],
            ['solution', 'Solution'],
            ['workflow', 'How It Works'],
            ['capabilities', 'Capabilities'],
            ['about', 'About'],
            ['faq', 'FAQ']
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}


          <button
            className="mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>

        </nav>


        <div className="strict-actions">

          <button
            className="strict-search"
            aria-label="Search projects"
          >
            <Search size={16} />
          </button>


          <button
            className="strict-portal"
            onClick={onEnter}
          >
            <span className="portal-label-long">
              Access Portal
            </span>

            <span className="portal-label-short">
              Portal
            </span>

            <ArrowRight size={15} />
          </button>


          <button
            className="strict-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

        </div>


        {accessibilityOpen && (
          <div
            className="strict-access"
            role="dialog"
            aria-label="Accessibility options"
          >

            <strong>Accessibility options</strong>

            <button
              onClick={() =>
                setLargeText((value) => !value)
              }
            >
              Text size
              <span>
                {largeText ? 'Larger' : 'Default'}
              </span>
            </button>

            <button
              onClick={() =>
                setHighContrast((value) => !value)
              }
            >
              High contrast
              <span>
                {highContrast ? 'On' : 'Off'}
              </span>
            </button>

            <button
              onClick={() => {
                setLargeText(false)
                setHighContrast(false)
              }}
            >
              Reset
            </button>

          </div>
        )}

      </header>


      {/* =====================================================
          MAIN LANDING PAGE
      ===================================================== */}

      <main id="main-content">


        {/* =================================================
            01 — HERO
        ================================================= */}

        <section id="hero">

          <HeroSection
            onEnter={onEnter}
            onWorkflow={() => scrollTo('workflow')}
          />

        </section>


        {/* CONTEXT */}
        <div className="strict-context">
          #PUBLICDEVELOPMENT
          <span>/</span>
          #MPLADSMONITORING
        </div>


        <button
          className="strict-centre-cta"
          onClick={onEnter}
        >
          Enter Monitoring Portal
          <ArrowRight size={15} />
        </button>


        {/* =================================================
            02 — PROBLEM WE SOLVE
        ================================================= */}

        <section
          className="strict-problem"
          id="problem"
        >

          <div className="strict-problem-intro">

            <div>

              <div className="strict-section-label">
                THE PROBLEM WE SOLVE
              </div>

              <h2>
                From fragmented monitoring
                <br />
                to <em>intelligent oversight.</em>
              </h2>

            </div>


            <p>
              MPLADS generates large volumes of financial,
              execution, payment and field data. The challenge
              is turning these disconnected signals into timely,
              actionable risk intelligence.
            </p>

          </div>


          <div className="strict-problem-list">


            {/* PROBLEM 01 */}

            <article className="problem-row">

              <span className="problem-index">
                01
              </span>

              <div className="problem-icon">
                <LayoutDashboard size={22} />
              </div>

              <div className="problem-content">

                <h3>
                  Fragmented Project Intelligence
                </h3>

                <p>
                  Financial, payment, progress, spatial and
                  field signals are not jointly analyzed for
                  project risk.
                </p>

              </div>

              <span className="problem-tag">
                DISCONNECTED SIGNALS
              </span>

            </article>


            {/* PROBLEM 02 */}

            <article className="problem-row">

              <span className="problem-index">
                02
              </span>

              <div className="problem-icon risk-icon">
                <AlertTriangle size={22} />
              </div>

              <div className="problem-content">

                <h3>
                  Hidden Irregularities &amp; Duplication
                </h3>

                <p>
                  Anomalies, duplicate works and suspicious
                  patterns are difficult to detect early across
                  large project volumes.
                </p>

              </div>

              <span className="problem-tag">
                HIDDEN PATTERNS
              </span>

            </article>


            {/* PROBLEM 03 */}

            <article className="problem-row">

              <span className="problem-index">
                03
              </span>

              <div className="problem-icon time-icon">
                <Clock3 size={22} />
              </div>

              <div className="problem-content">

                <h3>
                  Delayed Risk Visibility
                </h3>

                <p>
                  Cost, delay and reported-vs-actual progress
                  deviations can surface only after significant
                  execution has already occurred.
                </p>

              </div>

              <span className="problem-tag">
                LATE DETECTION
              </span>

            </article>


            {/* PROBLEM 04 */}

            <article className="problem-row">

              <span className="problem-index">
                04
              </span>

              <div className="problem-icon priority-icon">
                <BarChart3 size={22} />
              </div>

              <div className="problem-content">

                <h3>
                  No Risk-Based Prioritization
                </h3>

                <p>
                  Officials lack a clear view of what needs
                  attention first — and why.
                </p>

              </div>

              <span className="problem-tag">
                MANUAL PRIORITY
              </span>

            </article>

          </div>

        </section>


        {/* =================================================
            03 — HOW NIRIKSHAN SOLVES IT
        ================================================= */}

        <section
          className="strict-solution"
          id="solution"
        >

          <div className="strict-solution-heading">

            <div className="strict-section-label">
              THE NIRIKSHAN APPROACH
            </div>

            <h2>
              One platform →
              <span> complete project intelligence.</span>
            </h2>

            <p>
              NIRIKSHAN connects project data, AI-driven
              detection, evidence verification and human
              decision-making into one continuous intelligence
              layer.
            </p>

          </div>


          <div className="solution-flow">


            {/* SOLUTION 01 */}

            <article className="solution-item">

              <div className="solution-number">
                01
              </div>

              <div className="solution-main">

                <div className="solution-icon">
                  <LayoutDashboard size={22} />
                </div>

                <div>

                  <span className="solution-label">
                    UNIFY
                  </span>

                  <h3>
                    Unify Project Information
                  </h3>

                  <p>
                    Financial + payment + progress +
                    spatial + field data become a single
                    <strong>
                      {' '}Project Intelligence Profile.
                    </strong>
                  </p>

                </div>

              </div>

            </article>


            {/* SOLUTION 02 */}

            <article className="solution-item">

              <div className="solution-number">
                02
              </div>

              <div className="solution-main">

                <div className="solution-icon">
                  <AlertTriangle size={22} />
                </div>

                <div>

                  <span className="solution-label">
                    DETECT
                  </span>

                  <h3>
                    Detect Hidden Anomalies
                  </h3>

                  <p>
                    Rules + ML + Graph + Geo-Spatial AI +
                    CV identify
                    <strong>
                      {' '}anomalies, deviations and
                      duplicate patterns.
                    </strong>
                  </p>

                </div>

              </div>

            </article>


            {/* SOLUTION 03 */}

            <article className="solution-item">

              <div className="solution-number">
                03
              </div>

              <div className="solution-main">

                <div className="solution-icon">
                  <Activity size={22} />
                </div>

                <div>

                  <span className="solution-label">
                    INTELLIGENCE
                  </span>

                  <h3>
                    Predict &amp; Explain Risk
                  </h3>

                  <p>
                    Multiple signals are fused into a
                    <strong>
                      {' '}Risk Fingerprint, 0–100 Risk
                      Score and Risk Drivers.
                    </strong>
                  </p>

                </div>

              </div>

            </article>


            {/* SOLUTION 04 */}

            <article className="solution-item">

              <div className="solution-number">
                04
              </div>

              <div className="solution-main">

                <div className="solution-icon">
                  <ShieldCheck size={22} />
                </div>

                <div>

                  <span className="solution-label">
                    VERIFY &amp; ACT
                  </span>

                  <h3>
                    Verify &amp; Act
                  </h3>

                  <p>
                    Evidence → Alert → Human Verification →
                    Action →
                    <strong>
                      {' '}traceable Audit Trail.
                    </strong>
                  </p>

                </div>

              </div>

            </article>

          </div>


          {/* USP */}

          <div className="solution-usp">

            <span>DETECT</span>

            <i>→</i>

            <span>EXPLAIN</span>

            <i>→</i>

            <span>VERIFY</span>

            <i>→</i>

            <span>ACT</span>

            <i>→</i>

            <span>AUDIT</span>

          </div>

        </section>


        {/* =================================================
            04 — WORKFLOW
        ================================================= */}

        <section
          className="strict-workflow"
          id="workflow"
        >

          <div className="strict-section-label">
            HOW IT WORKS
          </div>

          <h2>
            From government data
            <br />
            to <span>verified action.</span>
          </h2>

          <p className="workflow-intro">
            A continuous intelligence pipeline that converts
            raw project data into explainable risk, verified
            evidence and accountable action.
          </p>


          <div className="workflow-diagram">


            <WorkflowNode
              number="01"
              title="Collect"
              text="MPLADS • Financial • Payment • Progress • Geo • Field Evidence"
              icon={FileSearch}
            />

            <WorkflowConnector />


            <WorkflowNode
              number="02"
              title="Prepare"
              text="Clean • Validate • Normalize • Entity Resolution"
              icon={CheckCircle2}
            />

            <WorkflowConnector />


            <WorkflowNode
              number="03"
              title="Detect"
              text="Rules • ML • CV → Anomalies • Deviations • Duplicates"
              icon={AlertTriangle}
              active
            />

            <WorkflowConnector />


            <WorkflowNode
              number="04"
              title="Connect"
              text="Knowledge Graph • Temporal GNN • Geo-Spatial AI"
              icon={Activity}
            />

            <WorkflowConnector />


            <WorkflowNode
              number="05"
              title="Verify"
              text="Images • GPS • Timestamp • Provenance"
              icon={Map}
            />

            <WorkflowConnector />


            <WorkflowNode
              number="06"
              title="Predict & Prioritize"
              text="Risk Fusion → Risk Fingerprint → 0–100 Score → Early Warning"
              icon={BarChart3}
              active
            />

            <WorkflowConnector />


            <WorkflowNode
              number="07"
              title="Act & Audit"
              text="Human Decision → Action → Audit Trail → Feedback"
              icon={ShieldCheck}
              final
            />

          </div>


          <div className="workflow-bottom">

            <span>AI INTELLIGENCE</span>

            <span className="workflow-line" />

            <strong>
              Human Oversight
            </strong>

            <span className="workflow-line" />

            <span>
              ACCOUNTABLE ACTION
            </span>

          </div>

        </section>


        {/* =================================================
            05 — EXISTING CAPABILITIES
        ================================================= */}

        <section
          className="strict-capabilities"
          id="capabilities"
        >

          <div className="strict-tabs">

            {[
              'Monitoring Areas',
              'States / UTs',
              'Project Signals'
            ].map((tab) => (

              <button
                className={
                  activeCategory === tab
                    ? 'active'
                    : ''
                }
                key={tab}
                onClick={() =>
                  setActiveCategory(tab)
                }
              >
                {tab}
              </button>

            ))}

          </div>


          <h2>
            Explore MPLADS monitoring
            <br />
            by capability
          </h2>


          <p className="strict-section-lede">
            A public-service view of the signals officers
            use to monitor, investigate and act.
          </p>


          <div className="strict-category-grid">

            {categories.map(
              ([title, count, Icon, tone]) => (

                <button
                  className="strict-category"
                  key={title}
                  onClick={onEnter}
                >

                  <span
                    className={`strict-category-icon ${tone}`}
                  >
                    <Icon size={25} />
                  </span>

                  <small>
                    {count}
                  </small>

                  <strong>
                    {title}
                  </strong>

                  <ArrowRight size={13} />

                </button>

              )
            )}

          </div>

        </section>


        {/* =================================================
            06 — QUICK STATS
        ================================================= */}

        <section className="strict-stats">

          <Stat
            value="4,800+"
            label="Monitored Projects"
            tone="green"
          />

          <Stat
            value="28+"
            label="States / UTs"
            tone="mint"
          />

          <Stat
            value="427"
            label="High-Risk Projects"
            tone="risk"
          />

        </section>


        {/* =================================================
            07 — ABOUT
        ================================================= */}

        <section
          className="strict-about"
          id="about"
        >

          <div className="strict-about-copy">

            <div className="strict-section-label">
              ABOUT THE PLATFORM
            </div>

            <h2>
              From passive reporting
              <br />
              to proactive oversight.
            </h2>

            <p>
              The MPLADS AI Monitoring System is designed as
              an AI-assisted monitoring and decision-support
              platform for public development projects.
            </p>

            <p>
              It brings together project progress, financial
              utilization, timelines and transaction signals
              to help authorized users identify potential
              risks, investigate supporting evidence and
              initiate appropriate action.
            </p>

            <button
              className="strict-outline"
              onClick={onEnter}
            >
              Explore Monitoring Portal
              <ArrowRight size={15} />
            </button>

          </div>


          <MediaPreview />

        </section>


        {/* =================================================
            08 — FAQ
        ================================================= */}

        <section
          className="strict-faq"
          id="faq"
        >

          <div className="strict-faq-art">

            <span className="faq-orbit" />

            <span className="faq-question">
              ?
            </span>

            <Map size={72} />

            <AlertTriangle size={22} />

            <FileSearch size={22} />

          </div>


          <div className="strict-faq-copy">

            <div className="strict-section-label">
              FREQUENTLY ASKED QUESTIONS
            </div>

            <h2>
              Understand how
              <br />
              AI-assisted monitoring works
            </h2>


            <div className="strict-faq-list">

              {faqs.map(
                ([question, answer], index) => (

                  <div
                    className={`strict-faq-item ${
                      openFaq === index
                        ? 'open'
                        : ''
                    }`}
                    key={question}
                  >

                    <button
                      onClick={() =>
                        setOpenFaq(
                          openFaq === index
                            ? -1
                            : index
                        )
                      }
                      aria-expanded={
                        openFaq === index
                      }
                    >

                      <span>
                        {question}
                      </span>

                      <ChevronDown size={16} />

                    </button>


                    {openFaq === index && (
                      <p>
                        {answer}
                      </p>
                    )}

                  </div>

                )
              )}

            </div>

          </div>

        </section>


        {/* =================================================
            09 — FINAL CTA
        ================================================= */}

        <section className="strict-final-cta">

          <div>

            <span className="strict-section-label">
              READY TO ACT ON RISK?
            </span>

            <h2>
              Turn complex monitoring data
              <br />
              into actionable intelligence.
            </h2>

          </div>


          <button
            className="strict-portal"
            onClick={onEnter}
          >
            Access Monitoring Portal
            <ArrowRight size={16} />
          </button>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="strict-footer">

        <div className="strict-footer-brand">

          <span className="strict-emblem">
            M
          </span>

          <strong>
            MPLADS AI Monitoring System
          </strong>

          <p>
            Prototype / Demonstration Environment.
            <br />
            AI-assisted monitoring for accountable
            development.
          </p>

        </div>


        <FooterGroup title="Quick Links">

          <button onClick={() => scrollTo('hero')}>
            Overview
          </button>

          <button onClick={() => scrollTo('problem')}>
            Problem
          </button>

          <button onClick={() => scrollTo('solution')}>
            Solution
          </button>

          <button onClick={() => scrollTo('workflow')}>
            How It Works
          </button>

          <button onClick={() => scrollTo('capabilities')}>
            Capabilities
          </button>

          <button onClick={() => scrollTo('about')}>
            About
          </button>

          <button onClick={() => scrollTo('faq')}>
            FAQ
          </button>

        </FooterGroup>


        <FooterGroup title="Useful Links">

          <a
            href="https://www.digitalindia.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            Digital India
          </a>

          <a
            href="https://www.mygov.in/"
            target="_blank"
            rel="noreferrer"
          >
            MyGov
          </a>

          <a
            href="https://www.india.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            National Portal
          </a>

          <a
            href="https://www.data.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            Open Government Data
          </a>

        </FooterGroup>


        <FooterGroup title="Get in Touch">

          <button
            onClick={() =>
              window.alert(
                'Contact placeholder for this prototype.'
              )
            }
          >
            Contact
          </button>

          <button
            onClick={() =>
              window.alert(
                'Feedback placeholder for this prototype.'
              )
            }
          >
            Feedback
          </button>

          <button
            onClick={() =>
              setAccessibilityOpen(true)
            }
          >
            Accessibility
          </button>

          <button onClick={onEnter}>
            Portal Login
          </button>

        </FooterGroup>


        <div className="strict-footer-bottom">

          <span>
            Privacy · Disclaimer · Terms &amp; Conditions ·
            Accessibility
          </span>

          <span>
            © 2026 MPLADS AI Monitoring System · Prototype
            Environment
          </span>

        </div>

      </footer>

    </div>
  )
}


/* =========================================================
   WORKFLOW NODE
========================================================= */

function WorkflowNode({
  number,
  title,
  text,
  icon: Icon,
  active = false,
  final = false
}) {
  return (
    <article
      className={`workflow-node ${
        active ? 'is-active' : ''
      } ${final ? 'is-final' : ''}`}
    >

      <div className="workflow-node-top">

        <span className="workflow-node-number">
          {number}
        </span>

        <span className="workflow-node-icon">
          <Icon size={20} />
        </span>

      </div>


      <h3>
        {title}
      </h3>


      <p>
        {text}
      </p>

    </article>
  )
}


/* =========================================================
   WORKFLOW CONNECTOR
========================================================= */

function WorkflowConnector() {
  return (
    <div
      className="workflow-connector"
      aria-hidden="true"
    >
      <span />

      <ArrowRight size={16} />

    </div>
  )
}


/* =========================================================
   STAT
========================================================= */

function Stat({
  value,
  label,
  tone
}) {
  return (
    <div
      className={`strict-stat ${tone}`}
    >

      <strong>
        {value}
      </strong>

      <span>
        {label}
      </span>

      <ArrowRight size={14} />

    </div>
  )
}


/* =========================================================
   MEDIA PREVIEW
========================================================= */

function MediaPreview() {
  return (
    <div className="media-preview">

      <div className="media-art">

        <div className="media-sky" />

        <div className="media-sun" />

        <div className="media-road" />

        <div className="media-building">
          <span />
          <span />
          <span />
        </div>

        <div className="media-tree tree-one" />

        <div className="media-tree tree-two" />

      </div>


      <button
        className="media-play"
        aria-label="Preview monitoring story"
      >
        <ArrowRight size={22} />
      </button>


      <span className="media-caption">
        PUBLIC DEVELOPMENT · PROJECT CONTEXT
      </span>

    </div>
  )
}


/* =========================================================
   FOOTER GROUP
========================================================= */

function FooterGroup({
  title,
  children
}) {
  return (
    <div className="strict-footer-group">

      <strong>
        {title}
      </strong>

      {children}

    </div>
  )
}