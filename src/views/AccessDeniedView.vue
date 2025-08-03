<template>
  <div class="access-denied">
    <h1>Access Denied</h1>
    <p>You must be logged in to view this page.</p>
    <router-link to="/login">Go to Login</router-link>
  </div>
</template>

<style scoped>
.access-denied {
  text-align: center;
  margin-top: 50px;
}
</style>