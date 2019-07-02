class Navigation {
  constructor({ nav }, options, observer) {
    this.navItems = [...document.querySelector(nav).children];

    this.observer = observer;
    this.itemLength = this.navItems.length;
    this.selectedId = 1;
  }

  init() {
    this.attatchEvent();
    this.setItem(this.selectedId);
  }

  attatchEvent() {
    this.navItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const id = index + 1;
        this.setItem(id);
      });
    });
  }

  setItem(id) {
    this.selectedId = id;
    this.observer.notify('selectNav', { getId: () => this.selectedId });
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
