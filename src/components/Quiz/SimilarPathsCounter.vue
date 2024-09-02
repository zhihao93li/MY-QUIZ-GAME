<template>
  <div class="similar-paths-counter">
    <p>与您答题路径相同的用户数: {{ count }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count: number;
}

const props = defineProps<Props>();
</script>

<style scoped>
.similar-paths-counter {
  margin-top: 20px;
  font-weight: bold;
}
</style>
