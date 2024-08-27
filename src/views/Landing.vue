<script setup lang="ts">
import { ref } from 'vue';
import { Starport } from 'vue-starport';
import StarPort from '@/components/Starport/index.vue';

const value = ref({
  class: 'w-100',
  style: {
    transform: 'translate3d(800px, 100px, 0)'
  }
});
</script>

<template>
  <div
    class="landing"
    pos-relative
  >
    <Starport
      port="testId"
      keep-alive
    >
      <StarPort :prop="value" />
    </Starport>
  </div>
</template>