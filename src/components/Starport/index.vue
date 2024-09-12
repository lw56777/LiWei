<script setup lang="ts">
defineProps({
  prop: Object
});
</script>

<template>
  <img
    v-bind="prop"
    class="starport"
    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
  />
</template>

<style scoped lang="scss">
.starport {
  object-fit: cover;
  transition: all 1s ease;
}
</style>