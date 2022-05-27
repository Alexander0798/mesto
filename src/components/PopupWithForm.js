import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submit = handleSubmitForm
    this._submitButton = this._form.querySelector('.popup__submit');
    this._submitButtonText = this._submitButton.textContent;
    this._errorTextList = Array.from(this._form.querySelectorAll('.popup__error'))
  }
// получаем объект с данными инпутов
  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }
  _getResetErrorText() {
    this._inputList.forEach((input) => {
      input.classList.remove('popup__input_error')
    })
    this._errorTextList.forEach((errorText) => {
      errorText.textContent = ''
      errorText.classList.remove('popup__error_visible')
    })
  }
  close() {
    super.close()
    this._form.reset()
    this._getResetErrorText()
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
    });
  }
// меняем состояние кнопки при загрузке
  loading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
