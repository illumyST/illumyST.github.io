<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { LOCALES, LOCALE_LABEL, type Locale } from '@/i18n'
import { localePath } from '@/router'

const { t, locale } = useI18n()
const route = useRoute()

const current = computed(() => locale.value as Locale)
const page = computed(() => (route.meta.page as 'home' | 'about') ?? 'home')
const home = computed(() => localePath(current.value, 'home'))
const about = computed(() => localePath(current.value, 'about'))
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <RouterLink :to="home" class="brand">
        <span class="brand-line" aria-hidden="true"></span>
        <span>Stone Chen</span>
      </RouterLink>

      <nav class="nav" :aria-label="t('nav.home')">
        <RouterLink :to="home" :class="{ on: page === 'home' }">{{ t('nav.home') }}</RouterLink>
        <RouterLink :to="`${home === '/' ? '' : home}/#work`">{{ t('nav.work') }}</RouterLink>
        <RouterLink :to="about" :class="{ on: page === 'about' }">{{ t('nav.about') }}</RouterLink>
        <RouterLink :to="`${home === '/' ? '' : home}/#contact`" class="talk">{{ t('nav.talk') }}</RouterLink>
      </nav>

      <nav class="lang" :aria-label="t('nav.lang')">
        <RouterLink
          v-for="l in LOCALES"
          :key="l"
          :to="localePath(l, page)"
          :hreflang="l"
          :aria-current="l === current ? 'true' : undefined"
          >{{ LOCALE_LABEL[l] }}</RouterLink
        >
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--paper) 86%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  /* Scroll-state query: the bar gains a hairline only once the header is actually stuck. */
  container-type: scroll-state;
  container-name: site-header;
}
.bar {
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
@container site-header scroll-state(stuck: top) {
  .bar {
    border-bottom-color: var(--line);
  }
}
.bar {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-block: 18px;
  font-size: 0.8125rem;
  letter-spacing: 0.06em;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.04em;
  margin-right: auto;
}
.brand-line {
  width: 28px;
  height: 2px;
  background: var(--blue);
}
.nav {
  display: flex;
  gap: 22px;
}
.nav a {
  color: var(--quiet);
  padding-block: 4px;
  border-bottom: 1px solid transparent;
  transition: color 0.2s var(--ease);
}
.nav a:hover,
.nav a.on {
  color: var(--ink);
}
.nav .talk {
  color: var(--red-ink);
}
.lang {
  display: flex;
  gap: 2px;
  padding-left: 18px;
  border-left: 1px solid var(--line);
}
.lang a {
  color: var(--quiet);
  padding: 2px 7px;
  border-bottom: 1px solid transparent;
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
}
.lang a[aria-current='true'] {
  color: var(--red-ink);
  border-bottom-color: var(--red);
}

@media (max-width: 720px) {
  .bar {
    flex-wrap: wrap;
    gap: 10px 16px;
    padding-block: 14px;
  }
  .brand {
    flex: 1 1 auto;
  }
  .nav {
    order: 3;
    flex-basis: 100%;
    gap: 18px;
  }
  .lang {
    padding-left: 12px;
  }
}
</style>
