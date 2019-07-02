export const mergeConfig = (defaultConfig, config) => Object.assign(defaultConfig, config);

export const setCSS = (el, attr, val) => (el.style[attr] = val);
