<template>
  <div>
    <h2 v-if="auth.value">Welcome, {{ auth.user.email }}</h2>

    <div v-else>
      <input v-model="email" type="email" placeholder="email" />
      <input v-model="password" type="password" placeholder="password" />
      <p v-if="auth.error">Error</p>
    </div>
  </div>
</template>

<script></script>

<style></style>
