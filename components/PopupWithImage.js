import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImg = this._popup.querySelector('.popup__img');
    this._cardCaption = this._popup.querySelector('.popup__figcaption');
  }

  open(src, caption) {
    super.open();
    this._popupImg.src = src;
    this._popupImg.alt = caption;
    this._cardCaption.textContent = caption;
  }
}
