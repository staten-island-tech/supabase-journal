<template>
  <div>
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
        <p class="text-gray-700 leading-relaxed">"{{ entry.text }}"</p>
        <div class="inline-flex">
          <button
            @click="editEntry"
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Edit
          </button>
          <button
            @click="deleteEntry"
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
import { ref } from 'vue'

const newEntry = ref('')
const journalEntries = ref([])

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

function editEntry() {}

function deleteEntry() {}
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

.indiv-entry {
  margin: 5px 0;
  padding: 5px;
  border: 1px solid #ccc;
  background-color: aliceblue;
}
</style>
