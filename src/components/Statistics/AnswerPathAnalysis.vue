<template>
  <div class="answer-path-analysis">
    <h2>答题路径分析</h2>
    <el-table :data="answerPath" style="width: 100%">
      <el-table-column prop="questionNumber" label="题号" width="180"></el-table-column>
      <el-table-column prop="answer" label="您的答案" width="180"></el-table-column>
      <el-table-column prop="correctAnswer" label="正确答案"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
interface AnswerPathItem {
  questionNumber: number;
  answer: string;
  correctAnswer: string;
}

interface Props {
  answerPath: AnswerPathItem[];
}

defineProps<Props>();
</script>

<style scoped>
.answer-path-analysis {
  margin-top: 20px;
}
</style>
