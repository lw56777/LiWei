<script setup lang="ts">
import { ref } from 'vue';
import { Starport } from 'vue-starport';
import Avatar from '@/components/Starport/index.vue';

const value = ref({
  style: {
    width: '8rem',
    height: '8rem',
    borderRadius: '10%',
    transform: 'translate(100px, 100px) rotate(120deg)'
  }
});
</script>

<template>
  <div class="landing">
    <Starport
      port="testId"
      keep-alive
    >
      <Avatar :prop="value" />
    </Starport>
  </div>
</template>