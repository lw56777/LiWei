<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = router.getRoutes().find(route => route.name === 'Playground')?.children.map(route => route.name);
const segmentedValue = ref('');
const segmentedChange = (value: string) => {
  router.push({ name: value });
}
</script>

<template>
  <div class="playground">
    <el-segmented
      v-model="segmentedValue"
      :options="routes"
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