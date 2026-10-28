import type { RouteRecordRaw } from 'vue-router'
import { LOCALES, LOCALE_PREFIX, type Locale } from './i18n'

const HomePage = () => import('./pages/HomePage.vue')
const AboutPage = () => import('./pages/AboutPage.vue')

/** One route per page per locale: /, /about, /en, /en/about, /ja, /ja/about. */
export const routes: RouteRecordRaw[] = LOCALES.flatMap((locale) => {
  const prefix = LOCALE_PREFIX[locale]
  return [
    { path: prefix || '/', name: `home-${locale}`, component: HomePage, meta: { locale, page: 'home' } },
    { path: `${prefix}/about`, name: `about-${locale}`, component: AboutPage, meta: { locale, page: 'about' } },
  ]
})

export function localePath(locale: Locale, page: 'home' | 'about') {
  const prefix = LOCALE_PREFIX[locale]
  return page === 'home' ? prefix || '/' : `${prefix}/about`
}
