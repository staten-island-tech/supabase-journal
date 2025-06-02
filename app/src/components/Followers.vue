<template>
  <div>
    <h2>Journly Users</h2>
    <p v-for="user in users" :key="user.id" class="mb-2">
      Name: {{ user.full_name }} ({{ user.email }})
      <button class="bg-red-200" @click="follow(user.id)">Follow</button>
    </p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const users = ref([])

onMounted(async () => {
  const { data: userData } = await supabase.auth.getUser()
  const currentUserId = userData.user.id

  const { data: allUsers } = await supabase
    .from('users')
    .select('id, email, full_name')
    .neq('id', currentUserId)

  users.value = allUsers
})
</script>

<style scoped></style>
