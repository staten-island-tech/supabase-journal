<template>
  <div>
    <h1>Login</h1>
    <div v-if="auth.user">
      <p>Welcome, {{ auth.user.email }}</p>
      <button @click="auth.signOut">Sign Out</button>
    </div>

    <div v-else>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="handleSignIn">Sign In</button>
    </div>

    <form class="form">
      <label class="" for="email">Email:</label>
      <input type="text" name="email" placeholder="Email" />

      <label class="" for="password">Password:</label>
      <input type="text" name="password" placeholder="Password" />

      <input type="submit" id="button" value="submit" />
    </form>
  </div>
  <div class="sign-up">
    <form class="form">
      <label class="" for="username">Username:</label>
      <input type="text" name="username" placeholder="Username" />

      <label class="" for="age">Age:</label>
      <input type="number" name="age" placeholder="Age" />

      <label class="" for="email">Email:</label>
      <input type="text" name="email" placeholder="Email" />

      <input type="submit" id="button" value="submit" />
    </form>
  </div>
</template>

<script setup></script>

<style lang="" scoped></style>
