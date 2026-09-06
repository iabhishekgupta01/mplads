import { useState } from 'react'
import { ArrowRight, Layers, MapPin, RefreshCw, ShieldAlert, X } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { riskLabel } from '../utils/formatters.js'

// India States SVG simplified geographic paths & metadata
const INDIA_STATES = [
  { id: 'MP', name: 'Madhya Pradesh', path: 'M 220 220 L 320 200 L 340 260 L 250 300 L 190 260 Z', risk: 'High', avgScore: 78, activeProjects: 142 },
  { id: 'MH', name: 'Maharashtra', path: 'M 180 270 L 260 270 L 280 350 L 180 370 L 150 310 Z', risk: 'Medium', avgScore: 54, activeProjects: 198 },
  { id: 'UP', name: 'Uttar Pradesh', path: 'M 260 130 L 370 120 L 390 180 L 290 200 L 250 170 Z', risk: 'High', avgScore: 82, activeProjects: 215 },
  { id: 'RJ', name: 'Rajasthan', path: 'M 120 130 L 230 130 L 220 220 L 140 230 L 100 170 Z', risk: 'Low', avgScore: 38, activeProjects: 165 },
  { id: 'GJ', name: 'Gujarat', path: 'M 80 210 L 150 220 L 160 280 L 100 290 L 60 250 Z', risk: 'Medium', avgScore: 49, activeProjects: 110 },
  { id: 'KA', name: 'Karnataka', path: 'M 190 360 L 250 350 L 240 430 L 180 430 L 170 380 Z', risk: 'Low', avgScore: 32, activeProjects: 130 },
  { id: 'TN', name: 'Tamil Nadu', path: 'M 230 430 L 280 430 L 270 500 L 220 480 Z', risk: 'Medium', avgScore: 44, activeProjects: 124 },
  { id: 'WB', name: 'West Bengal', path: 'M 400 180 L 440 180 L 430 260 L 390 250 Z', risk: 'High', avgScore: 76, activeProjects: 98 },
  { id: 'BR', name: 'Bihar', path: 'M 360 160 L 420 160 L 410 200 L 360 200 Z', risk: 'High', avgScore: 84, activeProjects: 145 },
  { id: 'TS', name: 'Telangana', path: 'M 240 300 L 290 300 L 280 350 L 230 350 Z', risk: 'Medium', avgScore: 58, activeProjects: 88 },
  { id: 'AP', name: 'Andhra Pradesh', path: 'M 250 350 L 300 350 L 290 420 L 240 410 Z', risk: 'Medium', avgScore: 52, activeProjects: 104 },
  { id: 'OD', name: 'Odisha', path: 'M 330 240 L 390 240 L 370 300 L 310 290 Z', risk: 'Low', avgScore: 35, activeProjects: 92 },
  { id: 'PB', name: 'Punjab', path: 'M 170 80 L 210 80 L 200 120 L 160 110 Z', risk: 'Low', avgScore: 28, activeProjects: 64 },
  { id: 'DL', name: 'Delhi NCR', path: 'M 220 120 L 240 120 L 240 140 L 220 140 Z', risk: 'High', avgScore: 74, activeProjects: 45 },
  { id: 'AS', name: 'Assam', path: 'M 460 150 L 520 150 L 510 190 L 450 180 Z', risk: 'Medium', avgScore: 61, activeProjects: 76 },
]

export function GisPage() {
  const { projects, openProject } = useApp()
  const [selectedState, setSelectedState] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [hoveredState, setHoveredState] = useState(null)

  const statesList = Array.from(new Set(INDIA_STATES.map((s) => s.name)))
  const categoriesList = ['All', 'Roads', 'Water', 'Education', 'Health', 'Sanitation']

  const filteredProjects = projects.filter((p) => {
    const stateMatch = selectedState === 'All' || p.state === selectedState || selectedState === 'Madhya Pradesh'
    const riskMatch = riskFilter === 'All' || riskLabel(p.score).toUpperCase() === riskFilter.toUpperCase()
    const catMatch = categoryFilter === 'All' || p.category.toLowerCase().includes(categoryFilter.toLowerCase())
    return stateMatch && riskMatch && catMatch
  })

  const getStateColor = (risk) => {
    switch (risk) {
      case 'High':
        return '#dc2626'
      case 'Medium':
        return '#d97706'
      case 'Low':
        return '#16a34a'
      default:
        return '#2563eb'
    }
  }

  return (
    <div className="gis-page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Interactive National GIS Risk Map</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>
            MoSPI — DIID Geographic Intelligence: Monitor district-level anomaly clusters across 28 States & 8 UTs.
          </p>
        </div>
        <button
          className="secondary-btn"
          onClick={() => {
            setSelectedState('All')
            setRiskFilter('All')
            setCategoryFilter('All')
            setSelectedMarker(null)
          }}
        >
          <RefreshCw size={14} /> Reset Filters
        </button>
      </div>

      {/* MULTI-FILTER BAR */}
      <div className="filter-bar-wrap">
        <div className="filter-group">
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>State / Jurisdiction</label>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="All">All India (28 States & 8 UTs)</option>
            {statesList.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Risk Severity</label>
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
            <option value="All">All Risk Levels</option>
            <option value="High">High Risk (Score &gt; 70)</option>
            <option value="Medium">Medium Risk (Score 40-70)</option>
            <option value="Low">Low Risk (Score &lt; 40)</option>
          </select>
        </div>

        <div className="filter-group">
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Project Sector</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#2563eb', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Layers size={15} /> {filteredProjects.length} Active Geo Markers
          </span>
        </div>
      </div>

      {/* GIS MAP VIEWPORT */}
      <div className="gis-map-container">
        <div className="gis-map-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#ffffff' }}>
            <MapPin size={18} style={{ color: '#38bdf8' }} />
            <strong style={{ fontSize: 14 }}>NATIONAL GEOSPATIAL ANOMALY MONITOR</strong>
            <span style={{ fontSize: 11, background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: 12 }}>
              LIVE GIS STREAM
            </span>
          </div>

          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#94a3b8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#dc2626' }}></span> High Anomaly
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#d97706' }}></span> Moderate
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#16a34a' }}></span> Low Anomaly
            </span>
          </div>
        </div>

        <div className="gis-map-body">
          {/* INDIA GEOGRAPHIC SVG LAYER */}
          <svg className="india-svg-container" viewBox="0 0 600 560" fill="none">
            {/* GRID LINES FOR GIS FEEL */}
            <pattern id="gis-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
            </pattern>
            <rect width="600" height="560" fill="url(#gis-grid)" />

            {/* STATE BOUNDARY PATHS */}
            {INDIA_STATES.map((st) => {
              const isSelected = selectedState === st.name
              const color = getStateColor(st.risk)
              return (
                <g key={st.id}>
                  <path
                    d={st.path}
                    className="svg-state-path"
                    fill={color}
                    fillOpacity={isSelected ? 0.75 : 0.25}
                    onMouseEnter={() => setHoveredState(st)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => setSelectedState(st.name)}
                  />
                  <text
                    x={st.path.split(' ')[1]}
                    y={st.path.split(' ')[2]}
                    fill="#cbd5e1"
                    fontSize="9"
                    fontWeight="700"
                    pointerEvents="none"
                    opacity="0.8"
                  >
                    {st.id}
                  </text>
                </g>
              )
            })}

            {/* PROJECT ANOMALY PIN MARKERS */}
            {filteredProjects.map((p, idx) => {
              const rLabel = riskLabel(p.score)
              const pinColor = rLabel === 'HIGH' ? '#dc2626' : rLabel === 'MEDIUM' ? '#d97706' : '#16a34a'
              // Deterministic coordinates spread over map
              const cx = 180 + ((idx * 53) % 240)
              const cy = 140 + ((idx * 67) % 280)

              return (
                <g key={p.id} className="svg-map-pin" onClick={() => setSelectedMarker(p)}>
                  <circle cx={cx} cy={cy} r="14" fill={pinColor} fillOpacity="0.2" />
                  <circle cx={cx} cy={cy} r="8" fill={pinColor} stroke="#ffffff" strokeWidth="2" />
                  <text x={cx} y={cy + 3} fill="#ffffff" fontSize="8" fontWeight="800" textAnchor="middle">
                    {p.score}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* HOVER TOOLTIP FOR STATE */}
          {hoveredState && (
            <div
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#ffffff',
                padding: '10px 14px',
                borderRadius: 6,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: 12,
                pointerEvents: 'none',
              }}
            >
              <strong style={{ display: 'block', fontSize: 13, color: '#38bdf8' }}>{hoveredState.name}</strong>
              <span>
                Avg Risk Score: <strong>{hoveredState.avgScore}</strong> ({hoveredState.risk} Risk)
              </span>
              <br />
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{hoveredState.activeProjects} Monitored Works</span>
            </div>
          )}

          {/* SELECTED MARKER CARD POPUP */}
          {selectedMarker && (
            <div className="map-card-floating">
              <button
                onClick={() => setSelectedMarker(null)}
                style={{ position: 'absolute', right: 12, top: 12, border: 0, background: 'transparent', color: '#94a3b8' }}
              >
                <X size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#38bdf8', fontWeight: 700 }}>
                <MapPin size={14} /> {selectedMarker.district}, {selectedMarker.state}
              </div>

              <strong style={{ display: 'block', fontSize: 14, color: '#ffffff', margin: '8px 0 4px' }}>
                {selectedMarker.name}
              </strong>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12 }}>ID: {selectedMarker.id} · {selectedMarker.category}</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, background: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 6, marginBottom: 14, fontSize: 11 }}>
                <div>
                  <span style={{ color: '#94a3b8', display: 'block' }}>Risk Score</span>
                  <strong style={{ color: selectedMarker.score > 70 ? '#f87171' : '#fbbf24', fontSize: 14 }}>
                    {selectedMarker.score}
                  </strong>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', display: 'block' }}>Physical</span>
                  <strong style={{ color: '#ffffff' }}>{selectedMarker.physical}%</strong>
                </div>
                <div>
                  <span style={{ color: '#94a3b8', display: 'block' }}>Paid</span>
                  <strong style={{ color: '#ffffff' }}>{selectedMarker.expenditure}%</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#fbbf24', marginBottom: 14 }}>
                <ShieldAlert size={14} />
                <span>Financial payout exceeds physical execution by {Math.abs(selectedMarker.expenditure - selectedMarker.physical)}%</span>
              </div>

              <button
                className="primary-btn"
                style={{ width: '100%', fontSize: 12, padding: 9, background: '#2563eb' }}
                onClick={() => openProject(selectedMarker.id)}
              >
                Investigate Work File <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GisPage
