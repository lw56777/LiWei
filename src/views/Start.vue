<script setup lang="ts">
import { ref } from 'vue';
import { Starport } from 'vue-starport';
import StarPort from '@/components/Starport/index.vue';

const value = ref({
  class: 'w-30',
  style: {
    transform: 'scaleX(-1) translate(0, 0)'
  }
});
</script>

<template>
  <div
    class="starship"
    pos-relative
  >
    <el-divider>页面1-起点</el-divider>
    <Starport
      port="testId"
      keep-alive
    >
      <StarPort :prop="value" />
    </Starport>
  </div>
</template>