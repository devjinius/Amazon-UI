class Observer {
  constructor() {
    this.handlers = {};
  }

  hasEvent(name) {
    return name in this.handlers;
  }

  register(eventName, handler, context) {
    if (!this.hasEvent(eventName)) this.handlers[eventName] = [];

    this.handlers[eventName].push({ handler, context });
  }

  unregister(eventName, handler, context) {
    if (!this.hasEvent(eventName)) return;

    const isEqual = (a, b) => a === b;

    this.handlers[eventName] = this.handlers[eventName].filter(
      currentHandler =>
        !(isEqual(currentHandler.handler, handler) && isEqual(currentHandler.context, context))
    );
  }

  notify(eventName, data) {
    if (!this.hasEvent(eventName)) return;

    this.handlers[eventName].forEach(currentHandler =>
      currentHandler.handler.call(currentHandler.context, data)
    );
  }
}

export default Observer;
