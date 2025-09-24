<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Opportunity, Iphone, Monitor } from '@element-plus/icons-vue';
// import Signature from './Signature.vue';
import Setting from './Setting.vue';
import Theme from './Theme.vue';
import avatar1 from '@/assets/567_1.jpg';
import avatar2 from '@/assets/567_2.jpg';

const router = useRouter();

const avatar = computed(() => {
  return Math.random() > 0.5 ? avatar1 : avatar2;
});

const toAdmin = () => {
  window.open('https://github.com/lw56777/Bricklayer-Admin', '_blank');
};
</script>

<template>
  <div class="header" flex items-center justify-between h-full>
    <div class="logo">
      <!-- <Signature /> -->
      <el-avatar
        class="avatar"
        :size="30"
        :src="avatar"
        cursor-pointer
        @click="router.push({ name: 'Home' })"
      />
    </div>

    <ul class="menu" flex items-center justify-end>
      <li>
        <el-tooltip effect="dark" content="Bricklayer Admin" placement="bottom">
          <el-icon @click="toAdmin"><Monitor /></el-icon>
        </el-tooltip>
      </li>

      <li>
        <el-tooltip effect="dark" content="IPhone" placement="bottom">
          <el-icon @click="router.push({ name: 'IPhone' })">
            <Iphone />
          </el-icon>
        </el-tooltip>
      </li>

      <li>
        <el-tooltip effect="dark" content="Playground" placement="bottom">
          <el-icon @click="router.push({ name: 'Playground' })">
            <Opportunity />
          </el-icon>
        </el-tooltip>
      </li>

      <li>
        <Theme />
      </li>

      <li>
        <Setting />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.header {
  .logo {
    .avatar {
      animation: rotate 6s linear infinite;
    }
  }

  .menu {
    li {
      cursor: pointer;
      padding: 0 0.5rem;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
