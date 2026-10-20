import type { Role } from './types'

/** Order matters: it is the order of the tags, strings and fingers on the stage. */
export const roles: Role[] = [
  {
    id: 'business-analyst',
    slug: 'business-analyst',
    title: 'Business Analyst',
    tagTitle: 'Business Analyst',
    tagLine: 'Requirements and process',
    tagHint: 'Requirements and documents',
    accent: 'terracotta',
    headline: 'Turning a messy process into requirements people can agree on.',
    intro:
      'I start from the problem: who is affected, what the rules are, and what \u201cdone\u201d means, then write it in a form stakeholders can review and developers and testers can use.',
    focus: ['Requirements', 'Business rules', 'User stories', 'Process modelling', 'Stakeholders', 'Traceability'],
    stack: ['jira', 'mermaid', 'excel', 'github'],
    featuredProjectIds: ['jtk-learn-srs', 'shopee-monitoring-si', 'payment-reconciliation-system'],
  },
  {
    id: 'quality-assurance',
    slug: 'quality-assurance',
    title: 'Quality Assurance',
    tagTitle: 'Quality Assurance',
    tagLine: 'Test design and defects',
    tagHint: 'Test cases and bug reports',
    accent: 'sage',
    headline: 'Designing tests that find problems before users do.',
    intro:
      'I derive test cases from requirements, pick techniques that fit the risk, and report defects so that someone else can reproduce them in one pass.',
    focus: ['Test design', 'Functional testing', 'Boundary values', 'Defect reporting', 'Traceability', 'Test reporting'],
    stack: ['googlesheets', 'excel', 'jira', 'git', 'github'],
    featuredProjectIds: ['sipta-room-testing', 'swaglabs-testing'],
  },
  {
    id: 'software-engineer',
    slug: 'software-engineer',
    title: 'Software Engineer',
    tagTitle: 'Software Engineer',
    tagLine: 'APIs, databases, web apps',
    tagHint: 'Architecture and code',
    accent: 'blue',
    headline: 'Building software that is easy to read, change and trust.',
    intro:
      'Backend and full-stack work: designing the data model, exposing it through APIs and forms, validating input, and being explicit about technical trade-offs.',
    focus: ['Backend', 'REST APIs', 'Database design', 'Validation', 'Error handling', 'Testing'],
    stack: ['react', 'typescript', 'node', 'express', 'python', 'django', 'mysql', 'redis', 'docker', 'figma', 'postman', 'git', 'github'],
    featuredProjectIds: ['bmkg-station-quality', 'payment-reconciliation-app', 'bmkg-inatex', 'suara-prototype', 'gotoasean-prototype'],
  },
  {
    id: 'data-science',
    slug: 'data-science-ml',
    title: 'Data Science / ML Engineer',
    tagTitle: 'Data Science / ML Engineer',
    tagLine: 'Models and evaluation',
    tagHint: 'Experiments and metrics',
    accent: 'rose',
    headline: 'Framing a question, testing it fairly, and reporting what the numbers do and do not show.',
    intro:
      'I treat modelling as an experiment: a baseline first, one change at a time, a metric that fits the problem, and an honest account of where the model fails.',
    focus: ['Problem framing', 'Preprocessing', 'Model development', 'Experiment design', 'Evaluation', 'Reproducibility'],
    stack: ['python', 'pytorch', 'opencv', 'mediapipe', 'scikitlearn', 'numpy', 'pandas', 'streamlit', 'kaggle', 'colab', 'github'],
    featuredProjectIds: ['msc-segmentation', 'virtual-makeup', 'credit-risk-prediction'],
  },
]
