<template>
  <nav class="navbar">
    <div class="nav-inner">
      <div class="brand">Ihsan Flower</div>

      <div class="links" ref="wrap">
        <RouterLink to="/" active-class="active" class="nav-link">
          <span class="label">Home</span>
        </RouterLink>
        <RouterLink to="/projects" active-class="active" class="nav-link">
          <span class="label">Projects</span>
        </RouterLink>
        <RouterLink to="/about" active-class="active" class="nav-link">
          <span class="label">About</span>
        </RouterLink>
        <RouterLink to="/contact" active-class="active" class="nav-link">
          <span class="label">Contact</span>
        </RouterLink>

        <!-- Garis animasi -->
        <span class="magic-line" ref="line"></span>
        <span class="magic-tail" ref="tail"></span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {ref, nextTick, onMounted, onBeforeUnmount, watch} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const wrap = ref(null)
const line = ref(null)
const tail = ref(null)

let resetTimer = null

const COLOR = '#00d084'
const DURATION = 650
const RETURN_DELAY = 900
const TAIL_LEN = 12
const LINE_OFFSET = 2 // px koreksi supaya garis pas

const getActiveEl = () =>
    wrap.value?.querySelector('.active .label') || wrap.value?.querySelector('.label')

function getLabelRect(linkEl) {
  const label = linkEl.querySelector('.label') || linkEl
  return label.getBoundingClientRect()
}

function moveTo(linkEl, { instant = false } = {}) {
  if (!wrap.value || !line.value || !tail.value || !linkEl) return

  const wrapRect = wrap.value.getBoundingClientRect()
  const rect = getLabelRect(linkEl)

  const fullLeft = rect.left - wrapRect.left
  const fullW = rect.width

  // Garis panjang = 60% lebar teks
  const lineW = fullW * 0.75
  const lineLeft = fullLeft

  // Garis pendek = 20% lebar teks
  // Mulai setelah jarak kosong 20% dari garis panjang
  const tailW = fullW * 0.2
  const tailLeft = fullLeft + lineW + (fullW * 0.1)

  const trMain = `left ${DURATION}ms cubic-bezier(.2,.9,.1,1),
                  width ${DURATION}ms cubic-bezier(.2,.9,.1,1),
                  opacity .25s ease`
  const trTail = `left ${DURATION}ms cubic-bezier(.2,.9,.1,1) .18s,
                  width ${DURATION}ms cubic-bezier(.2,.9,.1,1) .18s,
                  opacity .25s ease .18s`

  line.value.style.transition = instant ? 'none' : trMain
  tail.value.style.transition = instant ? 'none' : trTail

  Object.assign(line.value.style, {
    left: `${lineLeft}px`,
    width: `${lineW}px`,
    opacity: '1'
  })
  Object.assign(tail.value.style, {
    left: `${tailLeft}px`,
    width: `${tailW}px`,
    opacity: '1'
  })

  if (instant) requestAnimationFrame(() => {
    line.value.style.transition = trMain
    tail.value.style.transition = trTail
  })
}



function bind() {
  const anchors = wrap.value?.querySelectorAll('.nav-link') || []
  anchors.forEach(a => {
    a.addEventListener('mouseenter', () => {
      if (resetTimer) {
        clearTimeout(resetTimer);
        resetTimer = null
      }
      moveTo(a)
    })
    a.addEventListener('focus', () => {
      if (resetTimer) {
        clearTimeout(resetTimer);
        resetTimer = null
      }
      moveTo(a)
    })
  })

  wrap.value?.addEventListener('mouseleave', () => {
    if (resetTimer) clearTimeout(resetTimer)
    resetTimer = setTimeout(() => {
      const act = getActiveEl()?.closest('.nav-link')
      if (act) moveTo(act)
    }, RETURN_DELAY)
  })
}

function unbind() {
  const anchors = wrap.value?.querySelectorAll('.nav-link') || []
  anchors.forEach(a => a.replaceWith(a.cloneNode(true)))
}

function onResize() {
  const act = getActiveEl()?.closest('.nav-link')
  if (act) moveTo(act, {instant: true})
}

onMounted(async () => {
  await nextTick()
  bind()
  const act = getActiveEl()?.closest('.nav-link')
  if (act) moveTo(act, {instant: true})
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  unbind()
  window.removeEventListener('resize', onResize)
  if (resetTimer) clearTimeout(resetTimer)
})

watch(() => route.fullPath, async () => {
  await nextTick()
  const act = getActiveEl()?.closest('.nav-link')
  if (act) moveTo(act)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  inset: 0 0 auto 0;
  height: var(--nav-h);
  backdrop-filter: blur(6px);
  background: color-mix(in oklab, Canvas 85%, transparent);
  z-index: 1000;
}

.nav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 980px;
  margin: 0 auto;
  padding: 0 16px;
}

.brand {
  font-weight: 700;
}

.links {
  position: relative;
  display: flex;
  gap: 20px;
  align-items: center;
  padding-bottom: 6px;
}

.nav-link {
  text-decoration: none;
  color: inherit;
}

.label {
  display: inline-block;
  line-height: 1.2;
  padding: 0; /* biar width pas */
  transition: color .2s ease;
}

.nav-link.active .label {
  color: #61c3ff;
}

.magic-line,
.magic-tail {
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 0;
  opacity: 0;
  background: #00d084;
  will-change: left, width;
}
</style>
