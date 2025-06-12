<template>
  <div class="min-h-screen flex flex-col">
    <header class="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div class="px-16 py-4 flex items-center justify-between">
        <div class="text-2xl font-extrabold">Journally</div>

        <div class="ml-auto flex items-center space-x-6">
          <RouterLink to="/home" class="hover:font-bold">Home</RouterLink>
          <RouterLink to="/entry" class="hover:font-bold">Journal</RouterLink>
          <RouterLink to="/calendar" class="hover:font-bold">Calendar</RouterLink>
          <div v-if="user" class="flex items-center space-x-4">
            <p>Welcome, {{ user.full_name }}</p>
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
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const router = useRouter()
const auth = useAuthStore()
const handleSignOut = async () => {
  await auth.signOut()
  router.push('/')
}

onMounted(async () => {
  const { data: userData } = await supabase.auth.getUser()
  const userId = userData?.user?.id

  const user = ref(null)

  if (userId) {
    const { data: userData, error } = await supabase.from('profiles').select().eq('id', userId)

    if (!error) {
      user.value = userData
    }
  }
})
</script>
