// находит span для заполнение текстом ошибки
const getErrorElement = (inputElement) => {
  return inputElement.closest('.popup__label').querySelector('.popup__error');
}
// добовляет классы для отображения ошибки при не валидной формы
const showError = (formElement, inputElement, errorMessege) => {
  const errorElement = getErrorElement(inputElement)

  errorElement.textContent = errorMessege;
  errorElement.classList.add('popup__error_visible')
  inputElement.classList.add('popup__input_error')
}
// добовляет классы для скрытия ошибки при валидной формы
const hideError = (formElement, inputElement) => {
  const errorElement = getErrorElement(inputElement)

  errorElement.textContent = '';
  errorElement.classList.remove('popup__error_visible')
  inputElement.classList.remove('popup__input_error')
}
// проверяет форму на не валидность
const checkValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if(isInputNotValid) {
    const errorMessage = inputElement.validationMessage
    showError(formElement, inputElement, errorMessage)
  }else {
    hideError(formElement, inputElement)
  }
}

// выключает кнопку если поле не валидно

const toogleButtonState = (inputList, submitButtonElement) => {
    const hasInvalidInput = Array.from(inputList).some((inputElement) => {
      return !inputElement.validity.valid
    })

  if (hasInvalidInput) {
    submitButtonElement.classList.add('popup__submit_inactive');
    submitButtonElement.setAttribute('disabled', true);
  } else {
    submitButtonElement.classList.remove('popup__submit_inactive');
    submitButtonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input');
  const submitButtonElement = formElement.querySelector('.popup__submit')
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkValidity(formElement, inputElement)
      toogleButtonState(inputList, submitButtonElement)
    })
  })
  toogleButtonState(inputList, submitButtonElement)
}

// отслеживает клик по отправке формы

const enableValidation = () => {
  const formList = document.querySelectorAll('.popup__form');

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault
    })
    setEventListeners(formElement)
  })
}
enableValidation();
