import { useState } from 'react'
import { AlertTriangle, ArrowLeft, CheckCircle, Download, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency, riskLabel } from '../utils/formatters.js'

export function ProjectDetail() {
  const { selected, setModal, navigate } = useApp()
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

  const gap = project.expenditure - project.physical

  return (
    <div className="project-detail-container">
      {/* BREADCRUMB AND HEADER ACTIONS MATCHING SCREENSHOT */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="breadcrumb-line" style={{ margin: 0 }}>
          Home / Projects / <span>{project.name}</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="secondary-btn" onClick={() => alert('Downloading official monitoring report PDF...')}>
            <Download size={15} /> Download Report
          </button>
          <button className="secondary-btn" onClick={() => navigate('projects')}>
            <ArrowLeft size={15} /> Back
          </button>
        </div>
      </div>

      {/* PROJECT TITLE CARD MATCHING SCREENSHOT */}
      <div className="project-header-card">
        <div className="project-header-top">
          <div className="project-title-box">
            <h1>
              {project.name}
              <span className={`badge-pill ${riskLabel(project.score).toLowerCase()}`}>
                <i /> {riskLabel(project.score)} Risk
              </span>
            </h1>
            <div className="project-meta-line">
              Project ID: <strong>{project.id}</strong> | District: <strong>{project.district}</strong> | Work Type:{' '}
              <strong>{project.category}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 6 COMPACT KPI SUMMARY CARDS IN A ROW */}
      <div className="kpi-6-strip">
        <div className="kpi-6-item">
          <span>Sanctioned Amount</span>
          <strong>{formatCurrency(project.amount)}</strong>
        </div>
        <div className="kpi-6-item">
          <span>Released Amount</span>
          <strong>₹ 18,00,000</strong>
        </div>
        <div className="kpi-6-item">
          <span>Expenditure</span>
          <strong>
            ₹ 17,00,000 <small style={{ fontSize: 12, color: '#dc2626', fontWeight: 600 }}>({project.expenditure}%)</small>
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

      {/* PROJECT TABS BAR MATCHING SCREENSHOT */}
      <div className="project-tabs-bar">
        {['Overview', 'Progress & Fund', 'Payments', 'Risk Analysis', 'Alerts', 'Documents'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB CONTENT MATCHING SCREENSHOT */}
      {activeTab === 'Overview' && (
        <>
          <div className="detail-overview-grid">
            {/* PANEL 1: AI RISK SCORE */}
            <div className="panel" style={{ textAlign: 'center' }}>
              <div className="panel-head">
                <h2>AI Risk Score</h2>
              </div>
              <div className="risk-gauge-box">
                <div className="half-gauge-ring">
                  <div className="half-gauge-inner" />
                </div>
                <div className="gauge-score-value">
                  <strong>{project.score}</strong>
                  <span style={{ fontSize: 13 }}>/ 100</span>
                  <span style={{ color: '#dc2626', fontSize: 14, fontWeight: 800, marginTop: 4 }}>
                    {riskLabel(project.score)} Risk
                  </span>
                </div>
              </div>
            </div>

            {/* PANEL 2: WHY IS THIS PROJECT FLAGGED? */}
            <div className="panel">
              <div className="panel-head">
                <h2>Why is this project flagged?</h2>
              </div>
              <div className="evidence-bullet-list">
                <div className="evidence-item">
                  <AlertTriangle size={16} />
                  <span>
                    Expenditure (<strong>{project.expenditure}%</strong>) is significantly higher than physical progress (
                    <strong>{project.physical}%</strong>).
                  </span>
                </div>
                <div className="evidence-item">
                  <AlertTriangle size={16} />
                  <span>Project delay of {project.delay} detected against milestone baseline.</span>
                </div>
                <div className="evidence-item">
                  <AlertTriangle size={16} />
                  <span>Abnormal payment pattern identified (3 clustered payments within 48 hours).</span>
                </div>
                <div className="evidence-item">
                  <AlertTriangle size={16} />
                  <span>Similar projects found in nearby location (Duplicate probability: 66%).</span>
                </div>
              </div>
            </div>

            {/* PANEL 3: AI PREDICTIONS */}
            <div className="panel">
              <div className="panel-head">
                <h2>AI Predictions</h2>
              </div>
              <div className="predictions-list">
                <div className="prediction-row">
                  <span>Delay Probability</span>
                  <strong>78%</strong>
                </div>
                <div className="prediction-row">
                  <span>Cost Overrun Risk</span>
                  <strong>65%</strong>
                </div>
                <div className="prediction-row">
                  <span>Anomaly Score</span>
                  <strong>82</strong>
                </div>
              </div>
            </div>
          </div>

          {/* FINANCIAL VS PHYSICAL PROGRESS COMPARISON */}
          <div className="gap-comparison-box">
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Financial vs Physical Progress</h3>

            <div className="bar-comp-row">
              <label>
                <span>Financial Expenditure</span>
                <span>{project.expenditure}%</span>
              </label>
              <div className="bar-comp-track">
                <div className="bar-comp-fill blue" style={{ width: `${project.expenditure}%` }} />
              </div>
            </div>

            <div className="bar-comp-row">
              <label>
                <span>Physical Progress</span>
                <span>{project.physical}%</span>
              </label>
              <div className="bar-comp-track">
                <div className="bar-comp-fill amber" style={{ width: `${project.physical}%` }} />
              </div>
            </div>

            <div className="gap-callout-clean">
              Progress Gap: {gap} percentage points. Expenditure is materially ahead of reported physical work.
            </div>
          </div>

          {/* RECOMMENDED ACTION BANNER MATCHING SCREENSHOT */}
          <div className="recommended-action-banner">
            <div className="action-banner-text">
              <strong>Recommended Action</strong>
              <p>Field verification recommended. Check physical progress and payment records.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="primary-btn" onClick={() => setModal('audit')}>
                <ShieldCheck size={16} /> Request Field Audit
              </button>
              <button className="danger-btn" onClick={() => setModal('halt')}>
                <AlertTriangle size={16} /> Halt Payment
              </button>
              <button className="secondary-btn" onClick={() => setModal('resolve')}>
                <CheckCircle size={16} /> Mark Resolved
              </button>
            </div>
          </div>
        </>
      )}

      {/* OTHER TABS PLACEHOLDERS */}
      {activeTab !== 'Overview' && (
        <div className="panel" style={{ textAlign: 'center', padding: 40 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{activeTab} Details</h3>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>
            Detailed breakdown for {activeTab} is synchronized with mock data. Select Overview for primary AI risk assessment.
          </p>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
