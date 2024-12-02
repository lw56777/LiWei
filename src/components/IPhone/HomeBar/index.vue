<template>
  <div
    class="home-bar"
    flex
    items-center
    justify-center
    flex-col
    w-full
    h-12
    color-white
    pos-absolute
    bottom-0
  >
    <div
      class="bar-text"
      opacity-0
    >
      向上轻扫以打开
    </div>

    <div
      class="bar-line"
      w-30
      h-1
      bg-white
      rounded-full
    ></div>
    
  </div>
</template>

<style scoped lang="scss">
.moving {
  .home-bar {
    cursor: grabbing;
  }
}

.home-bar {
  $duration: 6s;
  cursor: grab;
  
  .bar-text {
    animation: textAnimation $duration ease-in-out infinite;
  }

  .bar-line {
    transform: translateY(5px);
    animation: lineAnimation $duration ease-in-out infinite;
  }
}

@keyframes textAnimation {
  0%, 25%, 35%, 45%, 50% {
    opacity: 0;
    transform: translateY(0);
  }

  70% {
    opacity: 1;
    transform: translateY(-25px);
  }

  100% {
    opacity: 0;
    transform: translateY(-25px);
  }
}

@keyframes lineAnimation {
  0%, 25%, 35%, 45%, 50% {
    transform: translateY(5px);
  }

  70% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(5px);
  }
}
</style>