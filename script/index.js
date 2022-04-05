
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
const itemTemlateContent = document.querySelector('#item-temlate').content;
const cardGalleryElement = itemTemlateContent.querySelector('.card__item');

// элементы попап карточки
const popupGalleryImg = page.querySelector('.popup__img');
const popupGalleryFigcaption = page.querySelector('.popup__figcaption');

// открытие попапов
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
}
profileButtonEdit.addEventListener('click', () => {
  profileEditName.value = profileName.textContent
  ptofileEditJob.value = profileJob.textContent
  openPopup(popupEditInfo)
})
profileButtonAdd.addEventListener('click', () => {
  formElementAdd.reset();
  openPopup(popupAddCard)
});

// закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closePopupEsc)
};
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
});
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}
// обработчик кнопки: сохранить изменения редактирование профиля
const formSubmitHandlerEdit = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profileJob.textContent = ptofileEditJob.value;
  closePopup(popupEditInfo)
}
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);

// добавление карточек
const riderItem = (title, link) => {
  const cardElement = itemTemlateContent.cloneNode(true)
  const cardGalleryElement = cardElement.querySelector('.card__item');
  const cardGalleryImg = cardElement.querySelector('.card__img')

  const cardLabel = cardElement.querySelector('.card__label').textContent = title
  const cardLink = cardGalleryImg.src = link
  const cardAlt = cardGalleryImg.alt = title

  // изменение состояний кнопки лайк
  cardElement.querySelector('.card__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card_like-active')
  });

  // удаление карточки
  cardElement.querySelector('.card__button-remove').addEventListener('click', (evt) => {
    evt.target.closest('.card__item')
    cardGalleryElement.remove();
  });
  // добовление src and alt для фотографии карточки
  cardElement.querySelector('.card__img').addEventListener('click', (evt) => {
    popupGalleryImg.src = cardLink
    popupGalleryImg.alt = cardAlt
    popupGalleryFigcaption.textContent = cardLabel
    openPopup(popupOpenZoom)
  });
  return cardElement
}

// перебор масива
const initCard = () => {
  initialCards.forEach((item) => {
    galleryContainer.append(riderItem(item.name, item.link))
  })
}
initCard()

const formSubmitHandlerAdd = (evt) => {
  evt.preventDefault()
  galleryContainer.prepend(riderItem(inputGallerylabel.value, inputGalleryImg.value))
  closePopup(popupAddCard)
  formElementAdd.reset();
}
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

