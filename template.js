const templates = {
  card: data => {
    return `
      <div class="card" key=${data._id}>
        <div class="thumb">
        <img src="${data.imgURL}" alt="card-thumbnail" />
        </div>
        <div class="content">
          <h2>${data.title}</h2>
          <ul>
            ${data.desc.reduce((acc, cur) => {
              const li = `<li>${cur}</li>`;
              acc += li;
              return acc;
            }, '')}
          </ul>
        </div>
      </div>`;
  },

  navItem: data => `<div class="nav-item ${data.color}">${data.title}</div>`
};

export const makeElements = (items, type) => {
  return items.reduce((acc, item) => {
    acc += templates[type](item);
    return acc;
  }, '');
};
