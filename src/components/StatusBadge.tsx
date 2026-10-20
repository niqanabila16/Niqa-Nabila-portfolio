import { STATUS_LABEL } from '../data'
import type { Project } from '../data'

export default function StatusBadge({ status }: { status: Project['status'] }) {
  return <span className={`badge badge--${status}`}>{STATUS_LABEL[status]}</span>
}
