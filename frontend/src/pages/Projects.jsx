import { useEffect, useMemo, useState } from 'react'
import { Eye, Filter, Plus, Search, X } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { riskLabel } from '../utils/formatters.js'

export function Projects() {
  const {
    projects,
    openProject,
    riskFilter,
    setRiskFilter,
    gisStateFilter,
    setGisStateFilter,
    gisDistrictFilter,
    setGisDistrictFilter,
  } = useApp()

  const [district, setDistrict] = useState(
    gisDistrictFilter !== 'All'
      ? gisDistrictFilter
      : 'All'
  )

  const [state, setState] = useState(
    gisStateFilter || 'All'
  )

  const [status, setStatus] = useState('All')
  const [workType, setWorkType] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)


  /* =====================================================
     STATES
     ===================================================== */

  const states = useMemo(() => {
    return Array.from(
      new Set(
        projects
          .map((project) => project?.state)
          .filter(Boolean)
      )
    ).sort()
  }, [projects])


  /* =====================================================
     DISTRICTS

     District list changes according to selected state.
     ===================================================== */

  const districts = useMemo(() => {
    const source =
      state === 'All'
        ? projects
        : projects.filter(
            (project) => project.state === state
          )

    return Array.from(
      new Set(
        source
          .map((project) => project?.district)
          .filter(Boolean)
      )
    ).sort()
  }, [projects, state])


  /* =====================================================
     KEEP LOCAL FILTERS IN SYNC WITH GIS
     ===================================================== */

  useEffect(() => {
    if (gisStateFilter && gisStateFilter !== 'All') {
      setState(gisStateFilter)
    }
  }, [gisStateFilter])


  useEffect(() => {
    if (gisDistrictFilter && gisDistrictFilter !== 'All') {
      setDistrict(gisDistrictFilter)
    }
  }, [gisDistrictFilter])


  /* =====================================================
     STATE CHANGE
     ===================================================== */

  const handleStateChange = (value) => {
    setState(value)

    /*
     * Changing state invalidates the currently selected
     * district.
     */

    setDistrict('All')

    setGisStateFilter(value)
    setGisDistrictFilter('All')

    setCurrentPage(1)
  }


  /* =====================================================
     DISTRICT CHANGE
     ===================================================== */

  const handleDistrictChange = (value) => {
    setDistrict(value)
    setGisDistrictFilter(value)
    setCurrentPage(1)
  }


  /* =====================================================
     CLEAR GIS LOCATION FILTER
     ===================================================== */

  const clearLocationFilter = () => {
    setState('All')
    setDistrict('All')

    setGisStateFilter('All')
    setGisDistrictFilter('All')

    setCurrentPage(1)
  }


  /* =====================================================
     FILTER PROJECTS
     ===================================================== */

  const filtered = useMemo(() => {
    return projects.filter((project) => {

      const search =
        searchQuery.toLowerCase().trim()

      const matchesSearch =
        !search ||
        project.id
          .toLowerCase()
          .includes(search) ||
        project.name
          .toLowerCase()
          .includes(search) ||
        project.district
          .toLowerCase()
          .includes(search) ||
        project.state
          .toLowerCase()
          .includes(search)


      const matchesState =
        state === 'All' ||
        project.state === state


      const matchesDistrict =
        district === 'All' ||
        project.district === district


      const matchesStatus =
        status === 'All' ||
        project.status === status


      const matchesRisk =
        riskFilter === 'All' ||
        riskLabel(project.score)
          .toUpperCase() ===
          riskFilter.toUpperCase()


      const matchesType =
        workType === 'All' ||
        project.category === workType


      return (
        matchesSearch &&
        matchesState &&
        matchesDistrict &&
        matchesStatus &&
        matchesRisk &&
        matchesType
      )
    })
  }, [
    projects,
    searchQuery,
    state,
    district,
    status,
    riskFilter,
    workType,
  ])


  /* =====================================================
     RESET PAGINATION WHEN FILTERS CHANGE
     ===================================================== */

  useEffect(() => {
    setCurrentPage(1)
  }, [
    searchQuery,
    state,
    district,
    status,
    riskFilter,
    workType,
  ])


  /* =====================================================
     DISPLAY COUNT

     Current project seed is a demo dataset, so don't
     pretend it actually contains 1248 records.
     ===================================================== */

  const totalEntries = filtered.length


  return (
    <div className="projects-page-container">

      {/* =================================================
          HEADER
          ================================================= */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 16,
        }}
      >

        <div>

          <div className="breadcrumb-line">
            Home / <span>Projects</span>
          </div>

          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#0f172a',
            }}
          >
            Projects
          </h2>

          <p
            style={{
              fontSize: 13,
              color: '#64748b',
              marginTop: 2,
            }}
          >
            Search and monitor MPLADS works
          </p>

        </div>


        <button
          className="primary-btn"
          onClick={() =>
            alert(
              'Add Project dialog placeholder.'
            )
          }
        >
          <Plus size={16} />
          Add Project
        </button>

      </div>


      {/* =================================================
          GIS CONTEXT BANNER

          Only appears when Projects was reached from
          a geographic selection.
          ================================================= */}

      {(state !== 'All' || district !== 'All') && (

        <div className="projects-location-context">

          <div className="projects-location-info">

            <MapPinSmall />

            <div>

              <span>
                GEOGRAPHIC FILTER
              </span>

              <strong>
                {district !== 'All'
                  ? `${district}, ${state}`
                  : state}
              </strong>

            </div>

          </div>


          <button
            type="button"
            onClick={clearLocationFilter}
          >
            <X size={14} />
            Clear location
          </button>

        </div>

      )}


      {/* =================================================
          FILTER BAR
          ================================================= */}

      <div className="filter-bar-wrap">


        {/* STATE */}

        <div className="filter-group">

          <label>
            State
          </label>

          <select
            value={state}
            onChange={(e) =>
              handleStateChange(
                e.target.value
              )
            }
          >

            <option value="All">
              All States
            </option>

            {states.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
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
            value={district}
            disabled={state === 'All'}
            onChange={(e) =>
              handleDistrictChange(
                e.target.value
              )
            }
          >

            <option value="All">
              All Districts
            </option>

            {districts.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

        </div>


        {/* STATUS */}

        <div className="filter-group">

          <label>
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Ongoing">
              Ongoing
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Delayed">
              Delayed
            </option>

            <option value="Under Review">
              Under Review
            </option>

          </select>

        </div>


        {/* RISK */}

        <div className="filter-group">

          <label>
            Risk Level
          </label>

          <select
            value={riskFilter}
            onChange={(e) =>
              setRiskFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

        </div>


        {/* WORK TYPE */}

        <div className="filter-group">

          <label>
            Work Type
          </label>

          <select
            value={workType}
            onChange={(e) =>
              setWorkType(
                e.target.value
              )
            }
          >

            <option value="All">
              All
            </option>

            <option value="Road">
              Road
            </option>

            <option value="Community Infrastructure">
              Community Hall
            </option>

            <option value="Health">
              Health
            </option>

            <option value="Water">
              Water
            </option>

            <option value="Education">
              Education
            </option>

            <option value="Sanitation">
              Sanitation
            </option>

          </select>

        </div>


        {/* SEARCH */}

        <div
          className="filter-search-input"
          style={{
            marginLeft: 'auto',
          }}
        >

          <Search
            size={16}
            style={{
              color: '#94a3b8',
            }}
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }
            placeholder="Search project..."
          />

        </div>


        <button
          className="secondary-btn"
          type="button"
        >

          <Filter size={15} />

          Filter

        </button>

      </div>


      {/* =================================================
          RESULT SUMMARY
          ================================================= */}

      <div className="projects-result-summary">

        <span>
          Showing
        </span>

        <strong>
          {totalEntries}
        </strong>

        <span>
          matching projects
        </span>

        {(state !== 'All' ||
          district !== 'All') && (

          <span className="projects-result-location">

            ·{' '}

            {district !== 'All'
              ? `${district}, ${state}`
              : state}

          </span>

        )}

      </div>


      {/* =================================================
          PROJECT TABLE
          ================================================= */}

      <div
        className="panel"
        style={{
          padding: 0,
          overflow: 'hidden',
        }}
      >

        <div className="table-responsive">

          <table className="custom-table">

            <thead>

              <tr>

                <th>
                  Project ID
                </th>

                <th>
                  Project Name
                </th>

                <th>
                  District
                </th>

                <th>
                  Status
                </th>

                <th>
                  Progress
                </th>

                <th>
                  Expenditure
                </th>

                <th>
                  Risk Score
                </th>

                <th>
                  Risk Level
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {filtered.map((project) => {

                const riskCategory =
                  riskLabel(
                    project.score
                  ).toLowerCase()


                const statusCategory =
                  project.status
                    .toLowerCase()
                    .replace(/\s+/g, '-')


                return (

                  <tr
                    key={project.id}
                    onClick={() =>
                      openProject(
                        project.id
                      )
                    }
                  >

                    <td
                      style={{
                        fontWeight: 700,
                        color: '#1e293b',
                      }}
                    >
                      {project.id}
                    </td>


                    <td
                      style={{
                        fontWeight: 600,
                        color: '#0f172a',
                      }}
                    >
                      {project.name}
                    </td>


                    <td>
                      {project.district}
                    </td>


                    <td>

                      <span
                        className={`status-badge-clean ${statusCategory}`}
                      >
                        {project.status}
                      </span>

                    </td>


                    <td>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >

                        <div
                          style={{
                            flex: 1,
                            height: 6,
                            background: '#e2e8f0',
                            borderRadius: 3,
                            overflow: 'hidden',
                          }}
                        >

                          <div
                            style={{
                              height: '100%',
                              width: `${project.physical}%`,
                              background:
                                project.physical < 40
                                  ? '#f59e0b'
                                  : '#16a34a',
                              borderRadius: 3,
                            }}
                          />

                        </div>


                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            width: 32,
                          }}
                        >
                          {project.physical}%
                        </span>

                      </div>

                    </td>


                    <td
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      {project.expenditure}%
                    </td>


                    <td
                      style={{
                        fontWeight: 800,
                      }}
                    >
                      {project.score}
                    </td>


                    <td>

                      <span
                        className={`badge-pill ${riskCategory}`}
                      >

                        <i />

                        {riskLabel(
                          project.score
                        )}

                      </span>

                    </td>


                    <td>

                      <button
                        type="button"
                        className="secondary-btn"
                        style={{
                          padding: 6,
                          borderRadius: 4,
                        }}
                        onClick={(e) => {

                          e.stopPropagation()

                          openProject(
                            project.id
                          )

                        }}
                        aria-label="View project"
                      >

                        <Eye size={15} />

                      </button>

                    </td>

                  </tr>

                )

              })}


              {/* EMPTY STATE */}

              {filtered.length === 0 && (

                <tr>

                  <td
                    colSpan={9}
                    style={{
                      padding: '48px 20px',
                      textAlign: 'center',
                    }}
                  >

                    <div
                      style={{
                        fontWeight: 800,
                        color: '#172b36',
                        marginBottom: 5,
                      }}
                    >
                      No projects found
                    </div>

                    <div
                      style={{
                        color: '#718078',
                        fontSize: 12,
                      }}
                    >
                      Try changing the selected
                      state, district, risk or
                      search filters.
                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            PAGINATION
            ================================================= */}

        <div
          className="pagination-bar"
          style={{
            padding: '14px 20px',
          }}
        >

          <div>
            Showing 1 to {filtered.length} of{' '}
            {totalEntries} entries
          </div>


          <div className="pagination-pages">

            <button
              type="button"
              className="page-num-btn"
              disabled
            >
              &lt;
            </button>


            <button
              type="button"
              className={`page-num-btn ${
                currentPage === 1
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setCurrentPage(1)
              }
            >
              1
            </button>


            <button
              type="button"
              className={`page-num-btn ${
                currentPage === 2
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setCurrentPage(2)
              }
            >
              2
            </button>


            <button
              type="button"
              className={`page-num-btn ${
                currentPage === 3
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setCurrentPage(3)
              }
            >
              3
            </button>


            <span
              style={{
                padding: '0 4px',
                alignSelf: 'center',
              }}
            >
              ...
            </span>


            <button
              type="button"
              className="page-num-btn"
            >
              156
            </button>


            <button
              type="button"
              className="page-num-btn"
              disabled
            >
              &gt;
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}


/* =========================================================
   SMALL INTERNAL ICON
   Avoids adding another dependency/import.
   ========================================================= */

function MapPinSmall() {
  return (
    <span className="projects-location-icon">
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle
          cx="12"
          cy="10"
          r="3"
        />
      </svg>
    </span>
  )
}


export default Projects