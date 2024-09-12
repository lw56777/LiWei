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
        <span>Hello World</span>
      </div>

      <section class="basic-info">
        <el-space
          :size="20"
          wrap
        >
          <el-text type="info">厉威</el-text>
          <el-text type="info">男</el-text>
          <el-text type="info">15058665004</el-text>
          <el-text type="info">535847787@qq.com</el-text>
        </el-space>

        <el-progress
          :stroke-width="1"
          color="rgba(136, 136, 136, 0.25)"
          :show-text="false"
          :percentage="100"
          indeterminate
          :duration="5"
        />
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

    .title {
      background: var(--rainbow-bg);
      background-size: 200% 200%;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: rainbowBg 30s infinite;

      span {
        letter-spacing: -15px;
        animation: expansion 3s forwards;
      }
    }

    section {
      margin-top: 4rem;
    }

    .basic-info {
      max-width: max-content;
      margin-left: 1rem;
    }
  }
}

@keyframes expansion {
  to {
    letter-spacing: 0;
  }
}
</style>

<style lang="scss">
.home {
 .info-box {
  .el-progress-bar__outer {
    background-color: transparent;
  }

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