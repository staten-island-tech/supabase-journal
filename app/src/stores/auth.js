import { defineStore } from 'pinia'
import { ref } from 'vue'


export const userAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)

  function login() {
    isLoggedIn.value = true
  }

  function logout() {
    isLoggedIn.value = false
  }
})

export const useStore = defineStore ('auth',() => {
    const user = ref()
    const session = ref()
    const error = ref()
  
    const signin = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
  
    if (error) {
      throw error
    }
  
    console.log('Logged in user:', user)
    console.log('Session info:', session)
  } catch (error) {
    console.error('Error during sign-in:', error.message)
  });
  
  export const signOut = async () => {
    await supabase.auth.signOut()
    user.value = ('')
    password.value =('')}

  export default supabase
  