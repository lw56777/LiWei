<script setup lang="ts">
import Draw from '@/components/Draw';
</script>

<template>
  <iframe
    :srcdoc="Draw"
    width="100%"
    height="750px"
  ></iframe>
</template>