<template>
  <section class="container-center">
    <h1>Kontak</h1>
    <p>Punya kolaborasi atau proyek? Kirim pesan ke saya.</p>

    <form @submit.prevent="send">
      <input v-model="name" placeholder="Nama" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <textarea v-model="message" rows="5" placeholder="Pesan" required></textarea>
      <button type="submit">Kirim via Email</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const message = ref('')
const send = () => {
  const subject = encodeURIComponent('Halo dari portofolio')
  const body = encodeURIComponent(`Nama: ${name.value}\nEmail: ${email.value}\n\n${message.value}`)
  window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`
}
</script>

<style scoped>
form { display: grid; gap: 10px; max-width: 520px; }
input, textarea {
  padding: 10px 12px; border-radius: 10px;
  border: 1px solid color-mix(in oklab, CanvasText 15%, transparent);
}
button { padding: 10px 14px; border-radius: 10px; border: 1px solid transparent; cursor: pointer; }
button:hover { border-color: color-mix(in oklab, CanvasText 20%, transparent); }
</style>
