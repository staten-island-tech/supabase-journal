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

    <div class="flex items-center space-x-6 mb-6">
      <img
        v-if="profile.avatar_url"
        :src="profile.avatar_url"
        alt="User Avatar"
        class="w-24 h-24 rounded-full object-cover"
      />
      <div
        v-else
        class="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white"
      >
        {{ initials }}
      </div>

      <div>
        <p class="text-xl font-semibold">{{ profile.full_name }}</p>
        <p class="text-gray-500" data-v-inspector="src/views/HomeView.vue:46:9">
          {{ auth && auth.user ? auth.user.email : '' }}
        </p>
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Bio:</label>
        <textarea
          v-model="profile.bio"
          class="w-full border p-3 rounded"
          placeholder="Write a short bio..."
        ></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium">Location:</label>
        <input
          v-model="profile.location"
          type="text"
          class="w-full border p-3 rounded"
          placeholder="City, Country"
        />
      </div>
    </div>

    <button
      @click="saveProfile"
      class="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
    >
      Save Changes
    </button>
    <h1>Welcome!</h1>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router = useRouter()
const auth = useAuthStore()
const handleSignOut = async () => {
  await auth.signOut()
  router.push('/')
}

async function getUserId() {
  const result = await supabase.auth.getUser()
  if (!result.data.user) return null
  return result.data.user.id
}

const profile = ref({
  full_name: '',
  avatar_url: null,
  bio: '',
})

const initials = computed(() => {
  const name = profile.value.full_name || ''
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
})

onMounted(async () => {
  console.log('auth.user:', auth.user)
  await auth.fetchUser()
  const userId = await getUserId()
  if (!auth.user) return

  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, bio, location')
    .eq('id', userId)
    .single()

  if (!error && data) {
    profile.value = { ...profile.value, ...data }
  }
})

async function saveProfile() {
  const updates = {
    id: auth.user.id,
    full_name: profile.value.full_name,
    avatar_url: profile.value.avatar_url,
    bio: profile.value.bio,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('profiles').upsert(updates)
  if (error) {
    alert('Error saving profile: ' + error.message)
  } else {
    alert('Profile updated!')
  }
}
</script>
