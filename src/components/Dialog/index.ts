import {
  createApp,
  h
} from 'vue';
import {
  ElButton,
  ElDialog
} from 'element-plus';

class Dialog {
  private defaultOptions = {
    modelValue: true
  }

  footer () {
    return h(
      'div',
      {
        class: 'dialog-footer'
      },
      [
        h(
          ElButton,
          {
            
          },
          '取消'
        ),
        h(
          ElButton,
          {
            type: 'primary',
            loading: true,
            disabled: true
          },
          '确定'
        )
      ]
    )
  }

  open (content: any, props?: any, options?: any) {
    const vnode = h(
      ElDialog,
      {
        ...Object.assign(this.defaultOptions, options),
        close: this.close()
      },
      {
        default: h(content, ...props),
        footer: this.footer()
      }
    );
    const app = createApp(vnode);
    const container = document.createElement('div');

    document.body.appendChild(container);
    app.mount(container);
    this.close = () => {
      app.unmount();
      document.body.removeChild(container);
    }
  }

  close () {}
}

export default new Dialog();