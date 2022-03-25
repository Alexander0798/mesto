
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
const formElementEdit = page.querySelector('.popup__form-edit')
const formElementAdd = page.querySelector('.popup__form-add')

const galleryContainer = page.querySelector('.gallery')
const itemTemlateContent = document.querySelector('#item-temlate').content;
const cardGalleryImg = itemTemlateContent.querySelector('.card__img');
const cardGallerylabel = itemTemlateContent.querySelector('.card__label');
const cardGalleryElement = itemTemlateContent.querySelector('.card__item')
const inputGallerylabelValue = page.querySelector('#inputAddTitle');
const inputGalleryImgValue = page.querySelector('#inputAddLink');


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
  inputGallerylabelValue.value = ''
  inputGalleryImgValue.value = ''
}


function formSubmitHandlerEdit(evt) {
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
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
//popupEditInfo.addEventListener('click', closePopupByClickOnOverlay)

const popupOpenZoom = page.querySelector('#popupImgZoom')
const popupGalleryImg = page.querySelector('.popup__img')
const popupGalleryFigcaption = page.querySelector('.popup__figcaption')
const popupButtonCloseZoom = page.querySelector('#buttonCloseZoom')
function openPopupZoom() {
  popupOpenZoom.classList.add('popup_opened');
}
function closePopupZoom() {
  popupOpenZoom.classList.remove('popup_opened');
}

popupButtonCloseZoom.addEventListener('click', closePopupZoom);

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
    openPopupZoom()
  })
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
  cardGalleryImg.addEventListener('click', () => {
    popupGalleryImg.src = cardGalleryImg.src
    popupGalleryImg.alt = cardGalleryImg.alt
    popupGalleryFigcaption.textContent = cardGallerylabel.textContent
    openPopupZoom()
  })
  cardInfo.forEach(renderItem)
}

render()

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  const itemElement = cardGalleryElement.cloneNode(true);
  cardGallerylabel.textContent = inputGallerylabelValue.value;
  cardGalleryImg.src = inputGalleryImgValue.value;
  cardGalleryImg.alt = `картинка ${inputGallerylabelValue.value}`;
  setEventListners(itemElement);
  galleryContainer.prepend(itemElement);
  closePopupAdd()

}

formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

