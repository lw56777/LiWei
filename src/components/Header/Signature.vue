<script setup lang="ts">
import {
  ref,
  onMounted
} from 'vue';

const canvasRef = ref();

onMounted(() => {});
</script>

<template>
  <canvas
    ref="canvasRef"
    w-25
    h-10
  />
</template>

<style scoped lang="scss">
</style>