<template>
  <div class="calendar">
    <Calendar />
  </div>
</template>

<script setup>
import Calendar from '../components/Calendar.vue'
</script>

<style>
@media (min-width: 1024px) {
  .calendar {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
