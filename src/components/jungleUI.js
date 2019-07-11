import Jungle from '../../modules/Jungle/index.js';

const jungle = new Jungle();

export const makeCarousel = () => {
  return jungle.createCarousel({
    classNameObj: { container: '.container', nav: '.nav' }
    // options: { infinite: false }
  });
};
