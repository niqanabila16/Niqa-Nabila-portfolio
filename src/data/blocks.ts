import type { Block } from './types'

/**
 * Evidence blocks that are reused on both a role landing page and a case study.
 * Everything here is either taken from the owner's own project notes or is
 * explicitly labelled as a method illustration / placeholder.
 */

/* ------------------------------------------------------------------ */
/* Payment reconciliation (in progress, remote work)                   */
/* ------------------------------------------------------------------ */

export const paymentProcessFlow: Block = {
  type: 'flow',
  title: 'As-Is and To-Be process',
  caption:
    'The To-Be lane shows the system currently in development. Dashed steps are planned and are not implemented.',
  lanes: [
    {
      label: 'As-Is (manual)',
      tone: 'muted',
      steps: [
        { text: 'Teller reads the transfer-proof photo' },
        { text: 'Teller retypes the payment details' },
        { text: 'Teller posts the data to a shared WhatsApp group' },
        { text: 'Finance compares bank Excel files with teller data by eye' },
      ],
    },
    {
      label: 'To-Be (in development)',
      tone: 'accent',
      steps: [
        { text: 'Teller records the receipt in a validated web form' },
        { text: 'Finance uploads the bank statement (CSV / XLSX)' },
        { text: 'System matches rows and assigns GFP / Review / Not Found' },
        { text: 'Finance works through the items marked Review' },
        {
          text: 'OCR reads transfer-proof photos',
          note: 'Planned phase, not implemented',
          planned: true,
        },
      ],
    },
  ],
}

export const paymentTraceability: Block = {
  type: 'table',
  title: 'Requirements traceability (summary)',
  caption: 'Need \u2192 requirement area \u2192 role \u2192 how it is checked.',
  columns: ['Stakeholder need', 'Requirement area', 'Role', 'Acceptance check (draft wording)'],
  rows: [
    [
      'Finance should not compare bank files by eye',
      'Bank statement upload and parsing (CSV / XLSX)',
      'Finance',
      'An uploaded file is parsed into one standard transaction structure and appears in upload history.',
    ],
    [
      'Finance needs to know which payments need attention',
      'Automatic matching with GFP / Review / Not Found statuses',
      'Finance',
      'Every bank row ends with exactly one status; Review items are listed for manual checking.',
    ],
    [
      'Tellers should record each receipt once and correctly',
      'Receipt form with inline validation and duplicate warning',
      'Teller',
      'Only the invalid field is flagged; a duplicate receipt triggers a pop-up instead of an error summary.',
    ],
    [
      'Lists and accounts must be maintainable without a developer',
      'User and dropdown management',
      'Admin',
      'An admin can add, change and deactivate users and dropdown values.',
    ],
    [
      'People must know when something needs action',
      'Notifications',
      'Teller, Finance',
      'To be confirmed with stakeholders.',
    ],
  ],
  note: 'Summary of the full specification: functional, business and non-functional requirements, constraints, user stories, acceptance criteria and a revision log of stakeholder-driven changes.',
}

export const paymentDecisions: Block = {
  type: 'table',
  title: 'Decisions, assumptions and risks',
  columns: ['Type', 'Entry'],
  rows: [
    [
      'Decision',
      'Five options were compared (chat-bot channel, form plus workflow automation, custom program with a spreadsheet, custom program with a database, and a phased combination). The phased route was recommended: matching engine for Finance first, teller and customer channels second, OCR last.',
    ],
    [
      'Assumption',
      'Bank data carries a reference number that corresponds to what tellers record. The whole matching approach depends on it, so it is tested first.',
    ],
    [
      'Risk',
      'Bank statements from different banks use different column names for the same information. They have to be normalised into one structure before matching.',
    ],
    [
      'Open item',
      'The final matching algorithm is not settled. The system is still in development.',
    ],
    [
      'Expected outcome',
      'Less manual re-typing and comparison for Finance. This is an intended outcome and has not been measured.',
    ],
  ],
}

export const paymentArchitecture: Block = {
  type: 'stack',
  title: 'System architecture',
  caption: 'Python / Django web application with three user roles: Teller, Finance and Admin.',
  layers: [
    {
      label: 'Browser',
      items: ['HTML / JavaScript front end', 'Teller receipt form with inline validation'],
    },
    {
      label: 'Django application',
      items: ['Views and forms', 'Role-based access: Teller / Finance / Admin', 'Notifications'],
    },
    {
      label: 'Reconciliation logic',
      items: [
        'Bank statement parsing (CSV / XLSX)',
        'Automatic matching',
        'Status: GFP / Review / Not Found',
      ],
    },
    {
      label: 'Storage',
      items: ['Django ORM models', 'Upload history', 'Database design document'],
    },
    {
      label: 'Planned extension',
      items: ['OCR of transfer-proof photos'],
      planned: true,
    },
  ],
}

export const receiptFormDecisions: Block = {
  type: 'table',
  title: 'Validation and error-handling decisions',
  caption: 'Teller "New receipt" form.',
  columns: ['Decision', 'Reasoning'],
  rows: [
    [
      'Keep the native datetime-local input',
      'No custom date picker or text input is added just to force a display format; the browser control stays accessible and familiar.',
    ],
    [
      'Validate inline, without waiting for submit',
      'Only the invalid field turns red and a general message appears under it (for example, only one comma is allowed in an amount).',
    ],
    [
      'Soft pink-red error colour',
      'Errors stay clearly visible without a harsh, alarming red.',
    ],
    [
      'Duplicate receipt shows a pop-up only',
      'A duplicate is not something the teller can "fix", so it is not listed in the error summary.',
    ],
  ],
}

/* ------------------------------------------------------------------ */
/* MSC segmentation thesis (academic)                                  */
/* ------------------------------------------------------------------ */

export const mscMetrics: Block = {
  type: 'metrics',
  title: 'Segmentation results',
  caption: 'Dice and IoU on the evaluation images, as reported in the final thesis report.',
  max: 1,
  groups: [
    {
      label: 'Phase-contrast images: Dice',
      bars: [
        { name: 'Baseline U-Net', value: 0.8816 },
        { name: 'Final model', value: 0.8988 },
      ],
    },
    {
      label: 'Phase-contrast images: IoU',
      bars: [
        { name: 'Baseline U-Net', value: 0.7909 },
        { name: 'Final model', value: 0.8185 },
      ],
    },
    {
      label: 'Non-phase-contrast images (generalisation): final model with polynomial background correction (order 3)',
      bars: [
        { name: 'Dice', value: 0.5726 },
        { name: 'IoU', value: 0.4254 },
      ],
    },
  ],
  note: 'Figures as reported in the final thesis report. No baseline is listed for the non-phase-contrast setting.',
}

export const mscPipeline: Block = {
  type: 'flow',
  title: 'Experiment pipeline',
  caption: 'From microscopy image to evaluated mask.',
  lanes: [
    {
      label: 'Pipeline',
      tone: 'accent',
      steps: [
        { text: 'Microscopy images and masks' },
        {
          text: 'Preprocessing and augmentation',
          note: 'Gaussian blur augmentation; background correction methods explored',
        },
        {
          text: 'U-Net with ResNet50 encoder',
          note: 'AFpM activation in the decoder',
        },
        { text: 'Training with the AdamN optimizer' },
        { text: 'Evaluation with Dice and IoU' },
        { text: 'Generalisation check on non-phase-contrast images' },
      ],
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Method illustrations (not project results)                          */
/* ------------------------------------------------------------------ */

export const boundaryExample: Block = {
  type: 'table',
  title: 'Equivalence partitioning and boundary value analysis',
  caption:
    'Method illustration for a field that accepts whole numbers from 1 to 100. This is a teaching example, not a project result.',
  columns: ['Technique', 'Partition or boundary', 'Test value', 'Expected result'],
  rows: [
    ['Equivalence partition', 'Invalid: below range', '-5', 'Rejected with a message'],
    ['Equivalence partition', 'Valid: inside range', '50', 'Accepted'],
    ['Equivalence partition', 'Invalid: above range', '150', 'Rejected with a message'],
    ['Boundary value', 'Just below lower bound', '0', 'Rejected'],
    ['Boundary value', 'Lower bound', '1', 'Accepted'],
    ['Boundary value', 'Upper bound', '100', 'Accepted'],
    ['Boundary value', 'Just above upper bound', '101', 'Rejected'],
  ],
}

export const defectTemplate: Block = {
  type: 'table',
  title: 'What a defect report contains',
  caption: 'Structure used for defect reports.',
  columns: ['Field', 'Purpose'],
  rows: [
    ['Identifier and title', 'One line that says what is wrong and where.'],
    ['Environment and build', 'Lets someone else reproduce it under the same conditions.'],
    ['Steps to reproduce', 'Numbered, minimal and in order.'],
    ['Expected vs actual result', 'Tied back to the requirement or acceptance criterion.'],
    ['Severity and priority', 'Impact on the user versus urgency of the fix.'],
    ['Evidence', 'Screenshot, log excerpt or request/response pair.'],
  ],
}
