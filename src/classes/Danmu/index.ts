// @ts-nocheck
import { getTextWidth } from '@/utils/tools';

export default class CDanmuCanvas {
  constructor (els, data, options) {
    const {
      canvas,
      video,
      // danmuInput,
      // danmuBtn,
      // danmuColor
    } = els;

    for (const el in els) {
      this[el] = els[el];
    }

    this.canvasCtx = canvas.getContext('2d');
    this.canvas.width = video.offsetWidth;
    this.canvas.height = video.offsetHeight;
    this.isPause = true;
    this.bindEvent();
    this.initData(data, options);
  }

  bindEvent () {
    this.video.addEventListener('play', this.playVideo.bind(this), false);
    this.video.addEventListener('pause', this.pauseVideo.bind(this), false);
    this.video.addEventListener('seeked', this.seekedVideo.bind(this), false);
    this.danmuBtn.addEventListener('click', this.sendDanmu.bind(this), false);
  }

  // 初始化弹幕数据
  initData (data, options) {
    this.data = data.map(item => this.createDanmu(item, options));
  }

  createDanmu (dm, options = {}) {
    return new CDanmu(
      this,
      dm,
      Object.assign({
        fontSize: 20,
        color: '#FFF',
        speed: 1
      }, options)
    )
  }

  // 播放视频
  playVideo () {
    this.isPause = false;
    this.playDanmu();
  }

  // 暂停视频
  pauseVideo () {
    this.isPause = true;
  }

  // 拖动视频进度条
  seekedVideo () {
    this.resetDanmu();
  }

  playDanmu () {
    this.clearCanvas();
    this.drawDanmu();

    // 如果视频暂停，不继续绘制弹幕
    if (this.isPause) return;

    requestAnimationFrame(this.playDanmu.bind(this));
  }

  // 绘制弹幕
  drawDanmu () {
    const videoCurrentTime = this.video.currentTime;

    this.data.forEach(item => {
      // 判断是否到了该弹幕出现的时候并且在视频范围内
      if (videoCurrentTime >= item.runTime && !item.isOutRange) {
        // 第一次需要初始化弹幕
        if (!item.isInited) {
          item.init();
          item.isInited = true;
        } else {
          item.X -= item.speed;
        }
        
        item.draw();

        // 判断该弹幕是否超出了视频范围
        if (item.X <= 0 - item.width) {
          item.isOutRange = true;
        }
      }
    });
  }

  // 重置弹幕
  resetDanmu () {
    this.clearCanvas();

    const videoCurrentTime = this.video.currentTime;

    this.data.forEach(item => {
      if (item.runTime > videoCurrentTime) {
        item.isInited = false;
        item.isOutRange = false;
      } else {
        item.isOutRange = true;
      }

      return item;
    });
  }

  // 清空画布
  clearCanvas () {
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  // 发送弹幕
  sendDanmu () {
    const content = this.danmuInput.value;

    if (!content) return;

    this.data.push(this.createDanmu(
      {
        content,
        fontSize: Math.trunc(Math.random() * 50) + 1,
        color: this.danmuColor.value,
        runTime: this.video.currentTime,
        speed: Math.trunc(Math.random() * 10) + 1
      }
    ));

    this.danmuInput.value = '';
  }
}

class CDanmu {
  constructor (dmCtx, dm, options) {
    this.dmCtx = dmCtx;
    this.dm = dm;
    this.options = options;
    this.width = getTextWidth(this.content, this.fontSize);
    this.init();
  }

  // 初始化弹幕
  init () {
    const {
      dm,
      options
    } = this;

    for (const key in {...dm, ...options}) {
      this[key] = dm[key] !== undefined ? dm[key] : options[key];
    }

    const {
      width,
      height
    } = this.dmCtx.canvas;

    this.X = width;

    let Y = Math.random() * height;

    if (Y < this.fontSize) {
      Y = this.fontSize;
    } else if (Y > height - this.fontSize) {
      Y = height - this.fontSize;
    }

    this.Y = Y;
  }

  draw () {
    this.dmCtx.canvasCtx.font = `${ this.fontSize }px 微软雅黑`;
    this.dmCtx.canvasCtx.fillStyle = this.color;
    this.dmCtx.canvasCtx.fillText(this.content, this.X, this.Y);
  }
}