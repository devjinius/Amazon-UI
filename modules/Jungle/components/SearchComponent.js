import { SearchInput, AutoMatchedList, AutoRecentList } from '../views/index.js';
import Store from '../store/index.js';

import { mergeConfig, qs, isMatchedKey, debounce } from '../../JinUtil/index.js';

export default class SearchComponent {
  constructor({ classNameObj, options }) {
    this.container = qs(classNameObj.container);

    const defaultOptions = { recentLimit: 5 };
    this.options = mergeConfig(defaultOptions, options);
    this.store = this.getStore({});

    classNameObj.parentNode = '.search-wrapper';
    this.input = this.getView(classNameObj, 'searchInput');
    this.autoMatched = this.getView(classNameObj, 'autoMatchedList');
    this.autoRecent = this.getView(classNameObj, 'autoRecentList');
  }

  getStore({}) {
    return new Store({
      isWriting: false,
      query: '',
      currentItem: -1,
      itemLength: 0,
      recentQueries: [],
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
      onClick: this.search.bind(this)
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

  async inputChangeHandler({ keyCode, target }) {
    const { state } = this.store;
    const { currentItem, recentQueries, matchedQueries } = state;
    const { value } = target;

    if (this.isArrowKey(keyCode)) {
      this.store.setState({ ...state, currentItem: this.getNewItem(keyCode, state) });
      return;
    }

    if (isMatchedKey(keyCode, 'enter')) {
      if (currentItem === -1) {
        this.search(value);
        return;
      }

      const searchValue = !value ? recentQueries[currentItem] : matchedQueries[currentItem].value;
      this.search(searchValue);
      return;
    }

    const matchinglist = await this.getData(value);

    const newState = {
      ...state,
      isWriting: true,
      query: value,
      currentItem: -1,
      itemLength: !value ? recentQueries.length : matchinglist.length,
      matchedQueries: matchinglist
    };

    debounce(this.store.setState.bind(this.store), 1200, newState);
  }

  getNewItem(keyCode, { currentItem, itemLength }) {
    let newItem = isMatchedKey(keyCode, 'upArrow') ? currentItem - 1 : currentItem + 1;

    if (newItem < -1) {
      return itemLength - 1;
    }

    if (newItem > itemLength - 1) {
      return -1;
    }

    return newItem;
  }

  async getData(prefix) {
    const url =
      'https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/amazon_autocomplete?query=';

    try {
      const data = await fetch(url + prefix).then(data => data.json());

      if (data.statusCode === 404) {
        throw new Error('resources not found error');
        // return [{ value: prefix }];
      }

      return data.body.suggestions;
    } catch (error) {
      console.warn(error);
      return [{ value: prefix }];
    }
  }

  // 추후 서버로 검색 req를 보내는 method
  // 활성화된 기능이 비활성화 되며 최근 검색어에만 추가함
  search(value) {
    if (!value) return;

    const { state } = this.store;
    const { recentQueries } = state;

    const newQueries = this.getNewRecentQuries(recentQueries, value);

    this.store.setState({
      ...state,
      query: value,
      isWriting: false,
      currentItem: -1,
      itemLength: newQueries.length,
      recentQueries: newQueries
    });
  }

  inputBlurHandler() {
    const { state } = this.store;
    this.store.setState({ ...state, isWriting: false });
  }

  inputFocusHandler() {
    const { state } = this.store;
    this.store.setState({ ...state, isWriting: true });
  }

  getNewRecentQuries(list, value) {
    if (list.includes(value)) {
      return list;
    }

    if (list.length === this.options.recentLimit) {
      return [value, ...list.splice(0, 4)];
    }

    return [value, ...list];
  }

  isArrowKey(keyCode) {
    return isMatchedKey(keyCode, 'upArrow') || isMatchedKey(keyCode, 'downArrow');
  }
}
