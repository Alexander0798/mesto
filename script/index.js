
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

const galleryContainer = page.querySelector('.gallery')
const itemTemlateContent = document.querySelector('#item-temlate').content;
const cardGalleryImg = itemTemlateContent.querySelector('.card__img');
const cardGallerylabel = itemTemlateContent.querySelector('.card__label');
const cardGalleryButtonRemove = itemTemlateContent.querySelector('.card__button-remove');
const cardGalleryButtonLike = itemTemlateContent.querySelector('.card__button-like');
const cardGalleryElement = itemTemlateContent.querySelector('.card__item')
const cardGalleryLike = itemTemlateContent.querySelector('.card__button-like')

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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function setEventListners (itemElement) {
  itemElement.querySelector('.card__button-remove').addEventListener('click', hendleDelite)
  itemElement.querySelector('.card__button-like').addEventListener('click', function(evt) {
    event.target.classList.toggle('card_like-active')
  })
}
function hendleDelite (event) {
  const itemElement = event.target.closest('.card__item')
  itemElement.remove();
}

function renderItem({name, link}) {
  const itemElement = cardGalleryElement.cloneNode(true);
  cardGallerylabel.textContent = name;
  cardGalleryImg.src = link;
  cardGalleryImg.alt = `картинка ${name}`;
  setEventListners(itemElement);
  galleryContainer.append(itemElement);
}

const cardInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});
function render() {
  cardInfo.forEach(renderItem)
}
render()
