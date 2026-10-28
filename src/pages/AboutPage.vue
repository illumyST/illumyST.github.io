<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ColorBlocks from '@/components/ColorBlocks.vue'
import SectionHead from '@/components/SectionHead.vue'
import CopyEmail from '@/components/CopyEmail.vue'
import { usePageHead } from '@/composables/usePageHead'
import { useMessageList, resolveFields } from '@/composables/useMessages'
import { site } from '@/site'

const { t, locale } = useI18n()
usePageHead('about')

type Job = { id: string; time: string; title: string; org: string; note: string; place: string; items: string[]; tags: string[] }
type Group = { name: string; items: string[] }
type Lang = { name: string; level: string }

const story = useMessageList<string>('about.story', (m, rt) => rt(m))
const jobs = useMessageList<Job>('about.exp.jobs', resolveFields)
const groups = useMessageList<Group>('about.skills.groups', resolveFields)
const langs = useMessageList<Lang>('about.langs.items', resolveFields)
const cv = computed(() => site.cvPdf[locale.value] || (locale.value === 'zh-Hant' ? site.resumeZh : site.resumeEn))
</script>

<template>
  <!-- Story -->
  <section class="story">
    <ColorBlocks variant="about" />
    <div class="container story-inner">
      <SectionHead :eyebrow="t('about.eyebrow')" :title="t('about.title')" />
      <div class="prose">
        <p v-for="(p, i) in story" :key="i">{{ p }}</p>
      </div>
    </div>
  </section>

  <!-- Experience -->
  <section class="exp">
    <div class="container">
      <SectionHead :eyebrow="t('about.exp.eyebrow')" :title="t('about.exp.title')" />
      <ol class="jobs">
        <li v-for="(j, i) in jobs" :key="j.id" :id="j.id" class="job" :class="{ current: i === 0 }">
          <div class="when">
            <time>{{ j.time }}</time>
            <span class="place">{{ j.place }}</span>
          </div>
          <div class="body">
            <h3>{{ j.title }}</h3>
            <p class="org">{{ j.org }}</p>
            <p v-if="j.note" class="note">{{ j.note }}</p>
            <ul class="items">
              <li v-for="(x, k) in j.items" :key="k">{{ x }}</li>
            </ul>
            <ul class="tags">
              <li v-for="tag in j.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <!-- Skills -->
  <section class="skills">
    <div class="container">
      <SectionHead :eyebrow="t('about.skills.eyebrow')" :title="t('about.skills.title')" />
      <div class="groups">
        <div v-for="g in groups" :key="g.name" class="group">
          <h3>{{ g.name }}</h3>
          <ul class="chips">
            <li v-for="x in g.items" :key="x">{{ x }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Education & languages -->
  <section class="langs">
    <div class="container">
      <SectionHead :eyebrow="t('about.langs.eyebrow')" :title="t('about.langs.title')" />
      <ul class="lang-grid">
        <li v-for="l in langs" :key="l.name">
          <strong>{{ l.name }}</strong>
          <span>{{ l.level }}</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- Links -->
  <section id="contact" class="contact">
    <ColorBlocks variant="contact" />
    <div class="container contact-inner">
      <SectionHead :eyebrow="t('about.links.eyebrow')" :title="t('about.links.title')" />
      <CopyEmail :email="site.email" />
      <ul class="links">
        <li><a :href="site.linkedin" target="_blank" rel="noopener">LinkedIn <span>{{ site.linkedinLabel }}</span></a></li>
        <li><a :href="site.github" target="_blank" rel="noopener">GitHub <span>{{ site.githubLabel }}</span></a></li>
        <li><a :href="site.resumeEn" target="_blank" rel="noopener">{{ t('contact.resumeEn') }}</a></li>
        <li><a :href="site.resumeZh" target="_blank" rel="noopener">{{ t('contact.resumeZh') }}</a></li>
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
.story {
  padding-block: clamp(56px, 10vh, 112px) clamp(48px, 8vh, 88px);
}
.prose {
  display: grid;
  gap: 16px;
  max-width: var(--measure);
}
.prose p {
  line-height: 1.9;
}
.exp,
.skills,
.langs {
  padding-block: clamp(56px, 9vh, 104px);
  border-top: 1px solid var(--line);
}

/* Jobs */
.jobs {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 40px;
}
.job {
  display: grid;
  grid-template-columns: 11em 1fr;
  gap: 8px 36px;
  scroll-margin-top: 90px;
}
.when {
  display: grid;
  gap: 2px;
  align-content: start;
  font-family: var(--font-display);
  letter-spacing: 0.06em;
  color: var(--quiet);
  font-variant-numeric: tabular-nums;
  padding-top: 4px;
}
.place {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  letter-spacing: 0.04em;
}
.body {
  min-width: 0;
  display: grid;
  gap: 8px;
}
.body h3 {
  font-size: 1.3rem;
  font-weight: 600;
}
.org {
  color: var(--ink);
  font-size: 1rem;
}
.note {
  color: var(--quiet);
  font-size: 0.9375rem;
  margin-top: -6px;
}
.items {
  display: grid;
  gap: 8px;
  max-width: var(--measure);
  margin-top: 6px;
}
.items li {
  position: relative;
  padding-left: 18px;
  font-size: 0.9375rem;
  line-height: 1.75;
}
.items li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1.5px solid var(--blue);
}
.job.current .items li::before {
  background: var(--red);
  border-color: var(--red);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
.tags li {
  font-size: 0.8125rem;
  letter-spacing: 0.06em;
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--blue-tint);
  color: var(--blue-ink);
}
.job.current .tags li {
  background: var(--red-tint);
  color: var(--red-ink);
}

/* Skills */
.groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px 32px;
}
.group {
  display: grid;
  gap: 10px;
  align-content: start;
  border-left: 3px solid var(--gold);
  padding-left: 16px;
}
.group h3 {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--quiet);
  font-weight: 500;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chips li {
  font-size: 0.9375rem;
  padding: 3px 11px;
  border-radius: 999px;
  background: var(--paper-2);
  border: 1px solid var(--line);
}

/* Languages */
.lang-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px 32px;
}
.lang-grid li {
  display: grid;
  gap: 2px;
  border-top: 1px solid var(--line);
  padding-top: 12px;
}
.lang-grid strong {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
}
.lang-grid span {
  font-size: 0.9375rem;
  color: var(--quiet);
  line-height: 1.6;
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
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 28px;
  font-size: 0.9375rem;
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

@media (min-width: 641px) {
  .groups {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .job {
    grid-template-columns: 1fr;
    gap: 6px;
  }
  .when {
    grid-auto-flow: column;
    justify-content: start;
    gap: 14px;
  }
}
</style>
