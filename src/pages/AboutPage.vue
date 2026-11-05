<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ColorBlocks from '@/components/ColorBlocks.vue'
import SectionHead from '@/components/SectionHead.vue'
import CopyEmail from '@/components/CopyEmail.vue'
import { usePageHead } from '@/composables/usePageHead'
import { useProfile } from '@/composables/useProfile'
import { forChannel, period } from '@content/format.ts'
import { site, resumeUrl } from '@/site'

const { t, locale } = useI18n()
const { profile, l, tr } = useProfile()
usePageHead('about')

const story = computed(() => profile.bio.map(tr))
const jobs = computed(() =>
  forChannel(profile.experience, 'site').map((j) => ({
    id: j.id,
    current: j.end === null,
    time: period(j.start, j.end, l.value),
    title: tr(j.title),
    org: tr(j.org),
    note: j.note ? tr(j.note) : '',
    place: tr(j.place),
    items: j.items.map(tr),
    tags: j.tags.map(tr),
  })),
)
const groups = computed(() => forChannel(profile.skills, 'site').map((g) => ({ name: tr(g.name), items: g.items.map(tr) })))
const langs = computed(() => [
  ...profile.education.map((e) => ({
    name: tr(e.school),
    level: `${tr(e.degree)} · ${period(e.start, e.end, l.value, l.value === 'ja' ? '〜' : '–')}`,
  })),
  ...profile.languages.map((x) => ({ name: tr(x.name), level: x.cert ? `${x.cert} · ${tr(x.level)}` : tr(x.level) })),
])
const cv = computed(() => resumeUrl(locale.value))

const kanjiNumbers = ['一', '二', '三', '四']
</script>

<template>
  <!-- 1. Story (生平與初心 · 文青書頁) -->
  <section class="story">
    <ColorBlocks variant="about" />
    <div class="container story-inner">
      <div class="story-text">
        <SectionHead :eyebrow="t('about.eyebrow')" :title="t('about.title')" />
        <div class="prose">
          <p v-for="(p, i) in story" :key="i">{{ p }}</p>
        </div>
      </div>
      <div class="portrait-container">
        <figure class="portrait">
          <img
            :src="site.portrait"
            :srcset="`${site.portraitSmall} 480w, ${site.portrait} 960w`"
            sizes="(max-width: 720px) 140px, 260px"
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

  <!-- 2. Experience (年譜履歷 · 日系書籍年表排版) -->
  <section class="exp">
    <div class="container">
      <SectionHead :eyebrow="t('about.exp.eyebrow')" :title="t('about.exp.title')" />
      <ol class="job-list">
        <li v-for="j in jobs" :key="j.id" :id="j.id" class="job-entry" :class="{ current: j.current }">
          <div class="job-meta">
            <span class="job-period">{{ j.time }}</span>
            <span class="job-place">〔 {{ j.place }} 〕</span>
            <span v-if="j.current" class="current-tag">{{ t('about.exp.current') }}</span>
          </div>

          <div class="job-main">
            <header class="job-header">
              <h3 class="job-title">{{ j.title }}</h3>
              <p class="job-org">
                <strong>{{ j.org }}</strong>
                <span v-if="j.note" class="job-note">（{{ j.note }}）</span>
              </p>
            </header>

            <ul class="job-bullets">
              <li v-for="(x, k) in j.items" :key="k">
                <span class="dash" aria-hidden="true">—</span>
                <span>{{ x }}</span>
              </li>
            </ul>

            <div class="job-tags">
              <span v-for="tag in j.tags" :key="tag" class="tag-chip">〔 {{ tag }} 〕</span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <!-- 3. Skills (技能目錄 · 日系文青章節排版) -->
  <section class="skills">
    <div class="container">
      <SectionHead :eyebrow="t('about.skills.eyebrow')" :title="t('about.skills.title')" />
      <div class="skills-index">
        <article v-for="(g, i) in groups" :key="g.name" class="skill-category">
          <header class="category-header">
            <span class="kanji-index">{{ kanjiNumbers[i] || '・' }}</span>
            <h3>{{ g.name }}</h3>
          </header>
          <ul class="chips">
            <li v-for="x in g.items" :key="x">{{ x }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- 4. Education & Languages (學歷與語文) -->
  <section class="langs">
    <div class="container">
      <SectionHead :eyebrow="t('about.langs.eyebrow')" :title="t('about.langs.title')" />
      <div class="lang-strip">
        <div v-for="l in langs" :key="l.name" class="lang-unit">
          <strong class="lang-name">{{ l.name }}</strong>
          <span class="lang-level">{{ l.level }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. Links & Contact -->
  <section id="contact" class="contact">
    <ColorBlocks variant="contact" />
    <div class="container contact-inner">
      <SectionHead :eyebrow="t('about.links.eyebrow')" :title="t('about.links.title')" />
      <div class="contact-copy-wrap">
        <CopyEmail :email="site.email" />
      </div>
      <div class="links-row">
        <a :href="site.linkedin" target="_blank" rel="noopener" class="contact-link">LinkedIn <span>{{ site.linkedinLabel }}</span> ↗</a>
        <span class="dot-sep">·</span>
        <a :href="site.github" target="_blank" rel="noopener" class="contact-link">GitHub <span>{{ site.githubLabel }}</span> ↗</a>
        <span class="dot-sep">·</span>
        <a :href="site.resumeZh" target="_blank" rel="noopener" class="contact-link contact-link--highlight">{{ t('contact.resumeZh') }} ↗</a>
        <span class="dot-sep">·</span>
        <a :href="site.resumeEn" target="_blank" rel="noopener" class="contact-link contact-link--highlight">{{ t('contact.resumeEn') }} ↗</a>
        <span class="dot-sep">·</span>
        <a :href="cv" target="_blank" rel="noopener" class="contact-link">{{ t('contact.cv') }} ↗</a>
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

/* 1. Story */
.story {
  padding-block: clamp(48px, 9vh, 92px) clamp(44px, 7vh, 80px);
}
.story-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 40px 60px;
  align-items: center;
}
.story-text {
  min-width: 0;
}
.prose {
  display: grid;
  gap: 18px;
  max-width: var(--measure);
}
.prose p {
  line-height: 1.9;
  font-size: 1.05rem;
  color: var(--ink);
}

.portrait-container {
  justify-self: end;
}
.portrait {
  margin: 0;
  width: clamp(200px, 24vw, 260px);
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
  .story-inner {
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
.exp,
.skills,
.langs {
  padding-block: clamp(56px, 9vh, 96px);
  border-top: 1px solid var(--line);
}

/* 2. Experience (年表風格) */
.job-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 40px;
}
.job-entry {
  display: grid;
  grid-template-columns: 12em 1fr;
  gap: 20px 40px;
  scroll-margin-top: 90px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}
.job-entry:first-child {
  border-top: none;
  padding-top: 0;
}

.job-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding-top: 4px;
}
.job-period {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--ink);
}
.job-place {
  font-family: var(--font-display);
  font-size: 0.8125rem;
  color: var(--quiet);
}
.current-tag {
  font-family: var(--font-display);
  font-size: 0.72rem;
  color: var(--red-ink);
  background: var(--red-tint);
  border: 1px solid var(--red);
  padding: 1px 8px;
  border-radius: var(--radius-pill);
}

.job-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.job-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.job-title {
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--ink);
  margin: 0;
}
.job-org {
  font-size: 1rem;
  color: var(--ink);
}
.job-note {
  color: var(--quiet);
  font-size: 0.88rem;
}

.job-bullets {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: var(--measure);
}
.job-bullets li {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--ink);
}
.dash {
  color: var(--quiet);
  flex-shrink: 0;
  font-family: var(--font-serif);
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}
.tag-chip {
  font-family: var(--font-display);
  font-size: 0.78rem;
  color: var(--quiet);
  letter-spacing: 0.04em;
}

@media (max-width: 680px) {
  .job-entry {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .job-meta {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
}

/* 3. Skills Index (文青章節目錄) */
.skills-index {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px 40px;
}
.skill-category {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.category-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.kanji-index {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--quiet);
}
.category-header h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--ink);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chips li {
  font-size: 0.88rem;
  padding: 3px 12px;
  border-radius: var(--radius-pill);
  background: var(--paper-2);
  border: 1px solid var(--line);
  color: var(--ink);
  transition: border-color 0.2s;
}
.chips li:hover {
  border-color: var(--quiet);
}

/* 4. Education & Languages */
.lang-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}
.lang-unit {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.lang-name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 500;
}
.lang-level {
  font-size: 0.9rem;
  color: var(--quiet);
  line-height: 1.6;
}

/* 5. Contact */
.contact {
  padding-block: clamp(64px, 10vh, 108px) clamp(56px, 8vh, 92px);
  margin-top: 24px;
}
.contact-inner {
  display: grid;
  gap: 22px;
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
