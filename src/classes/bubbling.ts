import { getRandomInt } from '@/utils/tools';

export default class CBubbling {
  private container;
  private wW: number;
  private wH: number;
  private timer: any = null;

  constructor (container: HTMLElement) {
    this.container = container;
    this.wW = window.innerWidth;
    this.wH = window.innerHeight;
    this.createBubbles(10);
  }

  play () {
    this.timer = setInterval(() => {
      this.createBubbles(10);
    }, 1000);
  }

  stop () {
    this.container.innerHTML = '';
    clearInterval(this.timer);
    this.timer = null;
  }

  createBubbles (num: number) {
    for (let i = 0; i < num; i++) {
      const len = this.container.children.length;

      if (len >= 50) {
        const index = getRandomInt(0, len);
        this.container.removeChild(this.container.children[index]);
      }

      const bubble = document.createElement('div');
      const size = getRandomInt(50, 100);
      const left = getRandomInt(size, this.wW);
      const duration = getRandomInt(1, 3);
      const moveY = this.wH / 2;

      bubble.classList.add('bubble');
      bubble.style.setProperty('--size', `${ size }px`);
      bubble.style.setProperty('--left', `${ left }px`);
      bubble.style.setProperty('--duration', `${ duration }s`);
      bubble.style.setProperty('--moveY', `-${ moveY }px`);
      this.container.appendChild(bubble);
    }
  }
}