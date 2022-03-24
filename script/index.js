const page = document.querySelector('.page'); //контейнер в котором лежит весь контент
const profileButtonEdit = page.querySelector('.profile__button-edit');
const profileButtonAdd = page.querySelector('.profile__button-add');
const popupEditInfo = page.querySelector('#popupEditInfo');
const popupAddCard = page.querySelector('#popupAddCard');
const popupButtonCloseEdit = page.querySelector('#buttonCloseEdit');
const popupButtonCloseAdd = page.querySelector('#buttonCloseAdd');
const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__job');
const editProfileName = page.querySelector('#inputEditName');
const editPtofileJob = page.querySelector('#inputEditJob');
const formElement = page.querySelector('.popup__container')

function openPopupEdit() {
  popupEditInfo.classList.add('popup_opened');
  editProfileName.value = profileName.textContent
  editPtofileJob.value = profileJob.textContent
}
function closePopupEdit() {
  popupEditInfo.classList.remove('popup_opened');
}
function openPopupAdd() {
  popupAddCard.classList.add('popup_opened');
  editProfileName.value = profileName.textContent
  editPtofileJob.value = profileJob.textContent
}
function closePopupAdd() {
  popupAddCard.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileJob.textContent = editPtofileJob.value;
  closePopupEdit()
}

/*function closePopupByClickOnOverlay (event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    closePopupEdit()
  }
}-----------закритие попак по облости вокруг формы*/

profileButtonEdit.addEventListener('click', openPopupEdit);
profileButtonAdd.addEventListener('click', openPopupAdd);
popupButtonCloseEdit.addEventListener('click', closePopupEdit);
popupButtonCloseAdd.addEventListener('click', closePopupAdd);
formElement.addEventListener('submit', formSubmitHandler);
//popupEditInfo.addEventListener('click', closePopupByClickOnOverlay)
