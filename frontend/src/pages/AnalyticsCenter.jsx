import { useMemo, useState } from 'react'

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Filter,
  IndianRupee,
  MapPin,
  Network,
  ShieldAlert,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { useApp } from '../context/AppContext.jsx'

import {
  earlyWarningData,
  generateProjectIntelligence,
} from '../data/mockData.js'

import { riskLabel } from '../utils/formatters.js'

import '../styles/nirikshan.css'
import '../styles/analytics.css'


const COLORS = {
  critical: '#c62828',
  high: '#d88917',
  medium: '#c89a32',
  low: '#16805a',
  green: '#10834b',
  navy: '#17333b',
  muted: '#71827b',
  grid: '#e5eee9',
}


function money(value) {

  if (!Number.isFinite(value)) {
    return '₹0'
  }

  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`
  }

  return `₹${Math.round(value).toLocaleString('en-IN')}`
}


function riskTone(score) {

  if (score >= 80) {
    return COLORS.critical
  }

  if (score >= 60) {
    return COLORS.high
  }

  if (score >= 40) {
    return COLORS.medium
  }

  return COLORS.low
}


function RiskPill({ score }) {

  const color = riskTone(score)

  return (
    <span
      className="analytics-risk-pill"
      style={{
        color,
        background: `${color}12`,
        borderColor: `${color}35`,
      }}
    >
      {riskLabel(score)} · {score}
    </span>
  )
}


function ChartShell({
  eyebrow,
  title,
  description,
  children,
}) {

  return (
    <section className="analytics-chart-card">

      <div className="analytics-chart-head">

        <span className="analytics-eyebrow">
          {eyebrow}
        </span>

        <h2>
          {title}
        </h2>

        {description && (
          <p>
            {description}
          </p>
        )}

      </div>

      <div className="analytics-chart-body">
        {children}
      </div>

    </section>
  )
}


export default function AnalyticsCenter() {

  const {
    projects,
    payments,
    navigate,
    openProject,
  } = useApp()


  /* ======================================================
     FILTERS
     ====================================================== */

  const [stateFilter, setStateFilter] =
    useState('All')

  const [districtFilter, setDistrictFilter] =
    useState('All')

  const [riskFilter, setRiskFilter] =
    useState('All')

  const [categoryFilter, setCategoryFilter] =
    useState('All')


  const states = useMemo(
    () => [
      'All',
      ...new Set(
        projects
          .map(project => project.state)
          .filter(Boolean)
      ),
    ],
    [projects]
  )


  const districts = useMemo(
    () => [
      'All',
      ...new Set(
        projects
          .filter(
            project =>
              stateFilter === 'All' ||
              project.state === stateFilter
          )
          .map(project => project.district)
          .filter(Boolean)
      ),
    ],
    [projects, stateFilter]
  )


  const categories = useMemo(
    () => [
      'All',
      ...new Set(
        projects
          .map(project => project.category)
          .filter(Boolean)
      ),
    ],
    [projects]
  )


  /* ======================================================
     FILTERED PROJECTS
     ====================================================== */

  const filteredProjects = useMemo(
    () =>
      projects.filter(project => {

        const stateOk =
          stateFilter === 'All' ||
          project.state === stateFilter

        const districtOk =
          districtFilter === 'All' ||
          project.district === districtFilter

        const categoryOk =
          categoryFilter === 'All' ||
          project.category === categoryFilter

        const riskOk =
          riskFilter === 'All' ||
          riskLabel(project.score) ===
            riskFilter.toUpperCase()

        return (
          stateOk &&
          districtOk &&
          categoryOk &&
          riskOk
        )
      }),
    [
      projects,
      stateFilter,
      districtFilter,
      categoryFilter,
      riskFilter,
    ]
  )


  /* ======================================================
     PAYMENT SCOPE
     ====================================================== */

  const selectedScopePayments = useMemo(() => {

    const projectIds = new Set(
      filteredProjects.map(
        project => project.id
      )
    )

    return payments.filter(
      payment =>
        projectIds.has(payment.projectId)
    )

  }, [
    payments,
    filteredProjects,
  ])


  /* ======================================================
     RISK GROUPS
     ====================================================== */

  const critical =
    filteredProjects.filter(
      project => project.score >= 80
    )

  const high =
    filteredProjects.filter(
      project =>
        project.score >= 60 &&
        project.score < 80
    )

  const medium =
    filteredProjects.filter(
      project =>
        project.score >= 40 &&
        project.score < 60
    )

  const low =
    filteredProjects.filter(
      project => project.score < 40
    )


  const flaggedPayments =
    selectedScopePayments.filter(
      payment => payment.flagged
    )


  /* ======================================================
     KPI DATA
     ====================================================== */

  const kpis = useMemo(() => {

    const exposed =
      filteredProjects
        .filter(
          project => project.score >= 60
        )
        .reduce(
          (sum, project) =>
            sum + (project.amount || 0),
          0
        )


    const avgRisk =
      filteredProjects.length
        ? Math.round(
            filteredProjects.reduce(
              (sum, project) =>
                sum + (project.score || 0),
              0
            ) /
            filteredProjects.length
          )
        : 0


    const mismatchCases =
      filteredProjects.filter(
        project =>
          (
            project.expenditure || 0
          ) -
          (
            project.physical || 0
          ) >= 20
      ).length


    return {
      exposed,
      avgRisk,
      mismatchCases,
    }

  }, [filteredProjects])


  /* ======================================================
     RISK DISTRIBUTION
     ====================================================== */

  const riskDistribution = useMemo(
    () =>
      [
        {
          name: 'Critical',
          value: critical.length,
          fill: COLORS.critical,
        },
        {
          name: 'High',
          value: high.length,
          fill: COLORS.high,
        },
        {
          name: 'Medium',
          value: medium.length,
          fill: COLORS.medium,
        },
        {
          name: 'Low',
          value: low.length,
          fill: COLORS.low,
        },
      ].filter(
        item => item.value > 0
      ),
    [
      critical.length,
      high.length,
      medium.length,
      low.length,
    ]
  )


  /* ======================================================
     STATE RISK
     ====================================================== */

  const stateRisk = useMemo(() => {

    const map = {}


    filteredProjects.forEach(project => {

      if (!map[project.state]) {

        map[project.state] = {
          state: project.state,
          projects: 0,
          highRisk: 0,
          avgRiskTotal: 0,
        }

      }


      map[project.state].projects += 1

      map[project.state].avgRiskTotal +=
        project.score || 0


      if (
        (project.score || 0) >= 60
      ) {

        map[project.state].highRisk += 1

      }

    })


    return Object.values(map)

      .map(item => ({
        ...item,

        avgRisk:
          Math.round(
            item.avgRiskTotal /
            item.projects
          ),

        riskRate:
          Math.round(
            (
              item.highRisk /
              item.projects
            ) * 100
          ),
      }))

      .sort(
        (a, b) =>
          b.avgRisk - a.avgRisk
      )

      .slice(0, 8)

  }, [filteredProjects])


  /* ======================================================
     SCATTER
     ====================================================== */

  const scatterData = useMemo(
    () =>
      filteredProjects.map(project => ({
        id: project.id,
        name: project.name,

        expenditure:
          Number(
            project.expenditure || 0
          ),

        physical:
          Number(
            project.physical || 0
          ),

        risk:
          Number(
            project.score || 0
          ),
      })),
    [filteredProjects]
  )


  /* ======================================================
     SIGNAL MIX
     ====================================================== */

  const signalMix = useMemo(() => {

    const counts = {
      mismatch: 0,
      payment: 0,
      delay: 0,
      vendor: 0,
      similar: 0,
    }


    filteredProjects.forEach(project => {

      const intelligence =
        generateProjectIntelligence(
          project
        )


      intelligence.drivers.forEach(
        driver => {

          if (
            driver.id ===
              'FINANCIAL_MISMATCH' ||
            driver.id ===
              'EVIDENCE_GAP'
          ) {

            counts.mismatch += 1

          }


          if (
            driver.id ===
            'PAYMENT'
          ) {

            counts.payment += 1

          }


          if (
            driver.id ===
            'DELAY'
          ) {

            counts.delay += 1

          }


          if (
            driver.id ===
            'VENDOR'
          ) {

            counts.vendor += 1

          }


          if (
            driver.id ===
            'SIMILARITY'
          ) {

            counts.similar += 1

          }

        }
      )

    })


    return [

      {
        signal:
          'Financial / evidence gap',
        count:
          counts.mismatch,
      },

      {
        signal:
          'Payment anomaly',
        count:
          counts.payment,
      },

      {
        signal:
          'Schedule delay',
        count:
          counts.delay,
      },

      {
        signal:
          'Vendor risk',
        count:
          counts.vendor,
      },

      {
        signal:
          'Similar work',
        count:
          counts.similar,
      },

    ].sort(
      (a, b) =>
        b.count - a.count
    )

  }, [filteredProjects])


  /* ======================================================
     EARLY WARNING
     ====================================================== */

  const trend = useMemo(() => {

    const ids = new Set(
      filteredProjects.map(
        project => project.id
      )
    )


    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
    ]


    const values =
      months.map(month => ({
        month,
        cases: 0,
      }))


    earlyWarningData
      .filter(
        item =>
          ids.has(item.projectId)
      )
      .forEach(item => {

        item.trend.forEach(
          (score, index) => {

            if (
              score >= 60 &&
              values[index]
            ) {

              values[index].cases += 1

            }

          }
        )

      })


    let cumulative = 0


    return values.map(item => {

      cumulative += item.cases

      return {
        ...item,
        cumulative,
      }

    })

  }, [filteredProjects])


  /* ======================================================
     PRIORITY PROJECTS
     ====================================================== */

  const priorityProjects =
    useMemo(
      () =>
        [...filteredProjects]
          .filter(
            project =>
              project.score >= 60
          )
          .sort(
            (a, b) =>
              b.score - a.score
          )
          .slice(0, 7),
      [filteredProjects]
    )


  /* ======================================================
     RESET
     ====================================================== */

  const resetFilters = () => {

    setStateFilter('All')
    setDistrictFilter('All')
    setRiskFilter('All')
    setCategoryFilter('All')

  }


  /* ======================================================
     RENDER
     ====================================================== */

  return (

    <div className="analytics-page">

      <div
        className="analytics-background-grid"
        aria-hidden="true"
      />


      {/* ==================================================
          HERO
         ================================================== */}

      <section className="analytics-hero">

        <div className="analytics-hero-main">

          <span className="analytics-eyebrow">

            <Activity size={13} />

            NIRIKSHAN · RISK INTELLIGENCE

          </span>


          <h1>
            Detect where project risk is
            building — and why.
          </h1>


          <p>

            Cross-signal analytics for
            financial irregularities,
            execution gaps, payment anomalies,
            delays, vendor risk and similar
            works. Every project-level result
            drills into the connected
            investigation workflow.

          </p>

        </div>


        <div className="analytics-hero-side">

          <span>
            CURRENT ANALYTICS SCOPE
          </span>


          <strong>
            {filteredProjects.length}
          </strong>


          <small>

            projects in view ·{' '}

            {critical.length + high.length}

            {' '}
            priority

          </small>


          <button
            onClick={() =>
              navigate('alerts')
            }
          >

            Open priority queue

            <ArrowRight size={14} />

          </button>

        </div>

      </section>


      {/* ==================================================
          FILTERS
         ================================================== */}

      <section className="analytics-filter-strip">

        <div className="analytics-filter-title">

          <Filter size={16} />

          <div>

            <strong>
              Analysis filters
            </strong>

            <span>
              Drill from national →
              state → district → project
            </span>

          </div>

        </div>


        <label>

          <span>
            STATE
          </span>

          <select
            value={stateFilter}
            onChange={event => {

              setStateFilter(
                event.target.value
              )

              setDistrictFilter(
                'All'
              )

            }}
          >

            {states.map(state => (

              <option
                key={state}
                value={state}
              >

                {state === 'All'
                  ? 'All States'
                  : state}

              </option>

            ))}

          </select>

        </label>


        <label>

          <span>
            DISTRICT
          </span>

          <select
            value={districtFilter}
            onChange={event =>
              setDistrictFilter(
                event.target.value
              )
            }
          >

            {districts.map(
              district => (

                <option
                  key={district}
                  value={district}
                >

                  {district === 'All'
                    ? 'All Districts'
                    : district}

                </option>

              )
            )}

          </select>

        </label>


        <label>

          <span>
            RISK
          </span>

          <select
            value={riskFilter}
            onChange={event =>
              setRiskFilter(
                event.target.value
              )
            }
          >

            <option value="All">
              All Risk Levels
            </option>

            <option value="CRITICAL">
              Critical
            </option>

            <option value="HIGH">
              High
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="LOW">
              Low
            </option>

          </select>

        </label>


        <label>

          <span>
            CATEGORY
          </span>

          <select
            value={categoryFilter}
            onChange={event =>
              setCategoryFilter(
                event.target.value
              )
            }
          >

            {categories.map(
              category => (

                <option
                  key={category}
                  value={category}
                >

                  {category === 'All'
                    ? 'All Categories'
                    : category}

                </option>

              )
            )}

          </select>

        </label>


        <button
          className="analytics-reset"
          onClick={resetFilters}
        >
          Reset
        </button>


        <div className="analytics-filter-result">

          <strong>
            {filteredProjects.length}
          </strong>

          <span>
            projects
          </span>

        </div>

      </section>


      {/* ==================================================
          MAIN AREA
          LEFT = KPIs + CONNECTED TOOLS
          RIGHT = CHARTS
         ================================================== */}

      <section className="analytics-main-layout">


        {/* =================================================
            LEFT SIDEBAR
           ================================================= */}

        <aside className="analytics-left-rail">


          {/* KPI 1 */}

          <button
            className="analytics-kpi"
            onClick={() =>
              navigate('projects')
            }
          >

            <span>

              <Building2 size={15} />

              PROJECTS

            </span>


            <strong>
              {filteredProjects.length}
            </strong>


            <small>
              in selected scope
            </small>

          </button>


          {/* KPI 2 */}

          <button
            className="analytics-kpi danger"
            onClick={() =>
              critical[0] &&
              openProject(
                critical[0].id
              )
            }
          >

            <span>

              <AlertTriangle size={15} />

              PRIORITY CASES

            </span>


            <strong>

              {critical.length +
                high.length}

            </strong>


            <small>
              risk score 60+
            </small>

          </button>


          {/* KPI 3 */}

          <button
            className="analytics-kpi warning"
            onClick={() =>
              critical[0] &&
              openProject(
                critical[0].id
              )
            }
          >

            <span>

              <IndianRupee size={15} />

              EXPOSURE

            </span>


            <strong>
              {money(kpis.exposed)}
            </strong>


            <small>
              priority project value
            </small>

          </button>


          {/* KPI 4 */}

          <button
            className="analytics-kpi"
            onClick={() =>
              navigate('payments')
            }
          >

            <span>

              <Wallet size={15} />

              FLAGGED PAYMENTS

            </span>


            <strong>
              {flaggedPayments.length}
            </strong>


            <small>
              payment cases
            </small>

          </button>


          {/* KPI 5 */}

          <button
            className="analytics-kpi purple"
            onClick={() =>
              critical[0] &&
              openProject(
                critical[0].id
              )
            }
          >

            <span>

              <Target size={15} />

              AVG RISK

            </span>


            <strong>

              {kpis.avgRisk}

              <small>
                /100
              </small>

            </strong>


            <small>

              {kpis.mismatchCases}
              {' '}
              mismatch cases

            </small>

          </button>


          {/* =================================================
              CONNECTED INTELLIGENCE
             ================================================= */}

          <section className="analytics-connected-box">

            <div className="analytics-tools-heading">

              <span>

                <Network size={14} />

                CONNECTED TOOLS

              </span>

            </div>


            <button
              onClick={() =>
                navigate('map')
              }
            >

              <MapPin size={13} />

              <span>
                GIS / Spatial Map
              </span>

              <ArrowRight
                size={12}
              />

            </button>


            <button
              onClick={() =>
                navigate('duplicates')
              }
            >

              <Network size={13} />

              <span>
                Similar Works
              </span>

              <ArrowRight
                size={12}
              />

            </button>


            <button
              onClick={() =>
                navigate('payments')
              }
            >

              <Wallet size={13} />

              <span>
                Payment Intelligence
              </span>

              <ArrowRight
                size={12}
              />

            </button>

          </section>


          {/* =================================================
              INTERPRETATION
             ================================================= */}

          <section className="analytics-interpretation-box">

            <div className="analytics-tools-heading">

              <span>

                <BrainCircuit
                  size={14}
                />

                INTERPRETATION

              </span>


              <ShieldAlert
                size={15}
              />

            </div>


            <strong>
              AI flags patterns;
              humans validate action.
            </strong>


            <p>

              High-risk signals trigger
              evidence review — not an
              automatic fraud declaration.

            </p>

          </section>

        </aside>


        {/* =================================================
            CHART AREA
           ================================================= */}

        <div className="analytics-chart-grid">


          {/* =================================================
              CHART 1 — RISK DISTRIBUTION
             ================================================= */}

          <ChartShell
            eyebrow="RISK PROFILE"
            title="Risk distribution by severity"
            description="Click a segment to open a representative project."
          >

            <div className="analytics-pie-layout">

              <ResponsiveContainer
                width="56%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={
                      riskDistribution
                    }

                    dataKey="value"

                    nameKey="name"

                    innerRadius={62}

                    outerRadius={92}

                    paddingAngle={3}

                    cx="50%"
                    cy="50%"

                    onClick={
                      (_, index) => {

                        const selected =
                          riskDistribution[
                            index
                          ]

                        if (!selected) {
                          return
                        }


                        const project =
                          filteredProjects.find(
                            item =>
                              riskLabel(
                                item.score
                              ) ===
                              selected.name
                                .toUpperCase()
                          )


                        if (project) {
                          openProject(
                            project.id
                          )
                        }

                      }
                    }

                  >

                    {riskDistribution.map(
                      item => (

                        <Cell
                          key={
                            item.name
                          }
                          fill={
                            item.fill
                          }
                        />

                      )
                    )}

                  </Pie>


                  <Tooltip
                    formatter={
                      value => [
                        `${value} projects`,
                        'Count',
                      ]
                    }
                  />

                </PieChart>

              </ResponsiveContainer>


              <div className="analytics-legend-list">

                {riskDistribution.map(
                  item => (

                    <button
                      key={
                        item.name
                      }

                      onClick={() => {

                        const project =
                          filteredProjects.find(
                            candidate =>
                              riskLabel(
                                candidate.score
                              ) ===
                              item.name
                                .toUpperCase()
                          )


                        if (project) {
                          openProject(
                            project.id
                          )
                        }

                      }}
                    >

                      <i
                        style={{
                          background:
                            item.fill,
                        }}
                      />

                      <span>
                        {item.name}
                      </span>

                      <strong>
                        {item.value}
                      </strong>

                    </button>

                  )
                )}


                <div className="analytics-mini-callout">

                  <ShieldAlert
                    size={14}
                  />

                  <span>

                    <b>
                      {critical.length +
                        high.length}
                    </b>

                    {' '}
                    cases need verification

                  </span>

                </div>

              </div>

            </div>

          </ChartShell>


          {/* =================================================
              CHART 2 — STATE RISK
             ================================================= */}

          <ChartShell
            eyebrow="REGIONAL RISK"
            title="State risk concentration"
            description="Average risk highlights where attention is concentrated."
          >

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={stateRisk}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 20,
                  bottom: 10,
                  left: 0,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={
                    COLORS.grid
                  }
                  horizontal={false}
                />


                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{
                    fontSize: 11,
                    fill:
                      COLORS.muted,
                  }}
                />


                <YAxis
                  type="category"
                  dataKey="state"
                  width={95}
                  tick={{
                    fontSize: 11,
                    fill:
                      COLORS.navy,
                  }}
                />


                <Tooltip
                  formatter={(
                    value,
                    name
                  ) => [

                    name === 'avgRisk'
                      ? `${value}/100`
                      : `${value}%`,

                    name === 'avgRisk'
                      ? 'Average risk'
                      : 'Priority rate',

                  ]}
                />


                <Legend
                  wrapperStyle={{
                    fontSize: 11,
                    paddingTop: 5,
                  }}
                />


                <Bar
                  dataKey="avgRisk"
                  name="Avg risk"
                  barSize={16}
                  radius={[
                    0,
                    5,
                    5,
                    0,
                  ]}

                  onClick={data => {

                    const project =
                      filteredProjects.find(
                        item =>
                          item.state ===
                          data.state
                      )


                    if (project) {
                      openProject(
                        project.id
                      )
                    }

                  }}

                >

                  {stateRisk.map(
                    item => (

                      <Cell
                        key={
                          item.state
                        }
                        fill={
                          riskTone(
                            item.avgRisk
                          )
                        }
                      />

                    )
                  )}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </ChartShell>


          {/* =================================================
              CHART 3 — FINANCIAL VS PHYSICAL
             ================================================= */}

          <ChartShell
            eyebrow="EXECUTION ANOMALY"
            title="Financial spend vs physical progress"
            description="High expenditure with lower execution forms a key mismatch signal."
          >

            <div className="analytics-scatter-wrap">

              <div className="analytics-risk-zone">
                HIGH SPEND / LOW PROGRESS
              </div>


              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <ScatterChart
                  margin={{
                    top: 18,
                    right: 20,
                    bottom: 28,
                    left: 8,
                  }}
                >

                  <CartesianGrid
                    stroke={
                      COLORS.grid
                    }
                  />


                  <XAxis
                    type="number"
                    dataKey="physical"
                    name="Physical progress"
                    domain={[0, 100]}
                    tick={{
                      fontSize: 10,
                      fill:
                        COLORS.muted,
                    }}
                    tickFormatter={
                      value =>
                        `${value}%`
                    }
                  />


                  <YAxis
                    type="number"
                    dataKey="expenditure"
                    name="Expenditure"
                    domain={[0, 100]}
                    tick={{
                      fontSize: 10,
                      fill:
                        COLORS.muted,
                    }}
                    tickFormatter={
                      value =>
                        `${value}%`
                    }
                  />


                  <Tooltip
                    cursor={{
                      strokeDasharray:
                        '3 3',
                    }}

                    formatter={(
                      value,
                      name
                    ) => [

                      `${value}%`,

                      name === 'physical'
                        ? 'Physical'
                        : 'Expenditure',

                    ]}

                    labelFormatter={() =>
                      ''
                    }
                  />


                  <Scatter
                    data={
                      scatterData
                    }

                    onClick={point => {

                      if (
                        point?.id
                      ) {

                        openProject(
                          point.id
                        )

                      }

                    }}

                  >

                    {scatterData.map(
                      point => (

                        <Cell
                          key={
                            point.id
                          }

                          fill={
                            riskTone(
                              point.risk
                            )
                          }

                          stroke="#fff"

                          strokeWidth={1.5}

                        />

                      )
                    )}

                  </Scatter>

                </ScatterChart>

              </ResponsiveContainer>


              <div className="analytics-axis-note">

                <span>
                  ← lower execution
                </span>

                <b>
                  Physical progress →
                </b>

                <span>
                  higher spend ↑
                </span>

              </div>

            </div>

          </ChartShell>


          {/* =================================================
              CHART 4 — SIGNAL MIX
             ================================================= */}

          <ChartShell
            eyebrow="WHY PROJECTS ARE FLAGGED"
            title="Risk signal mix"
            description="Explainable signals contributing to project risk."
          >

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={signalMix}

                margin={{
                  top: 10,
                  right: 12,
                  bottom: 35,
                  left: 0,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={
                    COLORS.grid
                  }
                  vertical={false}
                />


                <XAxis
                  dataKey="signal"

                  tick={{
                    fontSize: 10,
                    fill:
                      COLORS.muted,
                  }}

                  interval={0}

                  angle={-10}

                  textAnchor="end"

                  height={55}

                />


                <YAxis
                  allowDecimals={false}

                  tick={{
                    fontSize: 10,
                    fill:
                      COLORS.muted,
                  }}

                />


                <Tooltip
                  formatter={
                    value => [
                      `${value} projects`,
                      'Detected',
                    ]
                  }
                />


                <Bar
                  dataKey="count"
                  name="Detected cases"
                  fill={
                    COLORS.green
                  }

                  barSize={30}

                  radius={[
                    5,
                    5,
                    0,
                    0,
                  ]}

                  onClick={data => {

                    const signalMap = {

                      'Financial / evidence gap':
                        [
                          'FINANCIAL_MISMATCH',
                          'EVIDENCE_GAP',
                        ],

                      'Payment anomaly':
                        ['PAYMENT'],

                      'Schedule delay':
                        ['DELAY'],

                      'Vendor risk':
                        ['VENDOR'],

                      'Similar work':
                        ['SIMILARITY'],

                    }


                    const ids =
                      signalMap[
                        data.signal
                      ] || []


                    const project =
                      filteredProjects.find(
                        item => {

                          const drivers =
                            generateProjectIntelligence(
                              item
                            ).drivers


                          return ids.some(
                            id =>
                              drivers.some(
                                driver =>
                                  driver.id ===
                                  id
                              )
                          )

                        }
                      )


                    if (project) {

                      openProject(
                        project.id
                      )

                    }

                  }}

                />

              </BarChart>

            </ResponsiveContainer>

          </ChartShell>

        </div>

      </section>


      {/* ==================================================
          BOTTOM SECTION
         ================================================== */}

      <section className="analytics-bottom-grid">


        {/* EARLY WARNING */}

        <section className="analytics-panel">

          <div className="analytics-panel-head">

            <div>

              <span className="analytics-eyebrow">

                <TrendingUp size={12} />

                EARLY WARNING

              </span>


              <h2>
                Priority cases entering
                the risk queue
              </h2>

            </div>


            <button
              onClick={() =>
                navigate('alerts')
              }
            >

              Open alerts

              <ArrowRight
                size={13}
              />

            </button>

          </div>


          <ResponsiveContainer
            width="100%"
            height={165}
          >

            <LineChart
              data={trend}
              margin={{
                top: 8,
                right: 10,
                left: -10,
                bottom: 0,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={
                  COLORS.grid
                }
              />


              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 10,
                  fill:
                    COLORS.muted,
                }}
              />


              <YAxis
                allowDecimals={false}
                tick={{
                  fontSize: 10,
                  fill:
                    COLORS.muted,
                }}
              />


              <Tooltip
                formatter={(
                  value,
                  name
                ) => [

                  value,

                  name === 'cases'
                    ? 'New priority cases'
                    : 'Cumulative',

                ]}
              />


              <Line
                type="monotone"
                dataKey="cases"
                name="New priority cases"
                stroke={
                  COLORS.critical
                }
                strokeWidth={2.5}
                dot={{
                  r: 3,
                }}
              />


              <Line
                type="monotone"
                dataKey="cumulative"
                name="Cumulative"
                stroke={
                  COLORS.green
                }
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 4"
              />

            </LineChart>

          </ResponsiveContainer>

        </section>


        {/* ACTION QUEUE */}

        <section className="analytics-panel">

          <div className="analytics-panel-head">

            <div>

              <span className="analytics-eyebrow">

                <AlertTriangle
                  size={12}
                />

                ACTION QUEUE

              </span>


              <h2>
                Highest-risk projects
              </h2>

            </div>


            <span className="analytics-count-chip">

              {priorityProjects.length}
              {' '}
              shown

            </span>

          </div>


          <div className="analytics-priority-list">

            {priorityProjects.map(
              (
                project,
                index
              ) => (

                <button
                  key={
                    project.id
                  }

                  className="analytics-priority-row"

                  onClick={() =>
                    openProject(
                      project.id
                    )
                  }
                >

                  <b>

                    {String(
                      index + 1
                    ).padStart(
                      2,
                      '0'
                    )}

                  </b>


                  <div>

                    <strong>
                      {project.name}
                    </strong>


                    <span>

                      <MapPin
                        size={10}
                      />

                      {project.district},
                      {' '}
                      {project.state}

                      {' · '}

                      {project.id}

                    </span>

                  </div>


                  <span className="analytics-gap-value">

                    {Math.round(

                      (
                        project.expenditure ||
                        0
                      ) -

                      (
                        project.physical ||
                        0
                      )

                    )}

                    pp gap

                  </span>


                  <RiskPill
                    score={
                      project.score
                    }
                  />


                  <ArrowRight
                    size={14}
                  />

                </button>

              )
            )}


            {!priorityProjects.length && (

              <div className="analytics-empty">

                <CheckCircle2
                  size={22}
                />

                No priority projects
                in this filter.

              </div>

            )}

          </div>

        </section>

      </section>

    </div>

  )
}