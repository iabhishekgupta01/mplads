import { useState } from 'react'
import { Eye, Filter, Plus, Search } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { riskLabel } from '../utils/formatters.js'

export function Projects() {
  const { projects, openProject, riskFilter, setRiskFilter } = useApp()

  const [district, setDistrict] = useState('All')
  const [status, setStatus] = useState('All')
  const [workType, setWorkType] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = projects.filter((project) => {
    const matchesSearch =
      project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.district.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDistrict = district === 'All' || project.district === district
    const matchesStatus = status === 'All' || project.status === status
    const matchesRisk =
      riskFilter === 'All' || riskLabel(project.score).toUpperCase() === riskFilter.toUpperCase()
    const matchesType = workType === 'All' || project.category === workType

    return matchesSearch && matchesDistrict && matchesStatus && matchesRisk && matchesType
  })

  return (
    <div className="projects-page-container">
      {/* BREADCRUMB & TOP ACTIONS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div className="breadcrumb-line">
            Home / <span>Projects</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>Projects</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>Search and monitor MPLADS works</p>
        </div>

        <button className="primary-btn" onClick={() => alert('Add Project dialog placeholder.')}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* FILTER BAR MATCHING SCREENSHOT */}
      <div className="filter-bar-wrap">
        <div className="filter-group">
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>District</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)}>
            <option value="All">All Districts</option>
            <option value="Sehore">Sehore</option>
            <option value="Indore">Indore</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Kota">Kota</option>
            <option value="Gaya">Gaya</option>
            <option value="Nashik">Nashik</option>
          </select>
        </div>

        <div className="filter-group">
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>

        <div className="filter-group">
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Risk Level</label>
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b' }}>Work Type</label>
          <select value={workType} onChange={(e) => setWorkType(e.target.value)}>
            <option value="All">All</option>
            <option value="Road">Road</option>
            <option value="Community Infrastructure">Community Hall</option>
            <option value="Health">Health</option>
            <option value="Water">Water</option>
            <option value="Education">Education</option>
            <option value="Sanitation">Sanitation</option>
          </select>
        </div>

        <div className="filter-search-input" style={{ marginLeft: 'auto' }}>
          <Search size={16} style={{ color: '#94a3b8' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search project..."
          />
        </div>

        <button className="secondary-btn">
          <Filter size={15} /> Filter
        </button>
      </div>

      {/* PROJECT TABLE MATCHING REFERENCE SCREENSHOT */}
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>District</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Expenditure</th>
                <th>Risk Score</th>
                <th>Risk Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => {
                const riskCategory = riskLabel(project.score).toLowerCase()
                const statusCategory = project.status.toLowerCase().replace(' ', '-')

                return (
                  <tr key={project.id} onClick={() => openProject(project.id)}>
                    <td style={{ fontWeight: 700, color: '#1e293b' }}>{project.id}</td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{project.name}</td>
                    <td>{project.district}</td>
                    <td>
                      <span className={`status-badge-clean ${statusCategory}`}>{project.status}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                          <div
                            style={{
                              height: '100%',
                              width: `${project.physical}%`,
                              background: project.physical < 40 ? '#f59e0b' : '#16a34a',
                              borderRadius: 3,
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, width: 32 }}>{project.physical}%</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{project.expenditure}%</td>
                    <td style={{ fontWeight: 800 }}>{project.score}</td>
                    <td>
                      <span className={`badge-pill ${riskCategory}`}>
                        <i /> {riskLabel(project.score)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="secondary-btn"
                        style={{ padding: 6, borderRadius: 4 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          openProject(project.id)
                        }}
                        aria-label="View project"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER MATCHING SCREENSHOT */}
        <div className="pagination-bar" style={{ padding: '14px 20px' }}>
          <div>Showing 1 to {filtered.length} of 1248 entries</div>
          <div className="pagination-pages">
            <button className="page-num-btn">&lt;</button>
            <button
              className={`page-num-btn ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button
              className={`page-num-btn ${currentPage === 2 ? 'active' : ''}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button
              className={`page-num-btn ${currentPage === 3 ? 'active' : ''}`}
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <span style={{ padding: '0 4px', alignSelf: 'center' }}>...</span>
            <button className="page-num-btn">156</button>
            <button className="page-num-btn">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
