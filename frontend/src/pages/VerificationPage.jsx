import { ArrowUpRight } from 'lucide-react'
import { Metric, PageHeader, Panel } from '../components/common/Primitives.jsx'
import { useApp } from '../context/AppContext.jsx'

export function VerificationPage(props) {
  const context = useApp()
  const project = props.project || context.selected
  const inspections = props.inspections || context.inspections
  const setInspections = props.setInspections || context.setInspections
  const setProjects = props.setProjects || context.setProjects
  const setAudit = props.setAudit || context.setAudit
  const showToast = props.showToast || context.showToast
  const navigate = props.navigate || context.navigate

  if (!project) return null

  const inspection = inspections.find((item) => item.projectId === project.id)

  const submit = (event) => {
    event.preventDefault()
    setInspections((items) =>
      items.map((item) =>
        item.id === inspection?.id
          ? { ...item, status: 'Under Review', verificationResult: 'Major Discrepancy' }
          : item
      )
    )
    setProjects((items) =>
      items.map((item) =>
        item.id === project.id
          ? { ...item, score: 91, status: 'Escalated', finding: 'Observed progress below reported progress' }
          : item
      )
    )
    setAudit((items) => [
      {
        time: '06 Sep 2026, 11:50 AM',
        actor: 'State Nodal Officer',
        action: 'Verification submitted',
        detail: `${project.name} · Risk reassessed to 91 HIGH.`,
        tone: 'human',
      },
      ...items,
    ])
    showToast('Verification submitted. Risk score recalculated to 91 HIGH.')
  }

  return (
    <>
      <button className="back-link" onClick={() => navigate('detail')}>
        ← Back to project
      </button>
      <PageHeader eyebrow="SUPERVISOR VERIFICATION" title="Verify field evidence" subtitle={project.name} />
      <Panel title="Reported vs observed progress" subtitle="Potential discrepancy requires human review.">
        <div className="metric-strip">
          <Metric label="Reported progress" value={`${project.physical}%`} />
          <Metric label="Observed progress" value="31%" critical />
          <Metric label="Difference" value={`${31 - project.physical} points`} critical />
          <Metric label="Updated risk" value="91 / 100 HIGH" critical />
        </div>
        <form className="form-stack" onSubmit={submit}>
          <label>
            Verification result
            <select defaultValue="Major Discrepancy">
              <option>Verified</option>
              <option>Minor Discrepancy</option>
              <option>Major Discrepancy</option>
              <option>Escalate</option>
            </select>
          </label>
          <label>
            Payment evidence checked
            <select defaultValue="Yes">
              <option>Yes</option>
              <option>No</option>
            </select>
          </label>
          <label>
            Officer remarks
            <textarea defaultValue="Observed progress is below reported progress. Additional financial and field verification recommended." />
          </label>
          <button className="primary">
            Submit verification <ArrowUpRight size={15} />
          </button>
        </form>
      </Panel>
    </>
  )
}

export default VerificationPage
