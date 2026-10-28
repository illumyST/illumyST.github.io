<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ email: string }>()
const { t } = useI18n()
const done = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(props.email)
    done.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (done.value = false), 1600)
  } catch {
    // Clipboard blocked: select the text so the visitor can copy it by hand.
    const el = document.getElementById('contact-email')
    if (!el) return
    const range = document.createRange()
    range.selectNodeContents(el)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
  }
}
</script>

<template>
  <span class="copy-email">
    <a id="contact-email" class="addr" :href="`mailto:${email}`">{{ email }}</a>
    <button type="button" class="btn" :aria-live="'polite'" @click="copy">
      {{ done ? t('contact.copied') : t('contact.copy') }}
    </button>
  </span>
</template>

<style scoped>
.copy-email {
  display: inline-flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.addr {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.6vw, 1.75rem);
  color: var(--ink);
  border-bottom: 1px solid var(--line);
  overflow-wrap: anywhere;
}
.btn {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--quiet);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 3px 12px;
  transition:
    color 0.2s,
    border-color 0.2s;
}
.btn:hover {
  color: var(--red-ink);
  border-color: var(--red);
}
</style>
