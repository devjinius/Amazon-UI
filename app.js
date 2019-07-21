import { makeCarousel, makeSearch } from './src/components/jungleUI.js';
import { renderCard } from './src/template.js';
import { getData } from './modules/JinUtil/index.js';

const CARD_URL = './resources/localData.json';

window.addEventListener('DOMContentLoaded', () => {
  const data = getData(CARD_URL);
  let carousel;

  data.then(cards => {
    renderCard(cards);
    carousel = makeCarousel();
  });

  const autoComplete = makeSearch();
});
