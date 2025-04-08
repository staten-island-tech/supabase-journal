<template>
  <div>
    <h1 class="head">My Journal</h1>
    <form @submit.prevent="addEntry">
      <textarea v-model="newEntry" placeholder="Write new entry here..."></textarea>
      <button type="submit">Add entry</button>
    </form>

    <h2>Entries</h2>
    <ul>
      <li v-for="(entry, index) in journalEntries" :key="index" class="indiv-entry">
        {{ entry }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const newEntry = ref('')
const journalEntries = ref('')

function addEntry() {
  if (newEntry.value.trim()) {
    journalEntries.value.push(newEntry.value.trim())
    newEntry.value = ''
  }
}
</script>

<style scoped></style>
