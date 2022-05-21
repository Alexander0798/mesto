const ImageCard1 = new URL('../image/gallery/item1.jpg', import.meta.url);
const ImageCard2 = new URL('../image/gallery/item2.jpg', import.meta.url);
const ImageCard3 = new URL('../image/gallery/item3.jpg', import.meta.url);
const ImageCard4 = new URL('../image/gallery/item4.jpg', import.meta.url);
const ImageCard5 = new URL('../image/gallery/item5.jpg', import.meta.url);
const ImageCard6 = new URL('../image/gallery/item6.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Лето, Солне, Песок!',
    link: ImageCard1
  },
  {
    name: 'Эльбрус это, что то',
    link: ImageCard2
  },
  {
    name: 'Закат Великолепен',
    link: ImageCard3
  },
  {
    name: 'Супер Заправка',
    link: ImageCard4
  },
  {
    name: 'Отцвели',
    link: ImageCard5
  },
  {
    name: 'Почти Утонула',
    link: ImageCard6
  }
];

// объект для валидации форм
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorVisible: 'popup__error_visible'
}



// контейнер в котором лежит весь контент
const page = document.querySelector('.page');

// кнопки: редактировать профиль, добавить карточку
export const profileButtonEdit = page.querySelector('.profile__button-edit');
export const profileButtonAdd = page.querySelector('.profile__button-add');

// попапы
export const popupEditInfo = page.querySelector('#popupEditInfo');
export const popupAddCard = page.querySelector('#popupAddCard');
export const popupOpenZoom = page.querySelector('#popupImgZoom');

// элементы профиля
export const profileName = page.querySelector('.profile__title');
export const profileJob = page.querySelector('.profile__job');

// элементы form edit
export const profileEditName = document.forms.editInfo.name
export const ptofileEditJob = document.forms.editInfo.job

// forms
export const formElementEdit = document.forms.editInfo
export const formElementAdd = document.forms.addNewCard

// элементы галлереи и темплейт контейнера
export const galleryContainer = page.querySelector('.gallery');
export const temlateContainer = document.querySelector('#item-temlate')

