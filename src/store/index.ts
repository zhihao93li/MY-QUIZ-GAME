import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from './auth'
import questionBank from './questionBank'
import quiz from './quiz'

export default createStore({
  modules: {
    auth,
    questionBank,
    quiz
  },
  plugins: [createPersistedState()]
})
