<template>
  <div>
    <h2>Users to Follow</h2>
    <div v-for="user in users" :key="user.id"></div>
<<<<<<< Updated upstream
=======
    <button @click="follow(user.id)">follow</button>
    {{ isFollowing(user.id) ? 'Unfollow' : 'Follow' }}
>>>>>>> Stashed changes
  </div>
</template>

<script>
import { SupabaseClient } from '@supabase/supabase-js'

const currentUser = await supabase.auth.admin.getUserById(1)
const users =
const followedusers=

const { data: allUsers } = await supabase.from('users').select('id, email').neq('id', currentUser)

const { data: following } = await supabase
  .from('follows')
  .select('followee_id')
  .eq('follower_id', currentUser)

function follow() {}
</script>

<style lang="scss" scoped></style>
