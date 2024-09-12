<script setup lang="ts">
import { ref } from 'vue';
import { Starport } from 'vue-starport';
import Avatar from '@/components/Starport/index.vue';

const value = ref({
  style: {
    width: '5rem',
    height: '5rem',
    borderRadius: '50%',
    transform: 'translate(10px, 10px)'
  }
});
</script>

<template>
  <div class="starship">
    <Starport
      port="testId"
      keep-alive
    >
      <Avatar :prop="value" />
    </Starport>
  </div>
</template>