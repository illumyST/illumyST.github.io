/** Facts that do not change with language. Edit here, not in the locale files. */
export const site = {
  url: 'https://stoneisme.com',
  email: 'stonechen.fe@gmail.com',
  linkedin: 'https://www.linkedin.com/in/chenstone/',
  linkedinLabel: 'in/chenstone',
  github: 'https://github.com/illumyST',
  githubLabel: '@illumyST',
  portrait: '/images/portrait.webp',
  portraitSmall: '/images/portrait-480.webp',
  resumeEn: 'https://chen-stone.notion.site/Stone-Chen-Resume-283e8b07e6cd80258647fe61889323ca',
  resumeZh: 'https://chen-stone.notion.site/Stone-Chen-2e3e8b07e6cd806488ace21865d18116',
  /** PDF resumes land here once produced; until then the CTA falls back to the Notion resume. */
  cvPdf: { en: '', ja: '', 'zh-Hant': '' } as Record<string, string>,
  sideProjects: [
    'https://stoneisme.com/train_monopoly/',
    'https://stoneisme.com/project',
    'https://stoneisme.com/blog/foodie/',
  ],
  /** Side-project thumbnails, 960x600, same order as sideProjects. Empty string hides the image. */
  sideImages: [
    '/images/side-train.webp',
    '/images/side-playground.webp',
    '/images/side-foodie.webp',
  ],
  /** Which About-page job each home card scrolls to. */
  caseAnchor: { cube: 'cube', endoscopy: 'csmuh', harness: 'csmuh' } as Record<string, string>,
  /** Case screenshots, 1600x1000. Empty string shows a tinted placeholder block. */
  caseImages: { cube: '/images/case-cube.webp', endoscopy: '/images/case-endoscopy.webp', harness: '' } as Record<string, string>,
}
