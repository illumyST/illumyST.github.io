<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ColorBlocks from '@/components/ColorBlocks.vue'
import SectionHead from '@/components/SectionHead.vue'
import CopyEmail from '@/components/CopyEmail.vue'
import { usePageHead } from '@/composables/usePageHead'
import { useMessageList, resolveFields } from '@/composables/useMessages'
import { useProfile } from '@/composables/useProfile'
import { forChannel } from '@content/format.ts'
import { localePath } from '@/router'
import { site, resumeUrl } from '@/site'
import type { Locale } from '@/i18n'

const { t, locale } = useI18n()
const { profile, tr } = useProfile()
usePageHead('home')

type Case = { id: string; tags: string[]; title: string; desc: string }
type Item = { title: string; desc: string }

const stats = computed(() => profile.highlights.map((h) => ({ n: tr(h.value), label: tr(h.label) })))
const metaLine = computed(() => [
  tr(profile.location),
  profile.stack.join(' · '),
  profile.languages.flatMap((x) => (x.cert ? [x.cert] : [])).join(' · '),
])
const cases = useMessageList<Case>('work.items', resolveFields)
const how = useMessageList<Item>('how.items', resolveFields)
const side = computed(() =>
  forChannel(profile.projects, 'site').map((p) => ({ url: p.url, image: p.image, name: tr(p.name), desc: tr(p.desc) })),
)
/** 首頁年表：有簡稱的學歷與經歷，依開始時間排序。 */
const stops = computed(() =>
  [...profile.education, ...forChannel(profile.experience, 'site')]
    .flatMap((x) => (x.short ? [{ start: x.start, year: x.start.slice(0, 4), org: tr(x.short.org), role: tr(x.short.role) }] : []))
    .sort((a, b) => a.start.localeCompare(b.start)),
)

const about = computed(() => localePath(locale.value as Locale, 'about'))
const cv = computed(() => resumeUrl(locale.value))
const roman = ['I', 'II', 'III', 'IV']
const caseWash = ['red', 'blue', 'gold']

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

onUnmounted(() => clearTimeout(copyTimer))

async function copyHeroEmail() {
  try {
    await navigator.clipboard.writeText(site.email)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    window.location.href = `mailto:${site.email}`
  }
}
</script>

<template>
  <!-- 1. Hero Section (GRIS 水彩意象與日系文青扉頁) -->
  <section class="hero" data-track-location="hero">
    <ColorBlocks variant="hero" />
    <div class="container hero-grid">
      <div class="hero-inner">
        <!-- 候選人狀態 (低調文青筆記風格) -->
        <div class="status-line">
          <p class="eyebrow">{{ tr(profile.headline) }}</p>
          <span class="status-bracket">
            〔 {{ t('dock.status') }} 〕
          </span>
        </div>

        <h1 class="name">
          {{ tr(profile.name) }}
          <small>{{ tr(profile.altName) }}</small>
        </h1>

        <p class="line">{{ tr(profile.summary) }}</p>

        <!-- 關鍵實績數據 (Gris 風格典雅數字與細線刻度) -->
        <div class="stats-spread">
          <div v-for="(s, i) in stats" :key="i" class="stat-col" :class="`stat--${caseWash[i]}`">
            <span class="stat-index">0{{ i + 1 }}</span>
            <strong class="stat-num">{{ s.n }}</strong>
            <span class="stat-text">{{ s.label }}</span>
          </div>
        </div>

        <!-- HR 快速調閱行動列 (乾淨紙質書籤風按鈕) -->
        <div class="cta-row">
          <a href="#work" class="btn btn--solid" data-track="cta_click" data-track-target="work">
            <span>{{ t('hero.cta.work') }}</span>
            <span class="arrow-down" aria-hidden="true">↓</span>
          </a>
          <a :href="site.resumeZh" target="_blank" rel="noopener" class="btn btn--outline" data-track="resume_click" data-track-target="zh">
            <span>{{ t('dock.resumeZh') }} ↗</span>
          </a>
          <a :href="site.resumeEn" target="_blank" rel="noopener" class="btn btn--outline" data-track="resume_click" data-track-target="en">
            <span>{{ t('dock.resumeEn') }} ↗</span>
          </a>
          <button type="button" class="btn btn--copy" :aria-label="t('dock.copyEmail')" data-track="email_copy" @click="copyHeroEmail">
            <span class="copy-swap">
              <span :class="{ hide: copied }">{{ site.email }}</span>
              <span :class="{ hide: !copied }">{{ t('dock.emailCopied') }}</span>
            </span>
          </button>
        </div>

        <span class="visually-hidden" role="status">{{ copied ? t('dock.emailCopied') : '' }}</span>

        <!-- ATS 快篩關鍵字條 (細緻分隔符號) -->
        <div class="meta-strip">
          <span v-for="(m, i) in metaLine" :key="i" class="meta-item">
            <span v-if="i > 0" class="meta-dot" aria-hidden="true">/</span>
            <span>{{ m }}</span>
          </span>
        </div>
      </div>

      <!-- 人像水彩光暈輪廓 -->
      <div class="portrait-container">
        <figure class="portrait">
          <img
            :src="site.portrait"
            :srcset="`${site.portraitSmall} 480w, ${site.portrait} 960w`"
            sizes="(max-width: 720px) 140px, 280px"
            :alt="tr(profile.name)"
            width="960"
            height="960"
            fetchpriority="high"
            decoding="async"
          />
        </figure>
      </div>
    </div>
  </section>

  <!-- 2. Selected Work (作品集 · GRIS 各章節水彩意象卡片) -->
  <section id="work" class="work" data-track-location="work">
    <ColorBlocks variant="work" />
    <div class="container">
      <SectionHead :title="t('work.title')" />
      <ul class="cases">
        <li v-for="(c, i) in cases" :key="c.id" :class="`case case--${caseWash[i]}`">
          <RouterLink :to="`${about}#${site.caseAnchor[c.id]}`" class="case-card" data-track="case_click" :data-track-target="c.id">
            <!-- 水彩暈染插畫框 (無假圖表，純粹紙質水彩與極簡版式) -->
            <div class="case-artwork">
              <img v-if="site.caseImages[c.id]" :src="site.caseImages[c.id]" :alt="c.title" loading="lazy" width="1600" height="1000" />
              <div v-else class="watercolor-frame" :class="`frame--${c.id}`">
                <div class="frame-content">
                  <span class="frame-roman">Case 0{{ i + 1 }}</span>
                  <span class="frame-tagline">{{ c.tags[0] }}</span>
                </div>
              </div>
            </div>

            <!-- 卡片內文 (文青排版，字距與行距舒適) -->
            <div class="case-info">
              <div class="case-tags">
                <span v-for="tag in c.tags" :key="tag" class="tag-bracket">〔 {{ tag }} 〕</span>
              </div>
              <h3 class="case-heading">{{ c.title }}</h3>
              <p class="case-summary">{{ c.desc }}</p>
              <div class="case-action">
                <span>{{ t('work.more') }}</span>
                <span class="action-arrow">→</span>
              </div>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <!-- 3. How I work (畫面之外的事 · 雜誌書頁排版) -->
  <section class="how">
    <div class="container">
      <SectionHead :title="t('how.title')" />
      <div class="how-grid">
        <article v-for="(h, i) in how" :key="i" class="how-item">
          <span class="roman-index">{{ roman[i] }}.</span>
          <div class="how-content">
            <h3>{{ h.title }}</h3>
            <p>{{ h.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- 4. Side projects (創作小品) -->
  <section class="side" data-track-location="side">
    <div class="container">
      <SectionHead :title="t('side.title')" />
      <ul class="side-grid">
        <li v-for="s in side" :key="s.url">
          <a :href="s.url" target="_blank" rel="noopener" class="side-item" data-track="project_click" :data-track-target="s.url.replace('https://', '')">
            <div v-if="s.image" class="side-thumb">
              <img :src="s.image" alt="" loading="lazy" width="960" height="600" />
            </div>
            <div class="side-title-row">
              <h3>{{ s.name }}</h3>
              <span class="side-arrow">↗</span>
            </div>
            <p>{{ s.desc }}</p>
            <span class="side-url">{{ s.url.replace('https://', '') }}</span>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <!-- 5. Path (年譜軌跡) -->
  <section class="path" data-track-location="timeline">
    <div class="container">
      <SectionHead :title="t('timeline.title')" />
      <ol class="chronology">
        <li v-for="(s, i) in stops" :key="s.year" :class="{ now: i === stops.length - 1 }" class="chrono-item">
          <div class="chrono-year">{{ s.year }}</div>
          <div class="chrono-body">
            <strong>{{ s.org }}</strong>
            <span class="chrono-role">{{ s.role }}</span>
          </div>
        </li>
      </ol>
      <div class="timeline-more">
        <RouterLink :to="about" class="editorial-link" data-track="cta_click" data-track-target="about">
          <span>{{ t('timeline.more') }}</span>
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- 6. Contact (結尾水彩墨色) -->
  <section id="contact" class="contact" data-track-location="contact">
    <ColorBlocks variant="contact" />
    <div class="container contact-inner">
      <SectionHead :title="t('contact.title')" />
      <p class="lead">{{ t('contact.lead') }}</p>
      <div class="contact-copy-wrap">
        <CopyEmail :email="site.email" />
      </div>
      <div class="links-row">
        <a :href="site.linkedin" target="_blank" rel="noopener" class="contact-link" data-track="social_click" data-track-target="linkedin">LinkedIn <span>{{ site.linkedinLabel }}</span> ↗</a>
        <span class="dot-sep">·</span>
        <a :href="site.github" target="_blank" rel="noopener" class="contact-link" data-track="social_click" data-track-target="github">GitHub <span>{{ site.githubLabel }}</span> ↗</a>
        <span class="dot-sep">·</span>
        <a :href="cv" target="_blank" rel="noopener" class="contact-link contact-link--highlight" data-track="resume_click" data-track-target="cv">{{ t('contact.cv') }} ↗</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  position: relative;
}
.container {
  position: relative;
  z-index: 1;
}

/* 1. Hero Section */
.hero {
  padding-block: clamp(48px, 9vh, 92px) clamp(44px, 7vh, 80px);
}
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 40px 60px;
  align-items: center;
}
.hero-inner {
  display: grid;
  gap: 26px;
  min-width: 0;
}

.status-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 16px;
}
.status-bracket {
  font-family: var(--font-display);
  font-size: 0.84rem;
  letter-spacing: 0.06em;
  color: var(--quiet);
}

.name {
  font-size: clamp(2.8rem, 1.8rem + 3.8vw, 4.5rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
  font-weight: 500;
}
.name small {
  display: block;
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  font-size: 0.38em;
  letter-spacing: 0.08em;
  color: var(--quiet);
  margin-top: 10px;
}
.line {
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 0.95rem + 0.8vw, 1.45rem);
  line-height: 1.8;
  max-width: 36ch;
  color: var(--ink);
}

/* Stats Spread (日系書頁版式) */
.stats-spread {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  padding-block: 16px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  max-width: 720px;
}
.stat-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat-index {
  font-family: var(--font-serif);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--quiet);
}
.stat-num {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 1.4rem + 1.2vw, 2.3rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.stat-text {
  font-size: 0.84rem;
  color: var(--quiet);
  line-height: 1.6;
}

/* CTA Row (文青紙質微邊框按鈕) */
.cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}
.btn--solid {
  background: var(--ink);
  color: var(--paper);
  border: 1px solid var(--ink);
}
.btn--solid:hover {
  background: color-mix(in srgb, var(--ink) 80%, transparent);
}
.arrow-down {
  font-family: var(--font-serif);
}
.btn--outline {
  background: var(--paper-2);
  color: var(--ink);
  border: 1px solid var(--line);
}
.btn--outline:hover {
  border-color: var(--ink);
}
.btn--copy {
  color: var(--quiet);
  border: 1px dashed var(--line);
  font-size: 0.8125rem;
  padding: 7px 14px;
}
.copy-swap {
  display: inline-grid;
}
.copy-swap > span {
  grid-area: 1 / 1;
  text-align: center;
  white-space: nowrap;
}
.copy-swap > .hide {
  visibility: hidden;
}
.btn--copy:hover {
  border-color: var(--quiet);
  color: var(--ink);
}

/* Meta Strip */
.meta-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 0.84rem;
  color: var(--quiet);
  letter-spacing: 0.02em;
}
.meta-dot {
  color: var(--line);
  margin-right: 8px;
}

/* Portrait */
.portrait-container {
  justify-self: end;
  position: relative;
}
.portrait {
  margin: 0;
  width: clamp(200px, 24vw, 270px);
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  background: var(--paper-3);
  padding: 4px;
  border: 1px solid var(--line);
  box-shadow: 0 8px 24px -6px rgba(35, 38, 45, 0.08);
}
.portrait img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .portrait-container {
    order: -1;
    justify-self: start;
  }
  .portrait {
    width: 120px;
  }
}

/* Section Spacing */
.work,
.how,
.side,
.path {
  padding-block: clamp(56px, 9vh, 96px);
  border-top: 1px solid var(--line);
}

/* 2. Selected Work (GRIS 水彩意象卡片) */
.cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 32px;
}
.case-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: var(--radius-card);
  background: var(--paper-2);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition:
    border-color 0.25s,
    transform 0.3s var(--ease),
    box-shadow 0.3s var(--ease);
}
.case-card:hover {
  transform: translateY(-4px);
  border-color: var(--quiet);
  box-shadow: var(--shadow-hover);
}

.case-artwork {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-bottom: 1px solid var(--line-subtle);
  overflow: hidden;
  background: var(--paper);
}
.case-artwork img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 水彩框背景 (GRIS 篇章感) */
.watercolor-frame {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.frame--cube {
  background: radial-gradient(circle at 60% 40%, var(--red-tint) 0%, color-mix(in srgb, var(--red) 18%, transparent) 60%, var(--paper) 100%);
}
.frame--endoscopy {
  background: radial-gradient(circle at 40% 60%, var(--blue-tint) 0%, color-mix(in srgb, var(--blue) 18%, transparent) 60%, var(--paper) 100%);
}
.frame--harness {
  background: radial-gradient(circle at 50% 40%, var(--gold-tint) 0%, color-mix(in srgb, var(--gold) 20%, transparent) 60%, var(--paper) 100%);
}

.frame-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.frame-roman {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-style: italic;
  letter-spacing: 0.12em;
  color: var(--ink);
  opacity: 0.8;
}
.frame-tagline {
  font-family: var(--font-display);
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  color: var(--quiet);
  text-transform: uppercase;
}

.case-info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}
.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tag-bracket {
  font-family: var(--font-display);
  font-size: 0.78rem;
  color: var(--quiet);
  letter-spacing: 0.04em;
}
.case-heading {
  font-size: 1.25rem;
  line-height: 1.45;
  font-weight: 500;
  color: var(--ink);
}
.case-summary {
  font-size: 0.92rem;
  color: var(--quiet);
  line-height: 1.75;
}
.case-action {
  margin-top: auto;
  padding-top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--ink);
  font-family: var(--font-display);
}
.action-arrow {
  transition: transform 0.2s var(--ease);
}
.case-card:hover .action-arrow {
  transform: translateX(4px);
}

/* 3. How I work (雜誌書頁式排版) */
.how-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
}
.how-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.roman-index {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-style: italic;
  color: var(--quiet);
}
.how-content h3 {
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 6px;
}
.how-content p {
  font-size: 0.9rem;
  color: var(--quiet);
  line-height: 1.75;
}

/* 4. Side Projects */
.side-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}
.side-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  border-radius: var(--radius-card);
  background: var(--paper-2);
  border: 1px solid var(--line);
  height: 100%;
  transition: border-color 0.2s;
}
.side-item:hover {
  border-color: var(--quiet);
}
.side-thumb {
  margin: -24px -24px 8px;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--line-subtle);
  border-radius: var(--radius-card) var(--radius-card) 0 0;
  background: var(--paper);
}
.side-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.side-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.side-title-row h3 {
  font-size: 1.1rem;
  font-weight: 500;
}
.side-arrow {
  color: var(--quiet);
  font-family: var(--font-serif);
}
.side-item p {
  font-size: 0.9rem;
  color: var(--quiet);
  line-height: 1.7;
}
.side-url {
  font-size: 0.78rem;
  color: var(--blue-ink);
  margin-top: auto;
  padding-top: 6px;
}

/* 5. Chronology (年譜) */
.chronology {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}
.chrono-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.chrono-year {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-style: italic;
  color: var(--ink);
}
.chrono-body strong {
  display: block;
  font-size: 1.05rem;
  font-weight: 500;
}
.chrono-role {
  font-size: 0.88rem;
  color: var(--quiet);
}
.timeline-more {
  margin-top: 28px;
  display: flex;
  justify-content: flex-end;
}
.editorial-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: var(--ink);
  border-bottom: 1px solid var(--line);
  padding-bottom: 2px;
  transition: border-color 0.2s;
}
.editorial-link:hover {
  border-bottom-color: var(--ink);
}

/* 6. Contact */
.contact {
  padding-block: clamp(64px, 10vh, 108px) clamp(56px, 8vh, 92px);
  margin-top: 24px;
}
.contact-inner {
  display: grid;
  gap: 22px;
}
.lead {
  max-width: 48ch;
  color: var(--quiet);
  font-size: 1.05rem;
  line-height: 1.8;
}
.contact-copy-wrap {
  margin-top: 4px;
}
.links-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.9rem;
  color: var(--quiet);
  margin-top: 6px;
}
.contact-link {
  color: var(--ink);
  border-bottom: 1px solid var(--line);
  padding-bottom: 1px;
  transition: border-color 0.2s;
}
.contact-link:hover {
  border-bottom-color: var(--ink);
}
.contact-link--highlight {
  color: var(--red-ink);
  border-bottom-color: var(--red);
}
.dot-sep {
  color: var(--line);
}
</style>
