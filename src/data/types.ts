export type RoleId =
  | 'business-analyst'
  | 'quality-assurance'
  | 'software-engineer'
  | 'data-science'

export type ProjectStatus =
  | 'completed'
  | 'in-progress'
  | 'prototype'
  | 'academic'
  | 'draft'

export interface LinkItem {
  label: string
  /** Leave empty until a real URL exists. Empty links render as "coming soon". */
  url: string
  kind?: 'code' | 'report' | 'demo' | 'design' | 'paper'
  /** A file in /public that the visitor downloads straight from the project header. */
  download?: boolean
}

export interface FlowStep {
  text: string
  note?: string
  /** Planned steps are drawn dashed so they never read as shipped functionality. */
  planned?: boolean
}

export type Block =
  | { type: 'text'; title?: string; paragraphs: string[] }
  | { type: 'list'; title?: string; items: string[]; ordered?: boolean }
  | {
      type: 'flow'
      title: string
      caption?: string
      lanes: { label: string; tone?: 'muted' | 'accent'; steps: FlowStep[] }[]
    }
  | {
      type: 'table'
      title: string
      caption?: string
      columns: string[]
      rows: string[][]
      note?: string
    }
  | {
      type: 'metrics'
      title: string
      caption?: string
      max: number
      groups: { label: string; bars: { name: string; value: number }[] }[]
      note?: string
    }
  | {
      type: 'stack'
      title: string
      caption?: string
      layers: { label: string; items: string[]; planned?: boolean }[]
    }
  | { type: 'image'; src: string; alt: string; caption?: string; wide?: boolean }
  | {
      type: 'gallery'
      title: string
      caption?: string
      items: { src: string; alt: string; caption?: string }[]
    }
  | {
      type: 'stats'
      title: string
      caption?: string
      items: { value: string; label: string }[]
      note?: string
    }

export const CASE_STUDY_SECTIONS = [
  { key: 'overview', label: 'Project overview' },
  { key: 'problem', label: 'Problem and objective' },
  { key: 'role', label: 'My role and contribution' },
  { key: 'scope', label: 'Scope and constraints' },
  { key: 'approach', label: 'Approach and decisions' },
  { key: 'process', label: 'Implementation / analysis' },
  { key: 'artifacts', label: 'Artifacts and evidence' },
  { key: 'results', label: 'Results and evaluation' },
  { key: 'limitations', label: 'Limitations and lessons' },
  { key: 'links', label: 'Code, reports and demos' },
] as const

export type SectionKey = (typeof CASE_STUDY_SECTIONS)[number]['key']

export type ArtKey =
  | 'payment-system'
  | 'seismic'
  | 'testing'
  | 'api-test'
  | 'bmkg-api'
  | 'payment-app'
  | 'msc'
  | 'credit'
  | 'edu'
  | 'payment-work'
  | 'bmkg-work'
  | 'fellow'
  | 'makeup'
  | 'suara'
  | 'travel'
  | 'srs'
  | 'shopee'
  | 'elearning'

export interface Project {
  id: string
  /** Illustration shown on the project card when there is no cover image. */
  art: ArtKey
  /** Preview image (path under /public). Replaces the illustration on the card and in the header. */
  cover?: string
  title: string
  summary: string
  status: ProjectStatus
  /** 'verified' = text comes from the owner. 'draft' = structure only, content still to be written. */
  contentStatus: 'verified' | 'draft'
  primaryRole: RoleId
  roles: RoleId[]
  context: string
  period?: string
  tags: string[]
  /** Optional sibling entry that tells the same project from another role's angle. */
  relatedProjectId?: string
  caseStudy: Partial<Record<SectionKey, Block[]>>
  links: LinkItem[]
}

export interface Role {
  id: RoleId
  slug: string
  title: string
  /** Label on the paper tag. */
  tagTitle: string
  /** Always-visible one-liner on the tag (touch users never need hover). */
  tagLine: string
  /** Line that replaces the one-liner on hover / focus. */
  tagHint: string
  accent: 'terracotta' | 'sage' | 'blue' | 'rose'
  headline: string
  intro: string
  focus: string[]
  /** Technology ids, resolved to logos in components/TechIcon.tsx. */
  stack: string[]
  featuredProjectIds: string[]
}

export interface DocumentLink {
  label: string
  /** File in /public (for example "/cv.pdf") or a full URL. Empty = shown as "coming soon". */
  url: string
}

export interface BackgroundEntry {
  id: string
  title: string
  place: string
  period?: string
  blurb: string
  art: ArtKey
  /** Photo or screenshot (path under /public). Replaces the illustration. */
  image?: string
  /** Internal route opened by the arrow button. */
  to: string
}

export interface PrototypeLink {
  id: string
  title: string
  blurb: string
  /** Figma (or other) prototype URL. */
  url: string
  /** Case study that explains the prototype. */
  projectId: string
  art: ArtKey
}

export interface Profile {
  name: string
  shortName: string
  headline: string
  intro: string
  background: BackgroundEntry[]
  links: { label: string; url: string }[]
  prototypes: PrototypeLink[]
  documents: { cv: DocumentLink; qaPortfolio: DocumentLink }
}
