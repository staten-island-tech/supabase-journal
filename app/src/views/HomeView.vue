<template>
  <div class="min-h-screen flex flex-col">
    <header class="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div class="px-16 py-4 flex items-center justify-between">
        <div class="text-2xl font-extrabold">Journally</div>

        <div class="ml-auto flex items-center space-x-6">
          <RouterLink to="/home" class="hover:font-bold">Home</RouterLink>
          <RouterLink to="/entry" class="hover:font-bold">Journal</RouterLink>
          <RouterLink to="/calendar" class="hover:font-bold">Calendar</RouterLink>
          <div v-if="auth.user" class="flex items-center space-x-4">
            <p>Welcome, {{ auth.user.full_name }}</p>
            <button
              @click="handleSignOut"
              class="px-4 py-2 text-white rounded"
              style="background-color: var(--vt-c-primary)"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="flex-grow mt-20">
      <RouterView />
    </main>

    <h1>Welcome!</h1>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()
const handleSignOut = async () => {
  await auth.signOut()
  router.push('/')
}
</script>
