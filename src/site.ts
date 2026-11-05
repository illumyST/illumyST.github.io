import { profile } from '@/profile'

/**
 * 網站專用設定；聯絡方式、經歷、技能與作品存放於 content/resume/*.md。
 */
export const site = {
  url: 'https://stoneisme.com',
  ...profile.contact,
  portrait: '/images/portrait.webp',
  portraitSmall: '/images/portrait-480.webp',
  /** 產出 PDF 後填入路徑；尚未提供時連到 Notion 履歷。 */
  cvPdf: { en: '', ja: '', 'zh-Hant': '' } as Record<string, string>,
  /** 首頁案例卡片對應的 About 經歷錨點。 */
  caseAnchor: { cube: 'cube', endoscopy: 'csmuh', harness: 'csmuh' } as Record<string, string>,
  /** 案例截圖為 1600x1000；空字串顯示色塊。 */
  caseImages: { cube: '/images/case-cube.webp', endoscopy: '/images/case-endoscopy.webp', harness: '' } as Record<string, string>,
}

/** 依語系取得履歷連結：優先使用 PDF，否則使用 Notion。 */
export function resumeUrl(locale: string): string {
  return site.cvPdf[locale] || (locale === 'zh-Hant' ? site.resumeZh : site.resumeEn)
}
