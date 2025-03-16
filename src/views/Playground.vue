<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const demos = router.getRoutes().filter(f => f.path.includes('playground/'));
</script>

<template>
  <div class="playground">
    <el-card
      v-for="item of demos"
      :key="item.path"
      @click="router.push(item.path)"
    >
      <template #header>
        <div class="card-header">
          <span>{{ item.meta.title }}</span>
        </div>
      </template>

      <div class="demo-icon">
        <i :class="`icon-` + item.meta.icon"></i>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.playground {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  .el-card {
    cursor: pointer;
  }

  .demo-icon {
    width: 18rem;
    height: 12rem;

    @include flex {}

    i {
      font-size: 3rem;
    }
  }
}
</style>

<style lang="scss">
.el-card__body {
  padding: 0;
}
</style>