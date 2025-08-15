<template>
  <section class="container-center">
    <h1 class="title">
      Halo, saya Ihsan
      <span class="typewrap">
        <span class="typed">{{ displayText }}</span>
        <span class="caret" aria-hidden="true"></span>
      </span>
    </h1>

    <p class="lead">
      Saya membangun aplikasi web cepat & bersih. Tertarik pada Vue, Node.js, dan AI Audio.
    </p>

    <h2>Highlights</h2>
    <ul class="cards">
      <li v-for="p in projects.slice(0,3)" :key="p.title" class="card">
        <strong>{{ p.title }}</strong>
        <p>{{ p.desc }}</p>
        <RouterLink :to="{ name: 'projects' }">Lihat</RouterLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const projects = [
  { title: 'Drum Stem Separator', desc: 'Model pemisah stem (kick/snare/hat).' },
  { title: 'TEACHER Game', desc: 'Gim aritmetika sederhana dengan musik orisinal.' },
  { title: 'Pixel Art Pack', desc: 'Koleksi tekstur pixel art.' }
]

// ===== Typewriter =====
const words = ['Flower', 'Bunga', 'Yayaa']
const displayText = ref('')

const typingSpeed = 85      // ms per huruf saat mengetik
const deletingSpeed = 55    // ms per huruf saat menghapus
const holdAfterType = 900   // jeda setelah selesai mengetik satu kata
const holdAfterDelete = 350 // jeda setelah selesai menghapus

let wordIdx = 0
let charIdx = 0
let deleting = false
let timer

function loop() {
  const current = words[wordIdx]

  if (!deleting) {
    // mengetik
    displayText.value = current.slice(0, charIdx + 1)
    charIdx++
    if (charIdx === current.length) {
      deleting = true
      timer = setTimeout(loop, holdAfterType)
      return
    }
    timer = setTimeout(loop, typingSpeed)
  } else {
    // menghapus
    displayText.value = current.slice(0, charIdx - 1)
    charIdx--
    if (charIdx === 0) {
      deleting = false
      wordIdx = (wordIdx + 1) % words.length
      timer = setTimeout(loop, holdAfterDelete)
      return
    }
    timer = setTimeout(loop, deletingSpeed)
  }
}

onMounted(() => { loop() })
onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.title {
  margin: 20px 0;
  line-height: 1.2;
}

.lead {
  opacity: .85;
}

/* Bungkus kata yang diketik + kursor */
.typewrap {
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  min-width: 6ch; /* biar tidak loncat saat kata pendek */
}

/* Teks yang sedang diketik */
.typed {
  font-weight: 600;
  letter-spacing: .2px;
}

/* Kursor kedip */
.caret {
  width: 2px;
  height: 1.1em;
  background: currentColor;
  opacity: .9;
  display: inline-block;
  transform: translateY(2px);
  animation: blink 1s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }

/* Cards tetap sama */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  padding: 0;
  list-style: none;
}
.card {
  border: 1px solid color-mix(in oklab, CanvasText 15%, transparent);
  border-radius: 14px;
  padding: 12px;
}
</style>
