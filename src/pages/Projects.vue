<template>
  <section class="container-center">
    <h1>Projects</h1>
    <input v-model="q" class="search" placeholder="Cari proyek..." />

    <ul class="cards">
      <li v-for="p in filtered" :key="p.title" class="card">
        <strong>{{ p.title }}</strong>
        <p>{{ p.desc }}</p>
        <small>{{ p.tags.join(' · ') }}</small>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const q = ref('')
const projects = ref([
  { title: 'Drum Stem Separator', tags: ['PyTorch','DSP','Audio'], desc: 'Batch size 1, durasi variatif.' },
  { title: 'TEACHER — Arithmetic', tags: ['Vue','Game','Web Audio'], desc: 'Perkalian & pengurangan.' },
  { title: 'Pixel Art Pack', tags: ['Design','Pixel Art'], desc: 'Texture pack Minecraft.' },

  { title: 'Drum Stem Separator', tags: ['PyTorch','DSP','Audio'], desc: 'Batch size 1, durasi variatif.' },
  { title: 'TEACHER — Arithmetic', tags: ['Vue','Game','Web Audio'], desc: 'Perkalian & pengurangan.' },
  { title: 'Pixel Art Pack', tags: ['Design','Pixel Art'], desc: 'Texture pack Minecraft.' },

])

const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return projects.value
  return projects.value.filter(p =>
      p.title.toLowerCase().includes(s) ||
      p.tags.some(t => t.toLowerCase().includes(s))
  )
})
</script>

<style scoped>
.search {
  width: 100%; padding: 10px 12px; border-radius: 10px;
  border: 1px solid color-mix(in oklab, CanvasText 15%, transparent);
  margin: 8px 0 16px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px; padding: 0; list-style: none;
}
.card {
  border: 1px solid color-mix(in oklab, CanvasText 15%, transparent);
  border-radius: 14px; padding: 12px;
}
</style>
