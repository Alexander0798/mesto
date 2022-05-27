import './index.css'; // стили для webpack

import Api from '../components/Api.js'
import Cards from '../components/Cards.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"
import {
  config,
  profileEditName,
  ptofileEditJob,
  profileName,
  profileJob,
  profileAvatar,
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

// создание карточек
  const createCard = (data) => {
    const newCard = new Cards(data, temlateContainer, userId, {
      handleCardClick: (name, link) => {
        popupImg.open(name, link);
      }, handleDeleteClick: (cardId) => {
        deleteCardPopup.open();
        deleteCardPopup.submitCallback(() => {
          api.deleteCard(cardId)
            .then(() => {
              deleteCardPopup.close();
              newCard.deleteCard();
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        })
      }, addLike: (cardId) => {
        api.setLike(cardId)
          .then((data) => {
            newCard.handleLikeCard(data);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }, disLike: (cardId) => {
        api.deleteLike(cardId)
          .then((data) => {
            newCard.handleLikeCard(data);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    });
    return newCard.generateCard();
  }
// отрисовка карточек
  const cardSection = new Section((data) => {
    cardSection.addItem(createCard(data));
  }
    , galleryContainer);


  // создание новой карточкий пользователем
const addCardPopup = new PopupWithForm(popupAddCard, (data) => {
  addCardPopup.loading(true)
  api.addCard(data)
    .then((data) => {
      const addNewCard = createCard(data);
      cardSection.prependItem(addNewCard);
    }).catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      addCardPopup.loading(false);
    });
});

// попап редактирования данныx профиля

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
//
const userInfo = new UserInfo({ name: profileName, about: profileJob, avatar: profileAvatar });

// попап картинки
const editAvatarPopup = new PopupWithForm(popupEditAvatar, (data) => {
  editAvatarPopup.loading(true)
  api.editAvatar(data)
    .then((data) => {
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

// попап удаления карточки

const deleteCardPopup = new PopupWithConfirmation(popupDeliteCard);
deleteCardPopup.setEventListeners();

profileButonEditAvatar.addEventListener('click', () => {
  editAvatarPopup.open();
})

// создание попап c картинкой
export const popupImg = new PopupWithImage(popupOpenZoom);
// установить слушатели для попап
addCardPopup.setEventListeners();
popupImg.setEventListeners();
editAvatarPopup.setEventListeners()


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
  addCardPopup.open();
});


// запуск валидация форм
const profileValidation = new FormValidator(config, formElementEdit);
const addCardValidation = new FormValidator(config, formElementAdd);
const editAvatarValidation = new FormValidator(config, formElementAvatar);
profileValidation.enableValidation();
addCardValidation.enableValidation();
editAvatarValidation.enableValidation();
