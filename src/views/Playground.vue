<script setup lang="ts">
import { ref } from 'vue';
import {
  useRouter,
  useRoute,
  RouteRecordRaw
} from 'vue-router';
import { arrayToStrategy } from '@/utils/tools';

const router = useRouter();
const route = useRoute();
const { children } = router.getRoutes().find(route => route.name === 'Playground')!;
const strategy = arrayToStrategy(
  children,
  (route: RouteRecordRaw) => {
    return route.meta!.title;
  },
  'name'
);
const options = Object.keys(strategy);
const segmentedValue = ref(route.meta.title);
const segmentedChange = (value: string) => {
  router.push({ name: strategy[value] });
}
</script>

<template>
  <div class="playground">
    <el-segmented
      v-model="segmentedValue"
      size="large"
      :options="options"
      @change="segmentedChange"
    />

    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.playground {
  max-width: 1000px;
  margin: auto;
}
</style>