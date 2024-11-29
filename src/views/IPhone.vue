<script setup lang="ts">
import {
  ref,
  watch
} from 'vue';
import CIndicator from '@/classes/Indicator';
import DynamicIsland from '@/components/IPhone/DynamicIsland/index.vue';
import HeaderBar from '@/components/IPhone/HeaderBar/index.vue';
import Time from '@/components/IPhone/HeaderBar/Time.vue';
import LockScreen from '@/components/IPhone/LockScreen/index.vue';
import HomeScreen from '@/components/IPhone/HomeScreen/index.vue';
import LockIcon from '@/components/IPhone/LockScreen/LockIcon.vue';

// 屏幕是否处于关闭状态
const isClosed = ref(true);
// 锁图标的状态（-1不显示、0锁定、1解锁）
const lockStatus = ref(-1);

// 点亮屏幕
const batteryScreen = () => {
  isClosed.value = false;
}

const switchScreen = () => {
  isClosed.value = !isClosed.value;
  CIndicator.isLocked.value = true;
}

const setLockStatus = () => {
  lockStatus.value = 0;

  const t = setTimeout(() => {
    lockStatus.value = 1;
    clearTimeout(t);
    
    const t2 = setTimeout(() => {
      lockStatus.value = -1;
      clearTimeout(t2);
    }, 500);
  }, 500);
}

watch(
  () => isClosed.value,
  (value: boolean) => {
    if (value) return;
    setLockStatus();
  }
);
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
      h-144
      font-size-3
      rounded-3xl
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
            v-if="isClosed"
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
                <LockIcon
                  v-show="lockStatus !== -1"
                  :lockStatus="lockStatus"
                />
              </template>
            </DynamicIsland>

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
  // min-height: calc(100vh - 200px);

  .iphone {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .lock-button {
    cursor: pointer;
    right: -3px;
  }
}

@keyframes lockIconToggle {
  to {
    transform: translateX(-100%);
  }
}
</style>