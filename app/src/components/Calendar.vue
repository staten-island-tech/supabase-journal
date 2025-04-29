<template>
  <div class="p-4 bg-white rounded shadow-xl">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const events = ref([])

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  dateClick: handleDateClick,
  events: events,
}
if (newEntry.value.trim()) {
    journalEntries.value.push({
      date: new Date().toLocaleString(),
      text: newEntry.value.trim(),
    })
function handleDateClick(info) {
  const title = prompt('Add event:')
  if (title) {
    events.value.push({
      title: title,
      date: info.dateStr,
    })
  }
}
</script>

<style></style>
