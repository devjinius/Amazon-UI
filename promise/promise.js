const queue = require('./queue');

class MyPromise {
  constructor(executor) {
    try {
      executor(MyPromise.resolve.bind(this), MyPromise.reject.bind(this));
    } catch (e) {
      MyPromise.reject(e);
    }
  }

  static resolve(value) {
    if (queue.getQueueLength() !== 0) {
      const { onFulfilled, onRejected } = queue.getNext();

      try {
        MyPromise.resolve.call(this, onFulfilled(value));
      } catch (e) {
        MyPromise.reject.call(this, onRejected(e));
      }
    }
  }

  static reject(reason) {
    if (queue.getQueueLength() !== 0) {
      const onRejected = queue.getNext().onRejected;
      MyPromise.reject.call(this, onRejected(reason));
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = v => v;
    }

    if (typeof onRejected !== 'function') {
      onRejected = v => v;
    }

    return new MyPromise((resolve, reject) => {
      queue.push({ onFulfilled, onRejected });
    });
  }

  catch(onRejected) {
    const onFulfilled = v => v;
    return new MyPromise((resolve, reject) => {
      queue.push({ onFulfilled, onRejected });
    });
  }
}

module.exports = MyPromise;
