import { makeHTMLString } from '../template/index.js';
import { qs, removeNodes, setCSS } from '../../JinUtil/index.js';

export default class AutoComplete {
  constructor({ container, parentNode }) {
    this.container = qs(container);
    this.parentNode = this.container.qs(parentNode);
    this.recentArea;
  }

  init() {
    this.setInitialUI();
  }

  setInitialUI() {
    const recentAreaHTML = makeHTMLString({ type: 'autoRecentArea' });
    this.parentNode.insertAdjacentHTML('beforeend', recentAreaHTML);

    this.recentArea = this.parentNode.qs('.auto-area.recent');
  }

  render(state) {
    const { currentItem, itemLength, recentQueries } = state;

    if (this.isInvisibleState(state)) {
      setCSS(this.recentArea, 'display', 'none');
      return;
    }

    removeNodes([...this.recentArea.children]);

    const autoListHTML = makeHTMLString({
      type: 'autoList',
      data: recentQueries.length === 0 ? ['최근 검색어가 없습니다.'] : recentQueries
    });

    this.recentArea.insertAdjacentHTML('beforeend', autoListHTML);

    this.selectItem(currentItem, itemLength);
    setCSS(this.recentArea, 'display', 'block');
  }

  isInvisibleState({ isWriting, query }) {
    return !isWriting || !!query;
  }

  selectItem(currentItem, itemLength) {
    if (-1 < currentItem && currentItem < itemLength) {
      const targetItem = this.recentArea.children[currentItem];
      targetItem.classList.add('selected');
    }
  }
}
