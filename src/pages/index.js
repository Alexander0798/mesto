import './index.css'; // стили для webpack

import Api from '../components/Api.js'
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
  profileAvatar,
  initialCards,
  profileButtonEdit,
  profileButtonAdd,
  profileButonEditAvatar,
  formElementEdit,
  formElementAdd,
  formElementAvatar,
  galleryContainer,
  temlateContainer,
  popupOpenZoom,
  popupAddCard,
  popupEditInfo,
  popupEditAvatar,
  popupDeliteCard
} from '../utils/constants.js'

const api = new Api({
  url: 'https://nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: '886b3744-7951-454a-97ed-ee1e81c113bf',
    'Content-Type': 'application/json'
  }
})
api.getall()

let userId;

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, data]) => {
    userInfo.setUserInfo(data);
    userId = data._id;
    cardSection.addInitialItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const userInfo = new UserInfo({ name: profileName, about: profileJob, avatar: profileAvatar });

const editProfilePopup = new PopupWithForm(popupEditInfo, (userData) => {
  editProfilePopup.loading(true);
  api.editUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      editProfilePopup.loading(false);
    });
});
editProfilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm(popupEditAvatar, (data) => {
  editAvatarPopup.loading(true)
  api.editAvatar(data)
  .then((data) => {
    console.log(data.avatar)
    profileAvatar.src = data.avatar;
    editAvatarPopup.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    editAvatarPopup.loading(false);
  });
})

editAvatarPopup.setEventListeners()

profileButonEditAvatar.addEventListener('click',  () => {
  editAvatarPopup.open();
})

const createCard = (item) => {
  const newCard = new Cards(item, temlateContainer, (link, name) => {
    popupImg.open(link, name);
  });
  return newCard.generateCard();
}

// секция для карточек
const cardSection = new Section((item) => {
    cardSection.addItem(createCard(item));
  }
, galleryContainer);

// запуск валидация форм
const profileValidation = new FormValidator(config, formElementEdit);
const addCardValidation = new FormValidator(config, formElementAdd);
const editAvatarValidation = new FormValidator(config, formElementAvatar);
profileValidation.enableValidation();
addCardValidation.enableValidation();
editAvatarValidation.enableValidation();
// редактирование информации пользователя



// создание новой карточкий пользователем
const popupAdd = new PopupWithForm(popupAddCard, (data) => {
  const addNewCard = createCard(data);
  cardSection.prependItem(addNewCard);
});

// создание попап c картинкой
export const popupImg = new PopupWithImage(popupOpenZoom);
// установить слушатели для попап
popupAdd.setEventListeners();
popupImg.setEventListeners();

// отслеживание кнопки "редактировать профиль"
profileButtonEdit.addEventListener('click', function () {
  const info = userInfo.getUserInfo();
  profileEditName.value = info.name;
  ptofileEditJob.value = info.about;
  profileValidation.toogleButtonState();
  editProfilePopup.open();
});


// отслеживание кнопки "добавить карточку"

profileButtonAdd.addEventListener('click', function () {
  addCardValidation.toogleButtonState();
  popupAdd.open();
});

