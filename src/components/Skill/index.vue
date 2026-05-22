<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { shuffleArray } from '@/utils/tools';
import svgIconFont from '@/utils/svg';

const skills = shuffleArray(svgIconFont.skill);

// 四方位锚色：顶/右/下/左 — 粉/紫/蓝/橘
const colorAnchors: [number, number, number][] = [
  [225, 93, 124],
  [169, 93, 188],
  [111, 162, 220],
  [232, 184, 148],
];

function getColorForAngle(angle: number) {
  const a = ((angle % 360) + 360) % 360;
  const segment = Math.floor(a / 90);
  const t = (a % 90) / 90;
  const c1 = colorAnchors[segment];
  const c2 = colorAnchors[(segment + 1) % 4];
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

interface RingDef {
  radius: number;
  count: number;
  size: number;
}

// 由内向外：圈越大，点越多、越大
const rings: RingDef[] = [
  { radius: 230, count: 24, size: 10 },
  { radius: 262, count: 28, size: 12 },
  { radius: 294, count: 32, size: 14 },
  { radius: 326, count: 36, size: 16 },
];

interface DotMeta {
  baseAngle: number;
  radius: number;
  size: number;
  skill: (typeof skills)[number] | null;
  pushX: number;
  pushY: number;
}

const dots: DotMeta[] = [];
const dotIndexByRing: number[][] = rings.map(() => []);

rings.forEach((ring, ringIdx) => {
  const angleStep = 360 / ring.count;

  for (let i = 0; i < ring.count; i++) {
    // 角度、半径、尺寸都加点抖动，让分布显得自然不死板
    const angle = angleStep * i + (Math.random() - 0.5) * angleStep * 0.7;
    const radius = ring.radius + (Math.random() - 0.5) * 18;
    const size = Math.max(6, ring.size + (Math.random() - 0.5) * 6);

    dotIndexByRing[ringIdx].push(dots.length);
    dots.push({
      baseAngle: angle,
      radius,
      size,
      skill: null,
      pushX: 0,
      pushY: 0,
    });
  }
});

// 按角度均匀地把技能图标分布到各圈：技能 i 落在第 (i % 圈数) 圈上离目标角最近的可用点
const usedDotIndices = new Set<number>();
skills.forEach((skill, i) => {
  const desiredAngle = (360 / skills.length) * i;
  const ringIdx = i % rings.length;

  let bestIdx = -1;
  let bestDiff = Infinity;
  for (const dotIdx of dotIndexByRing[ringIdx]) {
    if (usedDotIndices.has(dotIdx)) continue;
    const diff = Math.abs(
      (((dots[dotIdx].baseAngle - desiredAngle) % 360) + 540) % 360 - 180
    );
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIdx = dotIdx;
    }
  }

  if (bestIdx >= 0) {
    dots[bestIdx].skill = skill;
    usedDotIndices.add(bestIdx);
  }
});

const skillDotIndices = dots
  .map((d, i) => (d.skill ? i : -1))
  .filter((i) => i >= 0);

const activeIndex = ref(0);
const canvasRef = ref<HTMLElement>();

let rafId = 0;
let cycleTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  const dotEls = canvasRef.value!.querySelectorAll<HTMLElement>('[data-dot]');
  const startTime = performance.now();
  const rotateSpeed = 6;
  const pushRadius = 70;
  const pushStrength = 36;
  const pushEase = 0.18;

  const tick = (now: number) => {
    const rotation = ((now - startTime) / 1000) * rotateSpeed;
    const activeDotIdx = skillDotIndices.length
      ? skillDotIndices[activeIndex.value]
      : -1;

    let activeX = 0;
    let activeY = 0;
    if (activeDotIdx >= 0) {
      const ad = dots[activeDotIdx];
      const ar = ((ad.baseAngle + rotation - 90) * Math.PI) / 180;
      activeX = Math.cos(ar) * ad.radius;
      activeY = Math.sin(ar) * ad.radius;
    }

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const currentAngle = dot.baseAngle + rotation;
      const rad = ((currentAngle - 90) * Math.PI) / 180;
      const baseX = Math.cos(rad) * dot.radius;
      const baseY = Math.sin(rad) * dot.radius;

      // 排挤效果：靠近被放大点的圆点向外推
      let targetPushX = 0;
      let targetPushY = 0;

      if (activeDotIdx >= 0 && i !== activeDotIdx) {
        const dx = baseX - activeX;
        const dy = baseY - activeY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < pushRadius && dist > 0.5) {
          const force = (1 - dist / pushRadius) ** 1.4 * pushStrength;
          targetPushX = (dx / dist) * force;
          targetPushY = (dy / dist) * force;
        }
      }

      dot.pushX += (targetPushX - dot.pushX) * pushEase;
      dot.pushY += (targetPushY - dot.pushY) * pushEase;

      const el = dotEls[i];
      if (!el) continue;

      const finalX = baseX + dot.pushX;
      const finalY = baseY + dot.pushY;

      el.style.transform = `translate(${finalX}px, ${finalY}px) translate(-50%, -50%)`;

      if (!el.classList.contains('active')) {
        el.style.backgroundColor = getColorForAngle(currentAngle);
      }
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  if (skillDotIndices.length > 0) {
    cycleTimer = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % skillDotIndices.length;
    }, 2200);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
  if (cycleTimer) clearInterval(cycleTimer);
});
</script>

<template>
  <div class="skill-galaxy">
    <div class="center-slot">
      <slot />
    </div>

    <div ref="canvasRef" class="dots-canvas">
      <div
        v-for="(dot, i) in dots"
        :key="i"
        data-dot
        class="dot"
        :class="{
          active: dot.skill && skillDotIndices[activeIndex] === i,
        }"
        :style="{
          '--size': `${dot.size}px`,
          '--shadow-color': dot.skill?.color || 'transparent',
        }"
      >
        <svg v-if="dot.skill" class="skill-icon" aria-hidden="true">
          <use :xlink:href="`#icon-${dot.skill.name}`"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skill-galaxy {
  position: relative;
  width: 100%;
  height: 740px;
  display: flex;
  align-items: center;
  justify-content: center;

  @include resLayout('Phone') {
    height: 520px;
    transform: scale(0.56);
    transform-origin: center;
  }
}

.center-slot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.dots-canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
}

.dot {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.08);
  will-change: transform, width, height;
  transition:
    width 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    height 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    width: 62px !important;
    height: 62px !important;
    background-color: #fff !important;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
    z-index: 1;
  }
}

.skill-icon {
  width: 72%;
  height: 72%;
  fill: currentColor;
  opacity: 0;
  transform: scale(0.4);
  filter: drop-shadow(0 4px 14px var(--shadow-color, transparent));
  transition:
    opacity 0.45s ease 0.18s,
    transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.18s,
    filter 0.5s ease 0.2s;
}

.dot.active .skill-icon {
  opacity: 1;
  transform: scale(1);
}
</style>
