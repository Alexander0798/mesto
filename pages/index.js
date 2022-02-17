const page = document.querySelector('.page');
const profileButton = page.querySelector('.profile__button');
const popup = page.querySelector('.popup');
const popupButtonClose = page.querySelector('.popup__button-close');
const profileName = page.querySelector('.profile__title');
const profileAboutMe = page.querySelector('.profile__specialization');
const editProfileName = page.querySelector('.popup__name');
const editPtofileAboutMe = page.querySelector('.popup__about-me');
const formElement = page.querySelector('.popup__container')

function popupOpen(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
  editProfileName.value = profileName.textContent
  editPtofileAboutMe.value = profileAboutMe.textContent
}
function popupClose() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  const inputName = editProfileName.value;
  const inputJob =  editPtofileAboutMe.value;

  profileName.textContent = inputName;
  profileAboutMe.textContent = inputJob;
  popupClose()
}

function closePopupByClickOnOverlay (event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    popupClose()
  }
}
profileButton.addEventListener('click', popupOpen);
popupButtonClose.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
popup.addEventListener('click', closePopupByClickOnOverlay)
