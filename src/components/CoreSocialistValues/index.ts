import {
  App,
  createApp,
  h,
  watchEffect
} from 'vue';
import { useStorage } from '@vueuse/core';
import { ElNotification } from 'element-plus';
import { getLocalStorage } from '@/utils/tools';
import CoreSocialistValues from './index.vue';

const clickEffectValue = useStorage('clickEffectValue', getLocalStorage('clickEffectValue'));

class CCoreSocialistValues {
  private data = [
    '富强',
    '民主',
    '文明',
    '和谐',
    '自由',
    '平等',
    '公正',
    '法治',
    '爱国',
    '敬业',
    '诚信',
    '友善'
  ];
  private dataIndex = 0;
  private count = 0;

  constructor () {
    const fn = this.show.bind(this);

    watchEffect(() => {
      if (clickEffectValue.value) {
        document.addEventListener('click', fn, false);
      } else {
        document.removeEventListener('click', fn, false);
      }
    });
  }

  private setDataIndex () {
    if (this.dataIndex === this.data.length - 1) {
      this.dataIndex = 0;
    } else {
      this.dataIndex++;
    }
  }

  private getDataItem () {
    return this.data[this.dataIndex];
  }

  private incrementCount () {
    this.count++;
  }

  private decrementCount () {
    this.count--;
  }

  show (e: MouseEvent) {
    if (this.count >= this.data.length) {
      ElNotification({
        type: 'warning',
        message: '点太快啦'
      });
      return;
    }

    this.incrementCount();

    const {
      clientX,
      clientY
    } = e;

    const vnode = h(
      CoreSocialistValues,
      {
        text: this.getDataItem(),
        top: clientY + 'px',
        left: clientX + 'px'
      }
    );
    const app = createApp(vnode);
    const container = document.createElement('div');

    document.body.appendChild(container);
    app.mount(container);
    this.setDataIndex();
    this.hide(app, container);
  }

  hide (app: App<Element>, container: HTMLElement, delay = 1500) {
    const t = setTimeout(() => {
      app.unmount();
      document.body.removeChild(container);
      this.decrementCount();
      clearTimeout(t);
    }, delay);
  }
}

export default new CCoreSocialistValues();