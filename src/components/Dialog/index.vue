<script setup lang="ts">
import {
  ref,
  toRaw
} from 'vue';
import CDialog from '@/classes/dialog';

const dialog = ref(new CDialog());

defineExpose({
  open: dialog.value.open.bind(dialog.value),
  close: dialog.value.close.bind(dialog.value)
});
</script>

<template>
  <el-dialog
    v-model="dialog.visible"
    v-bind="dialog.options"
  >
    <Component
      v-if="dialog.isComponent"
      :is="toRaw(dialog.content)"
    />
    
    <template v-else>{{ dialog.content }}</template>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialog.close()">Cancel</el-button>
        <el-button
          type="primary"
          @click="dialog.close()"
        >
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss">
@media (max-width: 768px) {
  .el-dialog {
    width: 100%;
  }
}
</style>