import { getRandomInt } from '@/utils/tools';
import { ILightningRoot } from '@/interfaces/lightning';

const MIN_COUNT = 20;
const MAX_COUNT = 2000;

class CLightningRoot implements ILightningRoot {
  startPos: number[] = [];
  length = 0;
  degrees = 0;
  count = 0;

  constructor (startPos: number[], length: number, degrees: number) {
    this.startPos = startPos;
    this.length = length;
    this.degrees = degrees;
  }
}

export class CLightning {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private points: number[][] = [];
  private roots: CLightningRoot[] = [];
  private animations: Function[] = [];
  private fps: number = 0;
  private isStop: boolean = false;
  private isReseting: boolean = false;

  constructor (canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d')!;
    this.createPoints();
    this.createRoots();
  }

  private createPoints () {
    this.points = [
      // 上
      [
        getRandomInt(0, this.canvas.width),
        0
      ],

      // 右
      [
        this.canvas.width,
        getRandomInt(0, this.canvas.height),
      ],
      
      // 下
      [
        getRandomInt(0, this.canvas.width),
        this.canvas.height
      ],
      
      // 左
      [
        0,
        getRandomInt(0, this.canvas.height)
      ]
    ];
  }

  private createRoots () {
    this.roots = [];
    let maxRootCount = getRandomInt(2, 3);
    const points = [...this.points];
    
    while (maxRootCount > 0) {
      let pointIndex = getRandomInt(0, points.length - 1);
      const startPos = points[pointIndex];
      const length = this.randomLength();
      const degrees = this.randomDegrees();
      const root = new CLightningRoot(startPos, length, degrees);
      const rootIndex = this.roots.length;

      points.splice(pointIndex, 1);
      this.roots.push(root);
      this.animations.push(() => this.drawLine(startPos, length, degrees, rootIndex));
      maxRootCount--;
    }
  }

  drawLine (startPos: number[], lenth: number, degrees: number, rootIndex: number) {
    const [x, y] = startPos;
    const endPos = [
      x + lenth * Math.cos(degrees),
      y + lenth * Math.sin(degrees)
    ];

    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'rgba(136, 136, 136, 0.25)';
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(endPos[0], endPos[1]);
    this.ctx.stroke();

    const root = this.roots[rootIndex];

    if (root.count < MIN_COUNT) {
      this.animations.push(() => this.drawLine(endPos, this.randomLength(), degrees + this.randomDegrees(), rootIndex));
      this.animations.push(() => this.drawLine(endPos, this.randomLength(), degrees - this.randomDegrees(), rootIndex));
      root.count++;
    } else if (root.count < MAX_COUNT) {
      if (Math.random() < 0.5) {
        this.animations.push(() => this.drawLine(endPos, this.randomLength(), degrees + this.randomDegrees(), rootIndex));
      }

      if (Math.random() < 0.5) {
        this.animations.push(() => this.drawLine(endPos, this.randomLength(), degrees - this.randomDegrees(), rootIndex));
      }

      root.count++;
    }
  }

  randomLength () {
    return getRandomInt(5, 10);
  }

  randomDegrees () {
    return Math.random() * 0.3;
  }

  getAnimations () {
    const animations = [...this.animations];
    this.animations.length = 0;
    animations.forEach(animation => animation());

    return this.animations.length === 0;
  }

  play () {
    requestAnimationFrame(() => {
      this.fps++;

      if (this.fps % 3 === 0 && !this.isStop) {
        this.isStop = this.getAnimations();
      }

      if (this.isStop && !this.isReseting) {
        this.reset();
      }

      this.play();
    });
  }

  reset () {
    this.isReseting = true;
    this.canvas.classList.add('fade-out');
    const timer = setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.createRoots();
      this.isStop = false;
      this.isReseting = false;
      this.canvas.classList.remove('fade-out');
      clearTimeout(timer);
    }, 3000);
  }
}