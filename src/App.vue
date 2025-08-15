<template>
  <NavBar />

  <div class="page">
    <main class="main">
      <div class="container-center">
        <RouterView />
      </div>
    </main>

    <Footer />
  </div>

</template>

<script setup>
  import { RouterView } from 'vue-router'
  import NavBar from '@/components/NavBar.vue'
  import Footer from "@/components/Footer.vue";
</script>



<style>
:root {
  color-scheme: light dark;
    --nav-h: 56px;
}

* {
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  margin: 0;
}

.page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

}

.main {
  flex: 1 0 auto;
  padding-top: calc(var(--nav-h) + 8px);
  display: flex;
  justify-content: center;
}

/* Pusatkan semua isi */
.container-center {
  width: 100%;
  max-width: 980px;
  margin: 0 auto; /* 🔹 kunci agar di tengah */
  padding: 0 16px;
}
</style>
