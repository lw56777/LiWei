import { ref } from 'vue';

export default class CIndicator {
  private indicator;
  private isMove = false;
  private startY = 0;
  public top = 0;
  private height = 0;
  static isLocked = ref(true);

  constructor (indicator: HTMLElement) {
    this.indicator = indicator;
    this.height = indicator.getBoundingClientRect().height;
  }

  onStart (e: MouseEvent & TouchEvent) {
    this.isMove = true;
    this.indicator.classList.add('moving');
    this.startY = e.clientY || e.touches[0].clientY;
  }

  onMove (e: MouseEvent & TouchEvent) {
    if (!this.isMove) return;

    const endY = e.clientY || e.touches[0].clientY;
    this.top = endY - this.startY;
  
    if (this.top > 0) {
      this.top = 0;
    }
  
    this.indicator.style.transform = `translateY(${ this.top }px)`;
  }

  onEnd () {
    this.isMove = false;
    this.indicator.classList.remove('moving');
    this.indicator.style.setProperty('--transition', 'all .5s');

    if (Math.abs(this.top) / this.height > 0.45) {
      this.indicator.style.transform = `translateY(-100%)`;
      CIndicator.isLocked.value = false;
    } else {
      this.top = 0;
      this.indicator.style.removeProperty('transform');
    }

    const t = setTimeout(() => {
      this.indicator.style.setProperty('--transition', 'none');
      clearTimeout(t);
    }, 500);
  }
}