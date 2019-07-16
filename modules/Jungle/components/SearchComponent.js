import { SearchInput, AutoMatchedList, AutoRecentList } from '../views/index.js';
import Store from '../store/index.js';

import { mergeConfig, qs } from '../../JinUtil/index.js';

export default class SearchComponent {
  constructor({ classNameObj, options }) {
    this.container = qs(classNameObj.container);

    this.store = this.getStore({});

    classNameObj.parentNode = '.auto-wrapper';
    this.input = this.getView(classNameObj, 'searchInput');
    this.autoMatched = this.getView(classNameObj, 'autoMatchedList');
    this.autoRecent = this.getView(classNameObj, 'autoRecentList');
  }

  getStore({}) {
    return new Store({
      isWriting: false,
      query: '',
      currentItem: -1,
      itemLength: 2,
      recentQueries: ['hello', 'recent'],
      matchedQueries: {}
    });
  }

  getView(classNameObj, type) {
    let returnObject;

    if (type === 'autoMatchedList') {
      returnObject = this.getAutoMathedList(classNameObj);
    }
    if (type === 'searchInput') {
      returnObject = this.getSearchInput(classNameObj);
    }
    if (type === 'autoRecentList') {
      returnObject = this.getAutoRecentList(classNameObj);
    }

    this.store.on(returnObject);
    returnObject.init();

    return returnObject;
  }

  getSearchInput(classNameObj) {
    return new SearchInput({
      container: classNameObj.container,
      onChange: this.inputChangeHandler.bind(this),
      onBlur: this.inputBlurHandler.bind(this),
      onFocus: this.inputFocusHandler.bind(this),
      onClick: this.inputButtonClickHandler.bind(this)
    });
  }

  getAutoMathedList(classNameObj) {
    return new AutoMatchedList({
      container: classNameObj.container,
      parentNode: classNameObj.parentNode
    });
  }

  getAutoRecentList(classNameObj) {
    return new AutoRecentList({
      container: classNameObj.container,
      parentNode: classNameObj.parentNode
    });
  }

  inputChangeHandler(e) {
    const { state } = this.store;
    const { value } = e.target;

    if (this.isArrowKey(e.keyCode)) {
      const newItem = this.getNewItem(e.keyCode, state);

      this.store.setState({ ...state, currentItem: newItem });
      return;
    }

    const matchedQueries = this.getData(value);

    this.store.setState({
      ...state,
      isWriting: true,
      query: value,
      currentItem: -1,
      itemLength: matchedQueries.length,
      matchedQueries
    });
  }

  getNewItem(keycode, { currentItem, itemLength }) {
    let newItem = keycode === 38 ? currentItem - 1 : currentItem + 1;

    if (newItem < -1) {
      return itemLength;
    }

    if (newItem > itemLength - 1) {
      return -1;
    }

    return newItem;
  }

  // 추후 api로 데이터를 불러오는 부분
  getData(prefix) {
    const data = {
      i: ['iphone', 'icon', 'infinite', 'input', 'instagram'],
      ip: ['ipad', 'ipconfig', 'iphone', 'iptime', 'ip'],
      iph: ['iphone', 'iphone11', 'iphone xs', 'iphone wallpaper', 'iphone mockup'],
      ipho: ['iphone', 'iphone11', 'iphone xs', 'iphone wallpaper', 'iphone se', 'iphone se2'],
      iphon: ['iphone', 'iphone11', 'iphone xs', 'iphone wallpaper', 'iphone se2', 'iphone xr'],
      iphone: ['iphone', 'iphone11', 'iphone xs', 'iphone xr', 'iphone mockup', 'iphone x']
    };

    const returnData = data[prefix];

    if (!returnData) {
      return [prefix];
    }
    return returnData;
  }

  isArrowKey(keycode) {
    return keycode == 38 || keycode == 40;
  }

  inputBlurHandler() {
    const { state } = this.store;

    this.store.setState({
      ...state,
      isWriting: false
    });
  }

  inputFocusHandler() {
    const { state } = this.store;

    this.store.setState({
      ...state,
      isWriting: true
    });
  }

  inputButtonClickHandler(e, value) {
    if (!value) return;

    const { state } = this.store;
    const { recentQueries } = state;
    const newQueries = this.getNewRecentQuries(recentQueries, value);

    this.store.setState({
      ...state,
      isWriting: false,
      currentItem: -1,
      itemLength: newQueries.length,
      recentQueries: newQueries
    });
  }

  getNewRecentQuries(list, value) {
    if (list.includes(value)) {
      return list;
    }

    if (list.length === 5) {
      return [...list.splice(1, 4), value];
    }

    return list.concat(value);
  }
}
