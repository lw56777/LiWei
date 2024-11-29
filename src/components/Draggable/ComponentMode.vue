<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';
import { useCloned } from '@vueuse/core';
import { VueDraggable } from 'vue-draggable-plus';
import {
  shuffleArray,
  isEqualArray
} from '@/utils/tools';

const target = Array.from({ length: 9 }, (_, index) => String.fromCharCode(65 + index));
const list = ref<any[]>([]);

const initList = () => {
  list.value = shuffleArray(
    useCloned(target).cloned.value
  );
}

initList();

const onEnd = () => {
  if (isEqualArray(list.value, target)) {
    ElMessageBox.confirm(
      '完成排序，是否重新开始？',
      'Success',
      {
        confirmButtonText: '确定',
        showCancelButton: false,
        type: 'success'
      }
    )
    .finally(() => {
      initList();
    });
  }
}
</script>

<template>
  <div class="component-mode">
    <VueDraggable
      v-model="list"
      target=".box"
      :animation="150"
      h-full
      @end="onEnd"
    >
      <div
        class="box"
        grid
        gap-1
        h-full
      >
        <div
          v-for="item of list"
          :key="item"
          class="box-item"
          cursor-move
        >
          {{ item }}
        </div>
      </div>
    </VueDraggable>
  </div>
</template>

<style scoped lang="scss">
.component-mode {
  height: 100%;
  
  .box {
    grid-template-columns: repeat(3, 1fr);

    .box-item {
      border: var(--el-border);
      box-shadow: var(--el-shadow);

      @include flex;
    }
  }
}
</style>