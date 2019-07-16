import { makeCarousel, makeSearch } from './src/components/jungleUI.js';
import { renderCard } from './src/template.js';
import { getData } from './modules/JinUtil/index.js';

const CARD_URL = './resources/localData.json';

window.addEventListener('DOMContentLoaded', () => {
  const data = getData(CARD_URL);
  let carousel, autoComplete;

  // prettier-ignore
  data
    .then(cards => renderCard(cards))
    .then(_ => {
      carousel = makeCarousel();
      autoComplete = makeSearch();
    });
});
