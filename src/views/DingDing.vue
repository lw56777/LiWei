<script setup lang="ts">
import DingDing from '@/components/DingDing';
</script>

<template>
  <iframe
    :srcdoc="DingDing"
    width="50%"
    height="500px"
  ></iframe>
</template>