<template>
  <section class="container-center">
    <h1>Tentang Saya</h1>
    <p>Saya mahasiswa Informatika yang juga mengerjakan musik & 3D. Fokus pada Vue, TypeScript, dan AI untuk audio.</p>

    <h2>Keahlian</h2>
    <ul class="skills">
      <li v-for="s in skills" :key="s.name">
        <div class="row">
          <span>{{ s.name }}</span>
          <span>{{ s.level }}%</span>
        </div>
        <div class="bar"><div class="fill" :style="{ width: s.level + '%' }"></div></div>
      </li>
    </ul>
  </section>
</template>

<script setup>
const skills = [
  { name: 'Vue 3 / Nuxt', level: 20 },
  { name: 'TypeScript', level: 20 },
  { name: 'Node.js', level: 20 },
  { name: 'Tailwind CSS', level: 0 },
  { name: 'Python (AI/ML)', level: 10 },
  { name: 'Fl studio (DAW)', level: 85 },
]
</script>

<style scoped>
.skills { list-style: none; padding: 0; display: grid; gap: 12px; }
.row { display: flex; justify-content: space-between; }
.bar { height: 8px; border-radius: 999px; background: color-mix(in oklab, CanvasText 12%, transparent); overflow: hidden; }
.fill { height: 100%; background: color-mix(in oklab, CanvasText 20%, transparent); }
</style>
