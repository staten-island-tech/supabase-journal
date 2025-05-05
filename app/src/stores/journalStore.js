import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabaseClient'

export const useJournalStore = defineStore('journal', () => {
    const journalEntries = ref([])
        async function loadEntries()
    return { count, doubleCount, increment }
  })
  