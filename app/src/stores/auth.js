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
      return true
    } catch (err) {
      error.value = issue.message
      console.error('Login issue:', issue.message)
      return false
    }
  }

  const signUp = async (email, password, fullName) => {
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      if (signUpError) throw signUpError

      user.value = data.user
      console.log('New user:', user.value)
    } catch (err) {
      error.value = err.message
      console.error('Signup error:', err.message)
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

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    if (data?.user) {
      user.value = data.user
    } else {
      user.value = null
    }
  }

  return { user, signInWithPassword, signUp, signOut, fetchUser }
})
