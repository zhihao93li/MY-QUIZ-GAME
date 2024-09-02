<template>
  <div class="progress-bar">
    <el-progress :percentage="percentage" :format="format" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  current: number;
  total: number;
}

const props = defineProps<Props>();

const percentage = computed(() => (props.current / props.total) * 100);

function format(percentage: number) {
  return `${props.current} / ${props.total}`;
}
</script>

<style scoped>
.progress-bar {
  margin-bottom: 20px;
}
</style>
