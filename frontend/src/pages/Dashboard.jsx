import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FolderKanban,
  TrendingUp,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useApp } from '../context/AppContext.jsx'

export function Dashboard() {
  const { openProject, navigate, setRiskFilter } = useApp()

  // Chart data matching reference screenshot
  const statusData = [
    { name: 'Ongoing', value: 620, pct: '49.7%', color: '#2563eb' },
    { name: 'Completed', value: 480, pct: '38.5%', color: '#16a34a' },
    { name: 'Delayed', value: 98, pct: '7.9%', color: '#f59e0b' },
    { name: 'Not Started', value: 50, pct: '4.0%', color: '#94a3b8' },
  ]

  const riskData = [
    { name: 'High Risk', value: 50, pct: '4.0%', color: '#dc2626' },
    { name: 'Medium Risk', value: 82, pct: '6.6%', color: '#d97706' },
    { name: 'Low Risk', value: 1116, pct: '89.4%', color: '#16a34a' },
  ]

  const districtData = [
    { district: 'Bhopal', count: 142 },
    { district: 'Indore', count: 128 },
    { district: 'Gwalior', count: 115 },
    { district: 'Jabalpur', count: 110 },
    { district: 'Ujjain', count: 95 },
  ]

  const trendData = [
    { month: 'Jan', exp: 12 },
    { month: 'Feb', exp: 15 },
    { month: 'Mar', exp: 18 },
    { month: 'Apr', exp: 20 },
    { month: 'May', exp: 13 },
    { month: 'Jun', exp: 14 },
  ]

  const handleStatusClick = () => {
    navigate('projects')
  }

  const handleRiskClick = (riskLevel) => {
    setRiskFilter(riskLevel)
    navigate('projects')
  }

  return (
    <div className="dashboard-container">
      {/* 5 KPI CARDS ROW */}
      <div className="kpi-5-grid">
        <div className="kpi-card" onClick={() => navigate('projects')}>
          <div className="kpi-card-top">
            <span className="kpi-label">Total Projects</span>
            <div className="kpi-icon-box blue">
              <FolderKanban size={18} />
            </div>
          </div>
          <div className="kpi-value">1,248</div>
          <div className="kpi-meta">+12 this month</div>
        </div>

        <div className="kpi-card" onClick={() => navigate('projects')}>
          <div className="kpi-card-top">
            <span className="kpi-label">Ongoing Projects</span>
            <div className="kpi-icon-box green">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="kpi-value">620</div>
          <div className="kpi-meta">+8 this month</div>
        </div>

        <div className="kpi-card" onClick={() => navigate('projects')}>
          <div className="kpi-card-top">
            <span className="kpi-label">Completed Projects</span>
            <div className="kpi-icon-box teal">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="kpi-value">480</div>
          <div className="kpi-meta">+15 this month</div>
        </div>

        <div className="kpi-card" onClick={() => navigate('projects')}>
          <div className="kpi-card-top">
            <span className="kpi-label">Delayed Projects</span>
            <div className="kpi-icon-box amber">
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-value">98</div>
          <div className="kpi-meta amber">+5 this month</div>
        </div>

        <div className="kpi-card" onClick={() => handleRiskClick('High')}>
          <div className="kpi-card-top">
            <span className="kpi-label">High Risk Projects</span>
            <div className="kpi-icon-box red">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#dc2626' }}>
            50
          </div>
          <div className="kpi-meta red">+7 this month</div>
        </div>
      </div>

      {/* ROW 2 PANELS (Projects by Status, Fund Utilization, Risk Distribution) */}
      <div className="dashboard-grid-3">
        {/* Projects by Status */}
        <div className="panel">
          <div className="panel-head">
            <h2>Projects by Status</h2>
          </div>
          <div className="chart-container-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                  onClick={handleStatusClick}
                  style={{ cursor: 'pointer' }}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center-text">
              <strong>1,248</strong>
              <span>Total</span>
            </div>
          </div>
          <div className="chart-legend-list">
            {statusData.map((item) => (
              <div
                key={item.name}
                className="legend-item"
                onClick={handleStatusClick}
                style={{ cursor: 'pointer' }}
              >
                <div className="legend-left">
                  <i className="legend-dot" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <div className="legend-val">
                  {item.value} ({item.pct})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fund Utilization */}
        <div className="panel">
          <div className="panel-head">
            <h2>Fund Utilization</h2>
          </div>
          <div className="fund-summary-box">
            <div className="fund-circle-wrap">
              <div className="fund-circle-inner">
                <strong>83.6%</strong>
                <span>Utilization</span>
              </div>
            </div>
            <div className="fund-metrics-list">
              <div className="fund-metric-row">
                <span>Sanctioned Amount</span>
                <strong>₹ 120.00 Cr</strong>
              </div>
              <div className="fund-metric-row">
                <span>Released Amount</span>
                <strong>₹ 110.00 Cr</strong>
              </div>
              <div className="fund-metric-row">
                <span>Expenditure</span>
                <strong style={{ color: '#16a34a' }}>₹ 92.00 Cr</strong>
              </div>
              <div className="fund-metric-row">
                <span>Balance Amount</span>
                <strong style={{ color: '#d97706' }}>₹ 18.00 Cr</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="panel">
          <div className="panel-head">
            <h2>Risk Distribution</h2>
          </div>
          <div className="chart-container-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                  style={{ cursor: 'pointer' }}
                >
                  {riskData.map((entry, index) => (
                    <Cell
                      key={`risk-cell-${index}`}
                      fill={entry.color}
                      onClick={() => handleRiskClick(entry.name.split(' ')[0])}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend-list">
            {riskData.map((item) => (
              <div
                key={item.name}
                className="legend-item"
                onClick={() => handleRiskClick(item.name.split(' ')[0])}
                style={{ cursor: 'pointer' }}
              >
                <div className="legend-left">
                  <i className="legend-dot" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <div className="legend-val">
                  {item.value} ({item.pct})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3 PANELS (Projects by District, Expenditure Trend, Recent Alerts) */}
      <div className="dashboard-grid-3">
        {/* Projects by District (Top 5) */}
        <div className="panel">
          <div className="panel-head">
            <h2>Projects by District (Top 5)</h2>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={districtData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="district" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar
                dataKey="count"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
                barSize={24}
                onClick={() => navigate('projects')}
                style={{ cursor: 'pointer' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expenditure Trend (Last 6 Months) */}
        <div className="panel">
          <div className="panel-head">
            <h2>Expenditure Trend (Last 6 Months)</h2>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 12 }}
                formatter={(val) => [`₹ ${val} Cr`, 'Expenditure']}
              />
              <Line type="monotone" dataKey="exp" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 4, fill: '#0d9488' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Alerts */}
        <div className="panel">
          <div className="panel-head">
            <h2>Recent Alerts</h2>
          </div>
          <div className="recent-alerts-list">
            <div className="alert-item-row" onClick={() => openProject('MP-2024-1001')}>
              <div className="alert-bullet-icon red" />
              <div className="alert-item-content" style={{ flex: 1 }}>
                <strong>High risk project detected</strong>
                <p>Road Construction – Sehore</p>
                <div className="alert-item-meta">
                  <span style={{ color: '#dc2626', fontWeight: 600 }}>Risk Score 82</span>
                  <span>2 min ago</span>
                </div>
              </div>
            </div>

            <div className="alert-item-row" onClick={() => openProject('MP-2024-1187')}>
              <div className="alert-bullet-icon amber" />
              <div className="alert-item-content" style={{ flex: 1 }}>
                <strong>Delay predicted (78% probability)</strong>
                <p>Community Hall – Morena</p>
                <div className="alert-item-meta">
                  <span>Delay 6 months</span>
                  <span>15 min ago</span>
                </div>
              </div>
            </div>

            <div className="alert-item-row" onClick={() => openProject('MP-2025-0421')}>
              <div className="alert-bullet-icon amber" />
              <div className="alert-item-content" style={{ flex: 1 }}>
                <strong>Cost overrun risk (65%)</strong>
                <p>Primary Health Centre Upgrade – Bhopal</p>
                <div className="alert-item-meta">
                  <span>Expenditure gap</span>
                  <span>1 hr ago</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 8, textAlign: 'right' }}>
              <button className="text-btn" onClick={() => navigate('alerts')}>
                View All Alerts <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
