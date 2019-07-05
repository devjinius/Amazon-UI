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
