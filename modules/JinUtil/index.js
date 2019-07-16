export const mergeConfig = (defaultConfig, config = {}) =>
  Object.assign(defaultConfig, filterConfig(config));

const filterConfig = config =>
  Object.entries(config).reduce((acc, [k, v]) => {
    if (v === undefined) return acc;
    return { ...acc, [k]: v };
  }, {});

export const setCSS = (el, attr, val) => (el.style[attr] = val);

export const removeNodes = items => {
  items.forEach(item => item.remove());
};

export const isContainClass = (target, className) => target.classList.contains(className);

export const sleep = delay => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const getData = url => fetch(url).then(response => response.json());

HTMLElement.prototype.qs = className => document.querySelector(className);
HTMLElement.prototype.qsa = className => document.querySelectorAll(className);
export const qs = className => document.querySelector(className);
export const qsa = className => document.querySelectorAll(className);
