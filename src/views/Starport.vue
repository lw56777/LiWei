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
  <div>
    <el-button
      v-if="route.name === 'StarportStart'"
      @click="router.push({ name: 'StarportEnd' })"
    >
      详情页
    </el-button>

    <el-button
      v-else
      @click="router.push({ name: 'StarportStart' })"
    >
      返回
    </el-button>
  </div>

  <StarportCarrier>
    <RouterView />
  </StarportCarrier>
</template>