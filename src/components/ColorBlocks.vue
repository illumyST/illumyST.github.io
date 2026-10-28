<script setup lang="ts">
/**
 * Soft geometric color blocks behind a section. Pure CSS, no imagery.
 * `variant` picks the composition; each uses two or three tints that overlap and bleed off the edge.
 */
defineProps<{ variant: 'hero' | 'work' | 'contact' | 'about' }>()
</script>

<template>
  <div class="blocks" :class="`blocks--${variant}`" aria-hidden="true">
    <span class="b b1"></span>
    <span class="b b2"></span>
    <span class="b b3"></span>
  </div>
</template>

<style scoped>
.blocks {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
.b {
  position: absolute;
  display: block;
}

/* Hero: a tall rounded block on the right, a circle and a half-circle leaning on it. */
.blocks--hero .b1 {
  right: -6%;
  top: 8%;
  width: 34%;
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-block);
  background: var(--blue-tint);
}
.blocks--hero .b2 {
  right: 22%;
  top: 46%;
  width: 18%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--red-tint);
}
.blocks--hero .b3 {
  right: 4%;
  bottom: -4%;
  width: 22%;
  aspect-ratio: 2 / 1;
  border-radius: 999px 999px 0 0;
  background: var(--gold-tint);
}

/* Work: a quiet band low on the left behind the cards. */
.blocks--work .b1 {
  left: -8%;
  bottom: -10%;
  width: 46%;
  aspect-ratio: 5 / 3;
  border-radius: var(--radius-block);
  background: var(--gold-tint);
}
.blocks--work .b2 {
  left: 30%;
  bottom: 18%;
  width: 10%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--blue-tint);
}
.blocks--work .b3 {
  display: none;
}

/* Contact: the whole section sits on a tint, one circle breaks the edge. */
.blocks--contact .b1 {
  inset: 0;
  border-radius: var(--radius-block) var(--radius-block) 0 0;
  background: var(--blue-tint);
}
.blocks--contact .b2 {
  right: -4%;
  top: -12%;
  width: 20%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--red-tint);
}
.blocks--contact .b3 {
  display: none;
}

/* About: a circle on the right behind the story. */
.blocks--about .b1 {
  right: -14%;
  top: -16%;
  width: 34%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--red-tint);
}
.blocks--about .b2 {
  right: 26%;
  bottom: -6%;
  width: 16%;
  aspect-ratio: 1;
  border-radius: var(--radius-card);
  background: var(--blue-tint);
}
.blocks--about .b3 {
  display: none;
}

@media (max-width: 720px) {
  .blocks--hero .b1 {
    width: 52%;
    right: -18%;
    top: 2%;
  }
  .blocks--hero .b2 {
    width: 26%;
    right: 26%;
    top: 40%;
  }
  .blocks--hero .b3 {
    width: 34%;
  }
  .blocks--about .b1 {
    width: 56%;
    right: -24%;
  }
}
</style>
