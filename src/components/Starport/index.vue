<script setup lang="ts">
import img from '@/assets/startport.png';

defineProps({
  prop: Object
});
</script>

<template>
  <el-image
    v-bind="prop"
    :src="img"
    object-cover
  />
</template>

<style scoped lang="scss">
.el-image {
  transition: all 1s ease;
}
</style>