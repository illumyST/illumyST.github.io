<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container row">
      <span>{{ t('footer.text') }}</span>
      <span>{{ year }}</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--line);
  padding-block: 22px max(40px, env(safe-area-inset-bottom, 0px));
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--quiet);
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
</style>
