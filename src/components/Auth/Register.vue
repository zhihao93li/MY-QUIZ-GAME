<template>
  <div class="register">
    <h2>注册</h2>
    <el-form @submit.prevent="register">
      <el-form-item label="邮箱">
        <el-input v-model="email" type="email" required></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">注册</el-button>
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

const register = async () => {
  try {
    await store.dispatch('auth/register', {
      email: email.value,
      password: password.value
    });
    router.push('/');
  } catch (error) {
    console.error('注册失败:', error);
  }
};
</script>
