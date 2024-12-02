<script setup lang="ts">
import {
  watch,
  nextTick,
  computed
} from 'vue';
import { SemiSelect } from '@element-plus/icons-vue';
import { VueDraggable } from 'vue-draggable-plus';
import {
  Swiper,
  SwiperSlide
} from 'swiper/vue';
import TSwiper from 'swiper';
import 'swiper/css';
import App from './App.vue';
import MyIPhone from '@/classes/IPhone';
import TabBar from './tab-bar.vue';
const onSwiper = (swiper: TSwiper) => {
  MyIPhone.setSwiper(swiper);
}

const tabApp = computed(() => MyIPhone.tabApp.value);
const pageApp = computed(() => MyIPhone.pageApp.value);
const editStatus = computed(() => MyIPhone.isEditing.value);

watch(
  () => MyIPhone.isInHome.value,
  (value) => {
    if (value) {
      MyIPhone.installApp();
      nextTick(() => {
        MyIPhone.setAppAnimation();
      });
    }
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
    <template v-if="MyIPhone.isInHome.value">
      <div
        v-if="editStatus"
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
        @click="MyIPhone.closeEditing"
      >
        完成
      </div>

      <div
        v-else
        text-center
        line-height-5
        opacity-30
        pos-absolute
        top-3
        right-3
      >
        长按编辑
      </div>

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
          @touchStart="MyIPhone.touchStart()"
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
              @start="MyIPhone.appDragStart($event)"
              @unchoose="MyIPhone.appDragUnChoose($event)"
            >
              <div
                class="page-item"
                grid
                gap-4
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
                    @click="MyIPhone.removeApp(pageIndex, appIndex)"
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