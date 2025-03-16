<script setup lang="ts">
import { onMounted } from 'vue';
import danmuData from '@/classes/Danmu/data.js';
import CDanmu from '@/classes/Danmu/index.js';

onMounted(() => {
  const oDanmuCanvas = document.querySelector('.danmu-canvas');
  const oDanmuVideo = document.querySelector('.danmu-video');
  const oDanmuInput = document.querySelector('.danmu-input');
  const oDanmuBtn = document.querySelector('.danmu-btn');
  const oDanmuColor = document.querySelector('.danmu-color');

  new CDanmu(
    {
      canvas: oDanmuCanvas,
      video: oDanmuVideo,
      danmuInput: oDanmuInput,
      danmuBtn: oDanmuBtn,
      danmuColor: oDanmuColor
    },
    danmuData,
    {
      fontSize: 50,
      color: 'green'
    }
  );
});
</script>

<template>
  <div class="demo-danmu">
    <div class="danmu-box">
      <canvas class="danmu-canvas"></canvas>
      <video
        class="danmu-video"
        src="../vedio/红豆-方大同.mp4"
        controls
      ></video>
    </div>

    <div class="tool-box">
      <input
        class="danmu-input"
        type="text"
        placeholder="输入内容"
      />

      <button class="danmu-btn">发送弹幕</button>

      <input
        class="danmu-color"
        type="color"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.danmu-box {
  width: 1000px;
  position: relative;
}

.danmu-canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.tool-box {
  display: flex;
}

.danmu-video {
  width: 100%;
}

.danmu-input {
  width: 200px;
  height: 40px;
}
</style>