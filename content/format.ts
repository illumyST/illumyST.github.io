/** 網站與匯出腳本共用的格式化工具。 */
import type { Channel, Locale, Term, YearMonth } from './profile.ts'

export function tr(x: Term, l: Locale): string {
  return typeof x === 'string' ? x : x[l]
}

/** 只留下要在某個管道顯示的項目（沒寫 channels 的項目在所有管道都會出現）。 */
export function forChannel<T extends { channels?: Channel[] }>(list: T[], c: Channel): T[] {
  return list.filter((x) => !x.channels || x.channels.includes(c))
}

const PRESENT: Record<Locale, string> = { 'zh-Hant': '至今', en: 'now', ja: '現在' }

/** '2023-09' → '2023.09'；end 為 null 時顯示「至今」。 */
export function period(start: YearMonth, end: YearMonth | null, l: Locale, sep = ' — '): string {
  const f = (s: string) => s.replace('-', '.')
  return f(start) + sep + (end ? f(end) : PRESENT[l])
}
