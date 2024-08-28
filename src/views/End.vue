<script setup lang="ts">
import { ref } from 'vue';
import { Starport } from 'vue-starport';
import StarPort from '@/components/Starport/index.vue';

const value = ref({
  class: 'w-20',
  style: {
    transform: 'scaleX(1) translate(70vw, 50vh)'
  }
});
</script>

<template>
  <div
    class="landing"
    pos-relative
  >
    <el-divider>页面2-落点</el-divider>
    <Starport
      port="testId"
      keep-alive
    >
      <StarPort :prop="value" />
    </Starport>
  </div>
</template>