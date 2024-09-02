<template>
  <div class="bank-selection">
    <h2>选择题库</h2>
    <el-select v-model="selectedBankId" placeholder="请选择题库" @change="selectBank">
      <el-option
        v-for="bank in banks"
        :key="bank._id"
        :label="bank.name"
        :value="bank._id"
      >
        <span>{{ bank.name }}</span>
        <span class="bank-description">{{ bank.description }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

interface QuestionBank {
  _id: string;
  name: string;
  description: string;
}

interface Props {
  banks: QuestionBank[];
}

const props = defineProps<Props>();
const store = useStore();
const router = useRouter();

const selectedBankId = ref('');

const selectBank = async () => {
  console.log('Selected Bank ID:', selectedBankId.value); // 添加日志记录
  if (!selectedBankId.value) return; // 确保 bankId 不为空
  await store.dispatch('questionBank/selectQuestionBank', selectedBankId.value);
  router.push('/quiz');
};
</script>

<style scoped>
.bank-selection {
  margin: 20px 0;
}

.bank-description {
  font-size: 0.8em;
  color: #999;
  margin-left: 10px;
}

.el-select {
  width: 100%;
  max-width: 400px;
}
</style>
