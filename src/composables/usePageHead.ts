import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { LOCALES, type Locale } from '@/i18n'
import { localePath } from '@/router'
import { site } from '@/site'

const HTML_LANG: Record<Locale, string> = { 'zh-Hant': 'zh-Hant', en: 'en', ja: 'ja' }
const OG_LOCALE: Record<Locale, string> = { 'zh-Hant': 'zh_TW', en: 'en_US', ja: 'ja_JP' }

/** Title, description, canonical and hreflang alternates for the current page in the current locale. */
export function usePageHead(page: 'home' | 'about') {
  const { t, locale } = useI18n()
  const current = computed(() => locale.value as Locale)
  const title = computed(() => (page === 'about' ? `${t('about.eyebrow')} · ${t('meta.title')}` : t('meta.title')))
  const url = computed(() => site.url + localePath(current.value, page))

  useHead({
    htmlAttrs: { lang: computed(() => HTML_LANG[current.value]) },
    title,
    meta: [
      { name: 'description', content: computed(() => t('meta.description')) },
      { property: 'og:title', content: title },
      { property: 'og:description', content: computed(() => t('meta.description')) },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: computed(() => OG_LOCALE[current.value]) },
      { property: 'og:image', content: `${site.url}/og.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'canonical', href: url },
      ...LOCALES.map((l) => ({ rel: 'alternate', hreflang: HTML_LANG[l], href: site.url + localePath(l, page) })),
      { rel: 'alternate', hreflang: 'x-default', href: site.url + localePath('en', page) },
    ],
  })
}
