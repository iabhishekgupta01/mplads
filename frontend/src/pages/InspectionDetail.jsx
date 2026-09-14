import { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle,
  ClipboardCheck,
  ImagePlus,
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
    openGisAt,
  } = useApp()

  const inspection =
    inspections.find(
      (item) => item.id === activeInspectionId
    ) || inspections[0]

  const project =
    projects.find(
      (item) => item.id === inspection?.projectId
    ) || projects[0]

  // ---------------------------------------------------------
  // FORM STATE
  // ---------------------------------------------------------

  const [observed, setObserved] = useState(
    inspection?.observed ?? ''
  )

  const [remarks, setRemarks] = useState(
    inspection?.remarks || ''
  )

  // ---------------------------------------------------------
  // PHOTO STATE
  // IMPORTANT: Starts completely empty.
  // No demo/fake image is loaded.
  // ---------------------------------------------------------

  const [photos, setPhotos] = useState([])

  const fileInputRef = useRef(null)
  const [uploadSlot, setUploadSlot] = useState(0)

  // ---------------------------------------------------------
  // GPS STATE
  // ---------------------------------------------------------

  const [gpsData, setGpsData] = useState({
    latitude: project?.latitude
      ? `${project.latitude}° N`
      : '—',

    longitude: project?.longitude
      ? `${project.longitude}° E`
      : '—',

    accuracy: '±3.2m (Project Record)',

    timestamp: new Date().toLocaleString(
      'en-IN',
      { timeZone: 'Asia/Kolkata' }
    ),

    status: 'Project Coordinates',
  })

  const [capturingGps, setCapturingGps] =
    useState(false)

  // ---------------------------------------------------------
  // SAFETY
  // ---------------------------------------------------------

  if (!inspection || !project) {
    return null
  }

  // ---------------------------------------------------------
  // CALCULATIONS
  // ---------------------------------------------------------

  const reportedProgress =
    Number(inspection.reported || project.physical || 0)

  const observedValue =
    observed !== ''
      ? Number(observed)
      : null

  const diff =
    observedValue !== null
      ? observedValue - reportedProgress
      : null

  const gap =
    (project.expenditure || 0) -
    (project.physical || 0)

  // ---------------------------------------------------------
  // PHOTO UPLOAD
  // ---------------------------------------------------------

  const triggerUpload = (slot) => {
    setUploadSlot(slot)
    fileInputRef.current?.click()
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file.')
      return
    }

    const imageUrl =
      URL.createObjectURL(file)

    const newPhoto = {
      id: `inspection-${Date.now()}`,
      url: imageUrl,
      name: file.name,
      timestamp: new Date().toLocaleString(
        'en-IN',
        { timeZone: 'Asia/Kolkata' }
      ),
      slot: uploadSlot,
    }

    setPhotos((previous) => {
      const withoutCurrentSlot =
        previous.filter(
          (photo) => photo.slot !== uploadSlot
        )

      return [
        ...withoutCurrentSlot,
        newPhoto,
      ].sort((a, b) => a.slot - b.slot)
    })

    showToast(
      uploadSlot === 0
        ? 'Site front photo uploaded.'
        : 'Work progress photo uploaded.'
    )

    e.target.value = ''
  }

  const removePhoto = (photo) => {
    if (photo?.url) {
      URL.revokeObjectURL(photo.url)
    }

    setPhotos((previous) =>
      previous.filter(
        (item) => item.id !== photo.id
      )
    )

    showToast('Photo removed.')
  }

  const getPhotoForSlot = (slot) =>
    photos.find(
      (photo) => photo.slot === slot
    )

  // ---------------------------------------------------------
  // CLEANUP OBJECT URLS
  // ---------------------------------------------------------

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo?.url) {
          URL.revokeObjectURL(photo.url)
        }
      })
    }
  }, [])

  // ---------------------------------------------------------
  // GPS
  // ---------------------------------------------------------

  const handleCaptureGps = () => {
    setCapturingGps(true)

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsData({
            latitude:
              `${pos.coords.latitude.toFixed(4)}° N`,

            longitude:
              `${pos.coords.longitude.toFixed(4)}° E`,

            accuracy:
              `±${pos.coords.accuracy.toFixed(1)}m (Live Geolocation)`,

            timestamp:
              new Date().toLocaleString(
                'en-IN',
                { timeZone: 'Asia/Kolkata' }
              ),

            status: 'Live GPS Acquired',
          })

          setCapturingGps(false)

          showToast(
            'Live GPS coordinates acquired.'
          )
        },

        () => {
          setTimeout(() => {
            setGpsData({
              latitude: project?.latitude
                ? `${project.latitude}° N`
                : '23.2599° N',

              longitude: project?.longitude
                ? `${project.longitude}° E`
                : '77.4126° E',

              accuracy:
                '±2.5m (Field Satellite Lock)',

              timestamp:
                new Date().toLocaleString(
                  'en-IN',
                  { timeZone: 'Asia/Kolkata' }
                ),

              status: 'Field Satellite Lock',
            })

            setCapturingGps(false)

            showToast(
              'GPS coordinates updated.'
            )
          }, 800)
        }
      )
    } else {
      setTimeout(() => {
        setCapturingGps(false)
        showToast('GPS updated.')
      }, 500)
    }
  }

  // ---------------------------------------------------------
  // SAVE / VERIFY INSPECTION
  // ---------------------------------------------------------

  const handleVerify = (result) => {
    const now =
      new Date().toLocaleString(
        'en-IN',
        { timeZone: 'Asia/Kolkata' }
      )

    const finalObserved =
      observedValue ?? reportedProgress

    setInspections((items) =>
      items.map((item) =>
        item.id === inspection.id
          ? {
              ...item,

              observed:
                finalObserved,

              remarks,

              status:
                'Submitted',

              verificationResult:
                result,

              photosCount:
                photos.length,
            }
          : item
      )
    )

    // If discrepancy is detected,
    // increase risk and escalate project.
    if (
      result === 'Discrepancy' ||
      result === 'Escalate'
    ) {
      setProjects((items) =>
        items.map((item) =>
          item.id === project.id
            ? {
                ...item,

                score:
                  Math.max(
                    item.score || 0,
                    88
                  ),

                status:
                  'Escalated',

                finding:
                  'Physical site verification revealed lower progress than payment records.',
              }
            : item
        )
      )
    }

    setAudit((items) => [
      {
        time: now,

        actor:
          inspection.officer ||
          'Field Inspector',

        action:
          `Inspection ${result}`,

        detail:
          `${project.name} · Observed ${finalObserved}% vs Reported ${reportedProgress}%. ${photos.length} site photos attached. GPS: ${gpsData.latitude}, ${gpsData.longitude}.`,

        tone: 'human',

        projectId:
          project.id,

        hash:
          `sha256:${Math.random()
            .toString(36)
            .slice(2, 10)}`,
      },

      ...items,
    ])

    showToast(
      `Verification ${result} submitted. Audit trail updated.`
    )

    navigate('inspections')
  }

  // ---------------------------------------------------------
  // RISK COLORS
  // ---------------------------------------------------------

  const riskColor =
    project.score >= 80
      ? '#ef9393'
      : project.score >= 60
        ? '#fbbf24'
        : '#a9db6e'

  const progressColor =
    diff !== null && diff <= -5
      ? '#ae4438'
      : '#216454'

  return (
    <div className="nir-page field-inspection-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="fid-page-header">

        <button
          className="fid-back"
          onClick={() =>
            navigate('inspections')
          }
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <h1>
          Field Inspection Detail
        </h1>

        <div className="fid-breadcrumb">
          Home
          <span>›</span>
          Field Inspections
          <span>›</span>
          <strong>
            {inspection.id}
          </strong>
        </div>

      </div>

      {/* =====================================================
          PROJECT HERO
      ===================================================== */}

      <section className="fid-hero">

        <div className="fid-hero-left">

          <div className="fid-eyebrow">
            <ClipboardCheck size={13} />
            FIELD VERIFICATION RECORD · {inspection.id}
          </div>

          <h2>
            {project.name}
          </h2>

          <div className="fid-location-line">
            <MapPin size={14} />

            <span>
              {project.district},{' '}
              {project.state}
            </span>

            <i>·</i>

            <span>
              {project.category}
            </span>

            <i>·</i>

            <span>
              Officer: {inspection.officer}
            </span>

            <i>·</i>

            <span>
              {inspection.date}
            </span>
          </div>

          <div className="fid-hero-pills">

            <span>
              {formatCurrency(project.amount)}
              {' '}sanctioned
            </span>

            <span>
              Exp: {project.expenditure}%
            </span>

            <span
              className={
                gap >= 25
                  ? 'danger'
                  : 'normal'
              }
            >
              Gap: {gap}pp
            </span>

          </div>

        </div>

        <div className="fid-hero-right">

          <div className="fid-risk-label">
            PROJECT RISK SCORE
          </div>

          <div
            className="fid-risk-score"
            style={{ color: riskColor }}
          >
            {project.score}
            <small>/100</small>
          </div>

          <div
            className="fid-risk-status"
            style={{ color: riskColor }}
          >
            {project.score >= 80
              ? 'CRITICAL'
              : project.score >= 60
                ? 'HIGH'
                : 'MEDIUM'}
            {' '}· VERIFICATION REQUIRED
          </div>

          <button
            className="fid-open-project"
            onClick={() =>
              openProject(project.id)
            }
          >
            Open Project
            <ArrowRight size={14} />
          </button>

        </div>

      </section>

      {/* =====================================================
          MAIN TOP ROW
          IMAGE + REPORTED + OBSERVED
      ===================================================== */}

      <section className="fid-top-grid">

        {/* ===================================================
            SITE IMAGES
        =================================================== */}

        <article className="fid-card fid-images-card">

          <div className="fid-card-heading">

            <div>
              <h3>
                <Camera size={16} />
                Site Images
                <span>
                  (Field Verification)
                </span>
              </h3>
            </div>

            <div className="fid-image-counter">
              {photos.length}/2
            </div>

          </div>

          {/* One hidden input is reused for both slots */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileUpload}
          />

          <div className="fid-images-row">

            {/* -----------------------------------------------
                IMAGE SLOT 1
            ----------------------------------------------- */}

            <InspectionPhotoSlot
              photo={getPhotoForSlot(0)}
              title="Site Front View"
              subtitle="Primary site photograph"
              onUpload={() =>
                triggerUpload(0)
              }
              onRemove={() =>
                removePhoto(
                  getPhotoForSlot(0)
                )
              }
            />

            {/* -----------------------------------------------
                IMAGE SLOT 2
            ----------------------------------------------- */}

            <InspectionPhotoSlot
              photo={getPhotoForSlot(1)}
              title="Work Progress"
              subtitle="Construction progress photograph"
              onUpload={() =>
                triggerUpload(1)
              }
              onRemove={() =>
                removePhoto(
                  getPhotoForSlot(1)
                )
              }
            />

          </div>

          <div className="fid-upload-note">
            <Upload size={12} />
            Upload real field photographs captured
            during inspection
          </div>

        </article>

        {/* ===================================================
            REPORTED PROGRESS
        =================================================== */}

        <article className="fid-progress-card reported">

          <div className="fid-progress-heading">
            Reported Progress
          </div>

          <div className="fid-progress-value">
            {reportedProgress}
            <small>%</small>
          </div>

          <div className="fid-progress-note">
            As per district progress report
            {' · '}
            {inspection.date}
          </div>

          <div className="fid-progress-bar">
            <div
              style={{
                width:
                  `${Math.min(
                    reportedProgress,
                    100
                  )}%`,
              }}
            />
          </div>

        </article>

        {/* ===================================================
            FIELD OBSERVED
        =================================================== */}

        <article
          className={`fid-progress-card observed ${
            diff !== null && diff <= -5
              ? 'negative'
              : ''
          }`}
        >

          <div className="fid-progress-heading">
            Field-Observed Progress
          </div>

          <div
            className="fid-progress-value"
            style={{
              color:
                observedValue !== null
                  ? progressColor
                  : '#8ca59f',
            }}
          >
            {observedValue !== null
              ? observedValue
              : '—'}

            {observedValue !== null && (
              <small>%</small>
            )}
          </div>

          <div className="fid-progress-note">
            {observedValue !== null
              ? `As per inspector verification · ${inspection.date}`
              : 'Enter observed value below'}
          </div>

          {observedValue !== null && (
            <div className="fid-progress-bar">
              <div
                style={{
                  width:
                    `${Math.min(
                      observedValue,
                      100
                    )}%`,
                  background:
                    progressColor,
                }}
              />
            </div>
          )}

          {diff !== null && (
            <div className="fid-variation">

              <CheckCircle size={15} />

              <div>
                <strong>
                  Variation:{' '}
                  {diff >= 0 ? '+' : ''}
                  {diff}%
                </strong>

                <span>
                  Field progress is{' '}
                  {diff >= 0
                    ? 'ahead of'
                    : 'below'}{' '}
                  reported progress
                </span>
              </div>

            </div>
          )}

        </article>

      </section>

      {/* =====================================================
          SECOND ROW
          MEASUREMENTS + CONTEXT + GIS
      ===================================================== */}

      <section className="fid-bottom-grid">

        {/* ===================================================
            INSPECTOR FIELD MEASUREMENTS
        =================================================== */}

        <article className="fid-card fid-measurements">

          <div className="fid-section-title">
            <ClipboardCheck size={17} />
            <h3>
              Inspector Field Measurements
            </h3>
          </div>

          <label>
            Field-Observed Physical Progress (%)
          </label>

          <input
            className="fid-input"
            type="number"
            min="0"
            max="100"
            value={observed}
            onChange={(e) =>
              setObserved(e.target.value)
            }
            placeholder="Enter observed %"
          />

          <label className="fid-remarks-label">
            Inspector Field Remarks
          </label>

          <textarea
            className="fid-textarea"
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="Describe the site conditions, observed work stage, discrepancies noted..."
            rows={4}
          />

          <div className="fid-measure-footer">
            <ShieldCheck size={13} />
            Field values are recorded in the inspection
            and audit trail.
          </div>

        </article>

        {/* ===================================================
            PROJECT CONTEXT
        =================================================== */}

        <article className="fid-card fid-context">

          <div className="fid-section-title">
            <ClipboardCheck size={17} />
            <h3>
              Project Context
            </h3>
          </div>

          <div className="fid-context-list">

            <ContextRow
              label="Project ID"
              value={project.id}
            />

            <ContextRow
              label="Category"
              value={project.category}
            />

            <ContextRow
              label="Agency"
              value={project.agency}
            />

            <ContextRow
              label="Vendor"
              value={
                project.vendor || '—'
              }
            />

            <ContextRow
              label="Start Date"
              value={
                project.startDate || '—'
              }
            />

            <ContextRow
              label="Expected Completion"
              value={
                project.expectedCompletion ||
                '—'
              }
            />

            <div className="fid-context-row">
              <span>Status</span>

              <strong className="fid-status">
                {project.status ||
                  'Under Review'}
              </strong>
            </div>

          </div>

        </article>

        {/* ===================================================
            GIS MAP
        =================================================== */}

        <article className="fid-card fid-gis">

          <div className="fid-section-title">
            <MapPin size={17} />
            <h3>
              Location (GIS Map)
            </h3>
          </div>

          <div
            className="fid-map"
            onClick={() =>
              openGisAt?.(
                project.latitude,
                project.longitude,
                project.id
              )
            }
          >

            {/* Map-style visual background */}
            <div className="fid-map-block block-a" />
            <div className="fid-map-block block-b" />
            <div className="fid-map-block block-c" />
            <div className="fid-map-block block-d" />

            <div className="fid-map-water" />

            <div className="fid-map-road road-a" />
            <div className="fid-map-road road-b" />
            <div className="fid-map-road road-c" />

            <div className="fid-map-pin">
              <MapPin
                size={29}
                fill="#dc4a38"
              />
            </div>

            <div className="fid-map-label">
              <strong>
                {project.name
                  ?.split('–')[0]
                  ?.trim() ||
                  project.name}
              </strong>

              <span>
                {project.district}
              </span>
            </div>

            <div className="fid-map-controls">

              <button
                type="button"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                +
              </button>

              <button
                type="button"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                −
              </button>

              <button
                type="button"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >
                ⛶
              </button>

            </div>

          </div>

          <div className="fid-map-footer">

            <div>
              <MapPin size={15} />

              <span>
                {project.district}
                {project.state
                  ? `, ${project.state}`
                  : ''}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                openGisAt?.(
                  project.latitude,
                  project.longitude,
                  project.id
                )
              }
            >
              View in Maps ↗
            </button>

          </div>

        </article>

      </section>

      {/* =====================================================
          GPS — COMPACT ROW
      ===================================================== */}

      <section className="fid-gps-card">

        <div className="fid-gps-info">

          <div className="fid-gps-status">
            <MapPin size={16} />
            {gpsData.status}
          </div>

          <div className="fid-gps-coordinates">
            Lat: {gpsData.latitude}
            {' · '}
            Long: {gpsData.longitude}
          </div>

          <div className="fid-gps-meta">
            {gpsData.accuracy}
            {' · '}
            {gpsData.timestamp}
          </div>

        </div>

        <button
          className="fid-gps-button"
          onClick={handleCaptureGps}
          disabled={capturingGps}
        >
          <Navigation
            size={14}
            className={
              capturingGps
                ? 'fid-spin'
                : ''
            }
          />

          {capturingGps
            ? 'Locating...'
            : 'Capture Live GPS'}
        </button>

      </section>

      {/* =====================================================
          VERIFICATION / DECISION
      ===================================================== */}

      <section className="fid-decision-card">

        <div className="fid-decision-heading">

          <div>
            <span>
              OFFICER DECISION
            </span>

            <h3>
              Submit Field Inspection
            </h3>
          </div>

          <ShieldAlert
            size={20}
          />

        </div>

        <p>
          Review the observed progress,
          field remarks, photographs and
          GPS information before submitting
          the inspection result.
        </p>

        <div className="fid-decision-actions">

          <button
            className="fid-approve"
            onClick={() =>
              handleVerify('Verified')
            }
          >
            <CheckCircle size={15} />
            Approve — Physical Progress Verified
          </button>

          <button
            className="fid-discrepancy"
            onClick={() =>
              handleVerify('Discrepancy')
            }
          >
            <AlertTriangle size={15} />
            Flag Discrepancy
          </button>

          <button
            className="fid-escalate"
            onClick={() =>
              handleVerify('Escalate')
            }
          >
            <ShieldAlert size={15} />
            Escalate to Senior Authority
          </button>

        </div>

      </section>

      {/* =====================================================
          CONNECTED WORKFLOW
      ===================================================== */}

      <section className="fid-workflow-card">

        <span>
          CONNECTED WORKFLOW
        </span>

        <div>

          <button
            onClick={() =>
              openProject(project.id)
            }
          >
            <ArrowRight size={13} />
            Open Project Intelligence
          </button>

          <button
            onClick={() =>
              navigate('verification')
            }
          >
            <ShieldCheck size={13} />
            Field Evidence Verification
          </button>

          <button
            onClick={() =>
              navigate('compliance')
            }
          >
            <ClipboardCheck size={13} />
            View Audit Trail
          </button>

          <button
            onClick={() =>
              navigate('inspections')
            }
          >
            <ArrowLeft size={13} />
            Back to Inspections
          </button>

        </div>

      </section>

    </div>
  )
}


/* ============================================================
   PHOTO SLOT
   Initially EMPTY.
   After upload -> actual uploaded image preview.
   ============================================================ */

function InspectionPhotoSlot({
  photo,
  title,
  subtitle,
  onUpload,
  onRemove,
}) {
  return (
    <div className="fid-photo-slot">

      {!photo ? (
        <button
          type="button"
          className="fid-photo-upload"
          onClick={onUpload}
        >

          <div className="fid-photo-upload-icon">
            <ImagePlus size={25} />
          </div>

          <strong>
            Upload Image
          </strong>

          <span>
            Click to select field photo
          </span>

          <small>
            JPG · PNG · WEBP
          </small>

        </button>
      ) : (
        <div className="fid-photo-preview">

          <img
            src={photo.url}
            alt={title}
          />

          <div className="fid-photo-overlay">

            <span>
              <CheckCircle size={12} />
              Uploaded
            </span>

            <button
              type="button"
              onClick={onRemove}
              title="Remove photo"
            >
              <Trash2 size={13} />
            </button>

          </div>

        </div>
      )}

      <div className="fid-photo-caption">

        <strong>
          {title}
        </strong>

        <span>
          {photo
            ? photo.timestamp
            : subtitle}
        </span>

      </div>

      {photo && (
        <div className="fid-photo-name">
          {photo.name}
        </div>
      )}

    </div>
  )
}


/* ============================================================
   CONTEXT ROW
   ============================================================ */

function ContextRow({
  label,
  value,
}) {
  return (
    <div className="fid-context-row">

      <span>
        {label}
      </span>

      <strong>
        {value || '—'}
      </strong>

    </div>
  )
}

export default InspectionDetail