<script setup lang="ts">
import { useDark } from '@vueuse/core';
import {
  Moon,
  Sunny
} from '@element-plus/icons-vue';

const value = useDark();
</script>

<template>
  <el-switch
    v-model="value"
    style="--el-switch-on-color: #2c2c2c;"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
  />
</template>