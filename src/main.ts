import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './services/firebase'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/main.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)

store.dispatch('auth/subscribeToAuthChanges')

app.mount('#app')
