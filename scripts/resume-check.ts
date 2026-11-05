/**
 * 檢查 content/resume 的三份 md：能不能解析、三語是否對得上、英日文是否已同步到最新的中文版。
 *
 *   pnpm resume:check
 */
import { readFileSync } from 'node:fs'
import { buildProfile, frontmatter, LOCALES, type Locale } from '../content/profile.ts'

const read = (l: Locale) => readFileSync(new URL(`../content/resume/${l}.md`, import.meta.url), 'utf8')
const src = Object.fromEntries(LOCALES.map((l) => [l, read(l)])) as Record<Locale, string>

try {
  const p = buildProfile(src)
  console.log(`三語結構一致：經歷 ${p.experience.length}、學歷 ${p.education.length}、技能 ${p.skills.length} 組、作品 ${p.projects.length}`)
} catch (e) {
  console.error((e as Error).message)
  process.exit(1)
}

const updated = frontmatter(src['zh-Hant']).updated
let stale = false
for (const l of ['en', 'ja'] as const) {
  const synced = frontmatter(src[l]).synced
  if (synced !== updated) {
    stale = true
    console.warn(`! ${l}.md 的 synced 是 ${synced ?? '（沒寫）'}，中文版 updated 是 ${updated}：翻譯可能還沒跟上`)
  }
}
if (stale) process.exitCode = 1
else console.log(`英日文已同步到 ${updated} 的中文版`)
