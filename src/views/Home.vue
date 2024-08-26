<script setup lang="ts">
</script>

<template>
  <div class="home">
    <div
      class="info-box"
      max-w-200
      min-h-125
    >
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
            liwei15058665004@163.com
          </el-descriptions-item>
          <el-descriptions-item
            label="电话"
            :span="2"
          >
            15058665004
          </el-descriptions-item>
        </el-descriptions>
      </section>
      ...

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

      <div
        class="focal-point"
        w-50
        h-50
        pos-absolute
        opacity-50
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  .info-box {
    margin: auto;
    position: relative;
    
    section {
      margin-top: 5rem;
    }

    .title {
      background: var(--background-rgb);
      background-size: 200% 200%;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: bg 30s ease infinite forwards;
      transition: all .3s;
    }

    .focal-point {
      background: var(--background-rgb);
      background-size: 500% 500%;
      border-radius: 50%;
      filter: blur(120px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all .3s;
      animation: radialGradient 30s ease infinite forwards;
    }

    @keyframes radialGradient {
      0% {
        background-position: 0% 0%;
      }
      25% {
        background-position: 50% 50%;
      }
      50% {
        background-position: 100% 100%;
      }
      75% {
        background-position: 50% 50%;
      }
      100% {
        background-position: 0% 0%;
      }
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