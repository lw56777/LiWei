<script setup lang="ts">
import {
  defineAsyncComponent,
  ref
} from 'vue';
import Dialog from '@/components/Dialog/index.vue';

const Test1 = defineAsyncComponent(() => import('../components/Dialog/Test1.vue'));
const Test2 = defineAsyncComponent(() => import('../components/Dialog/Test2.vue'));
const dialogRef = ref();
</script>

<template>
  <el-divider></el-divider>
  <el-button @click="dialogRef.open(Test1)">组件1</el-button>
  <el-button @click="dialogRef.open(Test2)">组件2</el-button>
  <el-button @click="dialogRef.open('文本内容...')">文本内容</el-button>
  
  <Dialog ref="dialogRef" />
</template>