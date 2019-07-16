import { makeHTMLString } from '../template/index.js';
import { qs } from '../../JinUtil/index.js';

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
    const autoInput = makeHTMLString({ type: 'searchInput' });
    this.container.insertAdjacentHTML('afterbegin', autoInput);
    this.searchInput = this.container.qs('#auto-search');
    this.button = this.searchInput.nextElementSibling;
  }

  attatchEvent() {
    this.searchInput.addEventListener('keyup', e => this.onChange(e, this.searchInput));
    this.searchInput.addEventListener('keydown', e => this.preventMoveCursor(e));
    this.searchInput.addEventListener('blur', _ => this.onBlur());
    this.searchInput.addEventListener('focus', _ => this.onFocus());
    this.button.addEventListener('click', e => this.onClick(e, this.searchInput.value));
  }

  preventMoveCursor(e) {
    if (e.keyCode == 38 || e.keyCode == 40) {
      e.preventDefault();
    }
  }

  render(state) {
    this.searchInput.value = state.query;
  }
}
