@ -1,118 +1,111 @@
<template>
  <div v-if="auth.user">
    <h1 class="head">My Journal</h1>
    <form @submit.prevent="addEntry">
      <textarea v-model="newEntry" placeholder="Write new entry here..."></textarea>
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

onMounted(() => {
  loadEntries()
})

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
    .select('content, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error.message)
    return
  }

  journalEntries.value = data.map((entry) => ({
    date: new Date(entry.created_at).toLocaleString(),
    text: entry.content,
  }))
}

async function getUserId() {
  const result = await supabase.auth.getUser()
  if (!result.data.user) return null
  return result.data.user.id
}

function addEntry() {
  if (newEntry.value.trim()) {
    journalEntries.value.push({
      date: new Date().toLocaleString(),
      text: newEntry.value.trim(),
    })
    newEntry.value = ''
  }
  console.log(journalEntries)
}

function editEntry(index) {
  editingIndex.value = index
  editedText.value = journalEntries.value[index].text
}

function saveEdit(index) {
  if (editedText.value.trim()) {
    journalEntries.value[index].text = editedText.value.trim()
    editingIndex.value = null
    editedText.value = ''
  }
  console.log(editedText)
}

function cancelEdit() {
  editingIndex.value = null
  editedText.value = ''
}
function deleteEntry(index) {
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
