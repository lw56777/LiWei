<script setup lang="ts">
import { useDark } from '@vueuse/core';
import {
  Sunrise,
  MoonNight
} from '@element-plus/icons-vue';

const isDark = useDark({ disableTransition: false });
const color = '#2c2c2c';
</script>

<template>
  <div class="theme">
    <el-switch
      v-model="isDark"
      :style="`--el-switch-on-color: ${ color };`"
    >
      <template #active-action>
        <el-icon color="#fff">
          <MoonNight />
        </el-icon>
      </template>
      <template #inactive-action>
        <el-icon :color="color">
          <Sunrise />
        </el-icon>
      </template>
    </el-switch>
  </div>
</template>

<style lang="scss">
.theme {
  .el-switch {
    .el-switch__core .el-switch__action {
      background-color: var(--switch-action-color);
    }
  }
}
</style>