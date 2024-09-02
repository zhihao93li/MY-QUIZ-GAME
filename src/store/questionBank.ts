import { fetchQuestionBanks, fetchQuestionBank } from '../services/api';

interface QuestionBank {
  _id: string;
  name: string;
  description: string;
}

interface QuestionBankState {
  questionBanks: QuestionBank[];
  currentBank: QuestionBank | null;
}

const state: QuestionBankState = {
  questionBanks: [],
  currentBank: null,
};

const mutations = {
  SET_QUESTION_BANKS(state: QuestionBankState, banks: QuestionBank[]) {
    state.questionBanks = banks;
  },
  SET_CURRENT_BANK(state: QuestionBankState, bank: QuestionBank) {
    state.currentBank = bank;
  },
};

const actions = {
  async fetchQuestionBanks({ commit }: { commit: Function }) {
    try {
      const response = await fetchQuestionBanks();
      commit('SET_QUESTION_BANKS', response.data);
    } catch (error) {
      console.error('获取题库列表失败:', error);
      throw error;
    }
  },
  async selectQuestionBank({ commit }: { commit: Function }, bankId: string) {
    console.log('Fetching Question Bank:', bankId); // 添加日志记录
    try {
      const response = await fetchQuestionBank(bankId);
      commit('SET_CURRENT_BANK', response.data);
    } catch (error) {
      console.error('选择题库失败:', error);
      throw error;
    }
  },
};

const getters = {
  allQuestionBanks: (state: QuestionBankState) => state.questionBanks,
  currentBank: (state: QuestionBankState) => state.currentBank,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
