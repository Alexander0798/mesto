import { Cards } from './cards.js';
import { FormValidator } from './formvalidator.js';

const initialCards = [
  {
    name: 'Лето, Солне, Песок!',
    link: './image/gallery/item1.jpg'
  },
  {
    name: 'Эльбрус это, что то',
    link: './image/gallery/item2.jpg'
  },
  {
    name: 'Закат Великолепен',
    link: './image/gallery/item3.jpg'
  },
  {
    name: 'Супер Заправка',
    link: './image/gallery/item4.jpg'
  },
  {
    name: 'Отцвели',
    link: './image/gallery/item5.jpg'
  },
  {
    name: 'Почти Утонула',
    link: './image/gallery/item6.jpg'
  }
];


// контейнер в котором лежит весь контент
const page = document.querySelector('.page');

// кнопки: редактировать профиль, добавить карточку
const profileButtonEdit = page.querySelector('.profile__button-edit');
const profileButtonAdd = page.querySelector('.profile__button-add');

// попапы
const popupEditInfo = page.querySelector('#popupEditInfo');
const popupAddCard = page.querySelector('#popupAddCard');
const popupOpenZoom = page.querySelector('#popupImgZoom');

// все попапы для универсальной функции закрытия
const popups = page.querySelectorAll('.popup');

// элементы профиля
const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__job');

// элементы form edit
const profileEditName = document.forms.editInfo.name
const ptofileEditJob = document.forms.editInfo.job
// элементы form add
const inputGallerylabel = document.forms.addNewCard.description
const inputGalleryImg = document.forms.addNewCard.foto
// forms
const formElementEdit = document.forms.editInfo
const formElementAdd = document.forms.addNewCard

// элементы галлереи и темплейт контейнера
const galleryContainer = page.querySelector('.gallery');

// элементы попап карточки
const popupGalleryImg = page.querySelector('.popup__img');
const popupGalleryFigcaption = page.querySelector('.popup__figcaption');

// объект для валидации форм
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorVisible: 'popup__error_visible'
}

// запуск валидацию формы
const profileValidation = new FormValidator(config, formElementEdit);
const addCardValidation = new FormValidator(config, formElementAdd);
profileValidation.enableValidation();
addCardValidation.enableValidation();


// открытие попапов

const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
}
profileButtonEdit.addEventListener('click', () => {
  profileEditName.value = profileName.textContent
  ptofileEditJob.value = profileJob.textContent
  profileValidation.ressetValidForm()
  openPopup(popupEditInfo)

})
profileButtonAdd.addEventListener('click', () => {
  formElementAdd.reset();
  addCardValidation.ressetValidForm()
  openPopup(popupAddCard)
});

// закрытие попапов
export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
};
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}
// открытие попапа с картркой
export const popupImg = (name, link) => {
  popupGalleryImg.src = link
  popupGalleryImg.alt = name
  popupGalleryFigcaption.textContent = name
  openPopup(popupOpenZoom)
}

// обработчик кнопки: сохранить изменения редактирование профиля
const formSubmitHandlerEdit = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profileJob.textContent = ptofileEditJob.value;
  closePopup(popupEditInfo)
}
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);

// генерация карточек из масива
initialCards.forEach((item) => {
  const card = new Cards(item, '#item-temlate')
  const cardAdd = card.generateCard()
  galleryContainer.append(cardAdd)
})

// добавление новой карточки

formElementAdd.addEventListener('submit', (evt) => {
  evt.preventDefault()
  const generateNewCard = new Cards({ name: inputGallerylabel.value, link: inputGalleryImg.value }, '#item-temlate')
  const cardAdd = generateNewCard.generateCard()
  galleryContainer.prepend(cardAdd)
  closePopup(popupAddCard)
});

