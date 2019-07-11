import Carousel from '../components/Carousel.js';
import { isContainClass, mergeConfig } from '../utils/index.js';
import Store from '../model/index.js';

export default class CarouselContainer {
  constructor({ classNameObj, options }) {
    const defaultOptions = {
      infinite: true,
      duration: 300,
      animation: 'cubic-bezier(0.240, -0.010, 0.400, 1.650)'
    };

    this.options = mergeConfig(defaultOptions, options);

    this.store = new Store({
      currentItem: 1,
      itemLength: document.querySelector(classNameObj.container).children.length,
      infinite: this.options.infinite
    });

    const props = {
      currentItem: this.store.state.currentItem,
      itemLength: this.store.state.itemLength
    };

    this.carousel = new Carousel({
      container: classNameObj.container,
      options: this.options,
      onClick: this.carouselClickHandler.bind(this),
      props
    });

    this.store.on(this.carousel);
    this.carousel.init();
  }

  carouselClickHandler({ target }) {
    if (target.tagName !== 'BUTTON') return;

    const { state } = this.store;
    const { infinite } = this.options;

    const moveId = this.getMoveId(target);
    this.store.setState({ ...state, currentItem: moveId });

    if (infinite && this.carousel.isEndOfCards(moveId)) {
      this.moveNoTransition(moveId);
    }
  }

  getMoveId(target) {
    const { currentItem } = this.store.state;

    if (isContainClass(target, 'next')) {
      return currentItem + 1;
    }

    if (isContainClass(target, 'prev')) {
      return currentItem - 1;
    }
  }

  moveNoTransition(moveId) {
    const { state } = this.store;

    this.sleep(this.options.duration).then(_ => {
      const newMoveId = this.carousel.isFirst(moveId) ? state.itemLength : 1;

      this.carousel.move({ id: newMoveId, transition: false });
      this.store.setState({ ...state, currentItem: newMoveId }, { render: false });
    });
  }

  sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

// if ('nav' in elClassNameObj) {
//   const { duration } = options || {};

//   const nav = this.createNavigation({
//     elClassNameObj: { nav: elClassNameObj.nav },
//     options: { duration },
//     model
//   });

//   model.on(carousel);
//   model.on(nav);
// }

// return carousel;
// };
