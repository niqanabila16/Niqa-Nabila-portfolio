import { projects } from './projects'
import { roles } from './roles'
import type { Project, Role } from './types'

export { profile } from './profile'
export { projects, roles }
export * from './types'

export const getRoleBySlug = (slug: string | undefined): Role | undefined =>
  roles.find((r) => r.slug === slug)

export const getRole = (id: string): Role | undefined => roles.find((r) => r.id === id)

export const getProject = (id: string | undefined): Project | undefined =>
  projects.find((p) => p.id === id)

export const projectsForRole = (role: Role): Project[] =>
  role.featuredProjectIds
    .map((id) => getProject(id))
    .filter((p): p is Project => Boolean(p))

export const STATUS_LABEL: Record<Project['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  prototype: 'Prototype',
  academic: 'Academic work',
  draft: 'Draft entry',
}
