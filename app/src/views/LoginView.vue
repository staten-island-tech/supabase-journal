<template>
  <h1>Login</h1>
  <div v-if="auth.user">
    <p>Welcome, {{ auth.user.email }}</p>
    <button @click="auth.signOut">Sign Out</button>
  </div>

  <div v-else>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleSignIn">Sign In</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const auth = ref(useAuthStore)
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    await auth.signInWithEmail(email.value, password.value)
  } catch {
    console.log(error.message)
  }
}
</script>
