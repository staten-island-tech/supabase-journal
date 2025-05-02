<template>
  <div class="about">
    <Calendar />
  </div>
</template>

<script setup>
import Calendar from '../components/Calendar.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
