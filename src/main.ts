import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import { createAppI18n, detectLocale, LOCALE_PREFIX, type Locale } from './i18n'
import './styles/tokens.css'
import './styles/base.css'

const STORAGE_KEY = 'stone-lang'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, _from, saved) {
      if (saved) return saved
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      return { top: 0 }
    },
  },
  ({ app, router, isClient, initialState }) => {
    const i18n = createAppI18n()
    app.use(i18n)

    router.beforeEach((to) => {
      const locale = (to.meta.locale as Locale) ?? 'zh-Hant'
      i18n.global.locale.value = locale
      if (isClient) {
        document.documentElement.lang = locale
        try {
          localStorage.setItem(STORAGE_KEY, locale)
        } catch {
          /* private mode or blocked storage: ignore */
        }
      }
    })

    // First visit at the root with no remembered choice: send the visitor to their browser's language.
    if (isClient && !initialState.redirected) {
      router.isReady().then(() => {
        const route = router.currentRoute.value
        if (route.path !== '/') return
        let remembered: string | null = null
        try {
          remembered = localStorage.getItem(STORAGE_KEY)
        } catch {
          /* ignore */
        }
        if (remembered) return
        const wanted = detectLocale()
        const prefix = LOCALE_PREFIX[wanted]
        if (prefix) router.replace(prefix)
      })
    }
  },
)
