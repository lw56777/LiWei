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
    pos-absolute
    top-2
    z-3
  >
    <!-- 后续配合功能加入显示效果 -->
  </div>
</template>

<style scoped lang="scss">
.dynamic-island {
  max-width: 120px;
  left: 50%;
  transform: translateX(-50%);
  transition: all .5s ease-in;
}
</style>