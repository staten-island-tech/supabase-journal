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
  const { data: userdata } = await supabase.auth.getUser()
  const currentUserId = userdata.user.id

  const { data: allUsers } = await supabase
    .from('users')
    .select('id, email, full_name')
    .neq('id', currentUserId)

  users.value = allUsers
})

async function follow(followeeId) {
  const { data: userData } = await supabase.auth.getUser()
  const followerId = userData.user.id

  await supabase.from('follows').insert([{ follower_id: followerId, followee_id: followeeId }])
}
</script>

<style scoped></style>
