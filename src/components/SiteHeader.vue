<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { LOCALES, LOCALE_LABEL, type Locale } from '@/i18n'
import { localePath } from '@/router'
import { useTheme } from '@/composables/useTheme'
import { site, resumeUrl } from '@/site'
import { profile } from '@/profile'

const { t, locale } = useI18n()
const { theme, toggle } = useTheme()
const route = useRoute()
const router = useRouter()

const current = computed(() => locale.value as Locale)
const page = computed(() => (route.meta.page as 'home' | 'about') ?? 'home')
const home = computed(() => localePath(current.value, 'home'))
const about = computed(() => localePath(current.value, 'about'))
const cv = computed(() => resumeUrl(locale.value))

function onLang(e: Event) {
  router.push(localePath((e.target as HTMLSelectElement).value as Locale, page.value))
}
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <!-- Literary Brand Seal & Name -->
      <RouterLink :to="home" class="brand">
        <img class="brand-vermilion" src="/favicon.ico" alt="" aria-hidden="true" width="24" height="24" />
        <span class="brand-name">{{ profile.name.en }}</span>
      </RouterLink>

      <nav class="nav" :aria-label="t('nav.home')">
        <RouterLink :to="home" :class="{ on: page === 'home' }">{{ t('nav.home') }}</RouterLink>
        <RouterLink :to="`${home === '/' ? '' : home}/#work`">{{ t('nav.work') }}</RouterLink>
        <RouterLink :to="about" :class="{ on: page === 'about' }">{{ t('nav.about') }}</RouterLink>
        <RouterLink :to="`${home === '/' ? '' : home}/#contact`" class="talk">{{ t('nav.talk') }}</RouterLink>
      </nav>

      <div class="header-actions">
        <!-- Quiet Resume Link for HR -->
        <a :href="cv" target="_blank" rel="noopener" class="header-resume-link">
          <span>{{ t('hero.cta.cv') }}</span>
          <span class="arrow" aria-hidden="true">↗</span>
        </a>

        <div class="lang">
          <select :value="current" :aria-label="t('nav.lang')" @change="onLang">
            <option v-for="l in LOCALES" :key="l" :value="l" :lang="l">{{ LOCALE_LABEL[l] }}</option>
          </select>
        </div>

        <button
          type="button"
          class="theme"
          :aria-label="theme === 'dark' ? t('nav.toLight') : t('nav.toDark')"
          :title="theme === 'dark' ? t('nav.toLight') : t('nav.toDark')"
          @click="toggle"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--paper) 92%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line-subtle);
  transition: border-color 0.2s, background-color 0.2s;
}

.bar {
  display: flex;
  align-items: center;
  gap: 28px;
  padding-block: 16px;
  font-size: 0.84rem;
  letter-spacing: 0.08em;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-right: auto;
}
.brand-vermilion {
  display: block;
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}
.brand-name {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--ink);
}

.nav {
  display: flex;
  align-items: center;
  gap: 22px;
}
.nav a {
  color: var(--quiet);
  padding: 4px 0;
  border-bottom: 1px solid transparent;
  transition: color 0.2s var(--ease), border-color 0.2s;
}
.nav a:hover,
.nav a.on {
  color: var(--ink);
  border-bottom-color: var(--ink);
}
.nav .talk {
  color: var(--red-ink);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}
.header-resume-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8125rem;
  color: var(--quiet);
  border: 1px solid var(--line);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  transition: color 0.2s, border-color 0.2s;
}
.header-resume-link:hover {
  color: var(--ink);
  border-color: var(--quiet);
}
.header-resume-link .arrow {
  font-family: var(--font-serif);
  font-size: 0.85rem;
}

.lang {
  padding-left: 12px;
  border-left: 1px solid var(--line-subtle);
}
.lang select {
  font: inherit;
  letter-spacing: 0.06em;
  color: var(--ink);
  background: transparent;
  border: 1px solid var(--line-subtle);
  border-radius: 6px;
  padding: 3px 8px;
  cursor: pointer;
}
.theme {
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 50%;
  color: var(--quiet);
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
}
.theme:hover {
  color: var(--ink);
  background: var(--paper-3);
}
.theme svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 760px) {
  .header-resume-link {
    display: none;
  }
  .bar {
    flex-wrap: wrap;
    gap: 10px 16px;
    padding-block: 12px;
  }
  .brand {
    flex: 1 1 auto;
  }
  .nav {
    order: 3;
    flex-basis: 100%;
    gap: 16px;
    overflow-x: auto;
    padding-bottom: 2px;
  }
  .lang {
    padding-left: 8px;
  }
}
</style>
