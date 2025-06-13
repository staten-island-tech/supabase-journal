<template>
  <div class="max-w-3xl mx-auto px-4 pt-6">
    <h2 class="text-2xl font-bold mb-6 text-center">Journals from People You Follow</h2>

    <div v-if="entries.length === 0" class="text-center text-gray-500">No entries yet.</div>

    <ul v-else class="space-y-6">
      <li
        v-for="(entry, index) in entries"
        :key="entry.journal_id"
        class="bg-white rounded-xl shadow-md p-6 border border-gray-100"
      >
        <h3 class="text-xl font-semibold mb-2">{{ entry.title }} ({{ entry.users.full_name }})</h3>
        <p class="text-sm text-gray-500 mb-2">{{ new Date(entry.created_at).toLocaleString() }}</p>
        <p class="text-gray-800 whitespace-pre-line">{{ entry.content }}</p>
        <button
          class="transition-colors text-2xl"
          :class="liked[index] ? 'text-red-500' : 'text-gray-300'"
          @click="liked[index] = !liked[index]"
        >
          ♥
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const entries = ref([])
const liked = ref([])

onMounted(async () => {
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData.user.id
  if (!userId) return

  const { data: follows } = await supabase
    .from('follows')
    .select('followee_id')
    .eq('follower_id', userId)
  if (!follows) return

  const ids = follows.map((f) => f.followee_id)

  const { data: journals } = await supabase
    .from('journal')
    .select('journal_id, title, content, created_at, users ( full_name )')
    .in('user_id', ids)
    .order('created_at', { ascending: false })
  if (!journals) return

  entries.value = journals
})
</script>

<style scoped></style>
