import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const error = ref(null)
  const issue = ref()

  const signInWithPassword = async (email, password) => {
    try {
      const { data, error: loginerror } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (loginerror) throw loginerror

      user.value = data.user
      console.log('User:', user.value)
    } catch (err) {
      error.value = issue.message
      console.error('Login issue:', issue.message)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      user.value = null
    } catch (err) {
      console.error('Logout error:', err.message)
    }
  }

  return { user, signInWithPassword, signOut }
})
