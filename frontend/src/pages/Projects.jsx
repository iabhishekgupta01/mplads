import { useEffect, useMemo, useState } from 'react'
import {
  Eye,
  Filter,
  Plus,
  Search,
  X,
  MapPin,
} from 'lucide-react'

import { useApp } from '../context/AppContext.jsx'
import {
  formatCurrency,
  riskLabel,
} from '../utils/formatters.js'


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


  /* =========================================================
     LOCAL FILTER STATE
  ========================================================= */

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


  /* =========================================================
     DATA SAFETY
     
     Prevents the page from breaking if a project has
     incomplete prototype data.
  ========================================================= */

  const safeProjects = Array.isArray(projects)
    ? projects
    : []


  /* =========================================================
     STATES
  ========================================================= */

  const states = useMemo(() => {

    return Array.from(
      new Set(
        safeProjects
          .map((project) => project?.state)
          .filter(Boolean)
      )
    ).sort()

  }, [safeProjects])


  /* =========================================================
     DISTRICTS

     Districts are dynamically filtered by selected state.
  ========================================================= */

  const districts = useMemo(() => {

    const source =
      state === 'All'
        ? safeProjects
        : safeProjects.filter(
            (project) =>
              project?.state === state
          )


    return Array.from(
      new Set(
        source
          .map((project) => project?.district)
          .filter(Boolean)
      )
    ).sort()

  }, [safeProjects, state])


  /* =========================================================
     WORK TYPES

     Uses actual categories from dataset instead of keeping
     the filter hardcoded.
  ========================================================= */

  const workTypes = useMemo(() => {

    return Array.from(
      new Set(
        safeProjects
          .map((project) => project?.category)
          .filter(Boolean)
      )
    ).sort()

  }, [safeProjects])


  /* =========================================================
     STATUS TYPES

     Automatically derives available project statuses.
  ========================================================= */

  const statuses = useMemo(() => {

    return Array.from(
      new Set(
        safeProjects
          .map((project) => project?.status)
          .filter(Boolean)
      )
    ).sort()

  }, [safeProjects])


  /* =========================================================
     KEEP LOCATION FILTER IN SYNC WITH GIS
  ========================================================= */

  useEffect(() => {

    if (
      gisStateFilter &&
      gisStateFilter !== 'All'
    ) {
      setState(gisStateFilter)
    }

  }, [gisStateFilter])


  useEffect(() => {

    if (
      gisDistrictFilter &&
      gisDistrictFilter !== 'All'
    ) {
      setDistrict(gisDistrictFilter)
    }

  }, [gisDistrictFilter])


  /* =========================================================
     STATE CHANGE
  ========================================================= */

  const handleStateChange = (value) => {

    setState(value)

    // State change invalidates current district.
    setDistrict('All')

    setGisStateFilter(value)

    setGisDistrictFilter('All')

    setCurrentPage(1)

  }


  /* =========================================================
     DISTRICT CHANGE
  ========================================================= */

  const handleDistrictChange = (value) => {

    setDistrict(value)

    setGisDistrictFilter(value)

    setCurrentPage(1)

  }


  /* =========================================================
     CLEAR LOCATION FILTER
  ========================================================= */

  const clearLocationFilter = () => {

    setState('All')

    setDistrict('All')

    setGisStateFilter('All')

    setGisDistrictFilter('All')

    setCurrentPage(1)

  }


  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filtered = useMemo(() => {

    const search =
      searchQuery
        .toLowerCase()
        .trim()


    return safeProjects.filter(
      (project) => {

        const projectId =
          String(project?.id || '')
            .toLowerCase()

        const projectName =
          String(project?.name || '')
            .toLowerCase()

        const projectDistrict =
          String(project?.district || '')
            .toLowerCase()

        const projectState =
          String(project?.state || '')
            .toLowerCase()

        const projectCategory =
          String(project?.category || '')
            .toLowerCase()

        const matchesSearch =
          !search ||
          projectId.includes(search) ||
          projectName.includes(search) ||
          projectDistrict.includes(search) ||
          projectState.includes(search) ||
          projectCategory.includes(search)


        const matchesState =
          state === 'All' ||
          project?.state === state


        const matchesDistrict =
          district === 'All' ||
          project?.district === district


        const matchesStatus =
          status === 'All' ||
          project?.status === status


        const matchesRisk =
          riskFilter === 'All' ||
          riskLabel(
            Number(project?.score || 0)
          ).toUpperCase() ===
            riskFilter.toUpperCase()


        const matchesType =
          workType === 'All' ||
          project?.category === workType


        return (
          matchesSearch &&
          matchesState &&
          matchesDistrict &&
          matchesStatus &&
          matchesRisk &&
          matchesType
        )

      }
    )

  }, [
    safeProjects,
    searchQuery,
    state,
    district,
    status,
    riskFilter,
    workType,
  ])


  /* =========================================================
     RESET PAGINATION
  ========================================================= */

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


  /* =========================================================
     SUMMARY METRICS

     These are calculated from actual project fields.
     They help demonstrate the MPLADS monitoring model.
  ========================================================= */

  const summary = useMemo(() => {

    const totalSanctioned =
      filtered.reduce(
        (sum, project) =>
          sum +
          Number(
            project?.sanction?.sanctionedAmount ??
            project?.amount ??
            0
          ),
        0
      )


    const totalExpenditure =
      filtered.reduce(
        (sum, project) =>
          sum +
          Number(
            project?.financial?.utilizedAmount ??
            project?.cost?.actualExpenditure ??
            0
          ),
        0
      )


    const highRisk =
      filtered.filter(
        (project) =>
          Number(project?.score || 0) >= 80
      ).length


    const delayed =
      filtered.filter(
        (project) =>
          String(project?.status || '')
            .toLowerCase() === 'delayed'
      ).length


    const pendingAssetVerification =
      filtered.filter(
        (project) =>
          project?.asset?.verificationStatus !==
          'Verified'
      ).length


    return {
      totalSanctioned,
      totalExpenditure,
      highRisk,
      delayed,
      pendingAssetVerification,
    }

  }, [filtered])


  /* =========================================================
     CURRENCY FORMATTER

     Keeps compatibility even if older data contains
     missing values.
  ========================================================= */

  const currency = (amount) => {

    try {

      return formatCurrency(
        Number(amount || 0)
      )

    } catch {

      return `₹${Number(
        amount || 0
      ).toLocaleString('en-IN')}`

    }

  }


  /* =========================================================
     ASSET STATUS HELPER
  ========================================================= */

  const getAssetStatus = (project) => {

    const status =
      project?.asset?.verificationStatus


    if (status === 'Verified') {

      return {
        label: 'Verified',
        className: 'verified',
      }

    }


    if (
      status === 'Mismatch' ||
      status === 'Physical Mismatch'
    ) {

      return {
        label: 'Mismatch',
        className: 'mismatch',
      }

    }


    return {
      label: 'Pending',
      className: 'pending',
    }

  }


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="projects-page-container">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 16,
          gap: 16,
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
              margin: 0,
            }}
          >
            Projects
          </h2>


          <p
            style={{
              fontSize: 13,
              color: '#64748b',
              marginTop: 4,
              marginBottom: 0,
            }}
          >
            Search and monitor MPLADS works
          </p>

        </div>


        <button
          className="primary-btn"
          type="button"
          onClick={() =>
            alert(
              'Add Project workflow will be connected to the backend.'
            )
          }
        >

          <Plus size={16} />

          Add Project

        </button>

      </div>



      {/* =====================================================
          MPLADS MONITORING SUMMARY
      ===================================================== */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(4, minmax(0, 1fr))',
          gap: 10,
          marginBottom: 16,
        }}
      >

        <div className="panel">

          <div
            style={{
              fontSize: 10,
              color: '#64748b',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Sanctioned Value
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 18,
              fontWeight: 800,
              color: '#0f172a',
            }}
          >
            {currency(
              summary.totalSanctioned
            )}
          </div>

        </div>


        <div className="panel">

          <div
            style={{
              fontSize: 10,
              color: '#64748b',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Actual Expenditure
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 18,
              fontWeight: 800,
              color: '#0f172a',
            }}
          >
            {currency(
              summary.totalExpenditure
            )}
          </div>

        </div>


        <div className="panel">

          <div
            style={{
              fontSize: 10,
              color: '#64748b',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            High Risk
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 18,
              fontWeight: 800,
              color: '#b91c1c',
            }}
          >
            {summary.highRisk}
          </div>

        </div>


        <div className="panel">

          <div
            style={{
              fontSize: 10,
              color: '#64748b',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Asset Verification Pending
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 18,
              fontWeight: 800,
              color: '#b45309',
            }}
          >
            {summary.pendingAssetVerification}
          </div>

        </div>

      </div>



      {/* =====================================================
          GIS CONTEXT
      ===================================================== */}

      {(state !== 'All' ||
        district !== 'All') && (

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
            onClick={
              clearLocationFilter
            }
          >

            <X size={14} />

            Clear location

          </button>

        </div>

      )}



      {/* =====================================================
          FILTER BAR
      ===================================================== */}

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
            disabled={
              state === 'All'
            }
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
              setStatus(
                e.target.value
              )
            }
          >

            <option value="All">
              All Status
            </option>

            {statuses.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

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

            {workTypes.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

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



      {/* =====================================================
          RESULT SUMMARY
      ===================================================== */}

      <div className="projects-result-summary">

        <span>
          Showing
        </span>

        <strong>
          {filtered.length}
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



      {/* =====================================================
          PROJECT TABLE
      ===================================================== */}

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
                  Project
                </th>

                <th>
                  Location
                </th>

                <th>
                  Sanctioned
                </th>

                <th>
                  Expenditure
                </th>

                <th>
                  Progress
                </th>

                <th>
                  Asset
                </th>

                <th>
                  Risk
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filtered.map(
                (project) => {

                  const score =
                    Number(
                      project?.score || 0
                    )


                  const riskCategory =
                    riskLabel(
                      score
                    ).toLowerCase()


                  const statusCategory =
                    String(
                      project?.status || ''
                    )
                      .toLowerCase()
                      .replace(
                        /\s+/g,
                        '-'
                      )


                  const sanctioned =
                    Number(
                      project?.sanction
                        ?.sanctionedAmount ??
                      project?.amount ??
                      0
                    )


                  const actualExpenditure =
                    Number(
                      project?.financial
                        ?.utilizedAmount ??
                      project?.cost
                        ?.actualExpenditure ??
                      0
                    )


                  const physical =
                    Number(
                      project?.physical ??
                      project?.asset
                        ?.reportedCompletion ??
                      0
                    )


                  const expenditurePercent =
                    Number(
                      project?.expenditure ??
                      (
                        sanctioned > 0
                          ? (
                              actualExpenditure /
                              sanctioned
                            ) * 100
                          : 0
                      )
                    )


                  const assetStatus =
                    getAssetStatus(
                      project
                    )


                  return (

                    <tr
                      key={
                        project.id
                      }
                      onClick={() =>
                        openProject(
                          project.id
                        )
                      }
                    >


                      {/* PROJECT */}

                      <td>

                        <div
                          style={{
                            minWidth: 180,
                          }}
                        >

                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: '#1e293b',
                              marginBottom: 3,
                            }}
                          >
                            {project.id}
                          </div>


                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: '#0f172a',
                              lineHeight: 1.35,
                            }}
                          >
                            {project.name}
                          </div>


                          <div
                            style={{
                              marginTop: 3,
                              fontSize: 10,
                              color: '#64748b',
                            }}
                          >
                            {project.category ||
                              'MPLADS Work'}
                          </div>

                        </div>

                      </td>



                      {/* LOCATION */}

                      <td>

                        <div
                          style={{
                            minWidth: 120,
                          }}
                        >

                          <div
                            style={{
                              fontWeight: 700,
                              color: '#334155',
                              fontSize: 11,
                            }}
                          >
                            {project.district ||
                              '—'}
                          </div>


                          <div
                            style={{
                              marginTop: 3,
                              fontSize: 10,
                              color: '#64748b',
                            }}
                          >
                            {project.state ||
                              '—'}
                          </div>

                        </div>

                      </td>



                      {/* SANCTION */}

                      <td>

                        <div
                          style={{
                            fontWeight: 800,
                            color: '#0f172a',
                            fontSize: 12,
                          }}
                        >
                          {currency(
                            sanctioned
                          )}
                        </div>


                        <div
                          style={{
                            marginTop: 3,
                            fontSize: 9,
                            color: '#64748b',
                          }}
                        >
                          {project
                            ?.sanction
                            ?.sanctionOrderNo ||
                            'Sanction record'}
                        </div>

                      </td>



                      {/* EXPENDITURE */}

                      <td>

                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 11,
                            color: '#0f172a',
                          }}
                        >
                          {currency(
                            actualExpenditure
                          )}
                        </div>


                        <div
                          style={{
                            marginTop: 5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >

                          <div
                            style={{
                              width: 48,
                              height: 5,
                              background:
                                '#e2e8f0',
                              borderRadius: 3,
                              overflow: 'hidden',
                            }}
                          >

                            <div
                              style={{
                                height: '100%',
                                width: `${Math.min(
                                  expenditurePercent,
                                  100
                                )}%`,
                                background:
                                  expenditurePercent >=
                                  85
                                    ? '#dc2626'
                                    : '#64748b',
                                borderRadius: 3,
                              }}
                            />

                          </div>


                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          >
                            {Math.round(
                              expenditurePercent
                            )}%
                          </span>

                        </div>

                      </td>



                      {/* PHYSICAL PROGRESS */}

                      <td>

                        <div
                          style={{
                            minWidth: 105,
                          }}
                        >

                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 7,
                            }}
                          >

                            <div
                              style={{
                                flex: 1,
                                height: 6,
                                background:
                                  '#e2e8f0',
                                borderRadius: 3,
                                overflow: 'hidden',
                              }}
                            >

                              <div
                                style={{
                                  height: '100%',
                                  width: `${Math.min(
                                    Math.max(
                                      physical,
                                      0
                                    ),
                                    100
                                  )}%`,
                                  background:
                                    physical <
                                    40
                                      ? '#f59e0b'
                                      : '#16a34a',
                                  borderRadius: 3,
                                }}
                              />

                            </div>


                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 800,
                                width: 28,
                              }}
                            >
                              {physical}%
                            </span>

                          </div>


                          <div
                            style={{
                              marginTop: 4,
                              fontSize: 9,
                              color: '#64748b',
                            }}
                          >
                            Reported physical progress
                          </div>

                        </div>

                      </td>



                      {/* ASSET */}

                      <td>

                        <div
                          style={{
                            minWidth: 90,
                          }}
                        >

                          <span
                            className={`badge-pill asset-status-badge ${assetStatus.className}`}
                          >

                            <i />

                            {assetStatus.label}

                          </span>


                          <div
                            style={{
                              marginTop: 5,
                              fontSize: 9,
                              color: '#64748b',
                            }}
                          >
                            {project
                              ?.asset
                              ?.assetType ||
                              'Asset'}
                          </div>

                        </div>

                      </td>



                      {/* RISK */}

                      <td>

                        <div
                          style={{
                            minWidth: 75,
                          }}
                        >

                          <div
                            style={{
                              fontWeight: 900,
                              fontSize: 15,
                              color:
                                score >= 80
                                  ? '#b91c1c'
                                  : score >= 50
                                    ? '#b45309'
                                    : '#15803d',
                            }}
                          >
                            {score}
                          </div>


                          <span
                            className={`badge-pill ${riskCategory}`}
                          >

                            <i />

                            {riskLabel(
                              score
                            )}

                          </span>

                        </div>

                      </td>



                      {/* STATUS */}

                      <td>

                        <span
                          className={`status-badge-clean ${statusCategory}`}
                        >
                          {project.status ||
                            'Unknown'}
                        </span>


                        {project?.delay && (

                          <div
                            style={{
                              marginTop: 5,
                              fontSize: 9,
                              color:
                                project.status ===
                                'Delayed'
                                  ? '#b91c1c'
                                  : '#64748b',
                              fontWeight: 700,
                            }}
                          >
                            {project.delay}
                          </div>

                        )}

                      </td>



                      {/* ACTION */}

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
                          aria-label={`View ${project.name}`}
                          title="Open project investigation"
                        >

                          <Eye
                            size={15}
                          />

                        </button>

                      </td>

                    </tr>

                  )

                }
              )}



              {/* =================================================
                  EMPTY STATE
              ================================================= */}

              {filtered.length === 0 && (

                <tr>

                  <td
                    colSpan={9}
                    style={{
                      padding:
                        '48px 20px',
                      textAlign:
                        'center',
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
                      state, district, risk,
                      status, work type or
                      search filters.
                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>



        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div
          className="pagination-bar"
          style={{
            padding:
              '14px 20px',
          }}
        >

          <div>

            Showing 1 to{' '}

            {filtered.length}{' '}

            of{' '}

            {filtered.length}

            {' '}entries

          </div>


          <div
            className="pagination-pages"
          >

            <button
              type="button"
              className="page-num-btn"
              disabled
              aria-label="Previous page"
            >
              &lt;
            </button>


            <button
              type="button"
              className="page-num-btn active"
              onClick={() =>
                setCurrentPage(1)
              }
            >
              1
            </button>


            <span
              style={{
                padding:
                  '0 4px',
                alignSelf:
                  'center',
              }}
            >
              ...
            </span>


            <button
              type="button"
              className="page-num-btn"
              disabled
              aria-label="Next page"
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
   SMALL INTERNAL MAP PIN ICON

   Kept as an internal component so no additional dependency
   is required.
========================================================= */

function MapPinSmall() {

  return (

    <span
      className="projects-location-icon"
      aria-hidden="true"
    >

      <MapPin size={15} />

    </span>

  )

}


export default Projects