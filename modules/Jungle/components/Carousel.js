import Observer from '../observer/Observer.js';
import { setCSS, removeNodes } from '../../JinUtil/index.js';
import { makeHTMLString } from '../template/index.js';

class Carousel extends Observer {
  constructor({ container, options, onClick, props }) {
    super();
    //DOM
    this.container = document.querySelector(container);
    this.wrapper;
    this.slider;

    // values
    this.itemWidth;
    this.onClick = onClick;
    this.props = props;
    this.options = options;
  }

  init() {
    this.manipulateDOM();
    this.attatchEvent();
    this.setInitialUI();
    setCSS(this.container, 'opacity', 1);
  }

  manipulateDOM() {
    const cards = [...this.container.children];
    this.setInitialDOM(cards);

    this.wrapper = this.container.firstElementChild;
    this.slider = this.wrapper.firstElementChild;
    this.prevButton = this.container.querySelector('button.prev');
    this.nextButton = this.container.querySelector('button.next');
  }

  setInitialDOM(cards) {
    removeNodes(cards);
    const carousel = makeHTMLString({ data: cards, type: 'carousel' });
    this.container.insertAdjacentHTML('afterbegin', carousel);
  }

  attatchEvent() {
    this.container.addEventListener('click', e => this.onClick(e));
  }

  setInitialUI() {
    this.itemWidth = this.slider.firstElementChild.getBoundingClientRect().width;
    this.wrapper.style.width = `${this.itemWidth}px`;

    if (this.options.infinite) {
      this.cloneVirtualCard();
      this.move({ id: this.props.currentItem, transition: false });
    } else {
      this.setTransition(this.slider, true);
      this.isMovable(this.props.currentItem);
    }
  }

  cloneVirtualCard() {
    const firstCard = this.slider.firstElementChild.cloneNode(true);
    const lastCard = this.slider.lastElementChild.cloneNode(true);

    this.slider.insertAdjacentElement('afterbegin', lastCard);
    this.slider.insertAdjacentElement('beforeend', firstCard);
  }

  isMovable(id) {
    this.prevButton.disabled = this.isFirst(id);
    this.nextButton.disabled = this.isLast(id);
  }

  move({ id, transition = true }) {
    this.setTransition(this.slider, transition ? true : false);
    this.setTransform(id);

    if (transition && !this.options.infinite) {
      this.isMovable(id);
    }
  }

  setTransition(el, val) {
    val
      ? setCSS(el, 'transition', `transform ${this.options.duration}ms ${this.options.animation}`)
      : setCSS(el, 'transition', 'none');
  }

  setTransform(id) {
    const dist = this.options.infinite ? -(this.itemWidth * id) : -(this.itemWidth * (id - 1));
    this.slider.style.transform = `translateX(${dist}px)`;
  }

  isEndOfCards(id) {
    return this.isFirst(id) || this.isLast(id);
  }

  isFirst(id) {
    return this.options.infinite ? id === 0 : id === 1;
  }

  isLast(id) {
    return this.options.infinite ? id === this.props.itemLength + 1 : id === this.props.itemLength;
  }

  render(state) {
    this.move({ id: state.currentItem });
  }
}

export default Carousel;
