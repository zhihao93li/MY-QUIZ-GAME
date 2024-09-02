import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import QuestionBanks from '../views/QuestionBanks.vue'
import Quiz from '../views/Quiz.vue'
import Statistics from '../views/Statistics.vue'
import { auth } from '../services/firebase'
import { onAuthStateChanged } from 'firebase/auth'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Auth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      next('/auth');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
