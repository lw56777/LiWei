import MyIPhone from './';

type TMouseEvent = (e: MouseEvent) => void;
type TTouchEvent = (e: TouchEvent) => void;

let _onMove: TMouseEvent & TTouchEvent;
let _onEnd: TMouseEvent & TTouchEvent;

export default class CHomeBar {
  private el;
  private elHeight = 0;
  private bar: HTMLElement;
  private isMove = false;
  private startY = 0;
  public top = 0;

  constructor (el: HTMLElement) {
    this.el = el;
    this.elHeight = el.getBoundingClientRect().height;
    this.bar = el.querySelector('.home-bar')!;
  }

  addEvents () {
    _onMove = this.onMove.bind(this);
    _onEnd = this.onEnd.bind(this);
    const windowWidth = window.innerWidth;

    if (windowWidth > 768) {
      this.bar.addEventListener('mousemove', _onMove, false);
      this.bar.addEventListener('mouseup', _onEnd, false);
      document.addEventListener('mousemove', _onMove, false);
      document.addEventListener('mouseup', _onEnd, false);
    } else {
      this.bar.addEventListener('touchmove', _onMove, false);
      this.bar.addEventListener('touchend', _onEnd, false);
      document.addEventListener('touchmove', _onMove, false);
      document.addEventListener('touchend', _onEnd, false);
    }
  }

  removeEvents () {
    this.bar.removeEventListener('touchmove', _onMove, false);
    this.bar.removeEventListener('touchend', _onEnd, false);
    document.removeEventListener('touchmove', _onMove, false);
    document.removeEventListener('touchend', _onEnd, false);
  }

  onStart (e: MouseEvent & TouchEvent) {
    this.isMove = true;
    this.el.classList.add('moving');
    this.startY = e.clientY || e.touches[0].clientY;
    this.addEvents();
  }

  onMove (e: MouseEvent ): void;
  onMove (e: TouchEvent ): void;

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
      MyIPhone.setIsInHome(true);
    } else {
      this.top = 0;
      this.el.style.removeProperty('transform');
      MyIPhone.setIsInHome(false);
    }

    this.removeEvents();

    const t = setTimeout(() => {
      this.el.style.setProperty('--transition', 'none');
      clearTimeout(t);
    }, 500);
  }
}