<script setup lang="ts">
import { ref } from 'vue';
import { Starport } from 'vue-starport';
import StarPort from '@/components/Starport/index.vue';

const value = ref({
  class: 'w-50',
  style: {
    transform: 'translate3d(0, 0, 0)'
  }
});
</script>

<template>
  <div
    class="starship"
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