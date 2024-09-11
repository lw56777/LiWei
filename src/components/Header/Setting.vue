<script setup lang="ts">
import { ref } from 'vue';
import { Setting } from '@element-plus/icons-vue';
import { useStorage } from '@vueuse/core';

const drawer = ref(false);
const openDrawer = () => {
  drawer.value = true;
}

const bgEffectValue = useStorage('bgEffectValue', 1);
const bgEffectOptions = [
  {
    label: '梅开二度',
    value: 1
  },
  {
    label: '星空',
    value: 2
  },
  {
    label: '冒泡',
    value: 3
  }
];
</script>

<template>
  <div class="setting">
    <el-icon @click="openDrawer">
      <Setting />
    </el-icon>

    <el-drawer
      v-model="drawer"
      title="设置"
      :size="300"
      :z-index="100"
    >
      <div class="setting-item">
        <el-divider border-style="dashed">背景效果</el-divider>
        <div class="handle">
          <el-select v-model="bgEffectValue">
            <el-option
              v-for="item in bgEffectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </el-drawer>
  </div>
</template>