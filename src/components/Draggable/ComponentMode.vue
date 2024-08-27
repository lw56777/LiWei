<script setup lang="ts">
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

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
</script>

<template>
  <div class="component-mode">
    <VueDraggable
      ref="el"
      v-model="list"
      target=".el-row"
      :animation="150"
    >
      <el-row :gutter="10">
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
    </VueDraggable>
  </div>
</template>