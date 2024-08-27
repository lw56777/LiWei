<script setup lang="ts">
import { useDark } from '@vueuse/core';
import {
  Moon,
  Sunny,
  Sunrise,
  MoonNight
} from '@element-plus/icons-vue';

const value = useDark();
</script>

<template>
  <el-switch
    v-model="value"
    style="--el-switch-on-color: #2c2c2c;"
    inline-prompt
    :active-icon="MoonNight"
    :inactive-icon="Sunrise"
  />
</template>