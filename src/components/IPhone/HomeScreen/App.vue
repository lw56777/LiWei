<script setup lang="ts">
import CApp from '@/classes/IPhone/app';

const props = defineProps({
  app: {
    type: Object as () => CApp,
    required: true
  },
  isPage: Boolean,
  editStatus: Boolean
});

const { delay } = props.app;
</script>

<template>
  <div
    :class="['app', isPage && 'page-app', editStatus && 'editing']"
    flex
    items-center
    justify-center
    flex-col
  >
    <div
      class="app-icon"
      :style="{
        backgroundColor: app.bgColor
      }"
      flex
      items-center
      justify-center
      w-11
      h-11
      rounded-lg
    >
      <svg
        w-10
        h-10
        aria-hidden="true"
      >
        <use :xlink:href="`#icon-${ app.name }`"></use>
      </svg>
    </div>

    <el-text
      v-if="isPage"
      class="app-name"
      tag="span"
      size="small"
      truncated
      opacity-0
      pt-1
    >
      {{ app.name }}
    </el-text>
  </div>
</template>

<style scoped lang="scss">
.app {
  &.page-app {
    animation: appShow var(--duration) forwards;
  }

  &.editing {
    cursor: move;
    animation: appEdit .15s v-bind(delay) infinite alternate;
  }
}

@keyframes appShow {
  to {
    transform: scale(1) translate(0, 0);
  }
}

@keyframes appEdit {
  0% {
    transform: rotate(3deg);
  }
  
  50% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(-3deg);
  }
}
</style>