<template>
  <div class="min-h-screen px-6 pt-20">
    <header class="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div class="px-16 py-4 flex items-center justify-between">
        <div class="text-2xl font-extrabold">Journally</div>

        <div class="ml-auto">
          <RouterLink to="/login" class="text-gray-600 hover:text-blue-500"
            >Log in / Sign up</RouterLink
          >
        </div>
      </div>
    </header>
    <main class="flex-grow mt-20">
      <RouterView />
    </main>
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10 mt-10">
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-5xl font-extrabold text-gray-800 mb-4">Welcome to Journally</h1>
        <p class="text-lg text-gray-600 mb-4">
          Your personal space to write, reflect, and grow. Start journaling today.
        </p>
        <img src="/Logo.svg" alt="Logo" width="500" height="500" />
      </div>

      <div class="flex-1 max-w-lg">
        <img
          src="https://png.pngtree.com/png-vector/20250409/ourmid/pngtree-spiral-notebook-doodles-illustration-png-image_15960891.png"
          alt="Journally Hero"
          class="rounded-lg w-full object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped></style>
