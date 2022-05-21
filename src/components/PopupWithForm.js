import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submit = handleSubmitForm
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  close() {
    super.close()
    this._form.reset()
  }

  setEventListeners() {   // установить слушатели
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }
}