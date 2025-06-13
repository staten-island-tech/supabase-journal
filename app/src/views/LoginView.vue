<template>
  <div class="min-h-screen flex flex-col items-center text-center p-4">
    <div v-if="auth.user" class="flex items-center space-x-4">
      <p>Welcome, {{ auth.user.fullName }}</p>
      <button
        @click="handleSignOut"
        class="px-4 py-2 text-white rounded"
        style="background-color: var(--vt-c-primary)"
        aria-label="Sign out"
      >
        Sign out
      </button>
    </div>

    <div v-else class="w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4">Please Log In</h1>

      <form @submit.prevent="login" class="space-y-2 mb-6" aria-label="Login form">
        <div class="text-left">
          <label for="login-email" class="block text-sm font-medium">Email</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div class="text-left">
          <label for="login-password" class="block text-sm font-medium">Password</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 text-white rounded"
          style="background-color: var(--vt-c-accent)"
          aria-label="Submit login"
        >
          Submit
        </button>
      </form>

      <form @submit.prevent="signup" class="space-y-2 mb-6" aria-label="Sign up form">
        <div class="text-left">
          <label for="signup-email" class="block text-sm font-medium">New Email</label>
          <input
            id="signup-email"
            v-model="newEmail"
            type="email"
            placeholder="New Email"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div class="text-left">
          <label for="signup-password" class="block text-sm font-medium">New Password</label>
          <input
            id="signup-password"
            v-model="newPassword"
            type="password"
            placeholder="New Password"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div class="text-left">
          <label for="signup-fullname" class="block text-sm font-medium">Full Name</label>
          <input
            id="signup-fullname"
            v-model="fullName"
            type="text"
            placeholder="Full Name"
            class="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 text-white rounded"
          style="background-color: var(--vt-c-accent)"
          aria-label="Sign up"
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

const handleSignOut = async () => {
  await auth.signOut()
  router.push('/')
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
