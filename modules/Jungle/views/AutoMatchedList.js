import { makeHTMLString } from '../template/index.js';
import { qs, removeNodes, setCSS } from '../../JinUtil/index.js';

export default class AutoMatchedList {
  constructor({ container, parentNode }) {
    this.container = qs(container);
    this.parentNode = this.container.qs(parentNode);
    this.matchedArea;
  }

  init() {
    this.setInitialUI();
  }

  setInitialUI() {
    const matchedList = makeHTMLString({ type: 'autoMatchedArea' });
    this.parentNode.insertAdjacentHTML('beforeend', matchedList);

    this.matchedArea = this.parentNode.qs('.auto-area.matched');
  }

  render(state) {
    const { currentItem, itemLength } = state;

    if (this.isInvisibleState(state)) {
      setCSS(this.matchedArea, 'display', 'none');
      return;
    }

    removeNodes([...this.matchedArea.children]);

    const autoListHTML = makeHTMLString({
      type: 'autoList',
      data: state.matchedQueries,
      prefix: state.query
    });

    this.matchedArea.insertAdjacentHTML('beforeend', autoListHTML);

    this.selectItem(currentItem, itemLength);
    setCSS(this.matchedArea, 'display', 'block');
  }

  isInvisibleState({ isWriting, query }) {
    return !isWriting || !query;
  }

  selectItem(currentItem, itemLength) {
    if (-1 < currentItem && currentItem < itemLength) {
      const targetItem = this.matchedArea.children[currentItem];
      targetItem.classList.add('selected');
    }
  }
}
