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

    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.playground {
  max-width: 1000px;
  margin: auto;

  @include flex() {
    flex-direction: column;
    flex-wrap: wrap;
  }

  .content {
    width: 22rem;
    height: 20rem;
    border: var(--el-border);
    overflow: hidden;
    margin: 3rem auto 0 auto;
  }
}
</style>