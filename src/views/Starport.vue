<script setup lang="ts">
import {
  useRouter,
  useRoute
} from 'vue-router';
import { StarportCarrier } from 'vue-starport';

const router = useRouter();
const route = useRoute();
</script>

<template>
  <el-divider>跨页面动画</el-divider>
  <el-button
    v-if="route.name === 'StarportStart'"
    @click="router.push({ name: 'StarportEnd' })"
  >
    起飞
  </el-button>

  <el-button
    v-else
    @click="router.push({ name: 'StarportStart' })"
  >
    返航
  </el-button>

  <StarportCarrier>
    <RouterView />
  </StarportCarrier>
</template>