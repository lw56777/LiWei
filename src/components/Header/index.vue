<script setup lang="ts">
// import Signature from './Signature.vue';
import Theme from './Theme.vue';
</script>

<template>
  <div
    class="header"
    flex
    items-center
    justify-between
    h-full
  >
    <div class="logo">
      <!-- <Signature /> -->
      <el-avatar
        :size="30"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>

    <ul
      class="menu"
      flex
      items-center
      justify-end
    >
      <li>
        <Theme />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.header {
  .menu {
    li {
      padding: 0 .5rem;
    }
  }
}
</style>