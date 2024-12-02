import { ref } from 'vue';
import { SortableEvent } from 'vue-draggable-plus';
import TSwiper from 'swiper';
import { shuffleArray } from '@/utils/tools';
import svgIconFont from '@/utils/svg';
import CHomeBar from './homeBar';
import CApp from './app';

const appSvg = [...svgIconFont.app, ...svgIconFont.skill];
const tabAppNames = ['html', 'css', 'javascript', 'typescript'];
const appBaseOffset: number[] = [];
let _endClock;

class CIPhone {
  static instance: CIPhone;
  private container: HTMLElement | null = null;
  public isWakeUp = ref(false); // 是否唤醒屏幕
  public lockStatus = ref(0); // 解锁图标状态（0：隐藏，1：显示，2：解锁）
  public homeBar: CHomeBar | null = null;
  public isInHome = ref(false); // 是否进入主页
  private swiper: TSwiper | null = null;
  public tabApp = ref<CApp[]>([]);
  public pageApp = ref<Array<CApp[]>>([]);
  public isEditing = ref(false); // 是否处于编辑状态
  private touchTimer: NodeJS.Timeout | null = null; // 长按计时器
  private prevX = 0; // 手动上一页的触发坐标
  private nextX = 0; // 手动下一页的触发坐标

  private constructor () {}

  static getInstance () {
    if (this.instance) {
      return this.instance;
    }

    return new CIPhone();
  }

  setContainer () {
    this.container = document.querySelector('.iphone')!;
  }

  setIsWakeUp (status?: boolean) {
    this.isWakeUp.value = status !== undefined ? status : !this.isWakeUp.value;

    if (this.isWakeUp.value) {
      this.setLockStatus();
    }

    if (this.isInHome.value) {
      this.setIsInHome(false);
    }
  }

  setLockStatus () {
    this.lockStatus.value = 1;

    const t = setInterval(() => {
      if (this.lockStatus.value < 2) {
        this.lockStatus.value++;
      } else {
        this.lockStatus.value = 0;
        clearInterval(t);
      }
    }, 500);
  }

  setHomeBar (className: string) {
    const el = document.querySelector(className);

    if (!el) return;

    this.homeBar = new CHomeBar(el as HTMLElement);
  }

  setIsInHome (status: boolean) {
    this.isInHome.value = status;
  }

  setSwiper (swiper: TSwiper) {
    this.swiper = swiper;
  }

  setSwiperActive (dir: 'left' | 'right') {
    this.swiper?.enable();
  
    switch (dir) {
      case 'left':
        this.swiper?.slidePrev();
        break;

      case 'right':
        this.swiper?.slideNext();
        break;

      default:
        break;
    }

    this.swiper?.disable();
  }

  installApp () {
    this.tabApp.value = [];
    this.pageApp.value = [];
    let pageIndex = 0;

    type TAppItem = {
      name: string;
      color: string;
    }

    shuffleArray(appSvg).forEach((item: TAppItem) => {
      const {
        name,
        color
      } = item;
      const app = new CApp(name, color);
  
      if (tabAppNames.includes(name)) {
        this.tabApp.value.push(app);
      } else {
        if (!this.pageApp.value[pageIndex]) {
          this.pageApp.value[pageIndex] = [];
        }
  
        this.pageApp.value[pageIndex].push(app);
  
        if (this.pageApp.value[pageIndex].length >= 24) {
          pageIndex++;
        }
      }
    });
  }

  getAppAnimation (app: HTMLElement, appIndex: number, width: number, height: number) {
    const {
      offsetTop,
      offsetLeft
    } = app;
    const baseWidth = width - offsetLeft;
    const baseHeight = height - offsetTop;
    const rowIndex = Math.floor(appIndex / 4);
    const colIndex = appIndex % 4;
    let x = 0;
    let y = 0;
    let s = 1;
    let d = 1;

    if ([0, 3].includes(colIndex)) {
      d = 2 * (rowIndex + 1);
    } else {
      d = 1.8 * (rowIndex + 1);
    }

    d = d / 10;

    if (rowIndex === 0) {
      d = d + .5;

      switch (colIndex) {
        case 0:
        case 1:
          x = -baseWidth * 2;
          y = -baseHeight * 2;
          s = 2;

          if (appIndex === 0) {
            appBaseOffset.push(x, y, s);
          }
          break;

        case 2:
        case 3:
          const [
            x1,
            y1,
            s1
          ] = appBaseOffset;

          x = Math.abs(x1);
          y = y1;
          s = s1;
          break;

        default:
          break;
      }
    } else {
      const [
        x1,
        y1,
        s1
      ] = appBaseOffset;

      if (rowIndex === 1) {
        x = x1 / 2;
        y = y1 / 2;
        s = s1 / 2;

        if ([2, 3].includes(colIndex)) {
          x = Math.abs(x);
        }
      } else {
        x = x1 * (rowIndex - 1);
        y = Math.abs(y1) * (rowIndex - 1);
        s = s1 * (rowIndex - 1);

        if ([2, 3].includes(colIndex)) {
          x = Math.abs(x);
        }
      }
    }
  
    app.style.setProperty('--duration', d + 's');
  
    return `scale(${ s }) translate(${ x }px, ${ y }px)`;
  }

  setAppAnimation () {
    const oPages = this.container!.querySelectorAll('.page-item')!;
  
    oPages.forEach((page, pageIndex) => {
      const oApps: NodeListOf<HTMLElement> = page.querySelectorAll('.page-app');
      const {
        clientWidth,
        clientHeight
      } = page;
  
      for (let i = 0; i < oApps.length; i++) {
        const app = oApps[i];

        const t1 = setTimeout(() => {
          const appName: HTMLElement = app.querySelector('.app-name')!;
          appName.style.opacity = '1';
          clearTimeout(t1);
        }, 1500);
  
        if (pageIndex === this.swiper?.activeIndex) {
          app.style.transform = this.getAppAnimation(app, i, clientWidth, clientHeight);
  
          const t2 = setTimeout(() => {
            app.style.removeProperty('--duration');
            app.style.removeProperty('transform');
            clearTimeout(t2);
          }, 2000);
        }
      }
    });
  }

  touchStart () {
    if (this.isEditing.value) return;

    this.startClock();
    _endClock = this.endClock.bind(this);

    const windowWidth = window.innerWidth;

    if (windowWidth > 768) {
      document.addEventListener('mousemove', _endClock, false);
    } else {
      document.addEventListener('touchmove', _endClock, false);
    }
  }

  startClock () {
    let seconds = 0;
    this.touchTimer = setInterval(() => {
      seconds++;

      if (seconds >= 1) {
        this.endClock();
        this.isEditing.value = true;
        this.swiper?.disable();
      }
    }, 1000);
  }

  endClock () {
    clearInterval(this.touchTimer!);
    document.removeEventListener('mousemove', _endClock!, false);
    document.removeEventListener('touchmove', _endClock!, false);
  }

  closeEditing () {
    CApp.removeDragging();
    this.isEditing.value = false;
    this.swiper?.enable();
  }

  appDragStart (e: SortableEvent) {
    e.item.style.opacity = '0';
    const hotWidth = Math.round(e.item.clientWidth / 4);
    const {
      width,
      x
    } = this.container!.getBoundingClientRect();

    this.prevX = x + hotWidth;
    this.nextX = x + width - hotWidth;
    CApp.bindDraging(this.appDragMove.bind(this));
  }

  appDragUnChoose (e: SortableEvent) {
    e.item.style.opacity = '1';
  }

  appDragMove (e: MouseEvent & TouchEvent) {
    const moveX = e.clientX || e.touches[0].clientX;
    const {
      activeIndex,
      slides
    } = this.swiper!;

    if (moveX < this.prevX && activeIndex > 0) {
      this.setSwiperActive('left');
    } else if (moveX > this.nextX && activeIndex < slides.length - 1) {
      this.setSwiperActive('right');
    }
  }

  removeApp = (pageIndex: number, appIndex: number) => {
    this.pageApp.value[pageIndex].splice(appIndex, 1);
  }
}

export default CIPhone.getInstance();