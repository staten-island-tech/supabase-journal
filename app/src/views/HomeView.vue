<template>
  <div>
    <Entries />
    <h2>Entries</h2>
    <ul>
      <Entries
        v-for="(entry, index) in journalEntries"
        :key="index"
        :entry="entry"
        ref="entries"
        class="indi"
      >
        {{ entry }}
      </Entries>
    </ul>
  </div>
</template>

<script setup>
import Entries from '../components/Entries.vue'
const journalEntries = []
</script>
