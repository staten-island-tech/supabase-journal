<template>
  <div>
    <h1 class="head">My Journal</h1>
    <form @submit.prevent="addNewEntry">
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
            @click="deletejEntry(index)"
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useJournalStore } from '@/stores/journalStore'
import { useAuthStore } from '@/stores/auth'

const newEntry = ref('')
const editedText = ref('')
const editingIndex = ref('')
const { journalEntries, loadEntries, addEntry, deleteEntry } = useJournalStore()
const { user } = useAuthStore()

onMounted(async () => {
  if (user.value) {
    await loadEntries(user.value.id)
  } else {
    console.error('User is not logged in.')
    router.push('/login')
  }
})

function addNewEntry() {
  if (newEntry.value.trim() && user.value) {
    addEntry(user.value.id, newEntry.value.trim())
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
function deletejEntry(entryID) {
  deleteEntry(entryID)
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
