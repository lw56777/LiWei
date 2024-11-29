<script setup lang="ts">
type TApp = {
  name?: string;
  color: string;
  bgColor: string;
  delay: string;
}

const props = defineProps({
  app: {
    type: Object as () => TApp,
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

  .app-name {
    user-select: none;
    opacity: 0;
    animation: 3s nameShow .1s forwards;
  }
}

@keyframes appShow {
  to {
    transform: scale(1) translate(0, 0);
  }
}

@keyframes nameShow {
  to {
    opacity: 1;
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