<script setup lang="ts">
import {
  ref,
  onMounted
} from 'vue';
import CIndicator from '@/classes/Indicator';
import HomeIndicator from './HomeIndicator.vue';
import Time from '../HeaderBar/Time.vue';

const lockScreenRef = ref<HTMLElement>();
const indicator = ref<CIndicator | null>(null);

onMounted(() => {
  indicator.value = new CIndicator(lockScreenRef.value!);
});
</script>

<template>
  <div
    ref="lockScreenRef"
    class="lock-screen"
    w-full
    h-full
    overflow-hidden
    pos-absolute
    z-2
  >
    <div
      class="lock-bg"
      :style="{
        transform: `translateY(${ Math.abs(indicator?.top || 0) }px)`
      }"
    ></div>

    <slot name="header"></slot>

    <Time :className="'lock-time'" />

    <HomeIndicator
      @mousedown="indicator?.onStart($event)"
      @touchstart="indicator?.onStart($event)"
    />
  </div>
</template>

<style scoped lang="scss">
.lock-screen {
  --transition: none;
  transition: var(--transition);

  .lock-bg {
    width: 100%;
    height: 100%;
    background: url('../../../assets/iphone-bg.jpg') no-repeat center center;
    background-size: cover;
    background-attachment: local;
    animation: enlargeBackground 2s forwards;
    transition: var(--transition);
  }
}

@keyframes enlargeBackground {
  from {
    background-size: 100% 100%;
  }

  to {
    background-size: 120% 120%;
  }
}
</style>