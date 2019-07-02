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

export const makeHTMLString = ({ data, type }) => {
  return data.reduce((acc, cur) => {
    return (acc += templates[type](cur));
  }, '');
};
