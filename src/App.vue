<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import Header from '@/components/Header/index.vue';
import Background from '@/components/Background/index.vue';
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <el-scrollbar height="100vh">
      <el-container>
        <el-header z-1>
          <Header />
        </el-header>

        <el-main>
          <RouterView v-slot="{ Component }">
            <Transition
              name="fade"
              mode="out-in"
            >
              <KeepAlive>
                <Component :is="Component" />
              </KeepAlive>
            </Transition>
          </RouterView>

          <Background />
        </el-main>
      </el-container>
    </el-scrollbar>
  </ElConfigProvider>
</template>

<style scoped lang="scss">
.el-header {
  position: sticky;
  top: 0;
}

.el-main {
  min-height: calc(100vh - 60px);
}

@media (max-width: 768px) {
  .el-header,
  .el-main {
    padding: .5rem;
  }
}
</style>