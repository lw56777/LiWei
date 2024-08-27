<script setup lang="ts">
import { useRouter } from 'vue-router';
import { StarportCarrier } from 'vue-starport';

const router = useRouter();
</script>

<template>
  <el-divider>跨页面动画</el-divider>
  <el-button @click="router.push({ name: 'Landing' })">起飞</el-button>
  <el-button @click="router.push({ name: 'Starship' })">返航</el-button>

  <StarportCarrier>
    <RouterView />
  </StarportCarrier>
</template>