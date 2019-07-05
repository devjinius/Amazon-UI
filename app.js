import Jungle from './Jungle/index.js';
import { addCardsToDOM } from './src/template.js';

const getData = () => fetch('./resources/localData.json').then(response => response.json());

const makeCarousel = () => {
  const jungle = new Jungle();
  return jungle.createCarousel({ elClassNameObj: { container: '.container', nav: '.nav' } });
};

window.addEventListener('DOMContentLoaded', () => {
  const data = getData();
  let carousel;

  // prettier-ignore
  data
    .then(cards => addCardsToDOM(cards))
    .then(_ => carousel = makeCarousel());
});
