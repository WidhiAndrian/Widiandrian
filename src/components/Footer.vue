<template>
  <footer class="foot">
    © {{ year }} — {{ name }} · Vue 3
  </footer>
</template>

<script setup>
defineProps({
  name: { type: String, default: 'Ihsan Flower' }
})
const year = new Date().getFullYear()
</script>

<style scoped>
.foot {
  flex-shrink: 0; /* Biar footer tidak ketarik ke atas */
  width: 100%;
  text-align: center;
  padding: 16px;
  border-top: 1px solid color-mix(in oklab, CanvasText 15%, transparent);
  opacity: 0.7;
}
</style>
