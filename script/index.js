
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
const editProfileName = page.querySelector('#inputEditName');
const editPtofileJob = page.querySelector('#inputEditJob');

// кнопки для открытия попапов
const formElementEdit = page.querySelector('.popup__form-edit');
const formElementAdd = page.querySelector('.popup__form-add');

// элементы галлереи и темплейт контейнера
const galleryContainer = page.querySelector('.gallery');
const itemTemlateContent = document.querySelector('#item-temlate').content;
const cardGalleryImg = itemTemlateContent.querySelector('.card__img')
const cardGallerylabel = itemTemlateContent.querySelector('.card__label')
const cardGalleryElement = itemTemlateContent.querySelector('.card__item');

// элементы формы добавления карточки
const inputGallerylabelValue = page.querySelector('#inputAddTitle');
const inputGalleryImgValue = page.querySelector('#inputAddLink');

// элементы попап карточки
const popupGalleryImg = page.querySelector('.popup__img');
const popupGalleryFigcaption = page.querySelector('.popup__figcaption');

// открытие попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
}
profileButtonEdit.addEventListener('click', () => {
  openPopup(popupEditInfo)
  editProfileName.value = profileName.textContent
  editPtofileJob.value = profileJob.textContent
})
profileButtonAdd.addEventListener('click', () => {
  openPopup(popupAddCard)
  inputGallerylabelValue.value = ''
  inputGalleryImgValue.value = ''
});

// закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
});

// обработчик кнопки: сохранить изменения редактирование профиля
function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileJob.textContent = editPtofileJob.value;
  closePopup(popupEditInfo)
}
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);

/*function closePopupByClickOnOverlay (event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    closePopupEdit()
  }
}-----------закритие попак по облости вокруг формы*/

// масив с контентом для карточек
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

//перебор масива и автаматическое добавление карточек с контентом из масива
initialCards.forEach(function (element) {
  cardGalleryImg.src = element.link;
  cardGalleryImg.alt = `Фото: ${element.name}`;
  cardGallerylabel.textContent = element.name;

  const itemElement = cardGalleryElement.cloneNode(true);
  galleryContainer.append(itemElement);
  setEventListners(itemElement);
})

// добавление карточек пользователем
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  cardGallerylabel.textContent = inputGallerylabelValue.value;
  cardGalleryImg.src = inputGalleryImgValue.value;
  cardGalleryImg.alt = `картинка ${inputGallerylabelValue.value}`;
  const itemElement = cardGalleryElement.cloneNode(true);
  setEventListners(itemElement);
  galleryContainer.prepend(itemElement);
  closePopup(popupAddCard)

}
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

// обработчик событий внутри карточек
function setEventListners (itemElement) {
  itemElement.querySelector('.card__button-remove').addEventListener('click', function(evt){
    event.target.closest('.card__item')
    itemElement.remove();
  })
  itemElement.querySelector('.card__button-like').addEventListener('click', function(evt) {
    event.target.classList.toggle('card_like-active')
  })
  itemElement.querySelector('.card__img').addEventListener('click', (evt) => {
    popupGalleryImg.src = evt.target.src
    popupGalleryImg.alt = evt.target.alt
    popupGalleryFigcaption.textContent = itemElement.querySelector('.card__label').textContent
    openPopup(popupOpenZoom)
  })
}


