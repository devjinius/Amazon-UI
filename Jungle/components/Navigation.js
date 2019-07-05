import { setCSS, mergeConfig } from '../utils/index.js';

class Navigation {
  constructor({ nav }, config, observer) {
    this.nav = document.querySelector(nav);
    this.navItems = [...this.nav.children];

    this.observer = observer;
    this.itemLength = this.navItems.length;
    this.selectedId = 1;

    this.defaultConfig = {
      duration: 300
    };

    this.config = mergeConfig(this.defaultConfig, config);
  }

  init() {
    this.setInitialDOM();
    this.attatchEvent();
    this.setItem(this.selectedId);
  }

  setInitialDOM() {
    this.navItems.forEach((item, i) => {
      item.setAttribute('data-id', i + 1);
      setCSS(item, 'transition', `transform ${this.config.duration}ms`);
    });
  }

  attatchEvent() {
    this.nav.addEventListener('click', event => this.clickHandler(event));
  }

  clickHandler(evt) {
    const id = evt.target.dataset.id;
    if (!id) return;
    this.setItem(parseInt(id));
  }

  setItem(id) {
    this.selectedId = id;
    this.observer.notify('selectNav', this.selectedId);
    this.selectNav();
  }

  selectNav() {
    this.navItems.forEach(item => {
      item.classList.remove('selected');
    });
    this.navItems[this.selectedId - 1].classList.add('selected');
  }
}

export default Navigation;
