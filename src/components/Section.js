export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = containerSelector;
  }

  addItem(element) {
    this._containerElement.append(element);
  }

  prependItem(element) {
    this._containerElement.prepend(element);
  }

  addInitialItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
