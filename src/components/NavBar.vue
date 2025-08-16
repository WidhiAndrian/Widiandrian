<template>
  <!-- fixed, blur, translucent bg -->
  <nav
      class="fixed top-0 left-1/2 -translate-x-1/2 h-[var(--nav-h)]
           backdrop-blur-[6px] bg-white/70 dark:bg-zinc-900/60 z-[1000]
           w-full max-w-[980px] rounded-xl shadow-md"
  >
    <!-- 🔧 kontainer sudah otomatis ketengah -->
    <div class="h-full px-4 flex items-center justify-between">
      <!-- Brand kiri -->
      <div class="font-bold">Ihsan Flower</div>

      <!-- Links kanan -->
      <div class="relative flex items-center gap-5" ref="wrap">
        <RouterLink to="/" active-class="active" class="nav-link inline-flex items-center no-underline text-inherit">
          <span class="label inline-block leading-[1.2] transition-colors duration-200">Home</span>
        </RouterLink>

        <RouterLink to="/projects" active-class="active" class="nav-link inline-flex items-center no-underline text-inherit">
          <span class="label inline-block leading-[1.2] transition-colors duration-200">Projects</span>
        </RouterLink>

        <RouterLink to="/about" active-class="active" class="nav-link inline-flex items-center no-underline text-inherit">
          <span class="label inline-block leading-[1.2] transition-colors duration-200">About</span>
        </RouterLink>

        <RouterLink to="/contact" active-class="active" class="nav-link inline-flex items-center no-underline text-inherit">
          <span class="label inline-block leading-[1.2] transition-colors duration-200">Contact</span>
        </RouterLink>

        <!-- Garis animasi -->
        <span ref="line" class="pointer-events-none absolute bottom-0 h-[2px] w-0 opacity-0 bg-[#00d084]"></span>
        <span ref="tail" class="pointer-events-none absolute bottom-0 h-[2px] w-0 opacity-0 bg-[#00d084]"></span>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const wrap = ref(null)
const line = ref(null)
const tail = ref(null)

let resetTimer = null

const COLOR = '#00d084'
const DURATION = 650
const RETURN_DELAY = 900

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

  const lineW  = fullW * 0.75
  const lineLeft = fullLeft

  const tailW  = fullW * 0.2
  const tailLeft = fullLeft + lineW + (fullW * 0.1)

  const trMain = `left ${DURATION}ms cubic-bezier(.2,.9,.1,1),
                  width ${DURATION}ms cubic-bezier(.2,.9,.1,1),
                  opacity .25s ease`
  const trTail = `left ${DURATION}ms cubic-bezier(.2,.9,.1,1) .18s,
                  width ${DURATION}ms cubic-bezier(.2,.9,.1,1) .18s,
                  opacity .25s ease .18s`

  line.value.style.transition = instant ? 'none' : trMain
  tail.value.style.transition = instant ? 'none' : trTail

  Object.assign(line.value.style, { left: `${lineLeft}px`, width: `${lineW}px`,  opacity: '1', background: COLOR })
  Object.assign(tail.value.style, { left: `${tailLeft}px`, width: `${tailW}px`,  opacity: '1', background: COLOR })

  if (instant) requestAnimationFrame(() => {
    line.value.style.transition = trMain
    tail.value.style.transition = trTail
  })
}

function bind() {
  const anchors = wrap.value?.querySelectorAll('.nav-link') || []
  anchors.forEach(a => {
    a.addEventListener('mouseenter', () => { if (resetTimer) { clearTimeout(resetTimer); resetTimer = null } ; moveTo(a) })
    a.addEventListener('focus',     () => { if (resetTimer) { clearTimeout(resetTimer); resetTimer = null } ; moveTo(a) })
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
  if (act) moveTo(act, { instant: true })
}

onMounted(async () => {
  await nextTick()
  bind()
  const act = getActiveEl()?.closest('.nav-link')
  if (act) moveTo(act, { instant: true })
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
