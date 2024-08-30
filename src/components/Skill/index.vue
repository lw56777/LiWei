<script setup lang="ts">
import { inject } from 'vue';
import { Oml2dMethods } from 'oh-my-live2d';
import {
  getRandomInt,
  shuffleArray
} from '@/utils/tools';
import skills from '@/utils/skills';

const oml2d: Oml2dMethods = inject('oml2d')!;
const _skills = shuffleArray(skills);

const computeStyle = () => {
  const size = getRandomInt(3, 5);
  const x = getRandomInt(0, 20);
  const y = getRandomInt(0, 20);
  const speed = getRandomInt(10, 15);

  return {
    width: `${ size }rem`,
    height: `${ size }rem`,
    transform: `translate(${ x }px, ${ y }px)`,
    animation: `twinkleFloat ${ speed }s infinite alternate`
  }
}

const setTipsMessage = (dataIndex: number) => {
  const { message } = _skills[dataIndex];
  if (!message) return;
  oml2d.tipsMessage(message, 3000, 1);
}
</script>

<template>
  <div
    ref="skillsRef"
    class="skill"
    flex
    flex-wrap
    gap-10
  >
    <svg
      v-for="skill, index of _skills"
      :key="skill.name"
      class="skill-svg"
      :style="computeStyle()"
      rounded-lg
      p-1
      aria-hidden="true"
      @click="setTipsMessage(index)"
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