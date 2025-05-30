<template>
  <div class="calendar p-5 bg-white rounded shadow-xl">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from '../event-utils'
import { onMounted, ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const calendarEvents = ref([])

const calendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  initialView: 'dayGridMonth',
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents,
  events: calendarEvents,
  contentHeight: 'auto',
}

onMounted(async () => {
  await auth.fetchUser?.()
  await loadJournalEntries()

  console.log('Calendar events after loading:', calendarEvents.value)
})

async function loadJournalEntries() {
  const userId = await getUserId()
  if (!userId) return

  const { data, error } = await supabase
    .from('journal')
    .select('journal_id, title, content, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching journal entries:', error.message)
    return
  }
  console.log('Fetched journal entries:', data)
  calendarEvents.value = data.map((entry) => ({
    id: entry.journal_id,
    title: entry.title,
    start: new Date(entry.created_at).toISOString().replace(/T.*$/, ''),
    allDay: true,
  }))
  console.log('Current user from auth store:', auth.user)
  console.log('User ID for query:', auth.user?.id)
  console.log('Mapped events:', calendarEvents.value)
}

async function getUserId() {
  const result = await supabase.auth.getUser()
  if (!result.data.user) return null
  return result.data.user.id
}

function handleDateSelect(selectInfo) {
  let title = prompt('Please enter a new title for your event:')
  let calendarApi = selectInfo.view.calendar

  calendarApi.unselect()

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    })
  }
}

function handleEventClick(clickInfo) {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
    clickInfo.event.remove()
  }
}

function handleEvents(events) {
  console.log('Events in calendar:', events)
}
</script>

<style>
.calendar {
  height: 40rem;
}
</style>
