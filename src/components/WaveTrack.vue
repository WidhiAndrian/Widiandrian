<template>
  <div class="wave-track">
    <button class="play" @click="toggle" :title="isPlaying ? 'Pause' : 'Play'">
      <span v-if="!isPlaying">▶</span>
      <span v-else>⏸</span>
    </button>

    <div class="meta">
      <strong class="title">{{ title }}</strong>
      <small v-if="subtitle" class="subtitle">— {{ subtitle }}</small>
    </div>

    <!-- container waveform -->
    <div ref="waveRef" class="wave"></div>

    <div class="time">
      <span>{{ fmt(currentTime) }}</span>
      <span>{{ fmt(duration) }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import WaveSurfer from 'wavesurfer.js'

const props = defineProps({
  src: { type: String, required: true },   // /audio/file.mp3 atau URL
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  height: { type: Number, default: 92 },
  waveColor: { type: String, default: '#5b6779' },
  progressColor: { type: String, default: '#00d084' }, // warna “merah/ijo” maju
  cursorColor: { type: String, default: '#cbd5e1' }
})

const waveRef = ref(null)
const ws = ref(null)

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

function fmt(s) {
  if (!s || s === Infinity) return '0:00'
  const m = Math.floor(s / 60)
  const ss = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${ss}`
}

function toggle() {
  if (!ws.value) return
  ws.value.playPause()
}

onMounted(() => {
  ws.value = WaveSurfer.create({
    container: waveRef.value,
    url: props.src,
    height: props.height,
    waveColor: props.waveColor,
    progressColor: props.progressColor,
    cursorColor: props.cursorColor,
    responsive: true,
    barWidth: 2,
    barGap: 2,
    barRadius: 2,
    normalize: true,         // biar tinggi waveform konsisten
    partialRender: true
  })

  ws.value.on('ready', () => {
    duration.value = ws.value.getDuration()
  })
  ws.value.on('audioprocess', () => {
    currentTime.value = ws.value.getCurrentTime()
  })
  ws.value.on('seek', () => {
    currentTime.value = ws.value.getCurrentTime()
  })
  ws.value.on('play', () => (isPlaying.value = true))
  ws.value.on('pause', () => (isPlaying.value = false))
  ws.value.on('finish', () => {
    isPlaying.value = false
    currentTime.value = duration.value
  })
})

onBeforeUnmount(() => {
  ws.value?.destroy()
})
</script>

<style scoped>
.wave-track {
  display: grid;
  grid-template-columns: 48px 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "play meta"
    "play wave";
  gap: 6px 12px;
  padding: 14px 0;
  border-bottom: 1px solid color-mix(in oklab, CanvasText 12%, transparent);
}

.play {
  grid-area: play;
  align-self: start;
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 1px solid color-mix(in oklab, CanvasText 20%, transparent);
  background: transparent;
  cursor: pointer;
}
.play:hover { background: color-mix(in oklab, CanvasText 10%, transparent); }

.meta {
  grid-area: meta;
  display: flex; align-items: baseline; gap: 6px;
}
.title { font-weight: 600; }
.subtitle { opacity: .8; }

.wave { grid-area: wave; width: 100%; }

.time {
  margin-top: 6px;
  display: flex; justify-content: space-between;
  grid-column: 1 / -1;
  font-size: 12px; opacity: .75;
}
</style>
