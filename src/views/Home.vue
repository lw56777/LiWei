<script setup lang="ts">
import Skill from '@/components/Skill/index.vue';
</script>

<template>
  <div class="home">
    <div class="info-box" max-w-200 min-h-125 pos-relative>
      <Skill>
        <div class="hero-card">
          <div class="title">
            <span>Hello World</span>
          </div>

          <div class="meta">
            <div class="meta-row">
              <span>厉威</span>
              <i class="sep" />
              <span>男</span>
              <i class="sep" />
              <span>浙江</span>
            </div>
            <div class="meta-row">15058665004</div>
            <div class="meta-row">liwei15058665004@163.com</div>
          </div>
        </div>
      </Skill>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  .info-box {
    margin: auto;
  }
}

.hero-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  text-align: center;
  white-space: nowrap;

  .title {
    font-size: 2.6rem;
    line-height: 1.1;
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

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.9rem;
    opacity: 0.55;
    letter-spacing: 0.04em;

    .meta-row {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
    }

    .sep {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.6;
    }
  }
}

@keyframes expansion {
  to {
    letter-spacing: 0;
  }
}
</style>
