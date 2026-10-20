import type { Block } from './types'

/**
 * Evidence blocks built from the owner's own files (test workbooks, bug lists, repositories,
 * seminar slides, SRS and report documents). Numbers are copied from those files, not estimated.
 * Images live in /public/img.
 */

/* ------------------------------------------------------------------ */
/* QA: SIPTA room management and scheduling                            */
/* ------------------------------------------------------------------ */

export const siptaStats: Block = {
  type: 'stats',
  title: 'Test execution at a glance',
  caption: 'Test case workbook for the room management and scheduling topic.',
  items: [
    { value: '6', label: 'Features tested' },
    { value: '90', label: 'Test cases executed' },
    { value: '50 / 40', label: 'Passed / failed' },
    { value: '41', label: 'Defects reported' },
  ],
  note: 'A seventh sheet holds 7 test cases of a cancelled feature; they were not executed and are not counted above.',
}

export const siptaFeatureTable: Block = {
  type: 'table',
  title: 'Results per feature',
  columns: ['Feature', 'Test cases', 'Passed', 'Failed'],
  rows: [
    ['Room management', '28', '10', '18'],
    ['Scheduling report', '2', '1', '1'],
    ['Facility management', '8', '3', '5'],
    ['Building management', '22', '15', '7'],
    ['Calendar', '8', '4', '4'],
    ['Admin login', '22', '17', '5'],
  ],
}

export const siptaGallery: Block = {
  type: 'gallery',
  title: 'Test case sheet and defect evidence',
  caption: 'Select an image to enlarge it. Screens may show test data only.',
  items: [
    {
      src: '/img/qa/sipta-testcase-preview.webp',
      alt: 'Test case sheet with preconditions, steps, expected and actual results and a Passed or Failed column',
      caption: 'Test case sheet: preconditions, steps, expected vs actual result, result and status.',
    },
    {
      src: '/img/qa/sipta-bug-delete-confirm.webp',
      alt: 'Bug report with screenshot of a room that is still listed after deletion was confirmed',
      caption: 'Critical: room remains after the delete is confirmed.',
    },
    {
      src: '/img/qa/sipta-bug-duplicate-code.webp',
      alt: 'Bug report with screenshot of a duplicate room code being accepted',
      caption: 'Major: duplicate room code accepted without a warning.',
    },
    {
      src: '/img/qa/sipta-bug-facility-in-use.webp',
      alt: 'Bug report with screenshot of a facility that can be deleted while in use',
      caption: 'Major: facility removable while rooms use it.',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* QA: Swag Labs                                                       */
/* ------------------------------------------------------------------ */

export const swagStats: Block = {
  type: 'stats',
  title: 'Test execution at a glance',
  caption: 'Test run on 27 June 2026.',
  items: [
    { value: '43', label: 'Test cases in 10 features' },
    { value: '17', label: 'Passed' },
    { value: '20', label: 'Failed' },
    { value: '6', label: 'Requirement unclear' },
    { value: '18', label: 'Defects reported' },
  ],
  note: '“Requirement unclear” means the test step did not say precisely what to check, so the case was flagged instead of guessed.',
}

export const swagFeatureTable: Block = {
  type: 'table',
  title: 'Results per feature',
  columns: ['Feature', 'Test cases', 'Passed', 'Failed', 'Unclear'],
  rows: [
    ['Login', '7', '1', '5', '1'],
    ['Dashboard (product list)', '10', '2', '7', '1'],
    ['Cart page', '9', '7', '1', '1'],
    ['Checkout page', '7', '1', '5', '1'],
    ['Checkout overview', '3', '2', '0', '1'],
    ['Checkout complete', '2', '2', '0', '0'],
    ['All items menu', '1', '0', '0', '1'],
    ['About menu', '1', '0', '1', '0'],
    ['Log out', '1', '1', '0', '0'],
    ['Reset app state', '2', '1', '1', '0'],
  ],
}

export const swagSeverityTable: Block = {
  type: 'table',
  title: 'Defects by severity and priority',
  columns: ['Severity', 'Count', 'Priority', 'Count'],
  rows: [
    ['Critical', '2', 'High', '7'],
    ['Major', '5', 'Medium', '1'],
    ['Minor', '9', 'Low', '8'],
    ['Low', '2', 'Trivial', '2'],
  ],
  note: 'All 18 defects were reported with status New on the test date.',
}

export const swagGallery: Block = {
  type: 'gallery',
  title: 'Summary and defect evidence',
  caption: 'Summary sheet and screenshots attached to the bug report sheet. Select an image to enlarge it.',
  items: [
    { src: '/img/qa/swaglabs-summary.webp', alt: 'Summary sheet with test counts and defect counts by severity and priority per feature', caption: 'Summary sheet.' },
    { src: '/img/qa/swag-bug-checkout.webp', alt: 'Bug report with a screenshot of the checkout step that cannot continue', caption: 'Critical: checkout cannot continue with valid data.' },
    { src: '/img/qa/swag-bug-filter-sort.webp', alt: 'Bug report with a screenshot of the product sort order', caption: 'Minor: sort order does not match the specification.' },
    { src: '/img/qa/swag-bug-login-message.webp', alt: 'Bug report with a screenshot of the login error message', caption: 'Minor: login error message differs from the expected text.' },
  ],
}

/* ------------------------------------------------------------------ */
/* Software engineer: BMKG station quality monitoring                  */
/* ------------------------------------------------------------------ */

export const bmkgStack: Block = {
  type: 'stack',
  title: 'System architecture',
  caption: 'Architecture diagram from the planning phase, summarised by layer.',
  layers: [
    { label: 'Front end', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
    { label: 'Back end', items: ['Node.js', 'Express', 'REST API as proxy to external services'] },
    { label: 'Data', items: ['MySQL (primary database)', 'Redis (cache and session storage)'] },
    { label: 'Supporting services', items: ['History app (Python)', 'Third-party external API'] },
    { label: 'Development environment', items: ['Docker Compose', 'Git and GitHub', 'Postman'] },
  ],
}

export const bmkgRules: Block = {
  type: 'table',
  title: 'Sample business rules from the specification',
  caption: 'Written with the supervising team; translated from the original Indonesian.',
  columns: ['Rule', 'Meaning'],
  rows: [
    ['Latency colours on the station map', 'Under 10 seconds green; 10 seconds to under 1 minute yellow; 1 to under 3 minutes orange; 3 to under 30 minutes red; 30 minutes to under 1 day grey; 1 day or more black.'],
    ['Data quality summary', 'Good is green, Fair is orange, Bad is red and No Data is grey.'],
    ['Availability', 'Fetched on a daily schedule. The monthly value is the average of the days in that month.'],
    ['Map symbol', 'Stations are drawn as triangles, coloured by the rule above.'],
    ['Reporting day', 'Summaries use the previous day’s data.'],
    ['Tables', 'Paginated with a maximum of 50 rows per page.'],
  ],
}

export const bmkgPlanningGallery: Block = {
  type: 'gallery',
  title: 'Planning artifacts',
  caption: 'Requirements spreadsheet, database iterations V1 to V3 and the UI design in Figma.',
  items: [
    { src: '/img/se/bmkg-architecture.webp', alt: 'Architecture diagram: Python history app, React front end, Node and Express back end, Redis, MySQL and an external API', caption: 'Architecture diagram.' },
    { src: '/img/se/bmkg-requirements.webp', alt: 'Functional requirements spreadsheet with user stories and a business rules table', caption: 'Functional requirements and business rules.' },
    { src: '/img/se/bmkg-database.webp', alt: 'Three iterations of the station database schema', caption: 'Database design, three iterations (V1 to V3).' },
    { src: '/img/se/bmkg-ui-design.webp', alt: 'Figma components for station quality list, detail, sidebar and dropdowns', caption: 'UI components and layouts in Figma.' },
  ],
}

export const bmkgScreensGallery: Block = {
  type: 'gallery',
  title: 'Implemented screens',
  caption: 'Screens from the running application during development. Select an image to enlarge it.',
  items: [
    { src: '/img/se/bmkg-dashboard.webp', alt: 'Dashboard with a station map, status cards and availability and quality charts', caption: 'Dashboard: station map, counts, availability and quality.' },
    { src: '/img/se/bmkg-station-quality.webp', alt: 'Station quality page with a donut chart, map and filterable table', caption: 'Station quality: summary, map and filterable table.' },
    { src: '/img/se/bmkg-station-detail.webp', alt: 'Station detail page with time-series charts per channel', caption: 'Station detail: per-channel time series.' },
    { src: '/img/se/bmkg-station-daily.webp', alt: 'Station daily page with information, location map, signal images and channel table', caption: 'Station daily: site analysis, signal and PSD images.' },
    { src: '/img/se/bmkg-station-performance.webp', alt: 'Station performance list and detail charts', caption: 'Station performance: list and residual plots.' },
    { src: '/img/se/bmkg-metadata.webp', alt: 'Station metadata page with information, map, photos and equipment details', caption: 'Station metadata: site information, photos and equipment.' },
    { src: '/img/se/bmkg-metadata-history.webp', alt: 'Station metadata history table with equipment records', caption: 'Station metadata history.' },
  ],
}

export const bmkgInfraGallery: Block = {
  type: 'gallery',
  title: 'Back-end and environment work',
  caption: 'Docker Compose environment, migration and seed scripts, Redis client, scheduler and the UI standard.',
  items: [
    { src: '/img/se/bmkg-redis-scheduler.webp', alt: 'Redis client code, scheduler with retry and a UI standard page about dropdowns', caption: 'Redis, scheduler with retries and the UI standard.' },
  ],
}

/* ------------------------------------------------------------------ */
/* Software engineer: payment reconciliation application               */
/* ------------------------------------------------------------------ */

export const paymentAppArchitecture: Block = {
  type: 'stack',
  title: 'Application architecture',
  caption: 'Django project with four apps. Layout taken from the repository documentation.',
  layers: [
    { label: 'Browser', items: ['HTML and JavaScript', 'Service worker with an offline receipt queue', 'Import progress screen'] },
    { label: 'Django apps', items: ['accounts: branches, users, sign-in', 'core: master data, audit log, notifications', 'receipts: teller form and sync', 'reconciliation: statement import, matching, review'] },
    { label: 'Reconciliation services', items: ['Statement parser', 'Matching engine with RapidFuzz typo suggestions', 'Importer', 'Review and notification services'] },
    { label: 'Storage', items: ['SQLite by default', 'PostgreSQL supported', 'Django ORM models'] },
    { label: 'Deployment', items: ['Waitress server on the central office computer', 'Windows PowerShell setup and backup scripts'] },
    { label: 'Planned', items: ['OCR of transfer-proof photos', 'Redis and RQ job queue (phase 2)'], planned: true },
  ],
}

export const paymentOutcomes: Block = {
  type: 'table',
  title: 'How a receipt is matched',
  caption: 'Walk-through from the repository README. All values are demo data.',
  columns: ['Receipt (amount, reference)', 'Outcome', 'Why'],
  rows: [
    ['150.00, 2235277A1', 'Verified (GFP)', 'Reference and amount match the statement.'],
    ['1200.00, 611380310m', 'Verified', 'Letter case in the reference is ignored.'],
    ['320.00, 99120054', 'Review: typo', 'The bank has 99120045. The differing characters are underlined for Finance.'],
    ['205.00, 55302211', 'Review: amount differs', 'The bank shows 250.00.'],
    ['400.00, 90019001', 'Not found', 'No bank row carries this reference.'],
  ],
}

export const paymentAppStats: Block = {
  type: 'stats',
  title: 'Project at a glance',
  items: [
    { value: '3', label: 'User roles' },
    { value: '4', label: 'Matching outcomes' },
    { value: '110', label: 'Automated tests in the repository' },
    { value: '5', label: 'Documentation files' },
  ],
  note: 'The 110 automated tests are as documented in the repository README. Documentation files: architecture, requirements traceability, UI standards, maintenance and database notes.',
}

/* ------------------------------------------------------------------ */
/* Software engineer: INATEX                                           */
/* ------------------------------------------------------------------ */

export const inatexGallery: Block = {
  type: 'gallery',
  title: 'Analysis and result',
  caption: 'Select an image to enlarge it.',
  items: [
    { src: '/img/se/inatex-usecase.webp', alt: 'Use case diagram for the INATEX e-learning, requirements spreadsheet and Taiga board', caption: 'Use case diagram, requirements sheet and Taiga board.' },
    { src: '/img/se/inatex-progress.webp', alt: 'Course progress shown on the course page, the course card and inside a lesson', caption: 'Course progress on the course page, card and lesson.' },
    { src: '/img/se/inatex-quiz.webp', alt: 'Quiz question page, automatic correction and a retake screen showing the previous score', caption: 'Quiz: answer, automatic correction and retake.' },
  ],
}

/* ------------------------------------------------------------------ */
/* Software engineer: design prototypes (essays)                       */
/* ------------------------------------------------------------------ */

export const suaraGallery: Block = {
  type: 'gallery',
  title: 'Prototype screens',
  caption: 'Exported from the Figma file. Select an image to enlarge it.',
  items: [
    { src: '/img/design/suara-1.webp', alt: 'SUARA welcome screen and forgot password screen', caption: 'Welcome and password reset.' },
    { src: '/img/design/suara-2.webp', alt: 'SUARA login and sign-up screens', caption: 'Login and sign-up.' },
    { src: '/img/design/suara-3.webp', alt: 'SUARA home with SDG achievement summary, pillars and a contribution leaderboard', caption: 'Home: SDG summary, pillars and leaderboard.' },
    { src: '/img/design/suara-4.webp', alt: 'SUARA map by island and a list of reported cases with priority labels P1 to P3', caption: 'Map by island and reported cases with priority P1 to P3.' },
    { src: '/img/design/suara-5.webp', alt: 'SUARA regional dashboard with population, disaster chart and impact table', caption: 'Regional dashboard.' },
  ],
}

export const gotoaseanGallery: Block = {
  type: 'gallery',
  title: 'Prototype screens',
  caption: 'Exported from the Figma file. Select an image to enlarge it.',
  items: [
    { src: '/img/design/gotoasean-1.webp', alt: 'GotoASEAN welcome screen and forgot password screen', caption: 'Welcome and password reset.' },
    { src: '/img/design/gotoasean-2.webp', alt: 'GotoASEAN login and sign-up screens', caption: 'Login and sign-up.' },
    { src: '/img/design/gotoasean-3.webp', alt: 'GotoASEAN home with three feature shortcuts, and the preference screen for countries and tourism types', caption: 'Home and preferences.' },
    { src: '/img/design/gotoasean-4.webp', alt: 'GotoASEAN nearby destinations with distance, density and tags, plus a destination detail pop-up', caption: 'Destinations near me with a density indicator.' },
    { src: '/img/design/gotoasean-5.webp', alt: 'GotoASEAN trip planner calendar and daily schedule', caption: 'Trip planner and daily schedule.' },
  ],
}

/* ------------------------------------------------------------------ */
/* Documents: JTK Learn SRS and Shopee monitoring report               */
/* ------------------------------------------------------------------ */

export const jtkGallery: Block = {
  type: 'gallery',
  title: 'Diagrams from the SRS',
  caption: 'Select an image to enlarge it.',
  items: [
    { src: '/img/docs/jtklearn-layering.webp', alt: 'Layering of JTK Learn components: front end, back end and database', caption: 'Component layering.' },
    { src: '/img/docs/jtklearn-usecase.webp', alt: 'Use case diagram for the student and teacher roles of JTK Learn', caption: 'Use case diagram for student and teacher.' },
    { src: '/img/docs/jtklearn-process.webp', alt: 'Business process diagram of JTK Learn', caption: 'Business process.' },
  ],
}

export const shopeeGallery: Block = {
  type: 'gallery',
  title: 'Analysis and design diagrams',
  caption: 'Select an image to enlarge it.',
  items: [
    { src: '/img/docs/shopee-domain-model.webp', alt: 'Domain model of the system to be built', caption: 'Domain model of the new system.' },
    { src: '/img/docs/shopee-usecase.webp', alt: 'Use case diagram with the store owner and seven use cases', caption: 'Use case diagram: seven use cases.' },
    { src: '/img/docs/shopee-erd.webp', alt: 'Entity relationship diagram', caption: 'Entity relationship diagram.' },
    { src: '/img/docs/shopee-sequence-sentiment.webp', alt: 'Sequence diagram of the sentiment analysis use case', caption: 'Sequence diagram: sentiment analysis.' },
    { src: '/img/docs/shopee-ui-dashboard.webp', alt: 'UI model of the dashboard', caption: 'UI model: dashboard.' },
    { src: '/img/docs/shopee-ui-trending.webp', alt: 'UI model of the top trending page', caption: 'UI model: top trending.' },
    { src: '/img/docs/shopee-ui-fbt.webp', alt: 'UI model of the frequently bought together page', caption: 'UI model: frequently bought together.' },
  ],
}

/* ------------------------------------------------------------------ */
/* Data science                                                        */
/* ------------------------------------------------------------------ */

export const mscAblation: Block = {
  type: 'table',
  title: 'Ablation on phase-contrast images',
  caption: 'Each row adds the best option for one design choice to the baseline. The last row combines all four.',
  columns: ['Configuration', 'Dice', 'IoU'],
  rows: [
    ['Baseline U-Net', '0.8816', '0.7909'],
    ['+ Gaussian blur augmentation', '0.8885', '0.8020'],
    ['+ ResNet50 encoder (paper configuration)', '0.8901', '0.8041'],
    ['+ AdamN optimizer (paper configuration)', '0.8951', '0.8128'],
    ['+ AFpM activation (paper configuration)', '0.8961', '0.8141'],
    ['Final model (all four combined)', '0.8988', '0.8185'],
  ],
  note: 'Figures from the thesis results as published in the project repository.',
}

export const mscGeneralisation: Block = {
  type: 'table',
  title: 'Generalisation to non-phase-contrast images',
  caption: 'The second dataset has a different look, so preprocessing that makes it resemble the training images matters.',
  columns: ['Configuration', 'Dice', 'IoU'],
  rows: [
    ['Baseline U-Net', '0.0039', '0.0020'],
    ['Final model, no preprocessing', '0.0626', '0.0330'],
    ['Final model + polynomial background correction (order 3)', '0.5726', '0.4254'],
  ],
}

export const mscGallery: Block = {
  type: 'gallery',
  title: 'Experiment flow, predictions and the evaluation app',
  caption: 'Select an image to enlarge it.',
  items: [
    { src: '/img/ds/msc-experiment-flow.webp', alt: 'Flowchart of the experiment process', caption: 'Experiment process flow.' },
    { src: '/img/ds/msc-final-model.webp', alt: 'Original image, ground truth, U-Net prediction and final model prediction side by side', caption: 'Original, ground truth, baseline and final model.' },
    { src: '/img/ds/msc-ape-app.webp', alt: 'APE MSC Streamlit app showing original, ground truth, prediction and overlay with metrics', caption: 'APE MSC app: original, ground truth, prediction, overlay and metrics.' },
  ],
}

export const makeupGallery: Block = {
  type: 'gallery',
  title: 'Results',
  caption: 'Images from the project repository. The sample portrait is a demonstration image.',
  items: [
    { src: '/img/ds/makeup-before-after.webp', alt: 'Original face image next to the same image with virtual lipstick, eyeliner and eyeshadow', caption: 'Original and transformed image.' },
    { src: '/img/ds/makeup-skin-tones.webp', alt: 'Virtual makeup applied on four different skin tones', caption: 'Four skin tones: fair, medium, tan, dark.' },
    { src: '/img/ds/makeup-masks.webp', alt: 'Generated masks for lips, eyebrows, eyeliner and eyeshadow', caption: 'Generated makeup masks.' },
  ],
}

export const creditGallery: Block = {
  type: 'gallery',
  title: 'Charts from the analysis',
  caption: 'Select an image to enlarge it.',
  items: [
    { src: '/img/ds/credit-customer-proportion.webp', alt: 'Pie chart of non-default versus default customers', caption: 'Class balance: 91.9% good borrowers, 8.1% default.' },
    { src: '/img/ds/credit-feature-gain.webp', alt: 'Top 15 features by gain in the LightGBM model', caption: 'Top 15 features by gain (LightGBM).' },
    { src: '/img/ds/credit-default-age.webp', alt: 'Default rate by age group', caption: 'Default rate by age group.' },
    { src: '/img/ds/credit-confusion-logreg.webp', alt: 'Confusion matrix of the logistic regression model', caption: 'Confusion matrix of the logistic regression baseline.' },
  ],
}
