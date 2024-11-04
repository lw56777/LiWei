<script setup lang="ts">
import { Flag } from '@element-plus/icons-vue';

defineProps({
  text: String,
  color: String,
  top: String,
  left: String
});
</script>

<template>
  <div
    class="csv-text"
    pos-fixed
  >
    <el-icon><Flag /></el-icon>
    {{ text }}
    <el-icon><Flag /></el-icon>
  </div>
</template>

<style scoped lang="scss">
.csv-text {
  color: v-bind(color);
  top: v-bind(top);
  left: v-bind(left);
  animation: upFade 2s ease-in-out forwards;
}

@keyframes upFade {
  to {
    transform: translateY(-100px);
    opacity: 0;
  }
}
</style>