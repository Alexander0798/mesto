const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  popupError: '.popup__error',
  errorVisible: 'popup__error_visible'
<<<<<<< HEAD
}
// находит span для заполнение текстом ошибки
const getErrorElement = (inputElement) => {
  return inputElement.closest('.popup__label').querySelector('.popup__error');
=======
>>>>>>> main
}
// находит span для заполнение текстом ошибки
const getErrorElement = (inputElement) => inputElement.closest('.popup__label').querySelector('.popup__error');

// добовляет классы для отображения ошибки при не валидной формы
const showError = (formElement, inputElement, errorMessege) => {
  const errorElement = getErrorElement(inputElement)

  errorElement.textContent = errorMessege;
  errorElement.classList.add(config.errorVisible)
  inputElement.classList.add(config.inputErrorClass)
}
// добовляет классы для скрытия ошибки при валидной формы
const hideError = (formElement, inputElement,) => {
  const errorElement = getErrorElement(inputElement)

  errorElement.textContent = '';
  errorElement.classList.remove(config.errorVisible)
  inputElement.classList.remove(config.inputErrorClass)
}
// проверяет форму на не валидность
const checkValidity = (formElement, inputElement, config) => {
  const isInputNotValid = !inputElement.validity.valid;

  if(isInputNotValid) {
    const errorMessage = inputElement.validationMessage
    showError(formElement, inputElement, errorMessage, config)
  }else {
    hideError(formElement, inputElement, config)
  }
}

// выключает кнопку если поле не валидно

const toogleButtonState = (inputList, submitButtonElement) => {
    const hasInvalidInput = Array.from(inputList).some((inputElement) => {
      return !inputElement.validity.valid
    })

  if (hasInvalidInput) {
    submitButtonElement.classList.add(config.inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove(config.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkValidity(formElement, inputElement)
      toogleButtonState(inputList, submitButtonElement)
    })
  })
  toogleButtonState(inputList, submitButtonElement)
}

// отслеживает клик по отправке формы

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault
    })
    setEventListeners(formElement)
  })
}
enableValidation(config);
