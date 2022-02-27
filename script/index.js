const page = document.querySelector('.page'); //контейнер в котором лежит весь контент
const profileButton = page.querySelector('.profile__button');
const popup = page.querySelector('.popup');
const popupButtonClose = page.querySelector('.popup__button-close');
const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__job');
const editProfileName = page.querySelector('.popup_input_name');
const editPtofileJob = page.querySelector('.popup_input_job');
const formElement = page.querySelector('.popup__container')

function openPopup() {
  popup.classList.add('popup_opened');
  editProfileName.value = profileName.textContent
  editPtofileJob.value = profileJob.textContent
}
function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileJob.textContent = editPtofileJob.value;
  closePopup()
}

/*function closePopupByClickOnOverlay (event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    closePopup()
  }
}-----------закритие попак по облости вокруг формы*/

profileButton.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
//popup.addEventListener('click', closePopupByClickOnOverlay)
