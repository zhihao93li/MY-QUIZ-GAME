<template>
  <div class="user-progress">
    <h2>用户进度</h2>
    <el-progress
      :percentage="progressPercentage"
      :format="formatProgress"
      type="circle"
    ></el-progress>
    <p>已完成题目: {{ completedQuestions }} / {{ totalQuestions }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  completedQuestions: number;
  totalQuestions: number;
}

const props = defineProps<Props>();

const progressPercentage = computed(() => 
  (props.completedQuestions / props.totalQuestions) * 100
);

function formatProgress(percentage: number) {
  return `${percentage.toFixed(0)}%`;
}
</script>

<style scoped>
.user-progress {
  margin-bottom: 20px;
}
</style>
