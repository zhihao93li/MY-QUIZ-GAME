<template>
  <div class="auth">
    <h2>{{ isLogin ? '登录' : '注册' }}</h2>
    <el-form @submit.prevent="handleSubmit">
      <el-form-item label="邮箱">
        <el-input v-model="email" type="email" required></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{ isLogin ? '登录' : '注册' }}</el-button>
      </el-form-item>
    </el-form>
    <p>
      {{ isLogin ? '没有账号?' : '已有账号?' }}
      <a href="#" @click.prevent="toggleAuthMode">{{ isLogin ? '注册' : '登录' }}</a>
    </p>
    <el-button @click="handleGoogleLogin">使用 Google 账号登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const isLogin = ref(true)

const handleSubmit = async () => {
  try {
    if (isLogin.value) {
      await store.dispatch('auth/login', { email: email.value, password: password.value })
    } else {
      await store.dispatch('auth/register', { email: email.value, password: password.value })
    }
    router.push('/')
  } catch (error) {
    console.error('认证失败:', error)
    // 这里可以添加错误处理,比如显示错误消息
  }
}

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
}

const handleGoogleLogin = async () => {
  try {
    await store.dispatch('auth/loginWithGoogle')
    router.push('/')
  } catch (error) {
    console.error('Google 登录失败:', error)
    // 这里可以添加错误处理，比如显示错误消息
  }
}
</script>
