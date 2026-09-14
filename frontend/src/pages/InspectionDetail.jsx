import { useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle,
  ClipboardCheck,
  MapPin,
  Navigation,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Upload,
} from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { formatCurrency } from '../utils/formatters.js'
import '../styles/nirikshan.css'

// Project-type-aware placeholder description (no fake images, just context labels)
function ProjectTypePlaceholder({ project }) {
  const cat = (project?.category || '').toLowerCase()
  const context = cat.includes('road')
    ? { label: 'Road Construction Site', hint: 'Upload photos of road base, WBM layer, drainage, and chainage markers', icon: '🛣️' }
    : cat.includes('community') || cat.includes('hall') || cat.includes('centre')
    ? { label: 'Community Infrastructure Site', hint: 'Upload photos of foundation, pillars, slab work and structural progress', icon: '🏛️' }
    : cat.includes('health')
    ? { label: 'Health Facility Site', hint: 'Upload photos of building structure, civil works and utility installations', icon: '🏥' }
    : cat.includes('education') || cat.includes('school')
    ? { label: 'School Infrastructure Site', hint: 'Upload photos of classroom blocks, boundary wall and roof work', icon: '🏫' }
    : cat.includes('water')
    ? { label: 'Water Infrastructure Site', hint: 'Upload photos of pipeline trenches, pipe joints and commissioning work', icon: '💧' }
    : cat.includes('sanitation')
    ? { label: 'Sanitation Facility Site', hint: 'Upload photos of toilet blocks, drainage and construction stage', icon: '🚿' }
    : { label: 'Infrastructure Site', hint: 'Upload photos of construction progress and site conditions', icon: '🏗️' }

  return (
    <div style={{
      background: '#f5f9f7',
      border: '2px dashed #a5d0c1',
      borderRadius: 10,
      padding: '24px',
      textAlign: 'center',
      marginBottom: 16,
    }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{context.icon}</div>
      <div style={{ fontSize: 14, fontWeight: 800, color: '#1b3c43', marginBottom: 4 }}>{context.label}</div>
      <div style={{ fontSize: 13, color: '#67807a', lineHeight: 1.5 }}>{context.hint}</div>
      <div style={{ fontSize: 11, color: '#8ca59f', marginTop: 8, fontStyle: 'italic' }}>Prototype demo — upload real field photos below</div>
    </div>
  )
}

export function InspectionDetail() {
  const {
    inspections,
    projects,
    activeInspectionId,
    setInspections,
    setProjects,
    setAudit,
    showToast,
    navigate,
    openProject,
  } = useApp()

  const inspection =
    inspections.find((item) => item.id === activeInspectionId) || inspections[0]
  const project =
    projects.find((item) => item.id === inspection?.projectId) || projects[0]

  const [observed, setObserved] = useState(inspection?.observed ?? '')
  const [remarks, setRemarks] = useState(inspection?.remarks || '')

  // Start with empty photos — user uploads real site photos
  const [photos, setPhotos] = useState([])

  const [gpsData, setGpsData] = useState({
    latitude: project?.latitude ? `${project.latitude}° N` : '—',
    longitude: project?.longitude ? `${project.longitude}° E` : '—',
    accuracy: '±3.2m (Project Record)',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    status: 'Project Coordinates',
  })
  const [capturingGps, setCapturingGps] = useState(false)

  if (!inspection || !project) return null

  const reportedProgress = inspection.reported
  const observedValue = observed !== '' ? Number(observed) : null
  const diff = observedValue !== null ? observedValue - reportedProgress : null
  const gap = (project.expenditure || 0) - (project.physical || 0)

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    const newPhotos = files.map((file, idx) => ({
      id: `up-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      name: file.name,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    }))
    setPhotos((prev) => [...prev, ...newPhotos])
    showToast(`${files.length} field evidence photo(s) attached.`)
  }

  const handleRemovePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
    showToast('Photo removed.')
  }

  const handleCaptureGps = () => {
    setCapturingGps(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsData({
            latitude: `${pos.coords.latitude.toFixed(4)}° N`,
            longitude: `${pos.coords.longitude.toFixed(4)}° E`,
            accuracy: `±${pos.coords.accuracy.toFixed(1)}m (Live Geolocation)`,
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            status: 'Live GPS Acquired',
          })
          setCapturingGps(false)
          showToast('Live GPS coordinates acquired.')
        },
        () => {
          setTimeout(() => {
            setGpsData({
              latitude: project?.latitude ? `${project.latitude}° N` : '23.2599° N',
              longitude: project?.longitude ? `${project.longitude}° E` : '77.4126° E',
              accuracy: '±2.5m (Field Satellite Lock)',
              timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              status: 'Field Satellite Lock',
            })
            setCapturingGps(false)
            showToast('GPS coordinates updated via satellite.')
          }, 800)
        }
      )
    } else {
      setTimeout(() => { setCapturingGps(false); showToast('GPS updated.') }, 500)
    }
  }

  const handleVerify = (result) => {
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    setInspections((items) =>
      items.map((item) =>
        item.id === inspection.id
          ? {
              ...item,
              observed: observedValue ?? reportedProgress,
              remarks,
              status: 'Submitted',
              verificationResult: result,
              photosCount: photos.length,
            }
          : item
      )
    )

    if (result === 'Discrepancy' || result === 'Escalate') {
      setProjects((items) =>
        items.map((item) =>
          item.id === project.id
            ? { ...item, score: Math.max(item.score, 88), status: 'Escalated', finding: 'Physical site verification revealed lower progress than payment records.' }
            : item
        )
      )
    }

    setAudit((items) => [
      {
        time: now,
        actor: inspection.officer || 'Field Inspector',
        action: `Inspection ${result}`,
        detail: `${project.name} · Observed ${observedValue ?? '?'}% vs Reported ${reportedProgress}%. ${photos.length} site photos attached. GPS: ${gpsData.latitude}, ${gpsData.longitude}.`,
        tone: 'human',
        projectId: project.id,
        hash: `sha256:${Math.random().toString(36).slice(2, 10)}`,
      },
      ...items,
    ])

    showToast(`Verification ${result} submitted. Audit trail updated.`)
    navigate('inspections')
  }

  return (
    <div className="nir-page">

      {/* BREADCRUMB + BACK */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: '#67807a' }}>
          Inspections / <span style={{ fontWeight: 700, color: '#1b3c43' }}>{inspection.id}</span>
        </div>
        <button className="nir-outline" style={{ fontSize: 13 }} onClick={() => navigate('inspections')}>
          <ArrowLeft size={14} /> Back to Inspections
        </button>
      </div>

      {/* BANNER */}
      <section style={{
        background: '#1a2c35',
        color: '#fff',
        borderRadius: 14,
        padding: '24px 30px',
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: '#82c9b4', textTransform: 'uppercase' }}>
            <ClipboardCheck size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            Field Verification Record · {inspection.id}
          </span>
          <h1 style={{ fontSize: 24, fontWeight: 800, margin: '10px 0 6px', lineHeight: 1.2 }}>
            {project.name}
          </h1>
          <p style={{ fontSize: 14, color: '#a9c8bf', lineHeight: 1.5, margin: 0 }}>
            <MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {project.district}, {project.state}
            &nbsp;·&nbsp;{project.category}
            &nbsp;·&nbsp;Officer: {inspection.officer}
            &nbsp;·&nbsp;{inspection.date}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
            <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.1)', color: '#c9ddd8' }}>
              {formatCurrency(project.amount)} sanctioned
            </span>
            <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.1)', color: '#c9ddd8' }}>
              Exp: {project.expenditure}%
            </span>
            <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: gap >= 25 ? '#dc4a38' : 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700 }}>
              Gap: {gap}pp
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#a9c8bf', marginBottom: 4 }}>PROJECT RISK SCORE</div>
          <div style={{ fontSize: 42, fontWeight: 800, color: project.score >= 80 ? '#ef9393' : project.score >= 60 ? '#fbbf24' : '#a9db6e', lineHeight: 1 }}>
            {project.score}<span style={{ fontSize: 18 }}>/100</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, color: project.score >= 80 ? '#ef9393' : '#fbbf24', marginTop: 4, letterSpacing: '.06em' }}>
            {project.score >= 80 ? 'CRITICAL' : project.score >= 60 ? 'HIGH' : 'MEDIUM'} · VERIFICATION REQUIRED
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
            <button
              onClick={() => { openProject(project.id) }}
              style={{
                background: '#a9db6e',
                color: '#183941',
                border: 0,
                borderRadius: 7,
                padding: '8px 14px',
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Open Project <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* REPORTED VS OBSERVED HIGHLIGHT */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: 0,
        background: '#fff',
        border: '1px solid #dce7e3',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
      }}>
        <div style={{ padding: '20px 28px', textAlign: 'center', background: '#fff5e4' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#67807a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>REPORTED PROGRESS</div>
          <div style={{ fontSize: 52, fontWeight: 800, color: '#b77b1e', lineHeight: 1 }}>
            {reportedProgress}<span style={{ fontSize: 24 }}>%</span>
          </div>
          <div style={{ fontSize: 12, color: '#67807a', marginTop: 6 }}>As per district progress report · {inspection.date}</div>
          <div style={{ height: 6, background: '#e6cdab', borderRadius: 3, margin: '12px auto', width: '70%' }}>
            <div style={{ height: '100%', width: `${reportedProgress}%`, background: '#b77b1e', borderRadius: 3 }} />
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 24px',
          background: '#f8faf9',
          borderLeft: '1px solid #e7efec',
          borderRight: '1px solid #e7efec',
        }}>
          {diff !== null ? (
            <>
              <div style={{ fontSize: 28, fontWeight: 800, color: diff < 0 ? '#dc4a38' : '#2a8a6e' }}>
                {diff >= 0 ? '+' : ''}{diff}pp
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#67807a', textTransform: 'uppercase', letterSpacing: '.06em' }}>Variance</div>
              {diff <= -5 && (
                <div style={{ marginTop: 6, fontSize: 11, color: '#ae4438', fontWeight: 800, textAlign: 'center' }}>
                  Significant<br />Gap
                </div>
              )}
            </>
          ) : (
            <span style={{ fontSize: 13, color: '#8ca59f', fontWeight: 700 }}>VS</span>
          )}
        </div>

        <div style={{ padding: '20px 28px', textAlign: 'center', background: diff !== null && diff <= -5 ? '#faece8' : '#e9f5ef' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#67807a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>FIELD-OBSERVED PROGRESS</div>
          <div style={{ fontSize: 52, fontWeight: 800, color: diff !== null && diff <= -5 ? '#ae4438' : '#216454', lineHeight: 1 }}>
            {observedValue !== null ? <>{observedValue}<span style={{ fontSize: 24 }}>%</span></> : <span style={{ fontSize: 24, color: '#8ca59f' }}>—</span>}
          </div>
          <div style={{ fontSize: 12, color: '#67807a', marginTop: 6 }}>
            {observedValue !== null ? 'Field inspection assessment' : 'Enter observed value below'}
          </div>
          {observedValue !== null && (
            <div style={{ height: 6, background: diff !== null && diff <= -5 ? '#edb5a2' : '#a5d0c1', borderRadius: 3, margin: '12px auto', width: '70%' }}>
              <div style={{ height: '100%', width: `${observedValue}%`, background: diff !== null && diff <= -5 ? '#ae4438' : '#2a8a6e', borderRadius: 3 }} />
            </div>
          )}
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 16 }}>

        {/* LEFT: Input + GPS + Photos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* INSPECTOR MEASUREMENT */}
          <div style={{ background: '#fff', border: '1px solid #dce7e3', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#67807a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              <ClipboardCheck size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
              Inspector Field Measurements
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1b3c43', marginBottom: 6 }}>
                Field-Observed Physical Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={observed}
                onChange={(e) => setObserved(e.target.value)}
                placeholder="Enter observed % (e.g. 31)"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  border: '1px solid #bfd4cd',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#1b3c43',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#1b3c43', marginBottom: 6 }}>
                Inspector Field Remarks
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Describe the site conditions, observed work stage, discrepancies noted..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  border: '1px solid #bfd4cd',
                  borderRadius: 8,
                  fontSize: 13,
                  color: '#1b3c43',
                  resize: 'vertical',
                  lineHeight: 1.55,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* GPS */}
          <div style={{
            background: '#fff',
            border: '1px solid #dce7e3',
            borderRadius: 12,
            padding: '16px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#15803d', fontWeight: 700, marginBottom: 4 }}>
                <MapPin size={16} /> {gpsData.status}
              </div>
              <div style={{ fontSize: 13, color: '#334155', fontFamily: 'DM Mono, monospace' }}>
                Lat: {gpsData.latitude} · Long: {gpsData.longitude}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{gpsData.accuracy} · {gpsData.timestamp}</div>
            </div>
            <button
              style={{
                background: capturingGps ? '#e7efec' : '#176551',
                color: capturingGps ? '#67807a' : '#fff',
                border: 0,
                borderRadius: 8,
                padding: '9px 16px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                flexShrink: 0,
              }}
              onClick={handleCaptureGps}
              disabled={capturingGps}
            >
              <Navigation size={14} className={capturingGps ? 'spin' : ''} />
              {capturingGps ? 'Locating...' : 'Capture Live GPS'}
            </button>
          </div>

          {/* PHOTO UPLOAD */}
          <div style={{ background: '#fff', border: '1px solid #dce7e3', borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#67807a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
              <Camera size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
              Geotagged Site Photo Evidence
            </div>

            {/* Project-type context placeholder */}
            <ProjectTypePlaceholder project={project} />

            {/* Upload zone */}
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: '18px',
              background: '#f8faf9',
              border: '2px dashed #a5c3bc',
              borderRadius: 10,
              cursor: 'pointer',
              marginBottom: 14,
            }}>
              <Upload size={22} style={{ color: '#2563eb' }} />
              <strong style={{ fontSize: 13, color: '#1b3c43' }}>Upload Field Inspection Photos</strong>
              <span style={{ fontSize: 12, color: '#64748b' }}>Click to select from camera or file system</span>
              <input type="file" accept="image/*" multiple onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>

            {/* Photo thumbnails */}
            {photos.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
                {photos.map((p) => (
                  <div key={p.id} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #dce7e3' }}>
                    <img src={p.url} alt={p.name} style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 8px', background: '#f8faf9', fontSize: 10, color: '#67807a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                    <button
                      onClick={() => handleRemovePhoto(p.id)}
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        background: '#dc2626',
                        color: '#fff',
                        border: 0,
                        borderRadius: 4,
                        padding: '3px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {photos.length === 0 && (
              <div style={{ fontSize: 12, color: '#8ca59f', textAlign: 'center', padding: '8px 0' }}>
                No photos uploaded yet — field evidence is required for verification.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Decision panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* PROJECT CONTEXT */}
          <div style={{ background: '#fff', border: '1px solid #dce7e3', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#67807a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Project Context</div>
            {[
              ['Project ID', project.id],
              ['Category', project.category],
              ['Agency', project.agency],
              ['Vendor', project.vendor],
              ['Start Date', project.startDate],
              ['Expected Completion', project.expectedCompletion],
              ['Status', project.status],
              ['Expenditure', `${project.expenditure}%`],
              ['Reported Physical', `${project.physical}%`],
              ['Exp–Progress Gap', `${gap}pp`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '5px 0', borderBottom: '1px solid #f0f5f2' }}>
                <span style={{ color: '#67807a' }}>{k}</span>
                <strong style={{ color: gap >= 25 && k === 'Exp–Progress Gap' ? '#dc2626' : '#1b3c43', maxWidth: '55%', textAlign: 'right' }}>{v}</strong>
              </div>
            ))}
          </div>

          {/* DECISION */}
          <div style={{ background: '#fff', border: '1px solid #dce7e3', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#67807a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Officer Decision</div>
            <p style={{ fontSize: 13, color: '#67807a', marginBottom: 16, lineHeight: 1.55 }}>
              Review the observed progress and evidence above, then record your official decision.
              All actions are tamper-evidently recorded in the audit trail.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                style={{
                  background: '#176551',
                  color: '#fff',
                  border: 0,
                  borderRadius: 8,
                  padding: '11px 14px',
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
                onClick={() => handleVerify('Verified')}
              >
                <CheckCircle size={15} /> Approve — Physical Progress Verified
              </button>
              <button
                style={{
                  background: '#fff',
                  color: '#dc2626',
                  border: '2px solid #dc2626',
                  borderRadius: 8,
                  padding: '11px 14px',
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
                onClick={() => handleVerify('Discrepancy')}
              >
                <AlertTriangle size={15} /> Flag Discrepancy
              </button>
              <button
                style={{
                  background: '#fff',
                  color: '#7c3aed',
                  border: '1px solid #c4b5fd',
                  borderRadius: 8,
                  padding: '11px 14px',
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
                onClick={() => handleVerify('Escalate')}
              >
                <ShieldAlert size={15} /> Escalate to Senior Authority
              </button>
            </div>
          </div>

          {/* CONNECTED WORKFLOW */}
          <div style={{ background: '#f5f9f7', border: '1px solid #dce7e3', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#67807a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Connected Workflow</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="nir-link" style={{ fontSize: 13 }} onClick={() => { openProject(project.id) }}>
                <ArrowRight size={13} /> Open Project Intelligence
              </button>
              <button className="nir-link" style={{ fontSize: 13 }} onClick={() => navigate('verification')}>
                <ShieldCheck size={13} /> Field Evidence Verification
              </button>
              <button className="nir-link" style={{ fontSize: 13 }} onClick={() => navigate('compliance')}>
                <ClipboardCheck size={13} /> View Audit Trail
              </button>
              <button className="nir-link" style={{ fontSize: 13 }} onClick={() => navigate('inspections')}>
                <ArrowLeft size={13} /> Back to Inspections
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InspectionDetail
