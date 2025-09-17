// src/components/Section.js
export default class Section {
  constructor({ items = [], renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element, { prepend = true } = {}) {
    if (prepend) this._container.prepend(element);
    else this._container.append(element);
  }
}
