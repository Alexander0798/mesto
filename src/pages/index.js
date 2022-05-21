import './index.css'; // стили для webpack

import Cards from '../components/Cards.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  config,
  profileEditName,
  ptofileEditJob,
  profileName,
  profileJob,
  initialCards,
  profileButtonEdit,
  profileButtonAdd,
  formElementEdit,
  formElementAdd,
  galleryContainer,
  temlateContainer,
  popupOpenZoom,
  popupAddCard,
  popupEditInfo
} from '../utils/constants.js'


const createCard = (item) => {
  const newCard = new Cards(item, temlateContainer, (link, name) => { popupImg.open(link, name); });
  return newCard.generateCard();
}

// секция для карточек
const cardSection = new Section({
  items: initialCards, renderer: (item) => {
    cardSection.addItem(createCard(item));
  }
}, galleryContainer);
cardSection.addInitialItems();  // добавить начальные карточки

// запуск валидация форм
const profileValidation = new FormValidator(config, formElementEdit);
const addCardValidation = new FormValidator(config, formElementAdd);
profileValidation.enableValidation();
addCardValidation.enableValidation();

// редактирование информации пользователя
const profileInfo = new UserInfo({ name: profileName, job: profileJob });

const popupEdit = new PopupWithForm(popupEditInfo, (data) => {
  profileInfo.setUserInfo(data.name, data.job);
});

// создание новой карточкий пользователем
const popupAdd = new PopupWithForm(popupAddCard, (data) => {
  const addNewCard = createCard(data);
  cardSection.prependItem(addNewCard);
});

// создание попап c картинкой
export const popupImg = new PopupWithImage(popupOpenZoom);
// установить слушатели для попап
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImg.setEventListeners();

// отслеживание кнопки "редактировать профиль"

profileButtonEdit.addEventListener('click', function () {
  const userInfo = profileInfo.getUserInfo();
  profileEditName.value = userInfo.name;
  ptofileEditJob.value = userInfo.job;
  profileValidation.toogleButtonState();
  popupEdit.open();
});

// отслеживание кнопки "добавить карточку"

profileButtonAdd.addEventListener('click', function () {    // отслеживание кнопки "добавить карточку"
  addCardValidation.toogleButtonState();
  popupAdd.open();
});

