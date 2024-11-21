<script setup lang="ts">
type TApp = {
  name?: string;
  color: string;
  bgColor: string;
}

defineProps({
  app: {
    type: Object as () => TApp,
    required: true
  },
  isPage: Boolean
});
</script>

<template>
  <div
    :class="['app', isPage && 'page-app']"
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
    animation: appAnimation var(--duration) forwards;
  }

  .app-name {
    user-select: none;
    opacity: 0;
    animation: 3s nameShow .1s forwards;
  }
}

@keyframes appAnimation {
  to {
    transform: scale(1) translate(0, 0);
  }
}

@keyframes nameShow {
  to {
    opacity: 1;
  }
}
</style>