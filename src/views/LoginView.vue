<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  // Hardcoded credentials
  if (username.value === 'user' && password.value === 'password') {
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/about');
  } else {
    alert('Invalid credentials');
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.login div {
  margin-bottom: 10px;
}
</style>