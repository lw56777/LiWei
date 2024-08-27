<script setup lang="ts">
import { ref } from 'vue';
import { useDraggable, type UseDraggableReturn } from 'vue-draggable-plus';

const el = ref();
const list = ref([
  {
    name: 'Joao',
    id: 1
  },
  {
    name: 'Jean',
    id: 2
  },
  {
    name: 'Johanna',
    id: 3
  },
  {
    name: 'Juan',
    id: 4
  },
  {
    name: 'Joao',
    id: 5
  },
  {
    name: 'Jean',
    id: 6
  },
  {
    name: 'Johanna',
    id: 7
  },
  {
    name: 'Juan',
    id: 8
  }
]);

useDraggable<UseDraggableReturn>(el, list, {
  animation: 150,
  onStart() {
    console.log('start');
  },
  onUpdate() {
    console.log('update');
  }
});
</script>

<template>
  <el-row
    class="function-mode"
    ref="el"
    :gutter="10"
  >
    <el-col
      v-for="item of list"
      :key="item.id"
      :span="6"
      style="margin-bottom: 10px"
    >
      <el-card>
        {{ item.name + item.id }}
      </el-card>
    </el-col>
  </el-row>
</template>