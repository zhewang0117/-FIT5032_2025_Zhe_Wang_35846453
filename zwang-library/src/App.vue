<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import NavigationBar from './components/NavigationBar.vue'
import JSON from './components/JSON.vue'
</script>

<template>
  <header>
    
  </header>

  <main>
    <JSON/>  
  </main>
</template>

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
