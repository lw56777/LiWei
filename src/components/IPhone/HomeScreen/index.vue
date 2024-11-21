<script setup lang="ts">
import {
  ref,
  watch,
  nextTick
} from 'vue';
import {
  Swiper,
  SwiperSlide
} from 'swiper/vue';
import 'swiper/css';
import {
  shuffleArray,
  hexToRgba
} from '@/utils/tools';
import CIndicator from '@/classes/Indicator';
import skills from '@/utils/skills';
import App from './App.vue';
import TabBar from './tab-bar.vue';

const appPagesRef = ref();
const tabApp: any = ref([]);
const tabAppNames = ['html', 'css', 'javascript', 'typescript'];
const pageApp: any = ref([]);
let pageIndex = 0;

const sortApp = () => {
  shuffleArray(skills).forEach((item: any) => {
    item.bgColor = hexToRgba(item.color, .2);

    if (tabAppNames.includes(item.name)) {
      tabApp.value.push(item);
    } else {
      if (!pageApp.value[pageIndex]) {
        pageApp.value[pageIndex] = [];
      }

      pageApp.value[pageIndex].push(item);

      if (pageApp.value[pageIndex].length >= 22) {
        pageIndex++;
      }
    }
  });
}
sortApp();

const createAnimation = (app: HTMLElement, appIndex: number, width: number, height: number) => {
  const {
    offsetTop,
    offsetLeft,
    offsetWidth,
    offsetHeight
  } = app;
  const baseWidth = width - offsetLeft;
  const baseHeight = height - offsetTop;
  const rowIndex = Math.floor(appIndex / 4);
  const colIndex = appIndex % 4;
  let x = 0;
  let y = 0;
  let s = 1;
  let d = Math.abs(appIndex - 12) / 10 + .5;

  if ([0, 1].includes(colIndex)) {
    x = -baseWidth;
    // 前三行
    if (rowIndex <= 2) {
      x = x + (rowIndex * offsetWidth / 3);
    } else {
      // 后三行
      x = x - (rowIndex * offsetWidth / 2);
    }
  } else {
    x = width - baseWidth + offsetWidth;
    // 前三行
    if (rowIndex <= 2) {
      x = x + (rowIndex * offsetWidth / 3);
    } else {
      // 后三行
      x = x - (rowIndex * offsetWidth / 2);
    }
  }

  // 前三行
  if (rowIndex <= 2) {
    y = -baseHeight - (rowIndex * offsetHeight / 3);
    d = d - (rowIndex + 1) * .1;

    switch (colIndex) {
      case 0:
      case 3:
        s = 3;
        break;

      case 1:
      case 2:
        s = 1.5;
        break;

      default:
        break;
    }
  } else {
    // 后三行
    y = baseHeight + (rowIndex * offsetHeight / 2);
    d = d + rowIndex / 10;

    switch (colIndex) {
      case 0:
      case 3:
        s = 5;
        break;

      case 1:
      case 2:
        s = 2.5;
        break;

      default:
        break;
    }
  }

  app.style.setProperty('--duration', d + 's');

  return `scale(${ s }) translate(${ x }px, ${ y }px)`;
}

const appAnimation = () => {
  const oPage = appPagesRef.value.querySelectorAll('.page-item')[0];
  const oApps = oPage.querySelectorAll('.page-app');
  const {
    clientWidth,
    clientHeight
  } = oPage;

  for (let i = 0; i < oApps.length; i++) {
    const app = oApps[i];
    app.style.transform = createAnimation(app, i, clientWidth, clientHeight);
  }
}

watch(
  () => CIndicator.isLocked.value,  
  (value) => {
    !value && nextTick(appAnimation);
  }
);
</script>

<template>
  <div
    class="home-screen"
    flex
    flex-col
    w-full
    h-full
    pos-absolute
    z-1
  >
    <template v-if="!CIndicator.isLocked.value">
      <slot name="header"></slot>

      <div
        ref="appPagesRef"
        class="app-pages"
        flex-1
        pt-12
      >
        <Swiper h-full>
          <SwiperSlide
            v-for="page, pageIndex of pageApp"
            :key="pageIndex"
            h-full
            overflow-hidden
          >
            <div
              class="page-item"
              grid
              gap-3
              grid-cols-4
            >
              <App
                v-for="app of page"
                :key="app.name"
                :app="app"
                :isPage="true"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <TabBar :tabApp="tabApp" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.home-screen {
  background: url('../../../assets/iphone-bg2.jpg') no-repeat center center;
  background-size: cover;
}
</style>