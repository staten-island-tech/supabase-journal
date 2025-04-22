<template>
  <div class="calendar">
    <div class="max-w-xl mx-auto mt-8">
      <div class="flex justify-between items-center mb-4">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          @click="goToPreviousMonth"
        >
          Prev
        </button>
        <h2>{{ monthYear }}</h2>
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          @click="goToNextMonth"
        >
          Next
        </button>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-1">
      <div class="day-name" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      <div
        class="day"
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="{ 'not-current-month': !day.currentMonth }"
      >
        {{ day.date.getDate() }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentDate = ref(new Date())

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function goToPreviousMonth() {
  const date = new Date(currentDate.value)
  date.setMonth(date.getMonth() - 1)
  currentDate.value = date
}

function goToNextMonth() {
  const date = new Date(currentDate.value)
  date.setMonth(date.getMonth() + 1)
  currentDate.value = date
}
</script>

<style></style>
"
