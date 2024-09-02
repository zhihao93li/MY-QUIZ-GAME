import { ActionContext } from 'vuex/types';
import { fetchQuestions, submitAnswer, fetchUserProgress, fetchSimilarPaths } from '../services/api';

interface QuizState {
  currentQuestions: Question[];
  currentQuestionIndex: number;
  userAnswers: string[];
  userProgress: UserProgress | null;
  similarPaths: number;
}

interface Question {
  id: string;
  content: string;
  optionA: string;
  optionB: string;
}

interface UserProgress {
  completedQuestions: number;
  totalQuestions: number;
}

interface RootState {
  auth: {
    user: {
      uid: string;
    };
  };
  questionBank: {
    currentBank: {
      _id: string;
    };
  };
}

const state: QuizState = {
  currentQuestions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  userProgress: null,
  similarPaths: 0,
};

const mutations = {
  SET_QUESTIONS(state: QuizState, questions: Question[]) {
    state.currentQuestions = questions;
    state.currentQuestionIndex = 0;
    state.userAnswers = [];
  },
  SET_CURRENT_QUESTION_INDEX(state: QuizState, index: number) {
    state.currentQuestionIndex = index;
  },
  ADD_USER_ANSWER(state: QuizState, answer: string) {
    state.userAnswers.push(answer);
  },
  SET_USER_PROGRESS(state: QuizState, progress: UserProgress) {
    state.userProgress = progress;
  },
  SET_SIMILAR_PATHS(state: QuizState, count: number) {
    state.similarPaths = count;
  },
};

const actions = {
  async fetchQuestions({ commit }: ActionContext<QuizState, RootState>, bankId: string) {
    try {
      const response = await fetchQuestions(bankId);
      commit('SET_QUESTIONS', response.data);
    } catch (error) {
      console.error('获取题目失败:', error);
      throw error;
    }
  },
  async submitAnswer({ commit, state, dispatch, rootState }: ActionContext<QuizState, RootState>, { questionId, answer }: { questionId: string; answer: string }) {
    try {
      const userId = rootState.auth.user.uid;
      const bankId = rootState.questionBank.currentBank._id;
      await submitAnswer({ userId, bankId, questionId, answer });
      commit('ADD_USER_ANSWER', answer);
      const newIndex = state.currentQuestionIndex + 1;
      commit('SET_CURRENT_QUESTION_INDEX', newIndex);
      await dispatch('fetchSimilarPaths');
      if (newIndex >= state.currentQuestions.length) {
        await dispatch('fetchUserProgress');
      }
    } catch (error) {
      console.error('提交答案失败:', error);
      throw error;
    }
  },
  async fetchUserProgress({ commit, rootState }: ActionContext<QuizState, RootState>) {
    try {
      const userId = rootState.auth.user.uid;
      const bankId = rootState.questionBank.currentBank._id;
      const response = await fetchUserProgress(userId, bankId);
      commit('SET_USER_PROGRESS', response.data);
    } catch (error) {
      console.error('获取用户进度失败:', error);
      throw error;
    }
  },
  async fetchSimilarPaths({ commit, rootState }: ActionContext<QuizState, RootState>) {
    try {
      const userId = rootState.auth.user.uid;
      const bankId = rootState.questionBank.currentBank._id;
      const response = await fetchSimilarPaths(userId, bankId);
      commit('SET_SIMILAR_PATHS', response.data.count);
    } catch (error) {
      console.error('获取相似路径数失败:', error);
      throw error;
    }
  },
};

const getters = {
  currentQuestion: (state: QuizState) => state.currentQuestions[state.currentQuestionIndex],
  isQuizFinished: (state: QuizState) => state.currentQuestionIndex >= state.currentQuestions.length,
  userAnswerPath: (state: QuizState) => state.userAnswers.join(''),
  answerPathAnalysis: (state: QuizState) => {
    return state.currentQuestions.map((question, index) => ({
      questionNumber: index + 1,
      answer: state.userAnswers[index] || '-',
    }));
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
