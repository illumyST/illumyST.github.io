<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { site, resumeUrl } from '@/site'
import { profile } from '@/profile'
import { track } from '@/analytics'

const { t, locale } = useI18n()
const isOpen = ref(false)
const copied = ref(false)
const trigger = ref<HTMLButtonElement>()
let copyTimer: ReturnType<typeof setTimeout> | undefined

const cv = computed(() => resumeUrl(locale.value))

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(site.email)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    window.location.href = `mailto:${site.email}`
  }
}

onUnmounted(() => clearTimeout(copyTimer))

function close() {
  isOpen.value = false
  trigger.value?.focus()
}

function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) track('dock_open', { location: 'dock' })
}
</script>

<template>
  <aside class="recruiter-bookmark" :aria-label="t('dock.title')" @keydown.esc.stop="close">
    <!-- Desktop Bookmark Trigger (和紙書籤風格) -->
    <button
      type="button"
      ref="trigger"
      class="bookmark-tab"
      aria-controls="recruiter-panel"
      :class="{ 'is-open': isOpen }"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? t('dock.toggleClose') : t('dock.toggleOpen')"
      @click="toggle"
    >
      <span class="bookmark-cinnabar" aria-hidden="true"></span>
      <span class="bookmark-text">{{ t('dock.tab') }}</span>
      <span class="bookmark-arrow" aria-hidden="true">{{ isOpen ? '›' : '‹' }}</span>
    </button>

    <!-- Expanded Bookmark Panel (文青藏書票 / 索引卡風格) -->
    <transition name="bookmark-slide">
      <div v-show="isOpen" id="recruiter-panel" class="bookmark-card" :inert="!isOpen" data-track-location="dock">
        <div class="card-head">
          <div class="head-title">
            <span class="head-seal">印</span>
            <span class="head-name">{{ profile.name.en }}</span>
          </div>
          <button type="button" class="close-btn" :aria-label="t('dock.toggleClose')" @click="close">×</button>
        </div>

        <p class="status-note">
          <span class="status-vermilion">・</span>
          <span>{{ t('dock.status') }}</span>
        </p>

        <div class="divider"></div>

        <div class="section-block">
          <span class="section-label">{{ t('dock.resume') }}</span>
          <div class="link-list">
            <a :href="site.resumeZh" target="_blank" rel="noopener" class="paper-link" data-track="resume_click" data-track-target="zh">
              <span>{{ t('dock.resumeZh') }}</span>
              <span class="ext-arrow">↗</span>
            </a>
            <a :href="site.resumeEn" target="_blank" rel="noopener" class="paper-link" data-track="resume_click" data-track-target="en">
              <span>{{ t('dock.resumeEn') }}</span>
              <span class="ext-arrow">↗</span>
            </a>
            <a v-if="site.cvPdf[locale]" :href="cv" target="_blank" rel="noopener" class="paper-link paper-link--quiet" data-track="resume_click" data-track-target="cv">
              <span>{{ t('hero.cta.cv') }}</span>
              <span class="ext-arrow">↗</span>
            </a>
          </div>
        </div>

        <div class="divider"></div>

        <div class="section-block">
          <span class="section-label">{{ t('dock.contact') }}</span>
          <button type="button" class="copy-box" data-track="email_copy" @click="copyEmail">
            <span class="copy-email">{{ site.email }}</span>
            <span class="copy-tag" :class="{ done: copied }">{{ copied ? t('dock.emailCopied') : t('dock.copyEmail') }}</span>
          </button>
        </div>

        <div class="footer-links">
          <a :href="site.linkedin" target="_blank" rel="noopener" data-track="social_click" data-track-target="linkedin">LinkedIn ↗</a>
          <span class="sep">·</span>
          <a :href="site.github" target="_blank" rel="noopener" data-track="social_click" data-track-target="github">GitHub ↗</a>
        </div>
      </div>
    </transition>

    <span class="visually-hidden" role="status">{{ copied ? t('dock.emailCopied') : '' }}</span>

    <!-- Mobile Bookmark Pill (手機端極簡膠囊) -->
    <nav class="mobile-pill-bar" :aria-label="t('dock.title')" data-track-location="dock_mobile">
      <a :href="cv" target="_blank" rel="noopener" class="mobile-link" data-track="resume_click" data-track-target="cv">
        <span>{{ t('hero.cta.cv') }} ↗</span>
      </a>
      <span class="mobile-sep">|</span>
      <button type="button" class="mobile-link" data-track="email_copy" @click="copyEmail">
        <span>{{ copied ? t('dock.emailCopied') : t('dock.copyEmail') }}</span>
      </button>
      <span class="mobile-sep">|</span>
      <a :href="site.linkedin" target="_blank" rel="noopener" class="mobile-link" data-track="social_click" data-track-target="linkedin">
        <span>LinkedIn</span>
      </a>
      <span class="mobile-sep">|</span>
      <a href="#contact" class="mobile-link mobile-link--accent" data-track="cta_click" data-track-target="contact">
        <span>{{ t('dock.contact') }}</span>
      </a>
    </nav>
  </aside>
</template>

<style scoped>
/* Recruiter Bookmark: Japanese Literary Washi Paper Bookmark */
.recruiter-bookmark {
  position: fixed;
  right: 0;
  top: 48%;
  transform: translateY(-50%);
  z-index: 90;
  display: flex;
  align-items: center;
}

/* Washi Paper Bookmark Tab */
.bookmark-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 9px 14px;
  background: var(--paper-2);
  border: 1px solid var(--line);
  border-right: none;
  border-radius: 12px 0 0 12px;
  box-shadow: var(--shadow-dock);
  color: var(--ink);
  cursor: pointer;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: 0.18em;
  font-family: var(--font-display);
  font-size: 0.8125rem;
  font-weight: 500;
  transition:
    transform 0.3s var(--ease),
    background 0.2s,
    border-color 0.2s;
}
.bookmark-tab:hover {
  transform: translateX(-4px);
  background: var(--paper);
  border-color: var(--quiet);
}
.bookmark-tab.is-open {
  background: var(--paper-3);
  border-color: var(--line);
}

/* Cinnabar Vermilion Stamp Dot (硃砂印 / 落款點) */
.bookmark-cinnabar {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--red);
  opacity: 0.9;
}
.bookmark-arrow {
  writing-mode: horizontal-tb;
  font-family: var(--font-serif);
  font-size: 1rem;
  color: var(--quiet);
  line-height: 1;
}

/* Literary Index Card Panel */
.bookmark-card {
  position: absolute;
  right: calc(100% + 14px);
  width: 320px;
  max-height: calc(90dvh - 24px);
  overflow-y: auto;
  background: color-mix(in srgb, var(--paper-2) 97%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 22px 20px;
  box-shadow: var(--shadow-dock);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
.head-seal {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  background: var(--red-tint);
  border: 1px solid var(--red);
  color: var(--red-ink);
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 1;
}
.head-name {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: var(--ink);
  font-weight: 500;
}
.close-btn {
  font-size: 1.25rem;
  line-height: 1;
  color: var(--quiet);
  padding: 2px 6px;
  transition: color 0.2s;
}
.close-btn:hover {
  color: var(--ink);
}

.status-note {
  font-size: 0.8125rem;
  color: var(--quiet);
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.02em;
}
.status-vermilion {
  color: var(--red);
  font-weight: bold;
}

.divider {
  height: 1px;
  background: var(--line-subtle);
  width: 100%;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.section-label {
  font-family: var(--font-serif);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--quiet);
}
.link-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.paper-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid var(--line-subtle);
  background: var(--paper);
  font-size: 0.85rem;
  color: var(--ink);
  transition: border-color 0.2s, background 0.2s;
}
.paper-link:hover {
  border-color: var(--quiet);
  background: var(--paper-2);
}
.paper-link--quiet {
  color: var(--quiet);
}
.ext-arrow {
  color: var(--quiet);
  font-family: var(--font-serif);
  font-size: 0.85rem;
}

.copy-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px dashed var(--line);
  background: var(--paper);
  cursor: pointer;
  transition: border-color 0.2s;
}
.copy-box:hover {
  border-color: var(--quiet);
}
.copy-email {
  font-size: 0.78rem;
  color: var(--ink);
  font-family: monospace;
}
.copy-tag {
  font-size: 0.72rem;
  color: var(--quiet);
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--paper-2);
}
.copy-tag.done {
  color: var(--green-ink);
  background: var(--green-tint);
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 0.8125rem;
  color: var(--quiet);
  padding-top: 4px;
}
.footer-links a:hover {
  color: var(--ink);
  text-decoration: underline;
}
.sep {
  color: var(--line);
}

/* Animations */
.bookmark-slide-enter-active,
.bookmark-slide-leave-active {
  transition: opacity 0.25s var(--ease), transform 0.25s var(--ease);
}
.bookmark-slide-enter-from,
.bookmark-slide-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

/* Mobile Pill Bar */
.mobile-pill-bar {
  display: none;
}

@media (max-width: 860px) {
  .recruiter-bookmark {
    top: auto;
    bottom: 0;
    right: 0;
    left: 0;
    transform: none;
    justify-content: center;
    pointer-events: none;
  }
  .bookmark-tab,
  .bookmark-card {
    display: none;
  }
  .mobile-pill-bar {
    pointer-events: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px 12px;
    flex-wrap: wrap;
    width: min(calc(100% - 32px), 380px);
    margin: 0 auto max(12px, env(safe-area-inset-bottom));
    padding: 10px 18px;
    background: color-mix(in srgb, var(--paper-2) 94%, transparent);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid var(--line);
    border-radius: var(--radius-pill);
    box-shadow: var(--shadow-dock);
    font-size: 0.8125rem;
    color: var(--ink);
  }
  .mobile-link {
    color: var(--ink);
    letter-spacing: 0.04em;
  }
  .mobile-link--accent {
    color: var(--red-ink);
  }
  .mobile-sep {
    color: var(--line);
    font-size: 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bookmark-tab, .bookmark-slide-enter-active, .bookmark-slide-leave-active { transition: none; }
}
</style>
