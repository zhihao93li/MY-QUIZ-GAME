<template>
  <div class="question-display">
    <h2>问题 {{ questionNumber }}</h2>
    <p>{{ question.content }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Question {
  id: string;
  content: string;
  optionA: string;
  optionB: string;
}

interface Props {
  question: Question;
  questionNumber: number;
}

const props = defineProps<Props>();
</script>

<style scoped>
.question-display {
  margin-bottom: 20px;
}
</style>
