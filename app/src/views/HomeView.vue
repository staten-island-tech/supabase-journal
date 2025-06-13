<template>
  <div class="min-h-screen flex flex-col">
    <header class="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div class="px-16 py-4 flex items-center justify-between">
        <div class="text-2xl font-extrabold">Journally</div>

        <div class="ml-auto flex items-center space-x-6">
          <RouterLink to="/home" class="hover:font-bold">Home</RouterLink>
          <RouterLink to="/entry" class="hover:font-bold">Journal</RouterLink>
          <RouterLink to="/calendar" class="hover:font-bold">Calendar</RouterLink>
          <RouterLink to="/follower" class="hover:font-bold">Followers List</RouterLink>
          <RouterLink to="followerjournals" class="hover:font-bold">View Other Journals</RouterLink>
          <div v-if="auth.user" class="flex items-center space-x-4">
            <p>Welcome, {{ auth.user.full_name || auth.user.email }}</p>
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
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const router = useRouter()
const auth = useAuthStore()
const saving = ref(false)
const isEditing = ref(false)
const hasEdits = ref(false)
const avatarUrl = ref('')

const handleSignOut = async () => {
  await auth.signOut()
  router.push('/')
}

async function getUserId() {
  const result = await supabase.auth.getUser()
  if (!result.data.user) return null
  return result.data.user.id
}

const loadProfile = async () => {
  await auth.fetchUser()
  if (!auth.user) {
    router.push('/login')
    return
  }
  const userId = await getUserId()
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, bio')
    .eq('id', userId)
    .single()

  if (!error && data) {
    profile.value = { ...profile.value, ...data }
  }
}

const profile = ref({
  avatar_url: '',
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
  loadProfile()
})

const setAvatar = () => {
  if (!isEditing.value) return alert('Click Edit first.')
  if (!avatarUrl.value) return alert('Please paste an image URL.')

  profile.value.avatar_url = avatarUrl.value
  hasEdits.value = true
  alert('Avatar set from URL!')
}

const onEdit = () => {
  if (!isEditing.value) isEditing.value = true
  hasEdits.value = true
}

const saveProfile = async () => {
  if (!auth.user) {
    alert('No user logged in.')
    return
  }

  saving.value = true

  const updates = {
    id: auth.user.id,
    full_name: profile.value.full_name,
    avatar_url: profile.value.avatar_url,
    bio: profile.value.bio,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('profiles').upsert(updates)

  saving.value = false

  if (error) {
    alert('Error saving profile: ' + error.message)
  } else {
    alert('Profile updated!')
    hasEdits.value = false
    isEditing.value = false
  }
}

const handleButtonClick = async () => {
  if (!isEditing.value) {
    isEditing.value = true
  } else {
    if (!hasEdits.value) {
      isEditing.value = false
      return
    }
    await saveProfile()
  }
}
</script>
