import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ja from './locales/ja.json'
import zhHant from './locales/zh-Hant.json'

export const LOCALES = ['zh-Hant', 'en', 'ja'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'zh-Hant'

/** URL prefix for each locale. The default locale lives at the root. */
export const LOCALE_PREFIX: Record<Locale, string> = {
  'zh-Hant': '',
  en: '/en',
  ja: '/ja',
}

export const LOCALE_LABEL: Record<Locale, string> = {
  'zh-Hant': '中文',
  en: 'EN',
  ja: '日本語',
}

export const messages = { en, ja, 'zh-Hant': zhHant }

export function createAppI18n() {
  return createI18n({
    legacy: false,
    locale: DEFAULT_LOCALE,
    fallbackLocale: 'en',
    messages,
  })
}

/** Pick the locale a first-time visitor most likely wants, from the browser language. */
export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE
  const lang = (navigator.language || '').toLowerCase()
  if (lang.startsWith('zh')) return 'zh-Hant'
  if (lang.startsWith('ja')) return 'ja'
  return 'en'
}
