import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildProfile, LOCALES, type Locale } from '../content/profile.ts'
import { forChannel } from '../content/format.ts'

const source = Object.fromEntries(LOCALES.map((locale) => [
  locale, readFileSync(new URL(`../content/resume/${locale}.md`, import.meta.url), 'utf8'),
])) as Record<Locale, string>

function changed(locale: Locale, before: string, after: string) {
  assert.ok(source[locale].includes(before), '測試替換目標必須存在')
  return { ...source, [locale]: source[locale].replace(before, after) }
}

test('主檔可解析，網站排除履歷限定的經歷與作品', () => {
  const profile = buildProfile(source)
  assert.deepEqual(forChannel(profile.experience, 'site').map((job) => job.id), ['csmuh', 'cube'])
  assert.deepEqual(forChannel(profile.projects, 'site').map((project) => project.id), ['train-monopoly', 'playground', 'foodie'])
  assert.equal(profile.experience[0].end, null)
  assert.equal(profile.experience[1].end, '2026-07')
})

test('錯誤期間不能變成現職', () => {
  for (const period of ['2026-07 ~ 2026-99', '2026-07 ~ typo', '2026-07', '2026-07 ~ 2025-01', '2026-07 ~ 至今 ~ 2027']) {
    assert.throws(() => buildProfile(changed('zh-Hant', '2026-07 ~ 至今', period)), /期間要寫成/)
  }
})

test('三語缺少或重複 ID 必須報錯', () => {
  assert.throws(() => buildProfile(changed('en', '{#cube}', '{#other}')), /缺少 \{#cube\}/)
  for (const locale of LOCALES) {
    assert.throws(() => buildProfile(changed(locale, '{#cube}', '{#csmuh}')), /重複 \{#csmuh\}/)
  }
})

test('重複段落與經歷子段落必須報錯', () => {
  assert.throws(() => buildProfile({ ...source, en: source.en + '\n## Duplicate {#summary}\ntext\n' }), /段落重複/)
  assert.throws(() => buildProfile(changed('en', '#### Highlights {#items}', '#### Extra {#items}\n\n- extra\n\n#### Highlights {#items}')), /重複 \{#items\}/)
})

test('翻譯多出的履歷限定內容不能被忽略', () => {
  const withoutDetails = source['zh-Hant'].replace(/#### 履歷限定 \{#details\}[\s\S]*?(?=### 前端工程師)/, '')
  assert.throws(() => buildProfile({ ...source, 'zh-Hant': withoutDetails }), /履歷限定有 3 條/)
  assert.throws(() => buildProfile(changed('en', '- Items：Chakra UI', '- Resume only：Extra\n- Items：Chakra UI')), /履歷限定有 1 條/)
})
