<script setup lang="ts">
import { Flag } from '@element-plus/icons-vue';
import { getRandomInt } from '@/utils/tools';

defineProps({
  text: String,
  top: String,
  left: String
});

const color = `rgba(${ getRandomInt(0, 255) }, ${ getRandomInt(0, 255) }, ${ getRandomInt(0, 255)})`;
</script>

<template>
  <div
    class="csv-text"
    pos-absolute
  >
    <el-icon><Flag /></el-icon>
    {{ text }}
    <el-icon><Flag /></el-icon>
  </div>
</template>

<style scoped lang="scss">
.csv-text {
  color: v-bind(color);
  text-wrap: nowrap;
  top: v-bind(top);
  left: v-bind(left);
  z-index: -1;
  animation: upFade 1.5s ease-in-out forwards;
}

@keyframes upFade {
  to {
    transform: translateY(-120px);
    opacity: 0;
    z-index: 999;
  }
}
</style>