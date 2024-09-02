import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import QuestionBanks from '../views/QuestionBanks.vue'
import Quiz from '../views/Quiz.vue'
import Statistics from '../views/Statistics.vue'
import { auth } from '../services/firebase'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: defineAsyncComponent(() => import('../views/Home.vue')),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/question-banks',
    name: 'QuestionBanks',
    component: QuestionBanks,
    meta: { requiresAuth: true }
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz,
    meta: { requiresAuth: true }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = auth.currentUser

  if (requiresAuth && !isAuthenticated) {
    next('/auth')
  } else {
    next()
  }
})

export default router
