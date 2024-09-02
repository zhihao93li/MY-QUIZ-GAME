import { auth, googleProvider } from '../services/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const state: AuthState = {
  user: null,
  isLoggedIn: false
}

const mutations = {
  SET_USER(state: AuthState, user: User | null) {
    state.user = user
    state.isLoggedIn = !!user
  }
}

const actions = {
  async register({ commit }: { commit: Function }, { email, password }: { email: string; password: string }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      commit('SET_USER', userCredential.user)
    } catch (error) {
      console.error('注册失败:', error)
      throw error
    }
  },
  async login({ commit }: { commit: Function }, { email, password }: { email: string; password: string }) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      commit('SET_USER', userCredential.user)
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  },
  async logout({ commit }: { commit: Function }) {
    try {
      await signOut(auth)
      commit('SET_USER', null)
    } catch (error) {
      console.error('登出失败:', error)
      throw error
    }
  },
  async loginWithGoogle({ commit }) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      commit('SET_USER', user);
    } catch (error) {
      console.error('Google 登录失败:', error);
      throw error;
    }
  },
}

const getters = {
  isLoggedIn: (state: AuthState) => state.isLoggedIn,
  currentUser: (state: AuthState) => state.user
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
