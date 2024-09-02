<template>
  <div id="app">
    <nav v-if="isLoggedIn">
      <router-link to="/">首页</router-link> |
      <router-link to="/question-banks">题库</router-link> |
      <router-link to="/statistics">统计</router-link> |
      <Logout />
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import Logout from './components/Auth/Logout.vue'

const store = useStore()
const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
</script>

<style>
@import './assets/styles/main.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
