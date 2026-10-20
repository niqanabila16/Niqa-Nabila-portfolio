import type { Profile } from './types'

/**
 * Central profile configuration.
 * Links with an empty `url` are not shown.
 */
export const profile: Profile = {
  name: 'Niqa Nabila Nur Ihsani',
  shortName: 'Niqa',
  headline: 'I analyse, test, build and model software, from the first requirement to the last metric.',
  intro:
    'Informatics graduate from Politeknik Negeri Bandung (D4 Computer Engineering and Informatics, 2022\u20132026), working across business analysis, quality assurance, software engineering and machine learning.',

  /** Zig-zag timeline on the home page, newest first. */
  background: [
    {
      id: 'mandiri',
      title: 'Payment reconciliation automation',
      place: 'Mandiri International Remittance (remote)',
      period: 'Aug 2026 \u2013 present',
      blurb: 'Requirements, system design and a Django app that matches bank statements with teller receipts.',
      art: 'payment-work',
      image: '/img/work/mandiri-remittance.webp',
      to: '/projects/payment-reconciliation-app',
    },
    {
      id: 'bmkg',
      title: 'Software Engineer Intern',
      place: 'BMKG',
      period: '2025',
      blurb: 'Built a station data quality monitoring system and improved an e-learning platform for earthquake mitigation.',
      art: 'bmkg-work',
      image: '/img/se/bmkg-team.webp',
      to: '/projects/bmkg-station-quality',
    },
    {
      id: 'bmkg-trainer',
      title: 'Guest Technical Trainer',
      place: 'BMKG',
      blurb: 'Contract role delivering technical training sessions at BMKG.',
      art: 'bmkg-work',
      image: '/img/se/bmkg-trainer.webp',
      to: '/role/software-engineer',
    },
    {
      id: 'headstarter',
      title: 'Software Engineering International Fellow',
      place: 'Headstarter AI',
      blurb: 'International fellowship focused on software engineering.',
      art: 'fellow',
      to: '/role/software-engineer',
    },
    {
      id: 'polban',
      title: 'D4 Computer Engineering and Informatics',
      place: 'Politeknik Negeri Bandung',
      period: '2022 \u2013 2026',
      blurb: 'Final project on deep-learning segmentation of stem cells in microscopy images.',
      art: 'edu',
      to: '/projects/msc-segmentation',
    },
  ],

  links: [
    { label: 'GitHub', url: 'https://github.com/niqanabila16' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/niqanabila' },
    { label: 'Email', url: 'mailto:niqanabila06@gmail.com' },
  ],

  /** Figma prototypes shown on the home page and the Software Engineer page. */
  prototypes: [
    {
      id: 'suara',
      title: 'SUARA',
      blurb: 'A collaboration platform that links community reports, partners and open progress tracking (SDG 17).',
      url: 'https://shorturl.at/8h5Mo',
      projectId: 'suara-prototype',
      art: 'suara',
    },
    {
      id: 'gotoasean',
      title: 'GotoASEAN',
      blurb: 'A smart tourism planner that guides travellers from crowded sites to quieter destinations.',
      url: 'https://www.figma.com/proto/x7SNyjgCo86XXvWBxbBkHE/GotoASEAN-Prototype?node-id=132-14955&t=Po8A4zuGhLJPFvhT-1&scaling=scale-down&content-scaling=fixed&page-id=132%3A14954&starting-point-node-id=132%3A14955',
      projectId: 'gotoasean-prototype',
      art: 'travel',
    },
  ],

  documents: {
    // Put the PDFs in /public and point to them, e.g. '/cv.pdf'.
    cv: { label: 'CV', url: '/cv.pdf' },
    qaPortfolio: { label: 'QA portfolio', url: '/qa-portfolio.pdf' },
  },
}
