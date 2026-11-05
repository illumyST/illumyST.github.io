import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Locale, Term } from '@content/profile.ts'
import { profile } from '@/profile'
import { tr as translate } from '@content/format.ts'

/** 履歷資料與目前語系的翻譯函式。 */
export function useProfile() {
  const { locale } = useI18n()
  const l = computed(() => locale.value as Locale)
  const tr = (x: Term) => translate(x, l.value)
  return { profile, l, tr }
}
