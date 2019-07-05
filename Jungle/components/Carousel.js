import { mergeConfig, setCSS, removeNodes, isContainClass } from '../utils/index.js';
import { makeHTMLString } from '../template/index.js';

class Carousel {
  constructor({ container }, observer, config) {
    //DOM
    this.container = document.querySelector(container);
    this.wrapper;
    this.slider;

    // values
    this.itemWidth;
    this.itemLength;
    this.observer = observer;
    this.initIndex = 0;
    this.offset = 0;
    this.currentItem = this.initIndex + 1;
    this.isMoving = false;
    this.initStatus = true;

    this.defaultConfig = {
      infinite: true,
      duration: 300,
      animation: 'cubic-bezier(0.240, -0.010, 0.400, 1.650)'
    };

    this.config = mergeConfig(this.defaultConfig, config);
  }

  init() {
    this.manipulateDOM();
    this.attatchEvent();
    this.setInitialUI();
    setCSS(this.container, 'opacity', 1);
    this.initStatus = false;
  }

  manipulateDOM() {
    const cards = [...this.container.children];
    this.setInitialDOM(cards);

    this.wrapper = this.container.firstElementChild;
    this.slider = this.wrapper.firstElementChild;
    this.itemLength = this.slider.children.length;
  }

  setInitialDOM(cards) {
    removeNodes(cards);
    const carousel = makeHTMLString({ data: cards, type: 'carousel' });
    this.container.insertAdjacentHTML('afterbegin', carousel);
  }

  attatchEvent() {
    this.container.addEventListener('click', e => this.buttonClickHanlder(e));
    this.slider.addEventListener('transitionend', () => this.transitionEndHandler());
  }

  setInitialUI() {
    this.itemWidth = this.slider.firstElementChild.getBoundingClientRect().width;
    this.wrapper.style.width = `${this.itemWidth}px`;

    if (this.config.infinite) {
      this.cloneVirtualCard();
      this.moveWithoutTransition();
    } else {
      this.setTransition(this.slider, true);
      this.isMovable();
    }
  }

  cloneVirtualCard() {
    const firstCard = this.slider.firstElementChild.cloneNode(true);
    const lastCard = this.slider.lastElementChild.cloneNode(true);

    this.slider.insertAdjacentElement('afterbegin', lastCard);
    this.slider.insertAdjacentElement('beforeend', firstCard);
  }

  buttonClickHanlder(evt) {
    if (isContainClass(evt.target, 'prev')) {
      this.move(this.currentItem - 1);
      return;
    }

    if (isContainClass(evt.target, 'next')) {
      this.move(this.currentItem + 1);
      return;
    }
  }

  transitionEndHandler() {
    this.isMoving = false;
    if (this.isEndOfCards() && this.config.infinite) {
      this.moveWithoutTransition();
    }
  }

  isMovable() {
    if (this.config.infinite) return;

    this.prevButton.disabled = this.isFirst();
    this.nextButton.disabled = this.isLast();
  }

  move(id) {
    if (this.isMoving || (!this.initStatus && this.currentItem === id)) return;
    this.isMoving = true;

    const dist = this.config.infinite ? -(this.itemWidth * id) : -(this.itemWidth * (id - 1));
    this.currentItem = id;

    this.observer.notify('moveCarousel', this.makeSendId());
    this.isMovable();
    this.moveSlider(dist);
  }

  makeSendId() {
    let sendId;
    if (this.config.infinite && this.isFirst()) {
      sendId = this.itemLength;
    } else if (this.config.infinite && this.isLast()) {
      sendId = 1;
    } else {
      sendId = this.currentItem;
    }
    return sendId;
  }

  moveWithoutTransition() {
    this.setTransition(this.slider, false);
    this.move(this.currentItem === 0 ? this.itemLength : 1);
    setTimeout(() => {
      this.isMoving = false;
      this.setTransition(this.slider, true);
    }, 0);
  }

  moveSlider(dist) {
    this.slider.style.transform = `translateX(${dist}px)`;
  }

  isEndOfCards() {
    return this.isFirst() || this.isLast();
  }

  isFirst() {
    return this.config.infinite ? this.currentItem === 0 : this.currentItem === 1;
  }

  isLast() {
    return this.config.infinite
      ? this.currentItem === this.itemLength + 1
      : this.currentItem === this.itemLength;
  }

  setTransition(el, val) {
    val
      ? setCSS(el, 'transition', `transform ${this.config.duration}ms ${this.config.animation}`)
      : setCSS(el, 'transition', 'none');
  }

  getChangingIndex() {
    return this.isFirst()
      ? { addIndex: this.itemLength - 1, removeIndex: this.currentItem }
      : { addIndex: 0, removeIndex: this.itemLength - 1 };
  }
}

export default Carousel;
