<template>
  <div>
    <h2>Journals from People You Follow</h2>

    <div v-if="entries.length === 0">No entries yet.</div>

    <ul v-else>
      <li v-for="entry in entries" :key="entry.id">
        <h3>{{ entry.title }}</h3>
        <p>From: {{ entry.author }}</p>
        <p>{{ entry.date }}</p>
        <p>{{ entry.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const entries = ref([])

onMounted(async () => {
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData?.user?.id
  if (!userId) return

  const { data: follows } = await supabase
    .from('follows')
    .select('followee_id')
    .eq('follower_id', userId)
  if (!follows) return

  const { data: followerentries } = await supabase.from('journal').select().eq('followee_id')
})
</script>

<style scoped></style>
