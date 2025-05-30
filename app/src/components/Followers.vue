<template>
  <div>
    <h2>Users to Follow</h2>
    <div v-for="user in users" :key="user.id"></div>
    <button @click="follow(user.id)">follow</button>
  </div>
</template>

<script>
import { SupabaseClient } from '@supabase/supabase-js'

const currentUser = await supabase.auth.admin.getUserById(1)

const { data: allUsers } = await supabase.from('users').select('id, email').neq('id', currentUser)

const { data: following } = await supabase
  .from('follows')
  .select('followee_id')
  .eq('follower_id', currentUser)
</script>

<style lang="scss" scoped></style>
