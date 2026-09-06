import { useEffect, useState } from 'react'
import { Activity, AlertTriangle, ArrowRight, BarChart3, CheckCircle2, ChevronDown, Clock3, FileSearch, IndianRupee, LayoutDashboard, Map, Menu, Search, ShieldCheck, X } from 'lucide-react'
import '../styles/landing.css'
import HeroSection from '../components/landing/HeroSection.jsx'

const categories = [
  ['Risk & Alerts', '427 High Risk', AlertTriangle, 'coral'], ['Fund Utilization', '73.3% Utilized', IndianRupee, 'green'],
  ['Project Execution', '4,800+ Projects', LayoutDashboard, 'blue'], ['Cost Monitoring', 'Cost Risk Signals', BarChart3, 'gold'],
  ['Time Monitoring', 'Delay Signals', Clock3, 'purple'], ['Payment Analysis', 'Transaction Alerts', Activity, 'coral'],
  ['Geographic Intelligence', 'State / District', Map, 'green'], ['Project Similarity', 'Similarity Signals', FileSearch, 'blue'],
  ['Field Inspection', 'Verification Queue', Search, 'gold'], ['Compliance', 'Action Trail', ShieldCheck, 'purple'],
  ['Reports', 'Monitoring Reports', BarChart3, 'green'], ['AI Insights', 'Risk Intelligence', Activity, 'coral'],
]

const faqs = [
  ['What is the MPLADS AI Monitoring System?', 'It is an AI-assisted monitoring and decision-support prototype that connects financial, physical-progress, timeline and transaction signals for public development projects.'],
  ['How does the AI identify project risk?', 'The prototype combines multiple indicators, including financial-progress gaps, project delay, transaction patterns and similarity signals, to prioritize cases for human verification.'],
  ['What types of anomalies can be detected?', 'Examples include expenditure ahead of physical progress, repeated payment patterns, cost overrun risk, delay risk and possible project similarity.'],
  ['Does the AI confirm fraud?', 'No. The system produces risk indicators and anomaly signals to help prioritize projects for human verification and investigation. A model output is not, by itself, a legal determination of fraud.'],
  ['Can an officer request an audit from the system?', 'Yes. Authorized users can request an audit, place a payment workflow on hold, mark a case resolved and review the resulting compliance trail.'],
  ['Can the system scale from district to national monitoring?', 'The information architecture is designed for progressive drill-down from project to district, state and national views.'],
]

export default function LandingPage({ onEnter }) {
  void HeroVisual
  void DataBubble
  const [menuOpen, setMenuOpen] = useState(false)
  const [accessibilityOpen, setAccessibilityOpen] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [openFaq, setOpenFaq] = useState(3)
  const [activeCategory, setActiveCategory] = useState('Monitoring Areas')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return <div className={`strict-landing ${largeText ? 'is-large' : ''} ${highContrast ? 'is-contrast' : ''}`}>
    <a className="strict-skip" href="#main-content">Skip to content</a>
    <div className="strict-utility"><span>Government of India</span><span>MPLADS AI Monitoring System</span><button onClick={() => setAccessibilityOpen((value) => !value)} aria-expanded={accessibilityOpen}>Accessibility</button><span>English</span></div>
    <header className={`strict-header ${scrolled ? 'is-scrolled' : ''}`}><button className="strict-brand" onClick={() => scrollTo('hero')}><span className="strict-emblem">M</span><span><strong>MPLADS AI</strong><small>Monitoring System</small></span></button><nav className={menuOpen ? 'is-open' : ''}>{[['hero', 'Overview'], ['capabilities', 'Capabilities'], ['workflow', 'How It Works'], ['about', 'About'], ['faq', 'FAQ']].map(([id, label]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}<button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={19} /></button></nav><div className="strict-actions"><button className="strict-search" aria-label="Search projects"><Search size={16} /></button><button className="strict-portal" onClick={onEnter}>Access Portal <ArrowRight size={15} /></button><button className="strict-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={20} /></button></div>{accessibilityOpen && <div className="strict-access" role="dialog" aria-label="Accessibility options"><strong>Accessibility options</strong><button onClick={() => setLargeText((value) => !value)}>Text size <span>{largeText ? 'Larger' : 'Default'}</span></button><button onClick={() => setHighContrast((value) => !value)}>High contrast <span>{highContrast ? 'On' : 'Off'}</span></button><button onClick={() => { setLargeText(false); setHighContrast(false) }}>Reset</button></div>}</header>

    <main id="main-content">
      <HeroSection onEnter={onEnter} onWorkflow={() => scrollTo('workflow')} />
      <div className="strict-context">#PUBLICDEVELOPMENT <span>/</span> #MPLADSMONITORING</div><button className="strict-centre-cta" onClick={onEnter}>Enter Monitoring Portal <ArrowRight size={15} /></button>
      <section className="strict-stats"><Stat value="4,800+" label="Monitored Projects" tone="green" /><Stat value="28+" label="States / UTs" tone="mint" /><Stat value="427" label="High-Risk Projects" tone="risk" /></section>
      <section className="strict-capabilities" id="capabilities"><div className="strict-tabs">{['Monitoring Areas', 'States / UTs', 'Project Signals'].map((tab) => <button className={activeCategory === tab ? 'active' : ''} key={tab} onClick={() => setActiveCategory(tab)}>{tab}</button>)}</div><h2>Explore MPLADS monitoring<br />by capability</h2><p className="strict-section-lede">A public-service view of the signals officers use to monitor, investigate and act.</p><div className="strict-category-grid">{categories.map(([title, count, Icon, tone]) => <button className="strict-category" key={title} onClick={onEnter}><span className={`strict-category-icon ${tone}`}><Icon size={25} /></span><small>{count}</small><strong>{title}</strong><ArrowRight size={13} /></button>)}</div></section>
      <section className="strict-workflow" id="workflow"><div className="strict-section-label">HOW IT WORKS</div><h2>Easy steps to monitor<br />and act on project risk</h2><div className="strict-steps"><Step number="01" title="Monitor" text="View project, fund and execution information." icon={LayoutDashboard} /><Step number="02" title="Detect" text="AI identifies potential risk and anomaly patterns." icon={AlertTriangle} /><Step number="03" title="Investigate" text="Review explanation, evidence and predictions." icon={FileSearch} /><Step number="04" title="Act" text="Request audit, hold payment workflow or resolve." icon={CheckCircle2} /></div></section>
      <section className="strict-about" id="about"><div className="strict-about-copy"><div className="strict-section-label">ABOUT THE PLATFORM</div><h2>From passive reporting<br />to proactive oversight.</h2><p>The MPLADS AI Monitoring System is designed as an AI-assisted monitoring and decision-support platform for public development projects.</p><p>It brings together project progress, financial utilization, timelines and transaction signals to help authorized users identify potential risks, investigate supporting evidence and initiate appropriate action.</p><button className="strict-outline" onClick={onEnter}>Explore Monitoring Portal <ArrowRight size={15} /></button></div><MediaPreview /></section>
      <section className="strict-faq" id="faq"><div className="strict-faq-art"><span className="faq-orbit" /><span className="faq-question">?</span><Map size={72} /><AlertTriangle size={22} /><FileSearch size={22} /></div><div className="strict-faq-copy"><div className="strict-section-label">FREQUENTLY ASKED QUESTIONS</div><h2>Understand how<br />AI-assisted monitoring works</h2><div className="strict-faq-list">{faqs.map(([question, answer], index) => <div className={`strict-faq-item ${openFaq === index ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span><ChevronDown size={16} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>
      <section className="strict-final-cta"><div><span className="strict-section-label">READY TO ACT ON RISK?</span><h2>Turn complex monitoring data<br />into actionable intelligence.</h2></div><button className="strict-portal" onClick={onEnter}>Access Monitoring Portal <ArrowRight size={16} /></button></section>
    </main>
    <footer className="strict-footer"><div className="strict-footer-brand"><span className="strict-emblem">M</span><strong>MPLADS AI Monitoring System</strong><p>Prototype / Demonstration Environment.<br />AI-assisted monitoring for accountable development.</p></div><FooterGroup title="Quick Links"><button onClick={() => scrollTo('hero')}>Overview</button><button onClick={() => scrollTo('capabilities')}>Capabilities</button><button onClick={() => scrollTo('workflow')}>How It Works</button><button onClick={() => scrollTo('about')}>About</button><button onClick={() => scrollTo('faq')}>FAQ</button></FooterGroup><FooterGroup title="Useful Links"><a href="https://www.digitalindia.gov.in/" target="_blank" rel="noreferrer">Digital India</a><a href="https://www.mygov.in/" target="_blank" rel="noreferrer">MyGov</a><a href="https://www.india.gov.in/" target="_blank" rel="noreferrer">National Portal</a><a href="https://www.data.gov.in/" target="_blank" rel="noreferrer">Open Government Data</a></FooterGroup><FooterGroup title="Get in Touch"><button onClick={() => window.alert('Contact placeholder for this prototype.')}>Contact</button><button onClick={() => window.alert('Feedback placeholder for this prototype.')}>Feedback</button><button onClick={() => setAccessibilityOpen(true)}>Accessibility</button><button onClick={onEnter}>Portal Login</button></FooterGroup><div className="strict-footer-bottom"><span>Privacy · Disclaimer · Terms & Conditions · Accessibility</span><span>© 2026 MPLADS AI Monitoring System · Prototype Environment</span></div></footer>
  </div>
}

function HeroVisual() { return <div className="strict-hero-visual"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="india-ghost">INDIA</div><div className="infrastructure-visual"><div className="road" /><div className="facility"><span /><span /><span /></div><div className="hill hill-one" /><div className="hill hill-two" /></div><DataBubble className="bubble-risk" value="82" label="HIGH RISK" /><DataBubble className="bubble-finance" value="85%" label="FINANCIAL" /><DataBubble className="bubble-physical" value="40%" label="PHYSICAL" /><div className="hero-mini-card"><span>PROJECT RISK OVERVIEW</span><strong>427 <small>High Risk Projects</small></strong><div className="mini-bars"><i /><i /><i /><i /><i /><i /><i /></div><b>Road Construction – Sehore</b><small>MP-2024-1001 · 82 HIGH</small></div></div> }
function DataBubble({ className, value, label }) { return <div className={`data-bubble ${className}`}><strong>{value}</strong><small>{label}</small></div> }
function Stat({ value, label, tone }) { return <div className={`strict-stat ${tone}`}><strong>{value}</strong><span>{label}</span><ArrowRight size={14} /></div> }
function Step({ number, title, text, icon: Icon }) { return <article className="strict-step"><span className="step-number">{number}</span><div className="step-icon"><Icon size={24} /></div><h3>{title}</h3><p>{text}</p></article> }
function MediaPreview() { return <div className="media-preview"><div className="media-art"><div className="media-sky" /><div className="media-sun" /><div className="media-road" /><div className="media-building"><span /><span /><span /></div><div className="media-tree tree-one" /><div className="media-tree tree-two" /></div><button className="media-play" aria-label="Preview monitoring story"><ArrowRight size={22} /></button><span className="media-caption">PUBLIC DEVELOPMENT · PROJECT CONTEXT</span></div> }
function FooterGroup({ title, children }) { return <div className="strict-footer-group"><strong>{title}</strong>{children}</div> }
