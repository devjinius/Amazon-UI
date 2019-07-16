import { setCSS, qs } from '../../JinUtil/index.js';

class Navigation {
  constructor({ nav, options, onClick, props }) {
    this.nav = qs(nav);
    this.navItems = [...this.nav.children];

    this.options = options;
    this.onClick = onClick;
    this.props = props;
  }

  init() {
    this.setInitialDOM();
    this.attatchEvent();
    this.setNavigation(this.props.currentItem);
  }

  setInitialDOM() {
    this.navItems.forEach((item, i) => {
      item.setAttribute('data-id', i + 1);
      setCSS(item, 'transition', `transform ${this.options.duration}ms`);
    });
  }

  attatchEvent() {
    this.nav.addEventListener('click', event => this.onClick(event));
  }

  setNavigation(id) {
    this.navItems.forEach(item => item.classList.remove('navigation-selected'));
    this.navItems[id - 1].classList.add('navigation-selected');
  }

  render(state) {
    const { currentItem, itemLength } = state;

    const moveId = this.getMoveId(currentItem, itemLength);
    this.setNavigation(moveId);
  }

  getMoveId(id, itemLength) {
    if (id > itemLength) {
      return 1;
    }
    if (id < 1) {
      return itemLength;
    }

    return id;
  }
}

export default Navigation;
