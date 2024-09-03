<script setup lang="ts">
import Rainbow from '@/components/Rainbow/index.vue';
import Skill from '@/components/Skill/index.vue';
</script>

<template>
  <div class="home">
    <div
      class="info-box"
      max-w-200
      min-h-125
      pos-relative
    >
      <div
        class="title"
        font-size-8
        text-center
      >
        Hello World
      </div>

      <section>
        <el-descriptions
          :column="2"
          border
        >
          <el-descriptions-item label="姓名">厉威</el-descriptions-item>
          <el-descriptions-item label="性别">男</el-descriptions-item>
          <el-descriptions-item
            label="邮箱"
            :span="2"
          >
            535847787@qq.com
          </el-descriptions-item>
          <el-descriptions-item
            label="电话"
            :span="2"
          >
            15058665004
          </el-descriptions-item>
        </el-descriptions>
      </section>

      <section>
        <Skill />
      </section>

      <Rainbow />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  .info-box {
    margin: auto;

    // @include resLayout ($PHONE) {
    //   width: 100%;
    // }

    .title {
      background: var(--rainbow-bg);
      background-size: 200% 200%;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: rainbowBg 30s infinite;
    }

    section {
      margin-top: 4rem;
    }
  }
}
</style>

<style lang="scss">
.home {
 .info-box {
  .el-descriptions {
    .el-descriptions__label {
      width: 15%;
      opacity: .7;
    }

    .el-descriptions__content {
      width: 35%;
    }
  }
 }
}
</style>