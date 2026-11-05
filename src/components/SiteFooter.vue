<script setup lang="ts">
import { useProfile } from '@/composables/useProfile'
const { profile, tr } = useProfile()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container row">
      <span>{{ tr(profile.name) }} · {{ tr(profile.altName) }}</span>
      <span>{{ year }}</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--line);
  padding-block: 22px max(40px, env(safe-area-inset-bottom, 0px));
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  color: var(--quiet);
}
.row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
</style>
