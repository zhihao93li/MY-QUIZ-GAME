<template>
  <el-button @click="logout">登出</el-button>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const logout = async () => {
  try {
    await store.dispatch('auth/logout');
    router.push('/login');
  } catch (error) {
    console.error('登出失败:', error);
  }
};
</script>
