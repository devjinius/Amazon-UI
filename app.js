import Jungle from './Jungle/index.js';
import { makeHTMLString } from './template.js';

const getData = async () =>
  await fetch('./resources/localData.json').then(response => response.json());

const addCardsToDOM = cards => {
  const cardElements = makeHTMLString({ data: cards, type: 'card' });
  const navItemElements = makeHTMLString({ data: cards, type: 'navItem' });

  document.querySelector('.container').insertAdjacentHTML('afterbegin', cardElements);
  document.querySelector('.nav').insertAdjacentHTML('afterbegin', navItemElements);
};

const makeCarousel = () => {
  const jungle = new Jungle();
  return jungle.createCarousel({
    elClassNameObj: {
      container: '.container',
      nav: '.nav'
    }
  });
};

window.addEventListener('DOMContentLoaded', () => {
  const data = getData();
  let carousel;

  // prettier-ignore
  data
    .then(cards => addCardsToDOM(cards))
    .then(_ => carousel = makeCarousel());
});
