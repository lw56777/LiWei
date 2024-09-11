<script setup lang="ts">
import {
  ref,
  onMounted
} from 'vue';
import CBubbling from '@/classes/bubbling';

const bubbleRef = ref();

onMounted(() => {
  const bubble = new CBubbling(bubbleRef.value);
  bubble.play();
});
</script>

<template>
  <div
    ref="bubbleRef"
    class="bubble-box"
    opacity-8
    pos-absolute
    left-0
    bottom-0
  ></div>

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