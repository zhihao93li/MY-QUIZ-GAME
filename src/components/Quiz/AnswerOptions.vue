<template>
  <div class="answer-options">
    <el-button @click="submitAnswer('A')" type="primary">{{ question.optionA }}</el-button>
    <el-button @click="submitAnswer('B')" type="primary">{{ question.optionB }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

interface Question {
  id: string;
  content: string;
  optionA: string;
  optionB: string;
}

interface Props {
  question: Question;
}

const props = defineProps<Props>();
const emit = defineEmits(['submit-answer']);

function submitAnswer(answer: 'A' | 'B') {
  emit('submit-answer', answer);
}
</script>

<style scoped>
.answer-options {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
</style>
