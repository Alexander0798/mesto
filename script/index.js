// масив с карточками
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

// элементы попап профиля
const profileEditName = page.querySelector('#inputEditName');
const ptofileEditJob = page.querySelector('#inputEditJob');

// кнопки для открытия попапов
const formElementEdit = page.querySelector('.popup__form-edit');
const formElementAdd = page.querySelector('.popup__form-add');

// элементы галлереи и темплейт контейнера
const galleryContainer = page.querySelector('.gallery');
const itemTemlateContent = document.querySelector('#item-temlate').content;
const cardGalleryElement = itemTemlateContent.querySelector('.card__item');

// элементы формы добавления карточки
const inputGallerylabel = page.querySelector('#inputAddTitle');
const inputGalleryImg = page.querySelector('#inputAddLink');

// элементы попап карточки
const popupGalleryImg = page.querySelector('.popup__img');
const popupGalleryFigcaption = page.querySelector('.popup__figcaption');

// открытие попапов
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened')
}
profileButtonEdit.addEventListener('click', () => {
  profileEditName.value = profileName.textContent
  ptofileEditJob.value = profileJob.textContent
  openPopup(popupEditInfo)
})
profileButtonAdd.addEventListener('click', () => {
  inputGallerylabel.value = ''
  inputGalleryImg.value = ''
  openPopup(popupAddCard)
});

// закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
});

// обработчик кнопки: сохранить изменения редактирование профиля
const formSubmitHandlerEdit = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileEditName.value;
  profileJob.textContent = ptofileEditJob.value;
  closePopup(popupEditInfo)
}
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);

// масив с контентом для карточек


//перебор масива и автаматическое добавление карточек с контентом из масива
const riderItem = (title, link) => {
  const cardElement = itemTemlateContent.cloneNode(true)
  const cardGalleryElement = cardElement.querySelector('.card__item');
  const cardGalleryImg = cardElement.querySelector('.card__img')

  const cardLabel = cardElement.querySelector('.card__label').textContent = title
  const cardLink = cardGalleryImg.src = link
  const cardAlt = cardGalleryImg.alt = title

  cardElement.querySelector('.card__button-like').addEventListener('click', (evt) => {
    event.target.classList.toggle('card_like-active')
  });
  cardElement.querySelector('.card__button-remove').addEventListener('click', (evt) => {
    event.target.closest('.card__item')
    cardGalleryElement.remove();
  });
  cardElement.querySelector('.card__img').addEventListener('click', (evt) => {
    popupGalleryImg.src = cardLink
    popupGalleryImg.alt = cardAlt
    popupGalleryFigcaption.textContent = cardLabel
    openPopup(popupOpenZoom)
  });
  return cardElement
}

const initCard = () => {
  initialCards.forEach((item) => {
    galleryContainer.append(riderItem(item.name, item.link))
  })
}
initCard()

const formSubmitHandlerAdd = (evt) =>{
  evt.preventDefault()
  galleryContainer.prepend(riderItem(inputGallerylabel.value, inputGalleryImg.value))
  closePopup(popupAddCard)
}
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

