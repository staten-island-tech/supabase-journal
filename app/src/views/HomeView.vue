<template>
  <div class="min-h-screen flex flex-col items-center text-center p-4">
    <h1>Welcome {user.full_name}!</h1>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const { user } = useAuthStore()
</script>
