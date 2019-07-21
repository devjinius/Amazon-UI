const templates = {
  carousel: cards => {
    return `
      <div class="card-wrapper">
        <div class="card-slider">
          ${cards.reduce((acc, card) => {
            return (acc += card.outerHTML);
          }, '')}
        </div>
      </div>
      <button class="card-control prev"><</button>
      <button class="card-control next">></button>
    `;
  },

  autoMatchedArea: _ => {
    return `
      <div class="auto-area matched">
        <ul>
          <li><span>안녕하세요</span></li>
          <li><span>안녕하세요</span> 하기가싫군요</li>
          <li class="selected"><span>안녕하세요</span> 마크업은 매우 귀찮네요</li>
        </ul>
      </div>
    `;
  },

  searchInput: _ => {
    return `
      <div class="search-container">
        <div class="search-wrapper">
          <input type="text" name="search-input" id="search-input" class="search-input" /><button>
            <img src="./resources/images/search-icon.png" />
          </button>
        </div>
      </div>
    `;
  },

  autoRecentArea: _ => {
    return `
      <div class="auto-area recent">
        <ul>
        </ul>
      </div>
    `;
  },

  autoList: (lists, prefix) => {
    if (!!prefix) {
      const length = prefix.length;
      return `
        ${lists.reduce(
          (acc, list) =>
            (acc += `
          <li><span>${list.value.substring(0, length)}</span>${list.value.substring(length)}</li>`),
          ''
        )}
      `;
    }

    return `
      ${lists.reduce((acc, list) => {
        return (acc += `<li>${list}</li>`);
      }, '')}
    `;
  }
};

export const makeHTMLString = ({ data, prefix, type }) => {
  if (!!prefix) {
    return templates[type](data, prefix);
  }

  return templates[type](data);
};
