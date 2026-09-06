import { ArrowUpRight, X } from 'lucide-react'

export function ActionModal({ type, project, onClose, onSubmit }) {
  const labels = {
    audit: ['Request field audit', 'Submit audit request'],
    halt: ['Halt vendor payment?', 'Confirm halt'],
    resolve: ['Mark project resolved', 'Confirm resolution'],
  }

  if (!type || !project) return null

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close icon-button" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>
        <p className="eyebrow">OFFICER ACTION</p>
        <h2>{labels[type]?.[0] || 'Action'}</h2>
        <p className="muted">
          {type === 'halt'
            ? 'You are about to place the associated vendor payment workflow on hold.'
            : 'Record this decision against the project compliance trail.'}
        </p>
        <div className="modal-project">
          <strong>{project.name}</strong>
          <span>
            {project.id} · {project.district}
          </span>
        </div>
        {type === 'audit' && (
          <>
            <label>
              Assign officer
              <select defaultValue="Field Officer">
                <option>Field Officer</option>
                <option>District Authority</option>
                <option>State Nodal Officer</option>
              </select>
            </label>
            <label>
              Priority
              <select defaultValue="High">
                <option>High</option>
                <option>Medium</option>
              </select>
            </label>
          </>
        )}
        <label>
          {type === 'resolve' ? 'Resolution notes' : 'Reason'}
          <textarea
            defaultValue={type === 'audit' ? 'Verify reported physical progress and payment records.' : ''}
            placeholder="Enter a concise reason..."
          />
        </label>
        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button className={type === 'halt' ? 'danger' : 'primary'} onClick={onSubmit}>
            {labels[type]?.[1] || 'Confirm'} <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
export default ActionModal
