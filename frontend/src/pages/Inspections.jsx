import { ArrowUpRight } from 'lucide-react'
import { PageHeader, Panel, StatusBadge } from '../components/common/Primitives.jsx'
import { useApp } from '../context/AppContext.jsx'

export function Inspections(props) {
  const context = useApp()
  const inspections = props.inspections || context.inspections
  const projects = props.projects || context.projects
  const openInspection = props.openInspection || context.openInspection

  return (
    <>
      <PageHeader
        eyebrow="FIELD OPERATIONS"
        title="Inspections"
        subtitle="Track the complete AI flag to verification workflow."
      />
      <Panel title="Inspection register" subtitle="Reported and observed progress remain separate until supervisor review.">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Inspection ID</th>
                <th>Project</th>
                <th>Officer</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {inspections.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.id}</strong>
                  </td>
                  <td>{projects.find((project) => project.id === item.projectId)?.name}</td>
                  <td>{item.officer}</td>
                  <td>{item.priority}</td>
                  <td>{item.date}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>
                    <button className="text-button" onClick={() => openInspection(item.id)}>
                      Open <ArrowUpRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}

export default Inspections
