/**
 * 讀取 content/resume/*.md，合併成網站使用的 Profile。
 *
 * 內容請改 md，不要改這裡。zh-Hant.md 是主檔，en.md / ja.md 是翻譯，三份用標題後的 {#id} 對應。
 * 三語的項目、條數對不上時，build 會失敗並列出哪裡不一致。
 */

export type Locale = 'zh-Hant' | 'en' | 'ja'
export const LOCALES: Locale[] = ['zh-Hant', 'en', 'ja']
/** 三語文字。 */
export type Text = Record<Locale, string>
/** 三語相同的字（技術名詞、數字）是字串，不同時是 Text。 */
export type Term = string | Text
export type Channel = 'site' | 'notion' | '104'
/** 'YYYY-MM' 或 'YYYY'。 */
export type YearMonth = string
type Short = { org: Text; role: Text }

export type Job = {
  id: string
  start: YearMonth
  /** null 代表現職。 */
  end: YearMonth | null
  channels?: Channel[]
  title: Text
  org: Text
  note?: Text
  place: Text
  short?: Short
  items: Text[]
  details?: Text[]
  tags: Term[]
}

export type Profile = {
  updated: string
  name: Text
  altName: Text
  headline: Text
  summary: Text
  bio: Text[]
  location: Text
  stack: string[]
  contact: { email: string; linkedin: string; linkedinLabel: string; github: string; githubLabel: string; resumeZh: string; resumeEn: string }
  highlights: { value: Term; label: Text }[]
  experience: Job[]
  education: { id: string; start: YearMonth; end: YearMonth | null; school: Text; degree: Text; short?: Short }[]
  languages: { name: Text; level: Text; cert?: string }[]
  skills: { id: string; name: Text; channels?: Channel[]; items: Term[]; more?: Term[] }[]
  projects: { id: string; url: string; image?: string; channels?: Channel[]; name: Term; desc: Text }[]
  volunteer: Text[]
  interests: Text
}

// ---------- Markdown → 單一語言的文件 ----------

type Section = { level: number; title: string; id?: string; body: string[]; children: Section[] }

/** 清單項目的欄位名稱，三語都認得。 */
const KEYS: Record<string, string> = {
  期間: 'period', Period: 'period',
  地點: 'place', Location: 'place', 勤務地: 'place',
  備註: 'note', Note: 'note', 備考: 'note',
  年表: 'short', Timeline: 'short',
  標籤: 'tags', Tags: 'tags', タグ: 'tags',
  管道: 'channels', Channels: 'channels', チャネル: 'channels',
  學位: 'degree', Degree: 'degree', 学位: 'degree',
  項目: 'items', Items: 'items',
  履歷限定: 'more', 'Resume only': 'more', 履歴書のみ: 'more',
  網址: 'url', URL: 'url',
  圖片: 'image', Image: 'image', 画像: 'image',
}
const CHANNELS: Channel[] = ['site', 'notion', '104']

/** 讀取開頭 --- 之間的 key: value。 */
export function frontmatter(src: string): Record<string, string> {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src)
  const out: Record<string, string> = {}
  for (const line of m?.[1].split(/\r?\n/) ?? []) {
    const i = line.indexOf(':')
    if (i > 0) out[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return out
}

function sections(src: string): Section {
  const body = src.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').replace(/<!--[\s\S]*?-->/g, '')
  const root: Section = { level: 0, title: '', body: [], children: [] }
  const stack = [root]
  for (const line of body.split(/\r?\n/)) {
    const h = /^(#{1,4})\s+(.*?)(?:\s+\{#([\w-]+)\})?\s*$/.exec(line)
    if (!h) {
      stack[stack.length - 1].body.push(line)
      continue
    }
    const s: Section = { level: h[1].length, title: h[2].trim(), id: h[3], body: [], children: [] }
    while (stack[stack.length - 1].level >= s.level) stack.pop()
    stack[stack.length - 1].children.push(s)
    stack.push(s)
  }
  return root
}

function paragraphs(lines: string[]): string[] {
  const out: string[] = []
  let cur: string[] = []
  const flush = () => cur.length && (out.push(cur.join(' ')), (cur = []))
  for (const raw of lines) {
    const line = raw.trim()
    if (!line || line.startsWith('- ') || line.startsWith('> ')) flush()
    else cur.push(line)
  }
  flush()
  return out
}

function listItems(lines: string[]): string[] {
  const out: string[] = []
  for (const raw of lines) {
    if (/^\s*-\s+/.test(raw)) out.push(raw.replace(/^\s*-\s+/, '').trim())
    else if (/^\s+\S/.test(raw) && out.length) out[out.length - 1] += ' ' + raw.trim()
  }
  return out
}

const splitPipe = (s: string) => s.split(/\s*[｜|]\s*/)
const splitList = (s: string) => s.split(/\s*[,、，]\s*/).filter(Boolean)

type Doc = ReturnType<typeof parseDoc>

function parseDoc(src: string, file: string, problems: string[]) {
  const h1 = sections(src).children.find((s) => s.level === 1)
  if (!h1) throw new Error(`${file}：找不到 # 名字`)
  const sec = (id: string) => {
    const s = h1.children.find((c) => c.id === id)
    if (!s) problems.push(`${file}：缺少 {#${id}} 段落`)
    if (h1.children.filter((c) => c.id === id).length > 1) problems.push(`${file}：段落重複 {#${id}}`)
    return s ?? { level: 2, title: '', body: [], children: [] }
  }
  const meta = (s: Section) => {
    const out: Record<string, string> = {}
    for (const item of listItems(s.body)) {
      const m = /^([^：:]+)[：:]\s*(.*)$/.exec(item)
      const key = m && KEYS[m[1].trim()]
      if (key) out[key] = m[2].trim()
      else problems.push(`${file}：「${s.title}」底下看不懂這一行：- ${item}`)
    }
    return out
  }
  const sub = (s: Section, id: string) => {
    if (s.children.filter((c) => c.id === id).length > 1) problems.push(`${file}：「${s.title}」重複 {#${id}}`)
    return s.children.find((c) => c.id === id)
  }
  const needId = (s: Section) => {
    if (!s.id) problems.push(`${file}：「${s.title}」標題後面缺少 {#id}`)
    return s.id ?? s.title
  }

  return {
    file,
    name: h1.title,
    altName: (h1.body.find((l) => l.startsWith('> ')) ?? '').slice(2).trim(),
    headline: paragraphs(sec('headline').body).join(' '),
    summary: paragraphs(sec('summary').body).join(' '),
    location: paragraphs(sec('location').body).join(' '),
    bio: paragraphs(sec('bio').body),
    highlights: listItems(sec('highlights').body).map((x) => {
      const [value, label = ''] = splitPipe(x)
      return { value, label }
    }),
    experience: sec('experience').children.map((s) => {
      const [title, org = ''] = splitPipe(s.title)
      return { id: needId(s), title, org, meta: meta(s), items: listItems(sub(s, 'items')?.body ?? []), details: sub(s, 'details') && listItems(sub(s, 'details')!.body) }
    }),
    education: sec('education').children.map((s) => ({ id: needId(s), school: s.title, meta: meta(s) })),
    languages: listItems(sec('languages').body).map((x) => {
      const [name, level = '', cert] = splitPipe(x)
      return { name, level, cert }
    }),
    skills: sec('skills').children.map((s) => ({ id: needId(s), name: s.title, meta: meta(s) })),
    projects: sec('projects').children.map((s) => ({ id: needId(s), name: s.title, meta: meta(s), desc: paragraphs(s.body).join(' ') })),
    volunteer: listItems(sec('volunteer').body),
    interests: paragraphs(sec('interests').body).join(' '),
  }
}

// ---------- 三語合併 ----------

function parsePeriod(s: string | undefined, where: string, problems: string[]): { start: string; end: string | null } {
  const parts = (s ?? '').split(/\s*[~～]\s*/)
  const [start = '', end = ''] = parts
  const isDate = (value: string) => /^\d{4}(-(0[1-9]|1[0-2]))?$/.test(value)
  if (parts.length !== 2 || !isDate(start) || (!isDate(end) && end !== '至今') || (isDate(end) && end < start)) problems.push(`zh-Hant.md：${where}的期間要寫成「2023-09 ~ 2026-07」或「2026-07 ~ 至今」`)
  return { start, end: isDate(end) ? end : null }
}

function parseChannels(s: string | undefined, where: string, problems: string[]): Channel[] | undefined {
  if (!s) return undefined
  const list = splitList(s) as Channel[]
  for (const c of list) if (!CHANNELS.includes(c)) problems.push(`zh-Hant.md：${where}的管道「${c}」不認得，只能是 site, notion, 104`)
  return list
}

/** 把三份 md 合併成 Profile。三語對不上時丟出錯誤，列出所有問題。 */
export function buildProfile(src: Record<Locale, string>): Profile {
  const problems: string[] = []
  const [zh, en, ja] = LOCALES.map((l) => parseDoc(src[l], `${l}.md`, problems))
  const docs = [zh, en, ja]
  const text = (get: (d: Doc) => string | undefined, where: string): Text => {
    const [a, b, c] = docs.map((d) => {
      const v = get(d)
      if (!v) problems.push(`${d.file}：${where} 是空的`)
      return v ?? ''
    })
    return { 'zh-Hant': a, en: b, ja: c }
  }
  const term = (t: Text): Term => (t['zh-Hant'] === t.en && t.en === t.ja ? t.en : t)
  /** 依 id 找出另外兩語的對應項目。 */
  const byId = <T extends { id: string }>(get: (d: Doc) => T[], where: string) => {
    for (const d of docs) {
      const seen = new Set<string>()
      for (const { id } of get(d)) {
        if (seen.has(id)) problems.push(`${d.file}：${where}重複 {#${id}}`)
        seen.add(id)
      }
    }
    const ids = get(zh).map((x) => x.id)
    for (const d of [en, ja]) {
      const other = get(d).map((x) => x.id)
      for (const id of ids) if (!other.includes(id)) problems.push(`${d.file}：${where}缺少 {#${id}}`)
      for (const id of other) if (!ids.includes(id)) problems.push(`${d.file}：${where}多了 zh-Hant.md 沒有的 {#${id}}`)
    }
    return ids.map((id) => (d: Doc) => get(d).find((x) => x.id === id))
  }
  /** 同一個清單在三語中的條數要一樣。 */
  const sameLength = (get: (d: Doc) => unknown[] | undefined, where: string) => {
    const n = get(zh)?.length ?? 0
    for (const d of [en, ja]) {
      const m = get(d)?.length ?? 0
      if (m !== n) problems.push(`${d.file}：${where}有 ${m} 條，zh-Hant.md 有 ${n} 條`)
    }
    return Array.from({ length: n }, (_, i) => i)
  }
  const shortOf = (get: (d: Doc) => Record<string, string> | undefined, where: string): Short | undefined => {
    if (!get(zh)?.short) return undefined
    const parts = (d: Doc) => splitPipe(get(d)?.short ?? '')
    return { org: text((d) => parts(d)[0], `${where}的年表公司`), role: text((d) => parts(d)[1], `${where}的年表角色`) }
  }

  const front = frontmatter(src['zh-Hant'])
  const need = (k: string) => {
    if (!front[k]) problems.push(`zh-Hant.md：開頭缺少 ${k}:`)
    return front[k] ?? ''
  }

  const profile: Profile = {
    updated: need('updated'),
    name: text((d) => d.name, '名字'),
    altName: text((d) => d.altName, '第二個名字（> 那一行）'),
    headline: text((d) => d.headline, '職稱'),
    summary: text((d) => d.summary, '一句話介紹'),
    bio: sameLength((d) => d.bio, '自我介紹的段落').map((i) => text((d) => d.bio[i], `自我介紹第 ${i + 1} 段`)),
    location: text((d) => d.location, '地點'),
    stack: splitList(need('stack')),
    contact: {
      email: need('email'),
      linkedin: need('linkedin'),
      linkedinLabel: need('linkedinLabel'),
      github: need('github'),
      githubLabel: need('githubLabel'),
      resumeZh: need('resumeZh'),
      resumeEn: need('resumeEn'),
    },
    highlights: sameLength((d) => d.highlights, '關鍵數字').map((i) => ({
      value: term(text((d) => d.highlights[i]?.value, `關鍵數字第 ${i + 1} 條`)),
      label: text((d) => d.highlights[i]?.label, `關鍵數字第 ${i + 1} 條的說明`),
    })),
    experience: byId((d) => d.experience, '經歷').map((get) => {
      const z = get(zh)!
      const w = `經歷 {#${z.id}} `
      const at = (d: Doc) => get(d) ?? { title: '', org: '', meta: {} as Record<string, string>, items: [], details: undefined }
      const details = sameLength((d) => at(d).details, `${w}的履歷限定`)
      const tags = sameLength((d) => splitList(at(d).meta.tags ?? ''), `${w}的標籤`)
      return {
        id: z.id,
        ...parsePeriod(z.meta.period, w, problems),
        channels: parseChannels(z.meta.channels, w, problems),
        title: text((d) => at(d).title, `${w}的職稱`),
        org: text((d) => at(d).org, `${w}的公司`),
        note: z.meta.note ? text((d) => at(d).meta.note, `${w}的備註`) : undefined,
        place: text((d) => at(d).meta.place, `${w}的地點`),
        short: shortOf((d) => at(d).meta, w),
        items: sameLength((d) => at(d).items, `${w}的重點`).map((i) => text((d) => at(d).items[i], `${w}重點第 ${i + 1} 條`)),
        details: z.details && details.map((i) => text((d) => at(d).details?.[i], `${w}履歷限定第 ${i + 1} 條`)),
        tags: tags.map((i) => term(text((d) => splitList(at(d).meta.tags ?? '')[i], `${w}第 ${i + 1} 個標籤`))),
      }
    }),
    education: byId((d) => d.education, '學歷').map((get) => {
      const z = get(zh)!
      const w = `學歷 {#${z.id}} `
      return {
        id: z.id,
        ...parsePeriod(z.meta.period, w, problems),
        school: text((d) => get(d)?.school, `${w}的學校`),
        degree: text((d) => get(d)?.meta.degree, `${w}的學位`),
        short: shortOf((d) => get(d)?.meta, w),
      }
    }),
    languages: sameLength((d) => d.languages, '語言').map((i) => ({
      name: text((d) => d.languages[i]?.name, `語言第 ${i + 1} 條`),
      level: text((d) => d.languages[i]?.level, `語言第 ${i + 1} 條的程度`),
      cert: zh.languages[i].cert,
    })),
    skills: byId((d) => d.skills, '技能').map((get) => {
      const z = get(zh)!
      const w = `技能 {#${z.id}} `
      const list = (d: Doc, k: 'items' | 'more') => splitList(get(d)?.meta[k] ?? '')
      const terms = (k: 'items' | 'more', label: string) =>
        sameLength((d) => list(d, k), `${w}的${label}`).map((i) => term(text((d) => list(d, k)[i], `${w}${label}第 ${i + 1} 個`)))
      const items = terms('items', '項目')
      const more = terms('more', '履歷限定')
      return {
        id: z.id,
        name: text((d) => get(d)?.name, `${w}的名稱`),
        channels: parseChannels(z.meta.channels, w, problems),
        items,
        more: z.meta.more ? more : undefined,
      }
    }),
    projects: byId((d) => d.projects, '作品').map((get) => {
      const z = get(zh)!
      const w = `作品 {#${z.id}} `
      if (!z.meta.url) problems.push(`zh-Hant.md：${w}缺少網址`)
      return {
        id: z.id,
        url: z.meta.url ?? '',
        image: z.meta.image,
        channels: parseChannels(z.meta.channels, w, problems),
        name: term(text((d) => get(d)?.name, `${w}的名稱`)),
        desc: text((d) => get(d)?.desc, `${w}的說明`),
      }
    }),
    volunteer: sameLength((d) => d.volunteer, '志工').map((i) => text((d) => d.volunteer[i], `志工第 ${i + 1} 條`)),
    interests: text((d) => d.interests, '興趣'),
  }

  // 某語缺少整個項目時，只回報「缺少」，不再列出它底下每一欄都是空的。
  const missing = problems.flatMap((p) => /^(\S+\.md)：\S+缺少 (\{#[\w-]+\})$/.exec(p)?.slice(1, 3).join('|') ?? [])
  const shown = [...new Set(problems)].filter((p) => !missing.some((m) => {
    const [file, id] = m.split('|')
    return p.startsWith(file) && p.includes(id) && !p.includes('缺少 ' + id)
  }))
  if (shown.length) throw new Error('履歷 md 有問題：\n' + shown.map((p) => '  - ' + p).join('\n'))
  return profile
}
