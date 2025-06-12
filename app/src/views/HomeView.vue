<template>
  <div class="min-h-screen px-6 pt-20">
    <header class="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div class="px-16 py-4 flex items-center justify-between">
        <div class="text-2xl font-extrabold">Journally</div>

        <div class="ml-auto flex items-center space-x-6">
          <RouterLink to="/home" class="hover:font-bold">Home</RouterLink>
          <RouterLink to="/entry" class="hover:font-bold">Journal</RouterLink>
          <RouterLink to="/calendar" class="hover:font-bold">Calendar</RouterLink>
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

    <div class="min-h-screen px-6">
      <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-10">
        <div class="flex items-center space-x-6 mb-8">
          <img
            v-if="profile.avatar_url"
            :src="profile.avatar_url"
            alt="User Avatar"
            class="w-24 h-24 rounded-full object-cover shadow"
          />
          <div
            v-else
            class="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center text-2xl font-bold text-white shadow"
          >
            {{ initials }}
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-800">{{ profile.full_name || 'Your Name' }}</h2>
            <p class="text-gray-500">{{ auth.user?.email }}</p>
          </div>
        </div>

        <div class="flex items-center space-x-4 mt-4 space-y-5">
          <input
            v-model="avatarUrl"
            type="url"
            placeholder="Paste image URL"
            class="flex-1 border border-gray-300 rounded px-4 py-2"
          />
          <button
            @click="setAvatar"
            class="-mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Use This Avatar
          </button>
        </div>

        <div class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              v-model="profile.full_name"
              type="text"
              :disabled="!isEditing"
              @input="onEdit"
              class="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              v-model="profile.bio"
              :disabled="!isEditing"
              @input="onEdit"
              class="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="Write a short bio..."
              rows="4"
            ></textarea>
          </div>
        </div>

        <div class="mt-6 text-right">
          <button
            @click="handleButtonClick"
            :disabled="saving"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition disabled:opacity-50"
          >
            {{
              isEditing
                ? hasEdits
                  ? saving
                    ? 'Saving...'
                    : 'Save Changes'
                  : 'Save Changes'
                : 'Edit'
            }}
          </button>
        </div>
      </div>
    </div>
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
