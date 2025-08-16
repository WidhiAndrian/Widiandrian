<template>
  <NavBar />

  <div class="min-h-dvh flex flex-col">
    <main class="flex-1 pt-[calc(var(--nav-h)+8px)] flex justify-center">
      <div class="w-full max-w-[980px] mx-auto px-4">
        <RouterView />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>
