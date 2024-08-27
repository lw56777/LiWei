<script setup lang="ts">
import {
  ref,
  onMounted
} from 'vue';
import { CLightning } from '@/classes/lightning';

const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  const branch = new CLightning(canvasRef.value!);
  branch.play();
});
</script>

<template>
  <div
    class="background"
    w-screen
    h-screen
    pos-fixed
    inset-0
  >
    <canvas ref="canvasRef" />
  </div>
</template>

<style scoped lang="scss">
.background {
  z-index: -999;

  .fade-out {
    animation: fadeOut 3s linear forwards;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
}
</style>