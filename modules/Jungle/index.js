import Carousel from './components/Carousel.js';
import Navigation from './components/Navigation.js';
import * as containers from './containers/index.js';

class Jungle {
  createCarousel({ classNameObj, options }) {
    return new containers.CarouselContainer({ classNameObj, options });
  }
}

export default Jungle;
