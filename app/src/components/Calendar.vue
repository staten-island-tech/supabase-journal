<template>
  <div class="calendar">
    <div class="flex justify-between items-center mb-4">
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        @click="previousMonth"
      >
        Prev
      </button>
      <h2>{{ monthYear }}</h2>
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        @click="nextMonth"
      >
        Next
      </button>
    </div>

    <div class="grid grid-cols-7 gap-1">
      <div class="day-name" v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      <div class="day" v-for="(day, index) in calendarDays" :key="index">
        {{ currentDate }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentDate = ref(new Date())

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const monthYear = computed(() => {
  const month = currentDate.value.getMonth()
  const year = currentDate.value.getFullYear()
  return `${months[month]} ${year}`
})

function previousMonth() {
  const date = new Date(currentDate.value)
  date.setMonth(date.getMonth() - 1)
  currentDate.value = date
}
function nextMonth() {
  const date = new Date(currentDate.value)
  date.setMonth(date.getMonth() + 1)
  currentDate.value = date
}

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
})
</script>

<style></style>
