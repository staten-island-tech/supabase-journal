<template>
  <div>
    <<<<<<< HEAD
    <h2>Users to Follow</h2>
    <div v-for="user in users" :key="user.id"></div>
    <<<<<<< Updated upstream =======
    <button @click="follow(user.id)">follow</button>
    {{ isFollowing(user.id) ? 'Unfollow' : 'Follow' }}
    <<<<<<< Updated upstream >>>>>>> Stashed changes ======= >>>>>>> Stashed changes =======
    <h2>Journly Users</h2>
    <div v-for="user in users" :key="user.id">
      <p>Username: {{ user.full_name }}</p>
    </div>
    >>>>>>> 53bf9387d67899e8bc4261b4019d5566e847f01d
  </div>
</template>
<script>
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
