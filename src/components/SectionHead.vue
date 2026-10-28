<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; id?: string }>()
</script>

<template>
  <header class="head">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 :id="id" class="title">{{ title }}</h2>
  </header>
</template>

<style scoped>
.head {
  display: grid;
  gap: 14px;
  margin-bottom: clamp(28px, 4vw, 44px);
}
.title {
  font-size: clamp(1.6rem, 1.2rem + 1.4vw, 2.25rem);
  letter-spacing: 0.01em;
  max-width: 24ch;
}
</style>
