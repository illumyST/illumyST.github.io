<script setup lang="ts">
/**
 * GRIS-inspired Watercolor Pigment Washes (水彩暈染與淡彩層次)
 * Evoking Conrad Roset's watercolor paintings on textured paper.
 * Soft, fluid pigment stains that bleed naturally across the margins.
 */
defineProps<{ variant: 'hero' | 'work' | 'contact' | 'about' }>()
</script>

<template>
  <div class="watercolor-canvas" :class="`wash--${variant}`" aria-hidden="true">
    <span class="stain s1"></span>
    <span class="stain s2"></span>
    <span class="stain s3"></span>
  </div>
</template>

<style scoped>
.watercolor-canvas {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.stain {
  position: absolute;
  display: block;
  filter: blur(48px);
  opacity: 0.65;
  mix-blend-mode: multiply;
  transition: opacity 0.4s ease;
}

@media (prefers-color-scheme: dark) {
  :global(:root:not([data-theme='light']) .watercolor-canvas .stain) {
    mix-blend-mode: screen;
    opacity: 0.22;
    filter: blur(56px);
  }
}
:global(:root[data-theme='dark'] .watercolor-canvas .stain) {
  mix-blend-mode: screen;
  opacity: 0.22;
  filter: blur(56px);
}

/* Hero: Dusty rose (Gris Red) & sunlit ochre watercolor wash */
.wash--hero .s1 {
  right: -6%;
  top: 2%;
  width: clamp(320px, 44vw, 580px);
  aspect-ratio: 1.1;
  border-radius: 48% 52% 68% 32% / 42% 46% 54% 58%;
  background: radial-gradient(circle at 45% 45%, var(--red-tint) 0%, color-mix(in srgb, var(--red) 32%, transparent) 45%, transparent 75%);
}
.wash--hero .s2 {
  right: 22%;
  top: 42%;
  width: clamp(220px, 26vw, 360px);
  aspect-ratio: 1;
  border-radius: 64% 36% 40% 60% / 55% 65% 35% 45%;
  background: radial-gradient(circle at 50% 50%, var(--gold-tint) 0%, color-mix(in srgb, var(--gold) 28%, transparent) 50%, transparent 75%);
}
.wash--hero .s3 {
  left: -8%;
  top: 15%;
  width: clamp(240px, 30vw, 420px);
  aspect-ratio: 1.3;
  border-radius: 40% 60% 52% 48% / 48% 52% 48% 52%;
  background: radial-gradient(circle at 40% 60%, var(--blue-tint) 0%, color-mix(in srgb, var(--blue) 25%, transparent) 45%, transparent 70%);
}

/* Work: Twilight Lapis (Gris Blue) & delicate sage green wash */
.wash--work .s1 {
  left: -10%;
  bottom: -4%;
  width: clamp(340px, 46vw, 620px);
  aspect-ratio: 1.3;
  border-radius: 58% 42% 64% 36% / 45% 58% 42% 55%;
  background: radial-gradient(circle at 40% 40%, var(--blue-tint) 0%, color-mix(in srgb, var(--blue) 30%, transparent) 48%, transparent 75%);
}
.wash--work .s2 {
  right: 2%;
  top: 8%;
  width: clamp(200px, 25vw, 340px);
  aspect-ratio: 1;
  border-radius: 50% 50% 40% 60% / 52% 48% 52% 48%;
  background: radial-gradient(circle at 50% 50%, var(--green-tint) 0%, color-mix(in srgb, var(--green) 26%, transparent) 50%, transparent 75%);
}
.wash--work .s3 {
  left: 38%;
  bottom: 14%;
  width: clamp(160px, 18vw, 240px);
  aspect-ratio: 1;
  border-radius: 60% 40% 50% 50%;
  background: radial-gradient(circle at 50% 50%, var(--gold-tint) 0%, color-mix(in srgb, var(--gold) 22%, transparent) 45%, transparent 70%);
}

/* Contact: Melancholic & serene watercolor dusk (lapis blue & dusty carmine) */
.wash--contact .s1 {
  inset: 0;
  border-radius: 0;
  background: linear-gradient(180deg, transparent 0%, var(--blue-tint) 25%, color-mix(in srgb, var(--blue-tint) 85%, var(--red-tint)) 100%);
  filter: none;
  opacity: 0.85;
}
.wash--contact .s2 {
  right: -4%;
  top: -12%;
  width: clamp(240px, 32vw, 440px);
  aspect-ratio: 1;
  border-radius: 55% 45% 62% 38% / 44% 56% 44% 56%;
  background: radial-gradient(circle at 50% 50%, var(--red-tint) 0%, color-mix(in srgb, var(--red) 34%, transparent) 50%, transparent 75%);
}
.wash--contact .s3 {
  left: 4%;
  bottom: -6%;
  width: 220px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, var(--gold-tint) 0%, color-mix(in srgb, var(--gold) 26%, transparent) 45%, transparent 70%);
}

/* About: Lapis indigo & pale lichen green wash */
.wash--about .s1 {
  right: -10%;
  top: -8%;
  width: clamp(300px, 40vw, 540px);
  aspect-ratio: 1;
  border-radius: 52% 48% 44% 56% / 46% 54% 46% 54%;
  background: radial-gradient(circle at 50% 50%, var(--green-tint) 0%, color-mix(in srgb, var(--green) 30%, transparent) 48%, transparent 75%);
}
.wash--about .s2 {
  right: 24%;
  bottom: -6%;
  width: clamp(180px, 20vw, 280px);
  aspect-ratio: 1;
  border-radius: 44% 56% 60% 40% / 52% 44% 56% 48%;
  background: radial-gradient(circle at 50% 50%, var(--blue-tint) 0%, color-mix(in srgb, var(--blue) 26%, transparent) 45%, transparent 70%);
}
.wash--about .s3 {
  left: -6%;
  top: 32%;
  width: clamp(200px, 24vw, 340px);
  aspect-ratio: 1.1;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, var(--gold-tint) 0%, color-mix(in srgb, var(--gold) 24%, transparent) 45%, transparent 70%);
}

@media (max-width: 720px) {
  .stain {
    filter: blur(36px);
  }
}
</style>
