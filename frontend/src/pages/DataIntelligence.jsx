import { useMemo } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  FileText,
  GitMerge,
  Globe,
  Link2,
  MapPin,
  ShieldCheck,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'

export default function DataIntelligence() {
  const { projects, payments, vendors, inspections, navigate, openProject } = useApp()

  const stats = useMemo(() => ({
    projectCount: projects.length,
    paymentCount: payments.length,
    vendorCount: vendors.length,
    inspectionCount: inspections.length,
    totalSanctioned: projects.reduce((s, p) => s + (p.amount || 0), 0),
    flaggedPayments: payments.filter(p => p.flagged).length,
    states: new Set(projects.map(p => p.state).filter(Boolean)).size,
    districts: new Set(projects.map(p => p.district).filter(Boolean)).size,
    highRisk: projects.filter(p => p.score >= 70).length,
    withCoords: projects.filter(p => p.latitude && p.longitude).length,
    withVendor: projects.filter(p => p.vendorId).length,
    withInspection: inspections.length,
  }), [projects, payments, vendors, inspections])

  return (
    <div className="nir-page">

      {/* HEADER */}
      <section className="nir-command-hero" style={{ background: '#0f2339' }}>
        <div>
          <span className="nir-eyebrow" style={{ color: '#7fb3d3' }}>
            <Database size={13} /> STAGE 01 · DATA INTELLIGENCE
          </span>
          <h1>
            What enters <em>NIRIKSHAN?</em>
          </h1>
          <p>
            MPLADS implementation data — financial records, progress updates, payment transactions,
            spatial information, vendor registrations and field evidence — flows into
            NIRIKSHAN through a validation and normalization pipeline, creating a unified
            Project Intelligence Profile for each work.
          </p>
        </div>
        <div className="nir-hero-action" style={{ borderLeftColor: '#1e3d5c' }}>
          <span style={{ color: '#7fb3d3' }}>PORTFOLIO LOADED</span>
          <strong>{stats.projectCount} projects</strong>
          <small style={{ color: '#a8c5d6' }}>{stats.states} states · {stats.districts} districts</small>
          <button onClick={() => navigate('alerts')} style={{ marginTop: 8 }}>
            View AI priority queue <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* ====== WORKFLOW STEP ====== */}
      <section style={{ margin: '20px 0', padding: '16px 20px', background: '#f8faf9', borderRadius: 10, border: '1px solid #dce7e3', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        {[
          ['MPLADS DATA INTAKE', '#2563eb'],
          ['VALIDATE', '#0891b2'],
          ['NORMALIZE', '#0284c7'],
          ['ENTITY MATCH / LINK', '#0369a1'],
          ['PROJECT INTELLIGENCE PROFILE', '#1b3c43'],
        ].map(([step, color], i) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color, padding: '4px 10px', background: `${color}15`, borderRadius: 4, border: `1px solid ${color}30` }}>
              {step}
            </span>
            {i < 4 && <ArrowRight size={14} style={{ color: '#8ca59f' }} />}
          </div>
        ))}
      </section>

      {/* ====== DATA STREAMS GRID ====== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginTop: 4 }}>

        <DataStream
          icon={<FileText size={22} />}
          title="Project Records"
          subtitle="MPLADS work entries"
          count={stats.projectCount}
          unit="works"
          color="#0369a1"
          quality="Validated"
          items={[
            `${stats.states} states · ${stats.districts} districts`,
            `₹${(stats.totalSanctioned / 10000000).toFixed(1)} crore total sanctioned`,
            `${stats.withVendor} records with vendor linkage`,
          ]}
          status="validated"
        />

        <DataStream
          icon={<Wallet size={22} />}
          title="Financial Data"
          subtitle="Fund allocation & expenditure"
          count={stats.paymentCount}
          unit="transactions"
          color="#7c3aed"
          quality="Validated"
          items={[
            `${stats.flaggedPayments} flagged transactions`,
            'Payment pattern analysis active',
            'Split-payment detection enabled',
          ]}
          status="flagged"
          flagCount={stats.flaggedPayments}
        />

        <DataStream
          icon={<Database size={22} />}
          title="Progress Updates"
          subtitle="Physical execution data"
          count={projects.filter(p => p.physical != null).length}
          unit="reports"
          color="#0f766e"
          quality="Partially validated"
          items={[
            'Reported vs observed analysis enabled',
            `${projects.filter(p => p.expenditure > p.physical + 20).length} records with expenditure-progress gap`,
            'Stage-wise progress tracking',
          ]}
          status="needs-review"
        />

        <DataStream
          icon={<MapPin size={22} />}
          title="Geo-Spatial Data"
          subtitle="Project location coordinates"
          count={stats.withCoords}
          unit="geo-tagged"
          color="#b45309"
          quality="Partially available"
          items={[
            `${stats.withCoords} projects with coordinates`,
            'Spatial proximity analysis enabled',
            'Duplicate work geo-clustering active',
          ]}
          status="needs-review"
        />

        <DataStream
          icon={<Users size={22} />}
          title="Vendor / Agency Data"
          subtitle="Implementing agency registry"
          count={stats.vendorCount}
          unit="vendors"
          color="#be123c"
          quality="Validated"
          items={[
            `${vendors.filter(v => (v.risk || 0) >= 60).length} high-risk vendors flagged`,
            'Multi-project vendor correlation active',
            'Ownership pattern analysis enabled',
          ]}
          status="validated"
        />

        <DataStream
          icon={<Globe size={22} />}
          title="Field Evidence"
          subtitle="Inspection & field reports"
          count={stats.inspectionCount}
          unit="inspections"
          color="#047857"
          quality="Live updates"
          items={[
            `${inspections.filter(i => i.status === 'Submitted').length} evidence submissions received`,
            'GPS-tagged field photos',
            'Progress-image reconciliation active',
          ]}
          status="validated"
        />

      </div>

      {/* ====== DATA QUALITY PANEL ====== */}
      <section className="nir-panel" style={{ marginTop: 20 }}>
        <div className="nir-panel-head">
          <div>
            <span className="nir-eyebrow">DATA QUALITY SIGNALS</span>
            <h2>Validation status across the portfolio</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 16 }}>
          <QualityBadge label="Validated records" value={`${stats.projectCount} projects`} ok />
          <QualityBadge label="Financial data" value={`${stats.paymentCount} transactions`} ok />
          <QualityBadge label="Flagged transactions" value={`${stats.flaggedPayments} records`} warn />
          <QualityBadge label="Missing geo-coordinates" value={`${stats.projectCount - stats.withCoords} projects`} warn />
          <QualityBadge label="High-risk vendor links" value={`${vendors.filter(v => (v.risk || 0) >= 60).length} vendors`} warn />
          <QualityBadge label="Awaiting field verification" value={`${inspections.filter(i => i.status === 'Pending').length} works`} warn />
        </div>
      </section>

      {/* ====== PIPELINE VISUALIZATION ====== */}
      <section className="nir-panel" style={{ marginTop: 20, background: '#f8faf9' }}>
        <div className="nir-panel-head">
          <div>
            <span className="nir-eyebrow">
              <GitMerge size={12} /> NORMALIZATION PIPELINE
            </span>
            <h2>How multiple data streams become intelligence</h2>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 20, alignItems: 'flex-start' }}>

          {/* LEFT — inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: '0 0 auto' }}>
            {['Project Records', 'Payment Data', 'Progress Updates', 'Geo Data', 'Vendor Data', 'Field Evidence'].map((s) => (
              <div key={s} style={{ padding: '8px 14px', background: '#fff', border: '1px solid #dce7e3', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#1b3c43', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb' }} />
                {s}
              </div>
            ))}
          </div>

          {/* MERGE ARROW */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', paddingTop: 40 }}>
            <Link2 size={32} style={{ color: '#2563eb', transform: 'rotate(90deg)' }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: '#2563eb', marginTop: 4 }}>ENTITY MATCH</span>
          </div>

          {/* PIPELINE STEPS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {[
              ['✓ Ingest', 'Raw data received from project monitoring systems', '#216454', '#e9f5ef'],
              ['✓ Validate', 'Field completeness, range checks, cross-referencing', '#216454', '#e9f5ef'],
              ['✓ Normalize', 'Standardize units, dates, IDs and category codes', '#216454', '#e9f5ef'],
              ['✓ Entity Link', 'Match project ↔ vendor ↔ payment ↔ location', '#216454', '#e9f5ef'],
              ['⚡ Enrich', 'Compute risk signals, financial gaps, delay indicators', '#b77b1e', '#fff5e4'],
              ['⚡ Fingerprint', 'Generate multi-dimensional risk profile', '#b77b1e', '#fff5e4'],
            ].map(([step, desc, color, bg]) => (
              <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px', background: bg, borderRadius: 8 }}>
                <b style={{ fontSize: 11, color, fontWeight: 800, whiteSpace: 'nowrap', marginTop: 1 }}>{step}</b>
                <span style={{ fontSize: 12, color: '#47635e' }}>{desc}</span>
              </div>
            ))}
          </div>

          {/* OUTPUT */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowRight size={20} style={{ color: '#8ca59f' }} />
          </div>
          <div style={{ flex: '0 0 200px', padding: '20px', background: '#1b3c43', borderRadius: 12, color: '#fff', display: 'flex', flexDirection: 'column', gap: 8, alignSelf: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#7ba79a', letterSpacing: '.08em' }}>OUTPUT</span>
            <strong style={{ fontSize: 16 }}>Project Intelligence Profile</strong>
            <ul style={{ fontSize: 12, color: '#a5d0c1', margin: '8px 0 0', paddingLeft: 16, lineHeight: 1.8 }}>
              <li>Risk Score 0–100</li>
              <li>Risk Fingerprint</li>
              <li>Detected Signals</li>
              <li>Evidence Status</li>
              <li>Recommended Action</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ====== DEMO PROJECT SNAPSHOT ====== */}
      <section className="nir-panel" style={{ marginTop: 20, borderTop: '4px solid #dc4a38' }}>
        <div className="nir-panel-head">
          <div>
            <span className="nir-eyebrow" style={{ color: '#ae4438' }}>DEMO — DATA ENTRY SNAPSHOT</span>
            <h2>Road Construction — Sehore (MP-2024-1001)</h2>
          </div>
          <button className="nir-link" onClick={() => openProject('MP-2024-1001')}>
            Investigate this project <ArrowRight size={14} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginTop: 14 }}>
          {[
            ['Category', 'Road', '#1b3c43'],
            ['State / District', 'MP / Sehore', '#1b3c43'],
            ['Sanctioned', '₹20 lakh', '#1b3c43'],
            ['Expenditure', '85%', '#b77b1e'],
            ['Physical Progress', '40%', '#ae4438'],
            ['Delay', '4 months', '#ae4438'],
            ['Vendor', 'ABC Infrastructure', '#1b3c43'],
            ['Risk Score', '82 / 100 HIGH', '#ae4438'],
          ].map(([label, value, color]) => (
            <div key={label} style={{ padding: '10px 14px', background: '#f8faf9', borderRadius: 8, border: '1px solid #dce7e3' }}>
              <div style={{ fontSize: 10, color: '#67807a', fontWeight: 700, letterSpacing: '.04em', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <button className="nir-primary" onClick={() => navigate('alerts')}>
            <Zap size={15} /> View in AI Priority Queue <ArrowRight size={14} />
          </button>
          <button className="nir-outline" onClick={() => navigate('connected')}>
            <Link2 size={15} /> See connected signals
          </button>
        </div>
      </section>

    </div>
  )
}

function DataStream({ icon, title, subtitle, count, unit, color, items, status, flagCount }) {
  const statusConfig = {
    validated: { label: '✓ Validated', bg: '#e9f5ef', color: '#216454', border: '#a5d0c1' },
    'needs-review': { label: '⚠ Needs Review', bg: '#fff5e4', color: '#b77b1e', border: '#e6cdab' },
    flagged: { label: '⚑ Flagged Records', bg: '#faece8', color: '#ae4438', border: '#eeb3aa' },
  }
  const s = statusConfig[status] || statusConfig.validated

  return (
    <div style={{ background: '#fff', border: '1px solid #dce7e3', borderRadius: 10, padding: '18px 20px', borderTop: `3px solid ${color}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ color, padding: 8, background: `${color}12`, borderRadius: 8 }}>
          {icon}
        </div>
        <span style={{ fontSize: 10, padding: '4px 8px', borderRadius: 4, background: s.bg, color: s.color, border: `1px solid ${s.border}`, fontWeight: 700 }}>
          {s.label}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#1b3c43' }}>{title}</div>
        <div style={{ fontSize: 11, color: '#67807a' }}>{subtitle}</div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1 }}>
        {count}
        <span style={{ fontSize: 12, fontWeight: 600, color: '#67807a', marginLeft: 6 }}>{unit}</span>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item) => (
          <li key={item} style={{ fontSize: 11, color: '#47635e', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: color, flexShrink: 0 }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function QualityBadge({ label, value, ok }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', border: '1px solid #dce7e3', borderRadius: 8 }}>
      {ok
        ? <CheckCircle2 size={16} style={{ color: '#2a8a6e', flexShrink: 0 }} />
        : <AlertTriangle size={16} style={{ color: '#d97706', flexShrink: 0 }} />
      }
      <div>
        <div style={{ fontSize: 11, color: '#67807a' }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: ok ? '#1b3c43' : '#b77b1e' }}>{value}</div>
      </div>
    </div>
  )
}
