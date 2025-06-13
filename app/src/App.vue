<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/"></RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/entry">Journal</RouterLink>
        <RouterLink to="/calendar">Calendar</RouterLink>
        <RouterLink to="/follower">Followers List</RouterLink>
        <RouterLink to="followerjournals">View Other Journals</RouterLink>
      </nav>
      <RouterView />
    </div>
  </header>
  <div class="font-sans">
    <RouterView />
  </div>
</template>

<style scoped></style>
