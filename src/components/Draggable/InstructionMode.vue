<script setup lang="ts">
import { ref } from 'vue';
import { vDraggable } from 'vue-draggable-plus';

const list: any = ref([
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
  <div class="instruction-mode">
    <el-row
      :gutter="10"
      v-draggable="[
        list,
        {
          animation: 150,
        }
      ]"
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
  </div>
</template>