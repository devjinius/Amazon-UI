import * as components from './components/index.js';

class Jungle {
  createCarousel({ classNameObj, options }) {
    return new components.Carousel({ classNameObj, options });
  }

  createSearch({ classNameObj, options }) {
    return new components.Search({ classNameObj, options });
  }
}

export default Jungle;
