<template>
  <div class="calendar p-5 bg-white rounded shadow-xl">
    <FullCalendar ref="calendarRef" :options="calendarOptions" />
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { onMounted, ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const calendarRef = ref(null)
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
  events: calendarEvents.value,
  contentHeight: 'auto',
  timeZone: 'UTC',
}

onMounted(async () => {
  await auth.fetchUser?.()
  await loadEvents()

  console.log('Calendar events after loading:', calendarEvents.value)
})

async function getUserId() {
  const result = await supabase.auth.getUser()
  if (!result.data.user) return null
  return result.data.user.id
}

async function handleDateSelect(selectInfo) {
  let title = prompt('Please enter a new title for your event:')
  const calendarApi = selectInfo.view.calendar
  calendarApi.unselect()

  if (title) {
    const userId = await getUserId()
    if (!userId) return

    const { error } = await supabase
      .from('events')
      .insert([
        {
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          all_day: selectInfo.allDay,
          user_id: userId,
        },
      ])
      .select()

    if (error) {
      console.error('Error saving event:', error.message)
      return
    }
  }
}

async function loadEvents() {
  const userId = await getUserId()
  if (!userId) return

  const { data, error } = await supabase.from('events').select('*').eq('user_id', userId)

  if (error) {
    console.error('Error loading calendar events:', error.message)
    return
  }

  const calendarApi = calendarRef.value?.getApi()
  if (!calendarApi) return

  calendarApi.removeAllEvents()

  data.forEach((event) => {
    calendarApi.addEvent({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.all_day,
    })
  })
}

async function handleEventClick(clickInfo) {
  if (confirm(`Are you sure you want to delete '${clickInfo.event.title}'?`)) {
    const { error } = await supabase.from('events').delete().eq('id', clickInfo.event.id)

    if (!error) clickInfo.event.remove()
    else console.error('Failed to delete event:', error.message)
  }
}
</script>

<style>
.calendar {
  height: 40rem;
}
</style>
