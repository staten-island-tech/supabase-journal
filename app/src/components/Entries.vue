<template>
  <div>
    <h1 class="head">My Journal</h1>
    <form @submit.prevent="addEntry">
      <textarea v-model="newEntry" placeholder="Write new entry here..."></textarea>
      <button type="submit">Add entry</button>
    </form>

    <ul>
      <li
        v-for="entry in journalEntries"
        :key="entry.date"
        :entry="entry"
        ref="entries"
        class="indiv-entry"
      >
        {{ entry }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  entry: String,
})

const newEntry = ref('')
const journalEntries = []

function addEntry() {
  if (newEntry.value.trim()) {
    journalEntries.push(newEntry.value.trim())
    newEntry.value = ''
    return {
      journalEntries,
    }
  }
  console.log(journalEntries)
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

.indiv-entry {
  margin: 5px 0;
  padding: 5px;
  border: 1px solid #ccc;
  background-color: aliceblue;
}
</style>
