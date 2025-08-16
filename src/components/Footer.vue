<template>
  <footer
      class="shrink-0 w-full text-center p-4 border-t border-black/10 dark:border-white/20 opacity-70"
  >
    © {{ year }} — {{ name }} · Vue 3
  </footer>
</template>

<script setup>
defineProps({
  name: { type: String, default: 'Ihsan Flower' }
})
const year = new Date().getFullYear()
</script>
