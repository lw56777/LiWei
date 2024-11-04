<script setup lang="ts">
import {
  ref,
  onMounted,
  nextTick,
  watch,
  watchEffect
} from 'vue';
import { useStorage } from '@vueuse/core';
import { getLocalStorage } from '@/utils/tools';
import CLightning from '@/classes/lightning';
import Astral from './Astral.vue';
// import StreetLamp from './StreetLamp.vue';
import CoreSocialistValues from '@/components/CoreSocialistValues';

const bgEffectValue = useStorage('bgEffectValue', getLocalStorage('bgEffectValue'));
const clickEffectValue = useStorage('clickEffectValue', getLocalStorage('clickEffectValue'));
const canvasRef = ref<HTMLCanvasElement>();

const setBgEffect = () => {
  switch (bgEffectValue.value) {
    case 1:
      const branch = new CLightning(canvasRef.value!);
      branch.play();
      break;

    default:
      break;
  }
}

onMounted(() => {
  setBgEffect();
});

watch(bgEffectValue, () => {
  nextTick(() => {
    setBgEffect();
  });
});

watchEffect(() => {
  CoreSocialistValues.bindEvent(clickEffectValue.value);
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
    <canvas
      v-if="bgEffectValue == 1"
      ref="canvasRef"
    />

    <Astral v-if="bgEffectValue == 2" />

    <!-- <StreetLamp /> -->
  </div>
</template>

<style scoped lang="scss">
.background {
  z-index: -1000;

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