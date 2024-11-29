import { ref } from 'vue';

type TMouseEvent = (e: MouseEvent) => void;
type TTouchEvent = (e: TouchEvent) => void;

let mouseMove: TMouseEvent;
let mouseUp: TMouseEvent;
let touchMove: TTouchEvent;
let touchEnd: TTouchEvent;

export default class CIndicator {
  private el;
  private elHeight = 0;
  private indicator: HTMLElement;
  private isMove = false;
  private startY = 0;
  public top = 0;
  static isLocked = ref(true);

  constructor (el: HTMLElement) {
    this.el = el;
    this.elHeight = el.getBoundingClientRect().height;
    this.indicator = el.querySelector('.home-indicator')!;
  }

  addEvents () {
    const windowWidth = window.innerWidth;

    if (windowWidth > 768) {
      mouseMove = this.onMove.bind(this) as TMouseEvent;
      mouseUp = this.onEnd.bind(this) as TMouseEvent;

      this.indicator.addEventListener('mousemove', mouseMove, false);
      this.indicator.addEventListener('mouseup', mouseUp, false);
      document.addEventListener('mousemove', mouseMove, false);
      document.addEventListener('mouseup', mouseUp, false);
    } else {
      touchMove = this.onMove.bind(this) as TTouchEvent;
      touchEnd = this.onEnd.bind(this) as TTouchEvent;

      this.indicator.addEventListener('touchmove', touchMove, false);
      this.indicator.addEventListener('touchend', touchEnd, false);
      document.addEventListener('touchmove', touchMove, false);
      document.addEventListener('touchend', touchEnd, false);
    }
  }

  removeEvents () {
    if (mouseMove) {
      this.indicator.removeEventListener('mousemove', mouseMove, false);
      this.indicator.removeEventListener('mouseup', mouseUp, false);
      document.removeEventListener('mousemove', mouseMove, false);
      document.removeEventListener('mouseup', mouseUp, false);
    } else {
      this.indicator.removeEventListener('touchmove', touchMove, false);
      this.indicator.removeEventListener('touchend', touchEnd, false);
      document.removeEventListener('touchmove', touchMove, false);
      document.removeEventListener('touchend', touchEnd, false);
    }
  }

  onStart (e: MouseEvent & TouchEvent) {
    this.isMove = true;
    this.el.classList.add('moving');
    this.startY = e.clientY || e.touches[0].clientY;
    this.addEvents();
  }

  onMove (e: MouseEvent & TouchEvent) {
    if (!this.isMove) return;

    const endY = e.clientY || e.touches[0].clientY;
    this.top = endY - this.startY;
  
    if (this.top > 0) {
      this.top = 0;
    }
  
    this.el.style.transform = `translateY(${ this.top }px)`;
  }

  onEnd () {
    this.isMove = false;
    this.el.classList.remove('moving');
    this.el.style.setProperty('--transition', 'all .5s');

    if (Math.abs(this.top) / this.elHeight > 0.4) {
      this.el.style.transform = `translateY(-100%)`;
      CIndicator.isLocked.value = false;
    } else {
      this.top = 0;
      this.el.style.removeProperty('transform');
    }

    this.removeEvents();

    const t = setTimeout(() => {
      this.el.style.setProperty('--transition', 'none');
      clearTimeout(t);
    }, 500);
  }
}