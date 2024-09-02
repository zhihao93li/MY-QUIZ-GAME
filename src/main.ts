import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './services/firebase'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/main.css'

let app: ReturnType<typeof createApp> | null = null;

auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('auth/SET_USER', user);
  } else {
    store.commit('auth/SET_USER', null);
  }

  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.mount('#app');
  }
});
