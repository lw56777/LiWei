<script setup lang="ts">
import {
  ref,
  watchEffect
} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { children } = router.getRoutes().find(r => r.name === 'Playground')!;

const defaultActive = ref('');

watchEffect(() => {
  defaultActive.value = router.currentRoute.value.fullPath;
});
</script>

<template>
  <div class="playground">
    <el-scrollbar height="320px">
      <el-menu
        :default-active="defaultActive"
        router
      >
        <template
          v-for="item of children"
          :key="item.path"
        >
          <el-sub-menu
            v-if="item.children?.length"
            :index="item.path"
          >
            <template #title>
              <span>{{ item.meta.title }}</span>
            </template>

            <el-menu-item
              v-for="c of item.children"
              :key="c.name"
              :index="c.path"
              
            >
              {{ c.meta.title }}
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item
            v-else
            :index="item.path"
          >
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>

    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.playground {
  max-width: 1000px;
  min-height: calc(100vh - 160px);
  margin: auto;

  @include flex() {}

  .el-menu {
    width: 8rem;
    border-right: none;
  }

  .content {
    width: 22rem;
    height: 20rem;
    border: var(--el-border);
    overflow: hidden;
  }
}
</style>