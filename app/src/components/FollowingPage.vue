<template>
  <h2>Journals from People You Follow</h2>

  <div v-if="entries.length === 0">No entries yet.</div>

  <div v-else></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const entries = ref([])

onMounted
</script>

<style scoped></style>
