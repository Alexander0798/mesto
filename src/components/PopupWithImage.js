import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImg = this._popup.querySelector('.popup__img');
    this._cardCaption = this._popup.querySelector('.popup__figcaption');
  }
// открываем попап с картинкой
  open(name, link) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._cardCaption.textContent = name;
  }
}
