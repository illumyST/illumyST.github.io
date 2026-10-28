/** Facts that do not change with language. Edit here, not in the locale files. */
export const site = {
  url: 'https://stoneisme.com',
  email: 'stonechen.fe@gmail.com',
  linkedin: 'https://www.linkedin.com/in/chenstone/',
  linkedinLabel: 'in/chenstone',
  github: 'https://github.com/illumyST',
  githubLabel: '@illumyST',
  resumeEn: 'https://chen-stone.notion.site/Stone-Chen-Resume-283e8b07e6cd80258647fe61889323ca',
  resumeZh: 'https://chen-stone.notion.site/Stone-Chen-2e3e8b07e6cd806488ace21865d18116',
  /** PDF resumes land here once produced; until then the CTA falls back to the Notion resume. */
  cvPdf: { en: '', ja: '', 'zh-Hant': '' } as Record<string, string>,
  sideProjects: [
    'https://stoneisme.com/train_monopoly/',
    'https://stoneisme.com/project',
    'https://stoneisme.com/blog/foodie/',
  ],
  /** Which About-page job each home card scrolls to. */
  caseAnchor: { cube: 'cube', endoscopy: 'csmuh', harness: 'csmuh' } as Record<string, string>,
  /** Case screenshots, 1600x1000. Empty string shows a tinted placeholder block. */
  caseImages: { cube: '', endoscopy: '', harness: '' } as Record<string, string>,
}
