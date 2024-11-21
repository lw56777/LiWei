<script setup lang="ts">
import { ref } from 'vue';
import CIndicator from '@/classes/Indicator';
import DynamicIsland from '@/components/IPhone/DynamicIsland/index.vue';
import HeaderBar from '@/components/IPhone/HeaderBar/index.vue';
import Time from '@/components/IPhone/HeaderBar/Time.vue';
import LockScreen from '@/components/IPhone/LockScreen/index.vue';
import HomeScreen from '@/components/IPhone/HomeScreen/index.vue';

// 屏幕是否处于关闭状态
const isClosed = ref(true);
// 点亮屏幕
const batteryScreen = () => {
  isClosed.value = false;
}

const switchScreen = () => {
  isClosed.value = !isClosed.value;
  CIndicator.isLocked.value = true;
}
</script>

<template>
  <div
    class="iphone-container"
    flex
    items-center
    justify-center
    m-auto
  >
    <div
      class="iphone"
      w-70
      h-144
      font-size-3
      rounded-3xl
      pos-relative
    >
      <div
        class="sss"
        w-full
        h-full
        bg-black
        border-4
        border-solid
        border-black
        rounded-3xl
        overflow-hidden
        pos-relative
        @click="batteryScreen"
      >
        <DynamicIsland />

        <transition name="el-fade-in">
          <div
            v-if="isClosed"
            flex
            items-center
            justify-center
            w-full
            h-full
            opacity-50
          >
            轻触唤醒屏幕
          </div>

          <div v-else>
            <LockScreen>
              <template #header>
                <HeaderBar />
              </template>
            </LockScreen>

            <HomeScreen>
              <template #header>
                <HeaderBar>
                  <template #left>
                    <Time />
                  </template>
                </HeaderBar>
              </template>
            </HomeScreen>
          </div>
        </transition>
      </div>
      
      <div
        class="lock-button"
        w-1
        h-15
        bg-dark
        shadow
        rounded-full
        pos-absolute
        top-30
        @click="switchScreen"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.iphone-container {
  width: min-content;
  min-height: calc(100vh - 100px);

  .lock-button {
    cursor: pointer;
    right: -3px;
  }
}
</style>