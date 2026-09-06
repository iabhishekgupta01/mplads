import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Layers,
  MapPin,
  RefreshCw,
  ShieldAlert,
  X,
  ZoomIn,
  ZoomOut,
  LocateFixed,
} from 'lucide-react'

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import { useApp } from '../context/AppContext.jsx'
import { riskLabel } from '../utils/formatters.js'


/* =========================================================
   INDIA STATE CENTRE COORDINATES
   Used as fallback when a project does not have
   latitude / longitude in mock data.
   ========================================================= */

const STATE_COORDINATES = {
  'Andhra Pradesh': [15.9129, 79.7400],
  Assam: [26.2006, 92.9376],
  Bihar: [25.0961, 85.3131],
  Chhattisgarh: [21.2787, 81.8661],
  Delhi: [28.6139, 77.2090],
  Goa: [15.2993, 74.1240],
  Gujarat: [22.2587, 71.1924],
  Haryana: [29.0588, 76.0856],
  'Himachal Pradesh': [31.1048, 77.1734],
  Jharkhand: [23.6102, 85.2799],
  Karnataka: [15.3173, 75.7139],
  Kerala: [10.8505, 76.2711],
  'Madhya Pradesh': [22.9734, 78.6569],
  Maharashtra: [19.7515, 75.7139],
  Manipur: [24.6637, 93.9063],
  Meghalaya: [25.4670, 91.3662],
  Mizoram: [23.1645, 92.9376],
  Nagaland: [26.1584, 94.5624],
  Odisha: [20.9517, 85.0985],
  Punjab: [31.1471, 75.3412],
  Rajasthan: [27.0238, 74.2179],
  Sikkim: [27.5330, 88.5122],
  'Tamil Nadu': [11.1271, 78.6569],
  Telangana: [18.1124, 79.0193],
  Tripura: [23.9408, 91.9882],
  'Uttar Pradesh': [26.8467, 80.9462],
  Uttarakhand: [30.0668, 79.0193],
  'West Bengal': [22.9868, 87.8550],
  Chandigarh: [30.7333, 76.7794],
  Puducherry: [11.9416, 79.8083],
  'Jammu and Kashmir': [33.7782, 76.5762],
  Ladakh: [34.1526, 77.5771],
  'Andaman and Nicobar Islands': [11.7401, 92.6586],
  Lakshadweep: [10.5667, 72.6417],
}


/* =========================================================
   MAP CONTROLS
   ========================================================= */

function MapControls() {
  const map = useMap()

  return (
    <div className="gis-map-controls">

      <button
        type="button"
        title="Zoom in"
        onClick={() => map.zoomIn()}
      >
        <ZoomIn size={16} />
      </button>

      <button
        type="button"
        title="Zoom out"
        onClick={() => map.zoomOut()}
      >
        <ZoomOut size={16} />
      </button>

      <button
        type="button"
        title="Reset India view"
        onClick={() =>
          map.setView([22.5, 79], 5, {
            animate: true,
          })
        }
      >
        <LocateFixed size={16} />
      </button>

    </div>
  )
}


/* =========================================================
   PROJECT COORDINATES
   ========================================================= */

function getCoordinates(project, index) {
  const latitude = Number(
    project?.latitude ??
      project?.lat ??
      project?.location?.latitude
  )

  const longitude = Number(
    project?.longitude ??
      project?.lng ??
      project?.lon ??
      project?.location?.longitude
  )

  /*
   * If project already contains valid coordinates,
   * use them directly.
   */

  if (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= 6 &&
    latitude <= 38 &&
    longitude >= 68 &&
    longitude <= 98
  ) {
    return [latitude, longitude]
  }

  /*
   * Otherwise use state centre with deterministic
   * offsets so markers don't completely overlap.
   */

  const fallback =
    STATE_COORDINATES[project?.state] ||
    [22.9734, 78.6569]

  const row = Math.floor(index / 4)
  const column = index % 4

  return [
    fallback[0] + (row % 3 - 1) * 0.18,
    fallback[1] + (column - 1.5) * 0.18,
  ]
}


/* =========================================================
   RISK HELPERS
   ========================================================= */

function getRiskColor(score) {
  const label = riskLabel(score)?.toUpperCase()

  if (label === 'HIGH') return '#c62828'
  if (label === 'MEDIUM') return '#c8902f'

  return '#10834b'
}


function getRiskText(score) {
  const label = riskLabel(score)?.toUpperCase()

  if (label === 'HIGH') return 'High Risk'
  if (label === 'MEDIUM') return 'Medium Risk'

  return 'Low Risk'
}


/* =========================================================
   GIS PAGE
   ========================================================= */

export function GisPage() {

  const {
    projects,
    openProject,

    /*
     * GIS filter state stored in AppContext.
     * This allows GIS selections to be reused by
     * other pages such as Projects.
     */

    setGisStateFilter,
    setGisDistrictFilter,
  } = useApp()


  /* -------------------------------------------------------
     LOCAL GIS FILTER STATE
     ------------------------------------------------------- */

  const [selectedState, setSelectedState] = useState('All')
  const [selectedDistrict, setSelectedDistrict] = useState('All')

  const [riskFilter, setRiskFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const [selectedMarker, setSelectedMarker] = useState(null)


  /* -------------------------------------------------------
     PROJECT CATEGORIES
     ------------------------------------------------------- */

  const categoriesList = [
    'All',
    'Roads',
    'Water',
    'Education',
    'Health',
    'Sanitation',
  ]


  /* -------------------------------------------------------
     STATES FROM ACTUAL PROJECT DATA
     ------------------------------------------------------- */

  const statesList = useMemo(() => {

    return Array.from(
      new Set(
        projects
          .map((project) => project?.state)
          .filter(Boolean)
      )
    ).sort()

  }, [projects])


  /* -------------------------------------------------------
     DISTRICTS

     If a state is selected, only districts belonging
     to that state are shown.
     ------------------------------------------------------- */

  const districtsList = useMemo(() => {

    const sourceProjects =
      selectedState === 'All'
        ? projects
        : projects.filter(
            (project) =>
              project?.state === selectedState
          )

    return Array.from(
      new Set(
        sourceProjects
          .map((project) => project?.district)
          .filter(Boolean)
      )
    ).sort()

  }, [projects, selectedState])


  /* -------------------------------------------------------
     FILTERED PROJECTS

     These are the projects currently represented by
     the markers on the map.
     ------------------------------------------------------- */

  const filteredProjects = useMemo(() => {

    return projects.filter((project) => {

      const stateMatch =
        selectedState === 'All' ||
        project.state === selectedState


      const districtMatch =
        selectedDistrict === 'All' ||
        project.district === selectedDistrict


      const projectRisk =
        riskLabel(project.score)?.toUpperCase()


      const riskMatch =
        riskFilter === 'All' ||
        projectRisk === riskFilter.toUpperCase()


      const categoryMatch =
        categoryFilter === 'All' ||
        project.category
          ?.toLowerCase()
          .includes(categoryFilter.toLowerCase())


      return (
        stateMatch &&
        districtMatch &&
        riskMatch &&
        categoryMatch
      )

    })

  }, [
    projects,
    selectedState,
    selectedDistrict,
    riskFilter,
    categoryFilter,
  ])


  /* -------------------------------------------------------
     AREA PROJECTS

     This intentionally ignores risk/category filters.
     It tells us the actual size of the selected
     geographic area.
     ------------------------------------------------------- */

  const selectedAreaProjects = useMemo(() => {

    return projects.filter((project) => {

      const stateMatch =
        selectedState === 'All' ||
        project.state === selectedState

      const districtMatch =
        selectedDistrict === 'All' ||
        project.district === selectedDistrict

      return stateMatch && districtMatch

    })

  }, [
    projects,
    selectedState,
    selectedDistrict,
  ])


  /* -------------------------------------------------------
     RISK COUNTS
     ------------------------------------------------------- */

  const highRiskCount = filteredProjects.filter(
    (project) =>
      riskLabel(project.score)?.toUpperCase() === 'HIGH'
  ).length


  const mediumRiskCount = filteredProjects.filter(
    (project) =>
      riskLabel(project.score)?.toUpperCase() === 'MEDIUM'
  ).length


  const lowRiskCount = filteredProjects.filter(
    (project) =>
      riskLabel(project.score)?.toUpperCase() === 'LOW'
  ).length


  /* -------------------------------------------------------
     AREA AVERAGE RISK
     ------------------------------------------------------- */

  const averageRisk = selectedAreaProjects.length
    ? Math.round(
        selectedAreaProjects.reduce(
          (sum, project) =>
            sum + Number(project.score || 0),
          0
        ) / selectedAreaProjects.length
      )
    : 0


  /* -------------------------------------------------------
     AREA EXPENDITURE

     Project expenditure is represented as percentage
     in the current mock data.
     ------------------------------------------------------- */

  const averageExpenditure =
    selectedAreaProjects.length
      ? Math.round(
          selectedAreaProjects.reduce(
            (sum, project) =>
              sum + Number(project.expenditure || 0),
            0
          ) / selectedAreaProjects.length
        )
      : 0


  /* -------------------------------------------------------
     RESET
     ------------------------------------------------------- */

  const resetFilters = () => {

    setSelectedState('All')
    setSelectedDistrict('All')

    setRiskFilter('All')
    setCategoryFilter('All')

    setSelectedMarker(null)

    /*
     * Clear global GIS filters too.
     */

    setGisStateFilter('All')
    setGisDistrictFilter('All')
  }


  /* -------------------------------------------------------
     STATE CHANGE
     ------------------------------------------------------- */

  const handleStateChange = (value) => {

    setSelectedState(value)

    /*
     * A district belongs to a state.
     * Therefore changing state must reset district.
     */

    setSelectedDistrict('All')

    setGisStateFilter(value)
    setGisDistrictFilter('All')

    setSelectedMarker(null)
  }


  /* -------------------------------------------------------
     DISTRICT CHANGE
     ------------------------------------------------------- */

  const handleDistrictChange = (value) => {

    setSelectedDistrict(value)

    setGisDistrictFilter(value)

    setSelectedMarker(null)
  }


  return (

    <div className="gis-page-container">


      {/* =================================================
          PAGE HEADER
          ================================================= */}

      <div className="gis-page-heading">

        <div>

          <div className="gis-eyebrow">
            GEOGRAPHIC RISK INTELLIGENCE
          </div>

          <h2>
            Interactive National GIS Risk Map
          </h2>

          <p>
            Geographic view of MPLADS works, risk
            signals, and project-level anomalies
            for investigation.
          </p>

        </div>


        <button
          type="button"
          className="secondary-btn gis-reset-btn"
          onClick={resetFilters}
        >

          <RefreshCw size={15} />

          Reset Filters

        </button>

      </div>


      {/* =================================================
          FILTER BAR
          ================================================= */}

      <div className="filter-bar-wrap gis-filter-bar">


        {/* STATE */}

        <div className="filter-group">

          <label>
            State / Jurisdiction
          </label>

          <select
            value={selectedState}
            onChange={(event) =>
              handleStateChange(event.target.value)
            }
          >

            <option value="All">
              All India — 28 States & 8 UTs
            </option>

            {statesList.map((state) => (

              <option
                key={state}
                value={state}
              >
                {state}
              </option>

            ))}

          </select>

        </div>


        {/* DISTRICT */}

        <div className="filter-group">

          <label>
            District
          </label>

          <select
            value={selectedDistrict}
            disabled={selectedState === 'All'}
            onChange={(event) =>
              handleDistrictChange(
                event.target.value
              )
            }
          >

            <option value="All">
              All Districts
            </option>

            {districtsList.map((district) => (

              <option
                key={district}
                value={district}
              >
                {district}
              </option>

            ))}

          </select>

        </div>


        {/* RISK */}

        <div className="filter-group">

          <label>
            Risk Severity
          </label>

          <select
            value={riskFilter}
            onChange={(event) =>
              setRiskFilter(event.target.value)
            }
          >

            <option value="All">
              All Risk Levels
            </option>

            <option value="High">
              High Risk — &gt;70
            </option>

            <option value="Medium">
              Medium Risk — 40–70
            </option>

            <option value="Low">
              Low Risk — &lt;40
            </option>

          </select>

        </div>


        {/* CATEGORY */}

        <div className="filter-group">

          <label>
            Project Sector
          </label>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
          >

            {categoriesList.map((category) => (

              <option
                key={category}
                value={category}
              >
                {category}
              </option>

            ))}

          </select>

        </div>


        {/* MARKER COUNT */}

        <div className="gis-marker-count">

          <Layers size={16} />

          <strong>
            {filteredProjects.length}
          </strong>

          <span>
            active geo markers
          </span>

        </div>

      </div>


      {/* =================================================
          MAP
          ================================================= */}

      <div className="gis-map-container">


        {/* MAP HEADER */}

        <div className="gis-map-header">

          <div className="gis-map-title">

            <MapPin size={18} />

            <div>

              <strong>
                NATIONAL GEOSPATIAL ANOMALY MONITOR
              </strong>

              <span>
                Live project risk intelligence
              </span>

            </div>

          </div>


          {/* LEGEND */}

          <div className="gis-map-legend">

            <span>

              <i className="legend-dot high" />

              High

              <b>
                {highRiskCount}
              </b>

            </span>


            <span>

              <i className="legend-dot medium" />

              Medium

              <b>
                {mediumRiskCount}
              </b>

            </span>


            <span>

              <i className="legend-dot low" />

              Low

              <b>
                {lowRiskCount}
              </b>

            </span>

          </div>

        </div>


        {/* MAP BODY */}

        <div className="gis-map-body">


          <MapContainer
            center={[22.5, 79]}
            zoom={5}
            minZoom={4}
            maxZoom={12}
            scrollWheelZoom
            zoomControl={false}
            className="gis-leaflet-map"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <MapControls />


            {/* =========================================
                PROJECT MARKERS
                ========================================= */}

            {filteredProjects.map(
              (project, index) => {

                const coordinates =
                  getCoordinates(
                    project,
                    index
                  )


                const color =
                  getRiskColor(project.score)


                const risk =
                  getRiskText(project.score)


                return (

                  <CircleMarker
                    key={project.id}
                    center={coordinates}
                    radius={8}
                    pathOptions={{
                      color: '#ffffff',
                      weight: 2,
                      fillColor: color,
                      fillOpacity: 0.95,
                    }}
                    eventHandlers={{
                      click: () =>
                        setSelectedMarker(project),
                    }}
                  >

                    <Popup>

                      <div className="gis-popup">


                        {/* LOCATION */}

                        <div className="gis-popup-location">

                          <MapPin size={13} />

                          {project.district}

                          {project.district &&
                            project.state
                            ? ', '
                            : ''}

                          {project.state}

                        </div>


                        {/* PROJECT NAME */}

                        <div className="gis-popup-title">

                          {project.name}

                        </div>


                        {/* PROJECT ID */}

                        <div className="gis-popup-id">

                          {project.id}

                          <span>
                            •
                          </span>

                          {project.category}

                        </div>


                        {/* RISK */}

                        <div className="gis-popup-risk">

                          <span>
                            Risk score
                          </span>

                          <strong
                            style={{
                              color,
                            }}
                          >
                            {project.score}
                          </strong>

                          <small>
                            {risk}
                          </small>

                        </div>


                        {/* INVESTIGATION */}

                        <button
                          type="button"
                          className="gis-popup-action"
                          onClick={() =>
                            openProject(
                              project.id
                            )
                          }
                        >

                          Investigate

                          <ArrowRight size={13} />

                        </button>

                      </div>

                    </Popup>

                  </CircleMarker>

                )

              }
            )}

          </MapContainer>


          {/* =================================================
              MAP STATUS
              ================================================= */}

          <div className="gis-map-status">

            <span className="gis-live-dot" />

            <span>
              Live project view
            </span>

            <strong>
              {filteredProjects.length}
            </strong>

            <span>
              works in current filter
            </span>

          </div>


          {/* =================================================
              SELECTED PROJECT CARD
              ================================================= */}

          {selectedMarker && (

            <div className="map-card-floating">


              <button
                type="button"
                className="gis-close-btn"
                onClick={() =>
                  setSelectedMarker(null)
                }
                aria-label="Close project details"
              >

                <X size={17} />

              </button>


              {/* LOCATION */}

              <div className="gis-project-location">

                <MapPin size={14} />

                {selectedMarker.district}

                {selectedMarker.district &&
                  selectedMarker.state
                  ? ', '
                  : ''}

                {selectedMarker.state}

              </div>


              {/* NAME */}

              <strong className="gis-project-name">

                {selectedMarker.name}

              </strong>


              {/* ID */}

              <div className="gis-project-id">

                ID: {selectedMarker.id}

                <span>
                  •
                </span>

                {selectedMarker.category}

              </div>


              {/* METRICS */}

              <div className="gis-project-metrics">


                <div>

                  <span>
                    Risk score
                  </span>

                  <strong
                    style={{
                      color:
                        getRiskColor(
                          selectedMarker.score
                        ),
                    }}
                  >
                    {selectedMarker.score}
                  </strong>

                </div>


                <div>

                  <span>
                    Physical
                  </span>

                  <strong>
                    {selectedMarker.physical}%
                  </strong>

                </div>


                <div>

                  <span>
                    Paid
                  </span>

                  <strong>
                    {selectedMarker.expenditure}%
                  </strong>

                </div>

              </div>


              {/* WARNING */}

              <div className="gis-project-warning">

                <ShieldAlert size={15} />

                <span>

                  Financial payout exceeds
                  physical execution by{' '}

                  <strong>
                    {Math.abs(
                      Number(
                        selectedMarker.expenditure
                      ) -
                      Number(
                        selectedMarker.physical
                      )
                    )}
                    %
                  </strong>

                </span>

              </div>


              {/* INVESTIGATE */}

              <button
                type="button"
                className="primary-btn gis-investigate-btn"
                onClick={() =>
                  openProject(
                    selectedMarker.id
                  )
                }
              >

                Investigate Work File

                <ArrowRight size={15} />

              </button>

            </div>

          )}

        </div>

      </div>


      {/* =================================================
          SELECTED AREA INTELLIGENCE
          ================================================= */}

      {selectedState !== 'All' && (

        <div className="gis-selected-area">


          <div>

            <div className="gis-eyebrow">
              SELECTED GEOGRAPHIC AREA
            </div>


            <h2>

              {selectedDistrict !== 'All'
                ? `${selectedDistrict}, ${selectedState}`
                : selectedState}

            </h2>


            <p>

              {selectedAreaProjects.length}{' '}
              projects monitored

              {highRiskCount > 0
                ? ` · ${highRiskCount} high-risk projects currently matching the filters`
                : ' · No high-risk projects in the current filter'}

            </p>

          </div>


          <div className="gis-area-actions">

            <div className="gis-area-mini-stat">

              <span>
                Avg Risk
              </span>

              <strong>
                {averageRisk}
              </strong>

            </div>


            <div className="gis-area-mini-stat">

              <span>
                Avg Expenditure
              </span>

              <strong>
                {averageExpenditure}%
              </strong>

            </div>


            <button
              type="button"
              className="primary-btn"
              onClick={() => {

                /*
                 * For now this selects the highest-risk
                 * project in the selected geographic area.
                 *
                 * Projects-page global filtering will use
                 * gisStateFilter / gisDistrictFilter from
                 * AppContext in the next step.
                 */

                const highestRiskProject =
                  [...selectedAreaProjects]
                    .sort(
                      (a, b) =>
                        Number(b.score || 0) -
                        Number(a.score || 0)
                    )[0]

                if (highestRiskProject) {
                  openProject(
                    highestRiskProject.id
                  )
                }

              }}
              disabled={
                selectedAreaProjects.length === 0
              }
            >

              View Highest-Risk Project

              <ArrowRight size={15} />

            </button>

          </div>

        </div>

      )}

    </div>

  )
}


export default GisPage