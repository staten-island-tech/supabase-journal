<template>
  <div>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/login">Login</RouterLink>
        </nav>
        <RouterView />
      </div>
    </header>
    <h1>Journally</h1>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped></style>
