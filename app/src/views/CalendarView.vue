<template>
  <div class="min-h-screen px-6 pt-20">
    <header class="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div class="px-16 py-4 flex items-center justify-between">
        <div class="text-2xl font-extrabold">Journally</div>

        <div class="ml-auto flex items-center space-x-6">
          <RouterLink to="/home" class="hover:font-bold">Home</RouterLink>
          <RouterLink to="/entry" class="hover:font-bold">Journal</RouterLink>
          <RouterLink to="/follower" class="hover:font-bold">Followers List</RouterLink>
          <RouterLink to="followerjournals" class="hover:font-bold">View Other Journals</RouterLink>
        </div>
      </div>
    </header>
    <main class="flex-grow mt-20">
      <RouterView />
    </main>
    <Calendar />
  </div>
</template>

<script setup>
import Calendar from '../components/Calendar.vue'
</script>

<style></style>
