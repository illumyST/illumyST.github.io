<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import RecruiterDock from '@/components/RecruiterDock.vue'
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter />
  <RecruiterDock />
</template>

<style scoped>
.skip {
  position: absolute;
  left: 16px;
  top: -48px;
  padding: 8px 14px;
  background: var(--ink);
  color: var(--paper);
  border-radius: 8px;
  z-index: 20;
}
.skip:focus {
  top: 12px;
}
</style>
