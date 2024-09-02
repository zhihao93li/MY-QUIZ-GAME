<template>
  <div class="bank-list">
    <el-card v-for="bank in banks" :key="bank._id" class="bank-item">
      <h3>{{ bank.name }}</h3>
      <p>{{ bank.description }}</p>
      <el-button @click="selectBank(bank._id)" type="primary">选择题库</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
interface QuestionBank {
  _id: string;
  name: string;
  description: string;
}

interface Props {
  banks: QuestionBank[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'select-bank', bankId: string): void;
}>();

const selectBank = (bankId: string) => {
  console.log('Selected Bank ID:', bankId); // 添加日志记录
  emit('select-bank', bankId);
};
</script>

<style scoped>
.bank-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.bank-item {
  text-align: left;
}
</style>
