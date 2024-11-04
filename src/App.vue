<script setup lang="ts">
import { provide } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { loadOml2d } from 'oh-my-live2d';
import Header from '@/components/Header/index.vue';
import Rainbow from '@/components/Rainbow/index.vue';
import Background from '@/components/Background/index.vue';

const tipsStyle = {
  // display: 'none',
  width: '100%',
  minHeight: 'auto',
  fontSize: '12px',
  top: '-50%'
}

const oml2d = loadOml2d({
  dockedPosition: 'right',
  mobileDisplay: true,
  models: [
    {
      // path: 'https://model.oml2d.com/cat-black/model.json',
      path: '/cat-black/model.json',
      scale: 0.06,
      mobileScale: 0.05
    }
  ],
  menus: {
    disable: true
  },
  statusBar: {
    disable: true
  },
  tips: {
    style: tipsStyle,
    mobileStyle: tipsStyle,
    welcomeTips: {
      duration: 3000
    }
  }
});

provide('oml2d', oml2d);
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
            <!-- <Transition
              name="el-fade-in"
            > -->
              <KeepAlive>
                <Component :is="Component" />
              </KeepAlive>
            <!-- </Transition> -->
          </RouterView>

          <Rainbow />

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

.el-header,
.el-main {
  @include resLayout ('Phone') {
    padding: .5rem;
  }
}
</style>