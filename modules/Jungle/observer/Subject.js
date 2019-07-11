class Subject {
  constructor() {
    this.observers = [];
  }

  on(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    const removeIndex = this.observers.findIndex(obs => {
      return observer === obs;
    });

    if (removeIndex !== -1) {
      this.observers = this.observers.slice(removeIndex, 1);
    }
  }

  fire(data) {
    if (this.observers.length > 0) {
      this.observers.forEach(observer => observer.render(data));
    }
  }
}

export default Subject;
