<script setup lang="ts">
defineProps({
  top: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div
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
        transform: `translateY(${ Math.abs(top) }px)`
      }"
    ></div>

    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
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