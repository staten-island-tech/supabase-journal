<template>
  <div class="min-h-screen flex flex-col">
    <header class="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div class="text-2xl font-extrabold">Journally</div>
      <nav class="space-x-4 hidden sm:block">
        <router-link to="/" class="text-gray-600 hover:text-blue-500">Home</router-link>
        <router-link to="/login" class="text-gray-600 hover:text-blue-500">Login</router-link>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped></style>
