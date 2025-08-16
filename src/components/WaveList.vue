<template>
  <div class="wave-list">
    <h2>Listen</h2>
    <WaveTrack
        v-for="t in tracks"
        :key="t.src"
        v-bind="t"
    />
  </div>
</template>

<script setup>
import WaveTrack from '@/components/WaveTrack.vue'

// contoh data
const tracks = [
  { title: 'Sound design with Serum2', subtitle: 'Ihsan Flower', src: '/audio/serum2- rumput kalix.mp3' },
  { title: 'Replicant (Remake)', subtitle: 'Yorushika', src: '/audio/Yorushika - Replicant (cover).mp3' },
  { title: 'Shisō-han (Remake)', subtitle: 'Yorushika', src: '/audio/Tele Yorushika - Shisō-han (cover).mp3' },

]
</script>

<style scoped>
.wave-list { display: grid; gap: 8px; }
h2 { margin: 0 0 10px; }
</style>
