<template>
  <div class="login">
    <h2>登录</h2>
    <el-form @submit.prevent="login">
      <el-form-item label="邮箱">
        <el-input v-model="email" type="email" required></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const login = async () => {
  try {
    await store.dispatch('auth/login', {
      email: email.value,
      password: password.value
    });
    router.push('/');
  } catch (error) {
    console.error('登录失败:', error);
  }
};
</script>
