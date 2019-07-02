import Carousel from './components/Carousel.js';
import Navigation from './components/Navigation.js';
import Observer from './Observer.js';

class Jungle {
  createCarousel({ elClassNameObj, options, observer = new Observer() }) {
    const carousel = new Carousel(elClassNameObj, observer, options);
    carousel.init();

    if ('nav' in elClassNameObj) {
      const nav = this.createNavigation({
        elClassNameObj: { nav: elClassNameObj.nav },
        observer
      });
      observer.register('moveCarousel', nav.setItem, nav);
      observer.register('selectNav', carousel.move, carousel);
    }

    return carousel;
  }

  createNavigation({ elClassNameObj, options, observer = new Observer() }) {
    const navigation = new Navigation(elClassNameObj, options, observer);
    navigation.init();

    return navigation;
  }
}

export default Jungle;
