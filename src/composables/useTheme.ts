import { onMounted, ref } from 'vue'

export type Theme = 'light' | 'dark'

/** Same key as the inline script in index.html, which applies the stored choice before first paint. */
const STORAGE_KEY = 'stone-theme'
const THEME_COLOR: Record<Theme, string> = { light: '#F8F5F0', dark: '#1F2124' }

/**
 * The visitor's theme. Until they press the toggle the site follows the system scheme;
 * after that the choice is pinned on <html data-theme> and remembered.
 */
export function useTheme() {
  // SSR has no idea of the visitor's scheme; the real value is read on mount.
  const theme = ref<Theme>('light')

  onMounted(() => {
    const pinned = document.documentElement.dataset.theme
    theme.value =
      pinned === 'light' || pinned === 'dark' ? pinned : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  function toggle() {
    const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
    theme.value = next
    document.documentElement.dataset.theme = next
    // Both theme-color metas carry a media query; pin them so the browser chrome matches too.
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => (m.content = THEME_COLOR[next]))
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode or blocked storage: ignore */
    }
  }

  return { theme, toggle }
}
