import { Check } from 'lucide-react'

export function Toast({ message }) {
  if (!message) return null

  return (
    <div className="toast">
      <Check size={17} /> {message}
    </div>
  )
}
export default Toast
