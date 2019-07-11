import { setCSS, mergeConfig } from '../utils/index.js';

class Navigation {
  constructor({ nav }, config, model) {
    this.nav = document.querySelector(nav);
    this.navItems = [...this.nav.children];

    this.model = model;
    this.itemLength = this.navItems.length;

    this.defaultConfig = {
      duration: 300
    };

    this.config = mergeConfig(this.defaultConfig, config);
  }

  init() {
    this.setInitialDOM();
    this.attatchEvent();
    const {
      state: { currentItem }
    } = this.model;

    this.selectNav(currentItem);
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
    this.model.setState({ currentItem: parseInt(id) });
  }

  selectNav(id) {
    this.navItems.forEach(item => item.classList.remove('selected'));
    this.navItems[id - 1].classList.add('selected');
  }

  render(state) {
    const { currentItem } = state;
    let changeItem;
    if (currentItem > this.itemLength) {
      changeItem = 1;
    } else if (currentItem === 0) {
      changeItem = this.itemLength;
    } else {
      changeItem = currentItem;
    }

    this.selectNav(changeItem);
  }
}

export default Navigation;
