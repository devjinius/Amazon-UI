import { makeHTMLString } from '../template/index.js';
import { qs, isMatchedKey } from '../../JinUtil/index.js';

export default class SearchInput {
  constructor({ container, onChange, onBlur, onFocus, onClick }) {
    this.container = qs(container);
    this.onChange = onChange;
    this.onBlur = onBlur;
    this.onFocus = onFocus;
    this.onClick = onClick;
  }

  init() {
    this.setInitialUI();
    this.attatchEvent();
  }

  setInitialUI() {
    const searchInput = makeHTMLString({ type: 'searchInput' });
    this.container.insertAdjacentHTML('afterbegin', searchInput);
    this.searchInput = this.container.qs('#search-input');
    this.button = this.searchInput.nextElementSibling;
  }

  attatchEvent() {
    this.searchInput.addEventListener('keyup', e => this.onChange(e, this.searchInput));
    this.searchInput.addEventListener('keydown', e => this.preventMoveCursor(e));
    this.searchInput.addEventListener('blur', _ => this.onBlur());
    this.searchInput.addEventListener('focus', _ => this.onFocus());
    this.button.addEventListener('click', _ => this.onClick(this.searchInput.value));
  }

  // 위아래 방향키 입력 시 input cursor 움직임을 막기 위한 메서드
  preventMoveCursor(e) {
    const { keyCode } = e;
    if (isMatchedKey(keyCode, 'upArrow') || isMatchedKey(keyCode, 'downArrow')) {
      e.preventDefault();
    }
  }

  render(state) {
    this.searchInput.value = state.query;
  }
}
