<template>
  <div class="min-h-screen flex flex-col items-center text-center p-4">
    <div v-if="auth.user">
      <p>Welcome, {{ auth.user.email }}</p>
      <button
        @click="auth.signOut"
        class="mt-2 px-4 py-2 text-white rounded"
        style="background-color: var(--vt-c-primary)"
      >
        Sign Out
      </button>
    </div>
    <div v-else class="w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4">Please Login!</h1>
      <form @submit.prevent="login" class="space-y-2 mb-6">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border rounded"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          class="w-full px-4 py-2 text-white rounded"
          style="background-color: var(--vt-c-accent)"
        >
          Submit
        </button>
      </form>

      <form @submit.prevent="signup" class="space-y-2 mb-6">
        <input
          v-model="newEmail"
          type="email"
          placeholder="New Email"
          class="w-full px-4 py-2 border rounded"
        />
        <input
          v-model="newPassword"
          type="password"
          placeholder="New Password"
          class="w-full px-4 py-2 border rounded"
        />
        <input
          v-model="fullName"
          type="text"
          placeholder="Full Name"
          class="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          class="w-full px-4 py-2 text-white rounded"
          style="background-color: var(--vt-c-accent)"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')

const newEmail = ref('')
const newPassword = ref('')
const fullName = ref('')

const login = async () => {
  const success = await auth.signInWithPassword(email.value, password.value)
  if (success) {
    router.push('/home')
  } else {
    console.error('Login failed, please check your credentials.')
  }
}

const signup = async () => {
  await auth.signUp(newEmail.value, newPassword.value, fullName.value)
}
</script>

<style>
@media screen and (max-width: 1024px) {
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    margin: 0;
  }
}
</style>
