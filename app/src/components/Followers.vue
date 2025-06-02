<template>
  <div>
    <h2>Journly Users</h2>
    <div v-for="user in users" :key="user.id">
      <p>Username: {{ user.full_name }}</p>
    </div>
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
