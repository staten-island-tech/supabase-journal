<template>
  <div class="container">
    <h>Please Login!</h>
    <div v-if="auth.user">
      <p>Welcome, {{ auth.user.email }}</p>
      <button @submit.prevent="auth.signOut">Sign Out</button>
    </div>
    <div v-else>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>

      <form @submit.prevent="signup">
        <input v-model="newEmail" type="email" placeholder="New Email" />
        <input v-model="newPassword" type="password" placeholder="New Password" />
        <input v-model="fullName" type="text" placeholder="Full Name" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const auth = useAuthStore()
const email = ref('')
const password = ref('')

const newEmail = ref('')
const newPassword = ref('')
const fullName = ref('')

const login = async () => {
  await auth.signInWithPassword(email.value, password.value)
}

const signup = async () => {
  await auth.signUp(newEmail.value, newPassword.value, fullName.value)
}
</script>
