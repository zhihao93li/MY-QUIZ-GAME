<template>
  <div class="statistics">
    <h1>统计信息</h1>
    <UserProgress
      :completedQuestions="completedQuestions"
      :totalQuestions="totalQuestions"
    />
    <AnswerPathAnalysis :answerPath="answerPath" />
    <el-button @click="goBack">返回题库</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import UserProgress from '../components/Statistics/UserProgress.vue';
import AnswerPathAnalysis from '../components/Statistics/AnswerPathAnalysis.vue';

const store = useStore();
const router = useRouter();

const completedQuestions = computed(() => store.state.quiz.userAnswers.length);
const totalQuestions = computed(() => store.state.quiz.currentQuestions.length);
const answerPath = computed(() => store.getters['quiz/answerPathAnalysis']);

onMounted(async () => {
  if (!store.state.questionBank.currentBank) {
    router.push('/question-banks');
    return;
  }
  await store.dispatch('quiz/fetchUserProgress');
  await store.dispatch('quiz/fetchSimilarPaths');
});

function goBack() {
  router.push('/question-banks');
}
</script>
