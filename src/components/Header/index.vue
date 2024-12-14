<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  Opportunity,
  Iphone,
} from '@element-plus/icons-vue';
// import Signature from './Signature.vue';
import Setting from './Setting.vue';
import Theme from './Theme.vue';
import avatar from '@/assets/avatar.jpg';

const router = useRouter();
</script>

<template>
  <div
    class="header"
    flex
    items-center
    justify-between
    h-full
  >
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

    <ul
      class="menu"
      flex
      items-center
      justify-end
    >
      <li>
        <el-icon @click="router.push({ name: 'IPhone' })">
          <Iphone />
        </el-icon>
      </li>

      <li>
        <el-icon @click="router.push({ name: 'Playground' })">
          <Opportunity />
        </el-icon>
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
      padding: 0 .5rem;
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