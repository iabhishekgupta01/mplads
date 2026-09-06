import { useEffect, useState } from 'react'
import { Activity, ChevronLeft, ChevronRight, ClipboardCheck, IndianRupee, Map, ShieldCheck } from 'lucide-react'
import './hero.css'

const slides = [
  { image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=82', alt: 'Public road and infrastructure in India', type: 'Road infrastructure', risk: '82', financial: '85%', physical: '40%', delay: '4 months' },
  { image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=82', alt: 'School building and education infrastructure', type: 'Education infrastructure', risk: '34', financial: '72%', physical: '68%', delay: 'On track' },
  { image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=82', alt: 'Healthcare facility supporting a community', type: 'Health facility', risk: '47', financial: '64%', physical: '59%', delay: '1 month' },
  { image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=82', alt: 'Community infrastructure and construction work', type: 'Community development', risk: '68', financial: '78%', physical: '53%', delay: '2 months' },
  { image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=82', alt: 'Field team reviewing a public development project', type: 'Field inspection', risk: '29', financial: '51%', physical: '49%', delay: 'On track' },
]

export default function HeroSection() {
  const [active, setActive] = useState(0)
  const [entered, setEntered] = useState(false)
  const slide = slides[active]

  useEffect(() => { const timer = window.setTimeout(() => setEntered(true), 40); return () => window.clearTimeout(timer) }, [])
  useEffect(() => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined; const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 2500); return () => window.clearInterval(timer) }, [])
  const change = (direction) => setActive((value) => (value + direction + slides.length) % slides.length)

  return <section className={`strict-hero hero-rebuild ${entered ? 'is-entered' : ''}`} aria-label="MPLADS public development monitoring hero"><div className="hero-copy strict-hero-copy"><span className="strict-kicker">MPLADS AI MONITORING SYSTEM</span><h1>Monitor Development.<br /><em>Detect Risk.</em></h1><p>AI-assisted project monitoring for informed officer action.</p></div><div className="hero-carousel"><div className="hero-art-background" /><div className="hero-brush" /><div className="hero-decoration hero-decoration-one"><Map size={16} /></div><div className="hero-decoration hero-decoration-two"><Activity size={16} /></div><div className="hero-decoration hero-decoration-three"><ShieldCheck size={16} /></div><div className="hero-decoration hero-decoration-four"><IndianRupee size={16} /></div><div className="hero-decoration hero-decoration-five"><ClipboardCheck size={16} /></div><div className="hero-photo-stage">{slides.map((item, index) => <img key={item.image} className={`hero-photo ${index === active ? 'active' : ''}`} src={item.image} alt={item.alt} loading={index === 0 ? 'eager' : 'lazy'} />)}</div><div className="hero-badge hero-badge-risk"><strong>{slide.risk}</strong><small>{Number(slide.risk) >= 80 ? 'HIGH RISK' : 'RISK SCORE'}</small></div><div className="hero-badge hero-badge-finance"><strong>{slide.financial}</strong><small>FINANCIAL</small></div><div className="hero-badge hero-badge-physical"><strong>{slide.physical}</strong><small>PHYSICAL</small></div><div className="hero-project-label"><span>{slide.type}</span><strong>{slide.delay === 'On track' ? 'Progress on track' : `${slide.delay} estimated delay`}</strong><small>Monitoring signal</small></div><div className="hero-controls"><button onClick={() => change(-1)} aria-label="Previous development project"><ChevronLeft size={17} /></button><div className="hero-indicators">{slides.map((item, index) => <button key={item.type} className={index === active ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Show ${item.type}`} />)}</div><button onClick={() => change(1)} aria-label="Next development project"><ChevronRight size={17} /></button></div></div></section>
}
