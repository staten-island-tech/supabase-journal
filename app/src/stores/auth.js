import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from './supabaseClient' 



export const useStore = defineStore ('auth',() => {
    const user = ref(null)
    const session = ref(null)
    const error = ref(null)
  
    const login = async (email, password) => {
        try {
            const { data, error: error }  = supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
        
          if (error) {
            throw error
          }
        
          user.value = data.value
          session.value = data.session
          console.log('User:', user.value)
          console.log('Session:', session.value)
        } catch (error) {
          console.error(error.message)
        }
  export const signOut = async () => {
            try {
                await supabase.auth.signOut()
                user.value = null
                password.value = null }
            catch{
                console.log(error.message)
            }
            }
        })
      