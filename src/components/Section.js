export default class Section {
  constructor (renderer, containerSelector) {
    this._renderer = renderer;
    this._containerElement = containerSelector;
  }

  addItem(element) {
    this._containerElement.append(element);
  }

  prependItem(element) {
    this._containerElement.prepend(element);
  }

  addInitialItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
