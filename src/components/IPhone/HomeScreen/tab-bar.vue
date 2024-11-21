<script setup lang="ts">
import App from './App.vue';

defineProps({
  tabApp: Array<any>
});
</script>

<template>
  <div
    class="tab-bar"
    w-full
    p-1
  >
    <div
      class="tab-app"
      flex
      items-center
      justify-around
      h-15
      rounded-3xl
      p-1
    >
      <App
        v-for="app of tabApp"
        :key="app.name"
        :app="app"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-bar {
  transform: translateY(100%);
  animation: slideOutUp 1.5s forwards;

  .tab-app {
    background-color: rgba(0, 0, 0, .5);
    backdrop-filter: blur(10px);
  }
}

@keyframes slideOutUp {
  to {
    transform: translateY(0);
  }
}
</style>