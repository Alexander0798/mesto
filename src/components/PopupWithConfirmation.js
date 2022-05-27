import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  // принимает коллбэк на удаление карточки
  submitCallback(remove) {
    this._removeSubmit = remove;
  }

  // удаление карточки по нажатию на submit
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (event) => {
      event.preventDefault();
     this._removeSubmit();
    });
  }
}
