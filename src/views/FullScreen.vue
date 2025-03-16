<script setup lang="ts">
import FullScreen from '@/components/FullScreen';
</script>

<template>
  <div  class="demo-full-screen">
    支持键盘↕控制（聚焦后）
    <iframe
      :srcdoc="FullScreen"
      width="100%"
      height="500px"
    ></iframe>
  </div>
</template>