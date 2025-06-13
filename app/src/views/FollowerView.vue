<template>
  <div class="min-h-screen flex flex-col items-center text-center p-4">
    <Followers :entries="entries" />
  </div>
</template>

<script setup>
import Followers from '../components/Followers.vue'
</script>

<style scoped></style>
