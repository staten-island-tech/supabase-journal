@ -1,118 +1,111 @@
<template>
  <div v-if="auth.user" class="space-y-6">
    <h1 class="head">My Journal</h1>
    <form @submit.prevent="addEntry" class="space-y-4">
      <input
        v-model="newTitle"
        type="text"
        placeholder="Title"
        class="w-full border p-2 rounded"
        required
      />

      <textarea
        v-model="newEntry"
        placeholder="Write new entry here..."
        class="w-full h-28 border p-2 rounded"
        required
      ></textarea>

      <button
        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        type="submit"
      >
        Add entry
      </button>
    </form>

    <ul class="mt-6 space-y-4">
      <li
        v-for="(entry, index) in journalEntries"
        :key="index"
        class="p-4 bg-white rounded shadow-md border border-blue-100"
      >
        <p class="text-xl font-semibold">{{ entry.title }}</p>
        <p class="text-sm text-gray-500 mb-2">
          📝 Entry on <span class="font-semibold">{{ entry.date }}</span
          >:
        </p>

        <div v-if="editingIndex === index">
          <textarea v-model="editedText" class="w-full h-40 border rounded p-2 mb-2"></textarea>
          <button @click="saveEdit(index)" class="bg-green-300 text-white px-3 py-1 mr-2 rounded">
            Save
          </button>
          <button @click="cancelEdit(index)" class="bg-gray-300 px-3 py-1 rounded">Cancel</button>
        </div>

        <p v-else class="text-gray-700 leading-relaxed">"{{ entry.text }}"</p>
        <div class="inline-flex">
          <button
            @click="editEntry(index)"
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Edit
          </button>
          <button
            @click="deleteEntry(index)"
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Please log in to view your journal.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

onMounted(async () => {
  await auth.fetchUser()
  await loadEntries()
})

const newTitle = ref('')
const auth = useAuthStore()
const newEntry = ref('')
const journalEntries = ref([])
const editedText = ref('')
const editingIndex = ref('')

async function loadEntries() {
  const userId = await getUserId()
  if (!userId) return

  const { data, error } = await supabase
    .from('journal')
    .select('journal_id, title, content, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error.message)
    return
  }

  journalEntries.value = data.map((entry) => ({
    id: entry.journal_id,
    text: entry.content,
    title: entry.title,
    date: new Date(entry.created_at).toLocaleString(),
  }))
}

async function getUserId() {
  const result = await supabase.auth.getUser()
  if (!result.data.user) return null
  return result.data.user.id
}

async function addEntry() {
  const userId = await getUserId()
  if (!userId || !newEntry.value.trim() || !newTitle.value.trim()) return

  const content = newEntry.value.trim()
  const title = newTitle.value.trim()
  const createdAt = new Date()

  const { data, error } = await supabase
    .from('journal')
    .insert([
      {
        user_id: userId,
        title,
        content,
        created_at: createdAt.toISOString(),
      },
    ])
    .select()

  console.log('Insert response:', { data, error })

  if (error) {
    console.error(error.message)
    return
  }

  journalEntries.value.unshift({
    id: data[0].journal_id,
    title: title,
    text: content,
    date: createdAt.toLocaleString(),
  })

  newEntry.value = ''
  newTitle.value = ''
}

function editEntry(index) {
  editingIndex.value = index
  editedText.value = journalEntries.value[index].text
}

async function saveEdit(index) {
  const updatedText = editedText.value.trim()
  if (!updatedText) return

  const entryId = journalEntries.value[index].id

  const { error } = await supabase
    .from('journal')
    .update({ content: updatedText })
    .eq('journal_id', entryId)

  if (error) {
    console.error(error.message)
    return
  }

  journalEntries.value[index].text = updatedText
  editingIndex.value = null
  editedText.value = ''
}

function cancelEdit() {
  editingIndex.value = null
  editedText.value = ''
}

async function deleteEntry(index) {
  const entryId = journalEntries.value[index].id

  const { error } = await supabase.from('journal').delete().eq('journal_id', entryId)

  if (error) {
    console.error(error.message)
    return
  }

  journalEntries.value.splice(index, 1)
}
</script>

<style scoped>
.head {
  font-size: 2em;
  text-align: center;
}

textarea {
  width: 100%;
  height: 70px;
  margin-bottom: 10px;
}

button {
  display: block;
  margin: 10px auto;
}
</style>
