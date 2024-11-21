<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  className: String
});

const date = new Date();
const time = ref('');
const getTime = () => {
  const formartTime = (time: number) => {
    return time.toString().padStart(2, '0');
  }

  const h = formartTime(date.getHours());
  const m = formartTime(date.getMinutes());

  time.value = `${ h }:${ m }`;
}
getTime();

setInterval(() => {
  getTime();
}, 1000);
</script>

<template>
  <div :class="['time', className]">
    {{ time }}
  </div>
</template>

<style scoped lang="scss">
.time {
  &.lock-time {
    width: 100%;
    height: 100%;
    font-size: 3rem;
    font-weight: bold;
    color: transparent;
    text-align: center;
    background: url('../../../assets/iphone-bg.jpg') no-repeat center center;
    background-size: cover;
    background-clip: text;
    padding-top: 4rem;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>