import Jungle from '../../modules/Jungle/index.js';

const jungle = new Jungle();

export const makeCarousel = () => {
  return jungle.createCarousel({
    classNameObj: { container: '.container', nav: '.nav' }
    // options: { infinite: false }
  });
};

export const makeSearch = () => {
  return jungle.createSearch({
    classNameObj: { container: '.auto-complete' }
    // options
  });
};
