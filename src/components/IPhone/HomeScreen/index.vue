<script setup lang="ts">
import {
  ref,
  watch,
  nextTick
} from 'vue';
import { SemiSelect } from '@element-plus/icons-vue';
import {
  VueDraggable,
  SortableEvent
} from 'vue-draggable-plus';
import {
  Swiper,
  SwiperSlide
} from 'swiper/vue';
import TSwiper from 'swiper';
import 'swiper/css';
import {
  shuffleArray,
  hexToRgba,
  getRandomInt
} from '@/utils/tools';
import CIndicator from '@/classes/Indicator';
import svgIconFont from '@/utils/svg';
import App from './App.vue';
import TabBar from './tab-bar.vue';

const app = [...svgIconFont.app, ...svgIconFont.skill];
const appPagesRef = ref();
const tabApp: any = ref([]);
const tabAppNames = ['html', 'css', 'javascript', 'typescript'];
const pageApp: any = ref([]);
let pageIndex = 0;

const sortApp = () => {
  shuffleArray(app).forEach((item: any) => {
    item.bgColor = hexToRgba(item.color || '#9ca3af', .2);
    item.delay = getRandomInt(1, 2) / 10 + 's';

    if (tabAppNames.includes(item.name)) {
      tabApp.value.push(item);
    } else {
      if (!pageApp.value[pageIndex]) {
        pageApp.value[pageIndex] = [];
      }

      pageApp.value[pageIndex].push(item);

      if (pageApp.value[pageIndex].length >= 24) {
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
  let d = Math.abs(appIndex - 12) / 10 + .3;

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
    d = d + rowIndex / 10 - .3;

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
  const oPage: NodeListOf<HTMLElement> = appPagesRef.value.querySelectorAll('.page-item');

  oPage.forEach((page, pageIndex) => {
    const oApps: NodeListOf<HTMLElement> = page.querySelectorAll('.page-app');
    const {
      clientWidth,
      clientHeight
    } = page;

    for (let i = 0; i < oApps.length; i++) {
      const app = oApps[i];

      if (pageIndex === swiperInstance?.activeIndex) {
        app.style.transform = createAnimation(app, i, clientWidth, clientHeight);

        const t = setTimeout(() => {
          app.style.removeProperty('--duration');
          app.style.removeProperty('transform');
          clearTimeout(t);
        }, 2000);
      }
    }
  });
}

watch(
  () => CIndicator.isLocked.value,
  (value) => {
    !value && nextTick(appAnimation);
  }
);

let swiperInstance: TSwiper;
const onSwiper = (swiper: TSwiper) => {
  swiperInstance = swiper;
}

// 是否开启APP编辑--START
const editStatus = ref(false);
let editStartX = 0;
let editEndX = 0;

const startTiming = (e: MouseEvent | TouchEvent) => {
  if (editStatus.value) return;
  swiperInstance.disable();

  const event = e as MouseEvent & TouchEvent;
  editStartX = event.clientX || event.touches[0].clientX;
  editEndX = editStartX;
  bindTiming();

  if (editStartX !== editEndX) {
    removeTiming();
    return;
  }
  
  let seconds = 0;
  const t = setInterval(() => {
    seconds++;

    if (seconds >= 1) {
      clearInterval(t);
      removeTiming();
      editStatus.value = editStartX === editEndX;
    }
  }, 1000);
}

const bindTiming = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth > 768) {
    document.addEventListener('mousemove', mouseMoveTiming, false);
  } else {
    document.addEventListener('touchmove', touchMoveTiming, false);
  }
}

const removeTiming = () => {
  document.removeEventListener('mousemove', mouseMoveTiming, false);
  document.removeEventListener('touchmove', touchMoveTiming, false);
}

const mouseMoveTiming = (e: MouseEvent) => {
  editEndX = e.clientX;
}

const touchMoveTiming = (e: TouchEvent) => {
  editEndX = e.touches[0].clientX;
}

const closeEdit = () => {
  editStatus.value = false;
  swiperInstance.enable();
  removeDraging();
}
// 是否开启APP编辑--END


// APP拖拽--START
let prevX = 0;
let nextX = 0;
const appDragStart = (e: SortableEvent) => {
  const hotWidth = Math.round(e.item.clientWidth / 4);
  const {
    width,
    x
  } = appPagesRef.value.getBoundingClientRect();

  prevX = x + hotWidth;
  nextX = x + width - hotWidth;
  bindDraging();
}

const bindDraging = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth > 768) {
    document.addEventListener('drag', appDragMove, false);
  } else {
    document.addEventListener('touchmove', appDragMove, false);
  }
}

const removeDraging = () => {
  document.removeEventListener('drag', appDragMove, false);
  document.removeEventListener('touchmove', appDragMove, false);
}

function appDragMove (event: MouseEvent): void;
function appDragMove (event: TouchEvent): void;

function appDragMove (e: MouseEvent | TouchEvent) {
  let moveX = 0;

  if (e instanceof MouseEvent) {
    moveX = e.clientX
  } else if (e instanceof TouchEvent) {
    moveX = e.touches[0].clientX;
  }

  const {
    activeIndex,
    slides
  } = swiperInstance!;

  if (moveX < prevX && activeIndex > 0) {
    setSwiperActive('left');
  } else if (moveX > nextX && activeIndex < slides.length - 1) {
    setSwiperActive('right');
  }
}

const setSwiperActive = (dir: 'left' | 'right') => {
  swiperInstance.enable();
  
  switch (dir) {
    case 'left':
      swiperInstance.slidePrev();
      break;

    case 'right':
      swiperInstance.slideNext();
      break;

    default:
      break;
  }

  swiperInstance.disable();
}
// APP拖拽--END

const removeApp = (pageIndex: number, appIndex: number) => {
  pageApp.value[pageIndex].splice(appIndex, 1);
}
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
      <template v-if="editStatus">
        <div
          w-12
          h-5
          color-white
          bg-coolgray
          rounded-full
          text-center
          line-height-5
          cursor-pointer
          pos-absolute
          top-3
          right-3
          z-2
          @click="closeEdit"
        >
          完成
        </div>
      </template>

      <slot name="header"></slot>

      <div
        ref="appPagesRef"
        class="app-pages"
        flex-1
        pt-12
      >
        <Swiper
          h-full
          @swiper="onSwiper"
          @touchStart="(_, event) => startTiming(event)"
        >
          <SwiperSlide
            v-for="page, pageIndex of pageApp"
            :key="pageIndex"
            h-full
            overflow-hidden
          >
            <VueDraggable
              v-model="pageApp[pageIndex]"
              :disabled="!editStatus"
              :animation="200"
              group="app"
              target=".page-item"
              @start="appDragStart"
            >
              <div
                class="page-item"
                grid
                gap-3
                grid-cols-4
              >
                <div
                  v-for="app, appIndex of page"
                  :key="app.name"
                  pos-relative
                >
                  <App
                    :app="app"
                    :isPage="true"
                    :editStatus="editStatus"
                  />

                  <div
                    v-if="editStatus"
                    class="remove-app-btn"
                    w-3
                    h-3
                    rounded-full
                    bg-coolgray
                    line-height-3
                    cursor-pointer
                    px-.5
                    pos-absolute
                    top-0
                    left-0
                    @click="removeApp(pageIndex, appIndex)"
                  >
                    <SemiSelect />
                  </div>
                </div>
              </div>
            </VueDraggable>
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