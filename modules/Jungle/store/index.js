import Subject from '../observer/Subject.js';

class Model extends Subject {
  constructor(state) {
    super();
    this.state = state;
  }

  setState(data = {}, options = { render: true }) {
    this.state = data;

    if (!options.render) {
      return;
    }

    this.fire(this.state);
  }
}

export default Model;
