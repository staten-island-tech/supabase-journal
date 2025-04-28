<template>
<div class="container">
<h>Please Login!</h>
<div v-if="auth.user">
    <p>Welcome, {{ auth.user.email }}</p>
    <button @submit.prevent="auth.signOut">Sign Out</button>
</div>
<div v-else>
  <form @submit.prevent="auth.signInWithPassword">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Submit</button>
  </form>

</div>


</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const auth = useAuthStore()
const email = ref('')
const password = ref('')
</script>
