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
