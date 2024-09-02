<template>
  <div class="question-banks">
    <h1>题库列表</h1>
    <BankSelection :banks="questionBanks" />
    <BankList :banks="questionBanks" @select-bank="selectBank" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BankList from '../components/QuestionBank/BankList.vue';
import BankSelection from '../components/QuestionBank/BankSelection.vue';

const store = useStore();
const router = useRouter();

const questionBanks = computed(() => store.getters['questionBank/allQuestionBanks']);

onMounted(async () => {
  await store.dispatch('questionBank/fetchQuestionBanks');
});

const selectBank = async (bankId: string) => {
  console.log('Selected Bank ID:', bankId); // 添加日志记录
  if (!bankId) return; // 确保 bankId 不为空
  await store.dispatch('questionBank/selectQuestionBank', bankId);
  router.push('/quiz');
};
</script>
