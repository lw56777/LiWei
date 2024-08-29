<script setup lang="ts">
import { shuffleArray } from '@/utils/tools';
import skills from '@/utils/skills';

const _skills = shuffleArray(skills);
</script>

<template>
  <div
    ref
    class="skill"
    flex
    flex-wrap
    gap-10
  >
    <svg
      v-for="skill, index of _skills"
      :key="index"
      :class="['skill-svg', `skill-svg-${ index + 1 }`]"
      aria-hidden="true"
      rounded-lg
      p-1
    >
      <use :xlink:href="`#icon-${ skill.name }`"></use>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.skill {
  .skill-svg {
    background-color: #8882;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
  }
}

@for $i from 1 through 17 {
  .skill-svg#{-$i} {
    $size: random(5);
    $x: random(20);
    $y: random(20);
    $speed: random(30);
    width: #{max(3, $size)}rem;
    height: #{max(3, $size)}rem;
    transform: translate(#{$x}px, #{$y}px);
    animation: float #{max(5, $speed)}s infinite ease-in-out alternate, twinkle #{max(5, $speed)}s ease infinite;
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes twinkle {
  0% {
    opacity: .3;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: .3;
  }
}

@media (max-width: 768px) {
  .skill {
    gap: 1rem;

    .skill-svg {
      max-width: 3rem;
      max-height: 3rem;
    }
  }
} 
</style>