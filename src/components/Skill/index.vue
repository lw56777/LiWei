<script setup lang="ts">
import {
  ref,
  // onMounted
  // inject
} from 'vue';
// import { Oml2dMethods } from 'oh-my-live2d';
import {
  // getRandomInt,
  shuffleArray,
  // hexToRgba
} from '@/utils/tools';
import skills from '@/utils/skills';

// const oml2d: Oml2dMethods = inject('oml2d')!;
const _skills = shuffleArray(skills);

// const computeStyle = (color: string) => {
//   const size = getRandomInt(3, 4);
//   const x = getRandomInt(-20, 20);
//   const y = getRandomInt(-20, 20);
//   // const speed = getRandomInt(6, 9);

//   return {
//     width: `${ size }rem`,
//     height: `${ size }rem`,
//     filter: `drop-shadow(1px 1px 2px ${ color })`,
//     transform: `translate(${ x }px, ${ y }px)`,
//     // animation: `twinkleFloat ${ speed }s infinite alternate`
//   }
// }

const skillsRef = ref();
// const createAnimate = () => {
//   const skillEls = skillsRef.value.children;

//   _skills.forEach((skill, index) => {
//     const el = skillEls[index];
//     const { width } = el.getBoundingClientRect();
//     const shadowWidth = Math.max(width / 10, 5);
//     const filterStart = `drop-shadow(2px 2px ${ shadowWidth }px ${ hexToRgba(skill.color, 0) })`;
//     const filterEnd = `drop-shadow(2px 2px ${ shadowWidth }px ${ hexToRgba(skill.color, 1) })`;

//     const keyframes = [
//       {
//         filter: filterStart,
//         transform: 'translateY(0) scale(.8)',
//         opacity: .5
//       },
//       {
//         filter: filterEnd,
//         transform: 'translateY(-10px) scale(1.2)',
//         opacity: 1
//       },
//       {
//         filter: filterStart,
//         transform: 'translateY(0) scale(.8)',
//         opacity: .5
//       }
//     ];
//     const speed = getRandomInt(6, 9);
//     const options = {
//       duration: speed * 1000,
//       iterations: Infinity,
//       direction: 'alternate'
//     };

//     el.animate(keyframes, options);
//   });
// }

// onMounted(() => {
//   createAnimate();
// });

// const setTipsMessage = (dataIndex: number) => {
//   const { message } = _skills[dataIndex];
//   if (!message) return;
//   oml2d.tipsMessage(message, 3000, 1);
// }
</script>

<template>
  <div
    ref="skillsRef"
    class="skill"
    flex
    flex-wrap
    justify-center
    gap-10
  >
    <svg
      v-for="skill of _skills"
      :key="skill.name"
      class="skill-svg"
      rounded-lg
      cursor-pointer
      p-1
      aria-hidden="true"
    >
    <!-- :style="computeStyle(skill.color)" -->
    <!-- @click="setTipsMessage(index)" -->
      <use :xlink:href="`#icon-${ skill.name }`"></use>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.skill {
  @include resLayout ('Phone') {
    gap: 1rem;
  }

  .skill-svg {
    max-width: 3rem;
    max-height: 3rem;
    // background-color: #8882;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;

    // @include resLayout ('Phone') {
    //   max-width: 3rem;
    //   max-height: 3rem;
    // }
  }
}
</style>