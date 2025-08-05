
<template>
  <div class="main-container">
    <header>
      <BHeader />
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link v-if="isAuthenticated" to="/about">About</router-link>
        <router-link to="/GetAllBookAPI">Get All Books API</router-link>
        <span v-if="isAuthenticated"> | <button @click="logout">Logout</button></span>
        <router-link v-else to="/login">Login</router-link>
      </nav>
    </header>
    <main class="main-box">
      <router-view></router-view>
      <!-- <JSONLab /> -->
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import BHeader from './components/BHeader.vue';

const router = useRouter();

const isAuthenticated = computed(() => {
  return localStorage.getItem('isAuthenticated') === 'true';
});

const logout = () => {
  localStorage.removeItem('isAuthenticated');
  router.push('/login');
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
} 

.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(255, 255, 255); /* 设置背景颜色，可根据需求修改 */
  z-index: 1000; /* 设置 z-index，确保导航栏显示在其他元素之上 */
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  header .nav{
    display: flex;
    place-items: center;
    flex-wrap: wrap;
  }
}
</style>
