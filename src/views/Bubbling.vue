<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue';
import CBubbling from '@/classes/bubbling';

const bubbleRef = ref();
const bubble = new CBubbling();

onMounted(() => {
  bubble.setContainer(bubbleRef.value);
  bubble.play();
});

onBeforeUnmount(() => {
  bubble.stop();
});
</script>

<template>
  <div
    w-full
    pos-relative
  >
    <div
      ref="bubbleRef"
      class="bubble-box"
      opacity-8
      pos-absolute
      bottom-0
    ></div>
  </div>

  <svg v-show="false">
    <defs>
      <filter id="blob">
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="10"
          result="blur"
        ></feGaussianBlur>

        <feColorMatrix
          in="blur"
          mode="matrix"
          values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 20 -10
          "
        ></feColorMatrix>
      </filter>
    </defs>
  </svg>
</template>

<style lang="scss">
.bubble-box {
  background-color: var(--star-color);
  filter: url(#blob);
  left: 38%;
  transform: translateX(-50%);

  .bubble {
    width: var(--size);
    height: var(--size);
    background-color: inherit;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: var(--left);
    animation: bubbling var(--duration) ease-in forwards infinite;
  }
}

@keyframes bubbling {
  to {
    transform: translate(0, var(--moveY)) scale(0);
  }
}
</style>