import { computed, type ComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * vue-i18n's `tm()` returns the raw message tree for a key; each leaf still has to go through `rt()`
 * to become a plain string. This resolves a list of objects (or strings) once, reactively per locale,
 * so pages do not repeat the same mapping.
 */
export function useMessageList<T>(key: string, resolve: (raw: any, rt: (m: any) => string, index: number) => T): ComputedRef<T[]> {
  const { tm, rt } = useI18n()
  return computed(() => {
    const raw = tm(key)
    if (!Array.isArray(raw)) return []
    return raw.map((item, i) => resolve(item, (m) => rt(m), i))
  })
}

/** Resolve every string-valued field of an object, and every string inside array fields. */
export function resolveFields<T extends Record<string, unknown>>(raw: Record<string, unknown>, rt: (m: any) => string): T {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(raw)) {
    out[k] = Array.isArray(v) ? v.map((x) => rt(x)) : rt(v)
  }
  return out as T
}
