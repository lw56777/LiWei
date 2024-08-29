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
        text-center
        mb-5
      >
        Hello Word
      </div>

      <section>
        <el-descriptions
          title="基本信息"
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
            15058665004
          </el-descriptions-item>
        </el-descriptions>
      </section>

      <section>
        <el-descriptions
          title="专业技能"
          border
          :column="1"
        >
          <el-descriptions-item label="HTML5">HTML语义化、存储技术、Canvas</el-descriptions-item>
          <el-descriptions-item label="CSS3">弹性盒布局、动画、过渡、媒体查询</el-descriptions-item>
          <el-descriptions-item label="JavaScript">对象数组操作、预编译/作用域/闭包、原型/原型链/继承、ES6、NodeJs</el-descriptions-item>
          <el-descriptions-item label="TypeScript">类型注解/推断、类的修饰符、接口、继承、泛型</el-descriptions-item>
          <el-descriptions-item label="前端框架/库">Vue2/Vue3、React、Uniapp</el-descriptions-item>
          <el-descriptions-item label="前端工具链">Vite、Webpack</el-descriptions-item>
          <el-descriptions-item label="后端">了解Java、Go、MySQL</el-descriptions-item>
        </el-descriptions>
      </section>

      <!-- <section>
        <el-descriptions
          title="工作&项目经历"
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
      width: 28%;
    }

    // .el-descriptions__content {
    //   width: 43%;
    // }
  }
 }
}
</style>