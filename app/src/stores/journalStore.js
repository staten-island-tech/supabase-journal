import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabaseClient'

export const useJournalStore = defineStore('journal', () => {
  const journalEntries = ref([])
  async function loadEntries(userID) {
    const { data, error } = await supabase
      .from('journals')
      .select('*')
      .eq('user_id', userID)
      .order('created_at', { ascending: false }) //table name ('')
    if (error) console.log(error)
    else journalEntries.value = data
  }
  async function addEntry(userID, text) {
    const { data, error } = await supabase
      .from('journals')
      .insert([{ user_id: userID, text }])
      .single()
    if (error) {
      console.log(error)
    } else {
      journalEntries.value.unshift(data)
    }
  }
  async function deleteEntry(entryID) {
    const { error } = await supabase.from('journals').delete().eq('id', entryID)
    if (!error) {
      journalEntries.value = journalEntries.value.filter((e) => e.id !== entryID)
    }
  }
  return { journalEntries, loadEntries, addEntry, deleteEntry }
})
