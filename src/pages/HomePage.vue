<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ColorBlocks from '@/components/ColorBlocks.vue'
import SectionHead from '@/components/SectionHead.vue'
import CopyEmail from '@/components/CopyEmail.vue'
import { usePageHead } from '@/composables/usePageHead'
import { useMessageList, resolveFields } from '@/composables/useMessages'
import { localePath } from '@/router'
import { site } from '@/site'
import type { Locale } from '@/i18n'

const { t, locale } = useI18n()
usePageHead('home')

type Stat = { n: string; label: string }
type Case = { id: string; tags: string[]; title: string; desc: string }
type Item = { title: string; desc: string }
type Side = { name: string; desc: string }
type Stop = { year: string; org: string; role: string }

const stats = useMessageList<Stat>('hero.stats', resolveFields)
const metaLine = useMessageList<string>('hero.meta', (m, rt) => rt(m))
const cases = useMessageList<Case>('work.items', resolveFields)
const how = useMessageList<Item>('how.items', resolveFields)
const side = useMessageList<Side & { url: string }>('side.items', (raw, rt, i) => ({ ...resolveFields<Side>(raw, rt), url: site.sideProjects[i] }))
const stops = useMessageList<Stop>('timeline.items', resolveFields)

const about = computed(() => localePath(locale.value as Locale, 'about'))
const cv = computed(() => site.cvPdf[locale.value] || (locale.value === 'zh-Hant' ? site.resumeZh : site.resumeEn))
const accent = ['blue', 'red', 'gold']
</script>

<template>
  <!-- 1. Hero -->
  <section class="hero">
    <ColorBlocks variant="hero" />
    <div class="container hero-inner">
      <p class="eyebrow">{{ t('hero.eyebrow') }}</p>
      <h1 class="name">
        {{ t('hero.name') }}
        <small>{{ t('hero.alt') }}</small>
      </h1>
      <p class="line">{{ t('hero.line') }}</p>

      <ul class="stats">
        <li v-for="(s, i) in stats" :key="i" :class="`stat stat--${accent[i]}`">
          <strong>{{ s.n }}</strong>
          <span>{{ s.label }}</span>
        </li>
      </ul>

      <div class="cta">
        <a href="#work" class="btn btn--primary">{{ t('hero.cta.work') }}</a>
        <a :href="cv" class="btn" target="_blank" rel="noopener">{{ t('hero.cta.cv') }}</a>
      </div>

      <p class="meta">
        <span v-for="(m, i) in metaLine" :key="i">{{ m }}</span>
      </p>
    </div>
  </section>

  <!-- 2. Selected work -->
  <section id="work" class="work">
    <ColorBlocks variant="work" />
    <div class="container">
      <SectionHead :eyebrow="t('work.eyebrow')" :title="t('work.title')" />
      <ul class="cases">
        <li v-for="(c, i) in cases" :key="c.id" :class="`case case--${accent[i]}`">
          <RouterLink :to="`${about}#${site.caseAnchor[c.id]}`" class="case-link">
            <figure class="shot">
              <img v-if="site.caseImages[c.id]" :src="site.caseImages[c.id]" :alt="c.title" loading="lazy" width="1600" height="1000" />
              <span v-else class="shot-placeholder" aria-hidden="true"></span>
            </figure>
            <ul class="tags">
              <li v-for="tag in c.tags" :key="tag">{{ tag }}</li>
            </ul>
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
            <span class="more">{{ t('work.more') }} →</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <!-- 3. How I work -->
  <section class="how">
    <div class="container">
      <SectionHead :eyebrow="t('how.eyebrow')" :title="t('how.title')" />
      <ol class="how-grid">
        <li v-for="(h, i) in how" :key="i">
          <em>0{{ i + 1 }}</em>
          <h3>{{ h.title }}</h3>
          <p>{{ h.desc }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- 4. Side projects -->
  <section class="side">
    <div class="container">
      <SectionHead :eyebrow="t('side.eyebrow')" :title="t('side.title')" />
      <ul class="side-grid">
        <li v-for="s in side" :key="s.url">
          <a :href="s.url" target="_blank" rel="noopener">
            <h3>{{ s.name }}</h3>
            <p>{{ s.desc }}</p>
            <span class="url">{{ s.url.replace('https://', '') }}</span>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <!-- 5. Path -->
  <section class="path">
    <div class="container">
      <SectionHead :eyebrow="t('timeline.eyebrow')" :title="t('timeline.title')" />
      <ol class="stops">
        <li v-for="(s, i) in stops" :key="s.year" :class="{ now: i === stops.length - 1 }">
          <span class="year">{{ s.year }}</span>
          <strong>{{ s.org }}</strong>
          <span class="role">{{ s.role }}</span>
        </li>
      </ol>
      <RouterLink :to="about" class="more-link">{{ t('timeline.more') }} →</RouterLink>
    </div>
  </section>

  <!-- 6. Contact -->
  <section id="contact" class="contact">
    <ColorBlocks variant="contact" />
    <div class="container contact-inner">
      <SectionHead :eyebrow="t('contact.eyebrow')" :title="t('contact.title')" />
      <p class="lead">{{ t('contact.lead') }}</p>
      <CopyEmail :email="site.email" />
      <ul class="links">
        <li><a :href="site.linkedin" target="_blank" rel="noopener">LinkedIn <span>{{ site.linkedinLabel }}</span></a></li>
        <li><a :href="site.github" target="_blank" rel="noopener">GitHub <span>{{ site.githubLabel }}</span></a></li>
        <li><a :href="cv" target="_blank" rel="noopener">{{ t('contact.cv') }}</a></li>
      </ul>
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

/* Hero */
.hero {
  padding-block: clamp(56px, 12vh, 128px) clamp(48px, 8vh, 88px);
}
.hero-inner {
  display: grid;
  gap: 26px;
  max-width: var(--content);
}
.name {
  font-size: clamp(2.8rem, 1.6rem + 4.5vw, 4.75rem);
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-weight: 500;
}
.name small {
  display: block;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.3em;
  letter-spacing: 0.16em;
  color: var(--quiet);
  margin-top: 16px;
}
.line {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 0.9rem + 1.1vw, 1.55rem);
  line-height: 1.6;
  max-width: 32ch;
}
.stats {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px 32px;
  max-width: 720px;
  margin-top: 10px;
}
.stat {
  border-top: 3px solid var(--blue);
  padding-top: 12px;
  display: grid;
  gap: 4px;
}
.stat--red {
  border-color: var(--red);
}
.stat--gold {
  border-color: var(--gold);
}
.stat strong {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 1.3rem + 1.6vw, 2.4rem);
  font-weight: 600;
  line-height: 1.1;
  font-variant-numeric: lining-nums tabular-nums;
}
.stat span {
  font-size: 0.9375rem;
  color: var(--quiet);
  line-height: 1.6;
}
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}
.btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 22px;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-size: 0.9375rem;
  letter-spacing: 0.06em;
  transition:
    background 0.2s,
    border-color 0.2s,
    translate 0.3s var(--ease);
  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0s;
  }
}
.btn:hover {
  translate: 0 -2px;
  border-color: var(--blue);
}
.btn--primary {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}
.btn--primary:hover {
  border-color: var(--ink);
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  font-size: 0.9375rem;
  color: var(--quiet);
  letter-spacing: 0.04em;
}
.meta span + span::before {
  content: '·';
  margin-right: 12px;
  color: var(--gold-ink);
}

/* Shared section rhythm */
.work,
.how,
.side,
.path {
  padding-block: clamp(56px, 9vh, 104px);
}
.how,
.side,
.path {
  border-top: 1px solid var(--line);
}

/* Cases */
.cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px 28px;
}
.case-link {
  display: grid;
  gap: 12px;
  height: 100%;
}
.shot {
  margin: 0 0 6px;
  border-radius: var(--radius-card);
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--blue-tint);
  transition: translate 0.4s var(--ease);
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
.case--red .shot {
  background: var(--red-tint);
}
.case--gold .shot {
  background: var(--gold-tint);
}
.case-link:hover .shot {
  translate: 0 -4px;
}
.shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.shot-placeholder {
  display: block;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--blue) 28%, transparent) 0 18%, transparent 19%),
    radial-gradient(circle at 30% 75%, color-mix(in srgb, var(--gold) 30%, transparent) 0 14%, transparent 15%);
}
.case--red .shot-placeholder {
  background:
    radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--red) 26%, transparent) 0 16%, transparent 17%),
    radial-gradient(circle at 72% 70%, color-mix(in srgb, var(--blue) 24%, transparent) 0 20%, transparent 21%);
}
.case--gold .shot-placeholder {
  background:
    radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--gold) 34%, transparent) 0 22%, transparent 23%),
    radial-gradient(circle at 22% 70%, color-mix(in srgb, var(--red) 22%, transparent) 0 12%, transparent 13%);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tags li {
  font-size: 0.8125rem;
  letter-spacing: 0.06em;
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--blue-tint);
  color: var(--blue-ink);
}
.case--red .tags li {
  background: var(--red-tint);
  color: var(--red-ink);
}
.case--gold .tags li {
  background: var(--gold-tint);
  color: var(--gold-ink);
}
.cases h3 {
  font-size: 1.2rem;
  line-height: 1.45;
}
.cases p {
  font-size: 0.9375rem;
  color: var(--quiet);
  line-height: 1.75;
}
.more {
  font-size: 0.9375rem;
  letter-spacing: 0.06em;
  color: var(--red-ink);
  margin-top: auto;
}

/* How I work */
.how-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 28px 32px;
}
.how-grid li {
  display: grid;
  gap: 8px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}
.how-grid em {
  font-style: normal;
  font-family: var(--font-display);
  color: var(--red-ink);
  letter-spacing: 0.1em;
  font-size: 0.9375rem;
}
.how-grid h3 {
  font-size: 1.1rem;
}
.how-grid p {
  font-size: 0.9375rem;
  color: var(--quiet);
  line-height: 1.7;
}

/* Side projects */
.side-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
.side-grid a {
  display: grid;
  gap: 6px;
  padding: 22px 24px;
  border-radius: var(--radius-card);
  background: var(--paper-2);
  border: 1px solid var(--line);
  height: 100%;
  transition:
    translate 0.3s var(--ease),
    border-color 0.2s;
  @media (prefers-reduced-motion: reduce) {
    transition: border-color 0.2s;
  }
}
.side-grid a:hover {
  translate: 0 -3px;
  border-color: var(--gold);
}
.side-grid h3 {
  font-size: 1.1rem;
}
.side-grid p {
  font-size: 0.9375rem;
  color: var(--quiet);
  line-height: 1.7;
}
.side-grid .url {
  font-size: 0.8125rem;
  letter-spacing: 0.04em;
  color: var(--blue-ink);
  margin-top: 6px;
  overflow-wrap: anywhere;
}

/* Path */
.stops {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.stops li {
  position: relative;
  padding: 26px 20px 0 0;
  border-top: 2px solid var(--line);
  display: grid;
  gap: 2px;
}
.stops li::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--paper);
  border: 2px solid var(--blue);
}
.stops li.now::before {
  background: var(--red);
  border-color: var(--red);
}
.year {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.1em;
  color: var(--quiet);
}
.stops strong {
  font-weight: 500;
  font-size: 1.05rem;
}
.role {
  font-size: 0.9375rem;
  color: var(--quiet);
}
.more-link {
  display: inline-block;
  margin-top: 28px;
  font-size: 0.9375rem;
  letter-spacing: 0.06em;
  color: var(--red-ink);
}

/* Contact */
.contact {
  padding-block: clamp(64px, 10vh, 112px) clamp(56px, 8vh, 96px);
  margin-top: 24px;
}
.contact-inner {
  display: grid;
  gap: 22px;
}
.lead {
  max-width: 48ch;
  color: var(--quiet);
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 28px;
  font-size: 0.9375rem;
  margin-top: 6px;
}
.links a {
  border-bottom: 1px solid var(--line);
  padding-bottom: 2px;
}
.links a:hover {
  border-color: var(--blue);
}
.links span {
  color: var(--quiet);
  margin-left: 6px;
}
</style>
