<script setup lang="ts">
import {
  computed,
  provide
} from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { loadOml2d } from 'oh-my-live2d';
import { getLocalStorage } from '@/utils/tools';
import Header from '@/components/Header/index.vue';
import Rainbow from '@/components/Rainbow/index.vue';
import Background from '@/components/Background/index.vue';

const router = useRouter();

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

const bgEffectValue = useStorage('bgEffectValue', getLocalStorage('bgEffectValue'));

const notFlexNames = ['Playground'];

const mainClass = computed(() => {
  const curName = router.currentRoute.value.name as string;

  return notFlexNames.includes(curName) ? '' : 'main-flex';
});
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <el-scrollbar height="100vh">
      <el-container>
        <el-header z-1>
          <Header />
        </el-header>

        <el-main :class="mainClass">
          <RouterView v-slot="{ Component }">
            <!-- <Transition
              name="el-fade-in"
            > -->
              <KeepAlive>
                <Component :is="Component" />
              </KeepAlive>
            <!-- </Transition> -->
          </RouterView>

          <Rainbow v-if="bgEffectValue !== 0" />

          <Background />
        </el-main>
      </el-container>
    </el-scrollbar>
  </ElConfigProvider>
</template>

<style scoped lang="scss">
.el-header {
  height: 40px;
  padding: 0 10px;
  position: sticky;
  top: 0;
}

.el-main {
  min-height: calc(100vh - 40px);

  &.main-flex {
    @include flex {
      flex-wrap: wrap;
    }
  }
}

.el-header,
.el-main {
  @include resLayout ('Phone') {
    padding: .5rem;
  }
}
</style>