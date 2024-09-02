<template>
  <div class="quiz">
    <h1>{{ currentBank.name }}</h1>
    <ProgressBar :current="currentQuestionIndex + 1" :total="currentQuestions.length" />
    <QuestionDisplay
      v-if="!isQuizFinished"
      :question="currentQuestion"
      :questionNumber="currentQuestionIndex + 1"
    />
    <AnswerOptions
      v-if="!isQuizFinished"
      :question="currentQuestion"
      @submit-answer="submitAnswer"
    />
    <SimilarPathsCounter :count="similarPaths" />
    <el-button v-if="isQuizFinished" @click="finishQuiz">完成答题</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ProgressBar from '../components/Quiz/ProgressBar.vue';
import QuestionDisplay from '../components/Quiz/QuestionDisplay.vue';
import AnswerOptions from '../components/Quiz/AnswerOptions.vue';
import SimilarPathsCounter from '../components/Quiz/SimilarPathsCounter.vue';

const store = useStore();
const router = useRouter();

const currentBank = computed(() => store.state.questionBank.currentBank);
const currentQuestion = computed(() => store.getters['quiz/currentQuestion']);
const currentQuestionIndex = computed(() => store.state.quiz.currentQuestionIndex);
const currentQuestions = computed(() => store.state.quiz.currentQuestions);
const isQuizFinished = computed(() => store.getters['quiz/isQuizFinished']);
const similarPaths = computed(() => store.state.quiz.similarPaths);

onMounted(async () => {
  try {
    if (!currentBank.value) {
      router.push('/question-banks');
      return;
    }
    await store.dispatch('quiz/fetchQuestions', currentBank.value._id);
    await store.dispatch('quiz/fetchUserProgress');
    await store.dispatch('quiz/fetchSimilarPaths');
  } catch (error) {
    console.error('加载题目失败:', error);
    // 可以添加错误提示或其他错误处理逻辑
  }
});

async function submitAnswer(answer: string) {
  await store.dispatch('quiz/submitAnswer', {
    questionId: currentQuestion.value.id,
    answer,
  });
}

function finishQuiz() {
  router.push('/statistics');
}
</script>
