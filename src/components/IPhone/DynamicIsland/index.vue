<script setup lang="ts">
</script>

<template>
  <div
    class="dynamic-island"
    flex
    items-center
    w-25
    h-6
    bg-black
    rounded-full
    px-1
    pos-absolute
    top-2
    z-3
  >
    <slot name="left"></slot>
    <slot></slot>
    <slot name="right"></slot>
  </div>
</template>

<style scoped lang="scss">
.dynamic-island {
  max-width: 120px;
  left: 50%;
  transform: translateX(-50%);
  transition: all .5s ease-in;
  animation: unLock 1s forwards;
}

@keyframes unLock {
  0% {
    width: 100px;
  }

  60% {
    width: 120px;
  }

  100% {
    width: 100px;
  }
}
</style>