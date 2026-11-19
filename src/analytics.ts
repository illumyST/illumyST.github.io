import { site } from '@/site'

/**
 * GA4 流量與點擊追蹤。
 *
 * 只有在正式網域且 site.gaId 有值時才載入 Google 代碼並送出資料；
 * 本機開發只在 console 印出事件，方便確認標記是否正確。
 *
 * 頁面瀏覽交給 Google 代碼自動處理：載入時送一次，之後路徑改變時再送，
 * 只換錨點（/#work）不算。這裡不要手動送 page_view，否則會重複計算
 *（實測 send_page_view: false 對這個代碼無效）。
 *
 * 點擊事件用 HTML 屬性標記，不需要在各元件寫程式：
 *   data-track="事件名稱"            必填，例如 resume_click
 *   data-track-target="點了什麼"     選填，例如 zh、linkedin
 *   data-track-location="所在區塊"   選填，可寫在外層容器，往上找最近的一個
 */

type Params = Record<string, string | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

const PROD_HOSTS = ['stoneisme.com', 'www.stoneisme.com']

let enabled = false

function gtag(..._args: unknown[]) {
  // gtag.js 只認 arguments 物件，不能改成推入陣列。
  window.dataLayer!.push(arguments)
}

function send(name: string, params: Params) {
  if (enabled) gtag('event', name, params)
  else if (import.meta.env.DEV) console.debug('[analytics]', name, params)
}

/** 在瀏覽器端呼叫一次：載入 gtag 並掛上點擊監聽。 */
export function initAnalytics() {
  if (typeof window === 'undefined') return

  if (site.gaId && PROD_HOSTS.includes(window.location.hostname)) {
    enabled = true
    window.dataLayer = window.dataLayer || []
    // 與 GA 後台提供的安裝碼相同：不呼叫 config，代碼載入後會自行初始化。
    gtag('js', new Date())
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(site.gaId)}`
    document.head.appendChild(s)
  }

  document.addEventListener(
    'click',
    (e) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]')
      if (!el?.dataset.track) return
      track(el.dataset.track, {
        target: el.dataset.trackTarget,
        location: el.closest<HTMLElement>('[data-track-location]')?.dataset.trackLocation,
      })
    },
    { capture: true },
  )
}

/** 送出自訂事件。非點擊類的互動（例如下拉選單切換語系）直接呼叫這個函式。 */
export function track(name: string, detail: { target?: string; location?: string } = {}) {
  if (typeof window === 'undefined') return
  send(name, { click_target: detail.target, click_location: detail.location })
}
