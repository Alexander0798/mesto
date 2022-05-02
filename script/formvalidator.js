export class FormValidator {
  constructor(config, formElement) {
    this._form = config.formSelector;
    this._input = config.inputSelector;
    this._inputInvalid = config.inputErrorClass;
    this._submit = config.submitButtonSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._errorVisible =  config.errorVisible;
    this._formElement = formElement;
    this._formInput = this._formElement.querySelectorAll(this._input)
  }
// не валидный элемент
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
     !inputElement.validity.valid
    })
  }
// проверка формы на валидновсь
  _isValid(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  }

// переключение кнопки сабмит
  toogleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButton)
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.classList.remove(this._inactiveButton)
      this._buttonElement.removeAttribute('disabled')
    }
  }
// элемент с ошибкой
  getErrorElement(formInput){
   return formInput.closest('.popup__label').querySelector('.popup__error');
  }
// ошибка видна
  _showInputError(formInput, errorMessege) {
    const errorElement = this.getErrorElement(formInput)
    errorElement.classList.add(this._errorVisible);
    errorElement.textContent = errorMessege
    formInput.classList.add(this._inputInvalid);
  }
// ошибка скрыта
  _hideInputError (formInput) {
    const errorElement = this.getErrorElement(formInput)
    errorElement.classList.remove(this._errorVisible);
    errorElement.textContent = '';
    formInput.classList.remove(this._inputInvalid);
  }
// сброс полей ошибки
  ressetValidForm(){
    this._formInput.forEach((formElement) => {
      this._hideInputError (formElement)
    })
    this.toogleButtonState()
  }

// передаёт данные для проверки на валидность
  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
    this._buttonElement = this._formElement.querySelector(this._submit);
    this.toogleButtonState();
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._isValid(formInput);
        this.toogleButtonState();
      });
    });
  }
}

