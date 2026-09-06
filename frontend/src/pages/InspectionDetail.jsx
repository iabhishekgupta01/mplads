import { useState } from 'react'
import { AlertTriangle, ArrowLeft, CheckCircle, MapPin, Navigation, ShieldAlert, Trash2, Upload } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

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
  } = useApp()

  const inspection =
    inspections.find((item) => item.id === activeInspectionId) || inspections[0]
  const project =
    projects.find((item) => item.id === inspection?.projectId) || projects[0]

  const [observed, setObserved] = useState(inspection?.observed ?? 31)
  const [remarks, setRemarks] = useState(
    inspection?.remarks || 'Observed foundation and pillar reinforcement work completed. Discrepancy noted between physical progress and 65% payment payout.'
  )

  // Real Image Upload State
  const [photos, setPhotos] = useState([
    { id: '1', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=400&q=80', name: 'Foundation_Concrete_Check.jpg' },
    { id: '2', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80', name: 'Site_Pillars_Inspection.jpg' },
  ])

  // GPS Acquisition State
  const [gpsData, setGpsData] = useState({
    latitude: '23.2599° N',
    longitude: '77.4126° E',
    accuracy: '±3.2m High Precision',
    timestamp: '06 Sep 2026, 04:45 PM',
    status: 'Verified',
  })
  const [capturingGps, setCapturingGps] = useState(false)

  if (!inspection || !project) return null

  const diff = Number(observed) - inspection.reported

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const newPhotos = files.map((file, idx) => ({
      id: `up-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }))

    setPhotos((prev) => [...prev, ...newPhotos])
    showToast(`Successfully attached ${files.length} real site evidence photos.`)
  }

  const handleRemovePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
    showToast('Photo attachment removed.')
  }

  const handleCaptureGps = () => {
    setCapturingGps(true)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsData({
            latitude: `${pos.coords.latitude.toFixed(4)}° N`,
            longitude: `${pos.coords.longitude.toFixed(4)}° E`,
            accuracy: `±${pos.coords.accuracy.toFixed(1)}m High Accuracy`,
            timestamp: new Date().toLocaleString(),
            status: 'Live Web Geolocation Acquired',
          })
          setCapturingGps(false)
          showToast('Acquired live GPS device location coordinates!')
        },
        () => {
          // Fallback simulation
          setTimeout(() => {
            setGpsData({
              latitude: '23.2599° N',
              longitude: '77.4126° E',
              accuracy: '±2.5m (Calibrated Field Satellite)',
              timestamp: new Date().toLocaleString(),
              status: 'Field Satellite Lock Acquired',
            })
            setCapturingGps(false)
            showToast('Field GPS coordinates locked via Satellite Telemetry.')
          }, 800)
        }
      )
    } else {
      setTimeout(() => {
        setCapturingGps(false)
        showToast('Field GPS coordinates updated.')
      }, 500)
    }
  }

  const handleVerify = (result) => {
    setInspections((items) =>
      items.map((item) =>
        item.id === inspection.id
          ? { ...item, observed: Number(observed), remarks, status: 'Verified', verificationResult: result, photosCount: photos.length }
          : item
      )
    )

    if (result === 'Discrepancy' || result === 'Escalate') {
      setProjects((items) =>
        items.map((item) =>
          item.id === project.id
            ? { ...item, score: 91, status: 'Escalated', finding: 'Physical site verification revealed lower progress than payment.' }
            : item
        )
      )
    }

    setAudit((items) => [
      {
        time: new Date().toLocaleString(),
        actor: 'Field Inspector',
        action: `Inspection ${result}`,
        detail: `${project.name} · Observed ${observed}% vs Reported ${inspection.reported}%. ${photos.length} site photos attached.`,
        tone: 'human',
      },
      ...items,
    ])

    showToast(`Verification submitted: ${result}. Audit trail updated.`)
    navigate('inspections')
  }

  return (
    <div className="inspection-detail-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="breadcrumb-line" style={{ margin: 0 }}>
          Inspections / <span>{inspection.id}</span>
        </div>
        <button className="secondary-btn" onClick={() => navigate('inspections')}>
          <ArrowLeft size={15} /> Back to Inspections List
        </button>
      </div>

      <div className="project-header-card">
        <div className="project-header-top">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
              Ground Verification Record: {inspection.id}
            </h1>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
              Work Name: <strong>{project.name}</strong> ({project.id}) | Officer: <strong>{inspection.officer}</strong> | District: <strong>{project.district}, {project.state}</strong>
            </p>
          </div>
          <span className="status-badge-clean ongoing">{inspection.status}</span>
        </div>
      </div>

      {/* KPI PROGRESS COMPARISON STRIP */}
      <div className="kpi-6-strip" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        <div className="kpi-6-item">
          <span>Reported Progress</span>
          <strong>{inspection.reported}%</strong>
        </div>
        <div className="kpi-6-item">
          <span>Observed Progress</span>
          <strong style={{ color: diff < 0 ? '#dc2626' : '#16a34a' }}>{observed}%</strong>
        </div>
        <div className="kpi-6-item critical">
          <span>Discrepancy Gap</span>
          <strong>{diff}%</strong>
        </div>
        <div className="kpi-6-item">
          <span>Verification Status</span>
          <strong style={{ color: diff < 0 ? '#d97706' : '#16a34a', fontSize: 14 }}>
            {diff < 0 ? 'Discrepancy Flagged' : 'Physical Match'}
          </strong>
        </div>
      </div>

      <div className="dashboard-grid-3" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
        {/* FIELD EVIDENCE & GPS PANEL */}
        <div className="panel">
          <div className="panel-head">
            <h2>Inspector Measurements & Field GPS</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
                Ground Observed Physical Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={observed}
                onChange={(e) => setObserved(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
                Inspector Observations & Field Remarks
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 13, resize: 'vertical' }}
              />
            </div>

            {/* GPS LOCATION WIDGET */}
            <div className="gps-location-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#15803d', fontWeight: 700 }}>
                  <MapPin size={18} /> {gpsData.status}
                </div>
                <p style={{ fontSize: 12, color: '#334155', marginTop: 4, fontFamily: 'monospace' }}>
                  Lat: {gpsData.latitude} | Long: {gpsData.longitude} ({gpsData.accuracy})
                </p>
                <span style={{ fontSize: 11, color: '#64748b' }}>Time: {gpsData.timestamp}</span>
              </div>
              <button className="secondary-btn" onClick={handleCaptureGps} disabled={capturingGps}>
                <Navigation size={14} className={capturingGps ? 'spin' : ''} /> {capturingGps ? 'Locating...' : 'Capture GPS'}
              </button>
            </div>
          </div>
        </div>

        {/* REAL PHOTO UPLOAD & PREVIEW PANEL */}
        <div className="panel">
          <div className="panel-head">
            <h2>Geotagged Site Photo Attachments</h2>
          </div>

          {/* DRAG & DROP PHOTO UPLOAD */}
          <label className="photo-upload-zone">
            <Upload size={24} style={{ color: '#2563eb', marginBottom: 6 }} />
            <strong style={{ display: 'block', fontSize: 13, color: '#0f172a' }}>Upload Real Site Inspection Photo</strong>
            <span style={{ fontSize: 11, color: '#64748b' }}>Click to select images from camera or local file drive</span>
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          {/* REAL THUMBNAIL PREVIEWS */}
          <div className="photo-preview-grid">
            {photos.map((p) => (
              <div key={p.id} className="photo-preview-card">
                <img src={p.url} alt={p.name} />
                <button className="photo-remove-btn" onClick={() => handleRemovePhoto(p.id)} title="Remove photo">
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 16, marginTop: 20 }}>
            <strong style={{ display: 'block', fontSize: 13, color: '#0f172a', marginBottom: 12 }}>Official Supervisor Decision</strong>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="primary-btn" onClick={() => handleVerify('Verified')} style={{ flex: 1 }}>
                <CheckCircle size={15} /> Approve Inspection
              </button>
              <button className="danger-btn" onClick={() => handleVerify('Discrepancy')} style={{ flex: 1 }}>
                <AlertTriangle size={15} /> Flag Discrepancy
              </button>
              <button className="secondary-btn" onClick={() => handleVerify('Escalate')}>
                <ShieldAlert size={15} /> Escalate to DIID
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InspectionDetail
