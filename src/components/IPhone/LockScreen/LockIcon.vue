<script setup lang="ts">
defineProps({
  lockStatus: Number
});
</script>

<template>
  <div :class="['lock-icon', lockStatus === 1 && 'unlock']">
    <div class="lock">
      <div class="unlocker"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lock-icon {
  .unlocker {
    width: 8px;
    height: 8px;
    background: transparent;
    border: 2px solid #fff;
    border-bottom: 0;
    border-radius: 10px 10px 0 0;
    position: absolute;
    top: -8px;
    left: 2px;
    transition: all .3s;
  }

  .lock {
    content: "";
    width: 14px;
    height: 10px;
    background: #fff;
    border-radius: 2px;
    position: relative;
    top: 4px;
    left: 3px;
    transform: rotateY(0deg);
  }

  &.unlock {
    .unlocker {
      transform: rotateY(-180deg);
      transform-origin: 8px 0;
    }
  }
}
</style>