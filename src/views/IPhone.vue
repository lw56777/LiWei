<script setup lang="ts">
import { nextTick } from 'vue';
import MyIPhone from '@/classes/IPhone';
import DynamicIsland from '@/components/IPhone/DynamicIsland/index.vue';
import HeaderBar from '@/components/IPhone/HeaderBar/index.vue';
import Time from '@/components/IPhone/HeaderBar/Time.vue';
import HomeBar from '@/components/IPhone/HomeBar/index.vue';
import LockScreen from '@/components/IPhone/LockScreen/index.vue';
import HomeScreen from '@/components/IPhone/HomeScreen/index.vue';
import LockIcon from '@/components/IPhone/LockScreen/LockIcon.vue';

// 点亮屏幕
const batteryScreen = () => {
  MyIPhone.setIsWakeUp(true);
  nextTick(() => {
    MyIPhone.setContainer();
    MyIPhone.setHomeBar('.lock-screen');
  });
}
</script>

<template>
  <div
    class="iphone-container"
    flex
    items-center
    justify-center
    m-auto
    pos-relative
  >
    <div
      class="iphone"
      w-70
      h-148
      font-size-3
      rounded-3xl
      shadow-dark
      pos-fixed
    >
      <div
        w-full
        h-full
        bg-black
        border-4
        border-solid
        border-black
        rounded-3xl
        overflow-hidden
        pos-relative
      >
        <transition name="el-fade-in">
          <div
            v-if="!MyIPhone.isWakeUp.value"
            flex
            items-center
            justify-center
            w-full
            h-full
            opacity-50
            @click="batteryScreen"
          >
            轻触唤醒屏幕
          </div>

          <div v-else>
            <DynamicIsland>
              <template #left>
                <LockIcon :lockStatus="MyIPhone.lockStatus.value" />
              </template>
            </DynamicIsland>

            <LockScreen>
              <template #header>
                <HeaderBar />
              </template>

              <Time className="lock-time" />

              <template #footer>
                <HomeBar
                  @mousedown="MyIPhone.homeBar?.onStart($event)"
                  @touchstart="MyIPhone.homeBar?.onStart($event)"
                />
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
        flex
        items-center
        w-2
        h-15
        font-size-2
        color-gray
        bg-black
        rounded-full
        pos-absolute
        top-28
        z--1
        @click="MyIPhone.setIsWakeUp()"
      >
        锁屏
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.iphone-container {
  width: min-content;

  .iphone {
    user-select: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .lock-button {
    cursor: pointer;
    line-height: 24px;
    right: -4px;
  }
}

@keyframes lockIconToggle {
  to {
    transform: translateX(-100%);
  }
}
</style>