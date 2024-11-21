<script setup lang="ts">
</script>

<template>
  <div
    class="header-bar"
    flex
    justify-around
    w-full
    h-10
    p-2
    pos-absolute
    top-0
  >
    <div class="header-left">
      <slot name="left">
        <div class="operator">
          运营商
        </div>
      </slot>
    </div>

    <div w-25></div>

    <div class="header-right">
      <!-- <span>信号</span>
      <span>网络</span>
      <span>电量</span> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-left,
.header-right {
  flex: 0 1 50px;
}
</style>