import {
  hexToRgba,
  getRandomInt
} from '@/utils/tools';

type TMouseEvent = (e: MouseEvent) => void;
type TTouchEvent = (e: TouchEvent) => void;
type TCb = (e: MouseEvent & TouchEvent) => void;

let draging: TCb | null = null;

export default class CApp {
  public name = '';
  public color = '';
  public bgColor = '';
  public delay = ''; // 延迟执行编辑状态时的动画

  constructor (name: string, color: string) {
    this.name = name;
    this.color = color;
    this.bgColor = hexToRgba(color || '#9ca3af', .2);
    this.delay = getRandomInt(1, 2) / 10 + 's';
  }

  static bindDraging (cb: TCb) {
    draging = cb;
    const windowWidth = window.innerWidth;

    if (windowWidth > 768) {
      document.addEventListener('drag', draging as TMouseEvent, false);
    } else {
      document.addEventListener('touchmove', draging as TTouchEvent, false);
    }
  }

  static removeDragging () {
    if (!draging) return;

    document.removeEventListener('drag', draging as TMouseEvent, false);
    document.removeEventListener('touchmove', draging as TTouchEvent, false);
  }
}