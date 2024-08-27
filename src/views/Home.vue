<script setup lang="ts">
import Rainbow from '@/components/Rainbow/index.vue';
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
        font-700
        text-center
        mb-2
      >
        Hello Word!
      </div>

      <section>
        <el-descriptions
          title="个人信息"
          border
          :column="2"
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
            12345678910
          </el-descriptions-item>
        </el-descriptions>
      </section>

      <!-- <section>
        <el-descriptions
          title="工作经历"
          border
        >
        </el-descriptions>
        ...
      </section>

      <section>
        <el-descriptions
          title="项目经历"
          border
        >
        </el-descriptions>
        ...
      </section> -->

      <Rainbow />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  .info-box {
    overflow: hidden;
    margin: auto;

    .title {
      background: var(--rainbow-color);
      background-size: 200% 200%;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: rainbow 30s ease infinite;
    }

    section {
      margin-bottom: 2rem;
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
    }

    // .el-descriptions__content {
    //   width: 43%;
    // }
  }
 }
}
</style>