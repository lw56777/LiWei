export default class CDialog {
  visible = false;
  content: any = '';
  isComponent = false;
  options = {};

  constructor (options = {}) {
    this.options = options;
  }

  private setVisible (visible: boolean) {
    this.visible = visible;
  }

  private setContent (content: any) {
    if (typeof content === 'function') {
      this.content = content();
      return;
    }

    this.content = content;
  }

  private setIsComponent () {
    const {
      name,
      setup
    } = this.content;
    
    this.isComponent = name?.includes('ComponentWrapper') && typeof setup === 'function';
  }

  open (content: any = '') {
    this.setVisible(true);
    this.setContent(content);
    this.setIsComponent();
  }

  close () {
    this.setVisible(false);
  }
}