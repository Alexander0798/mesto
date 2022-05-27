export default class Cards {
  constructor(data, cardSelector, userId, { handleCardClick, handleDeleteClick, addLike, disLike }) {
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleDeleteClick = handleDeleteClick
    this._handleCardClick = handleCardClick;
    this._addLike = addLike;
    this._disLike = disLike;
  }
  _getTemplate() {
    const cardElement = this._cardSelector
      .content
      .querySelector('.card__item')
      .cloneNode(true);

    return cardElement
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__img')
    this._likeButton = this._element.querySelector('.card__button-like')
    this._likesNumber = this._element.querySelector('.card__likes-number')
    this._deleteButton = this._element.querySelector('.card__button-remove')

    this._image.src = this._link
    this._image.alt = this._name
    this._element.querySelector('.card__label').textContent = this._name
    this._setEventListeners()
    this._hasDeleteButton();
    this._isCardLiked();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element
  }

  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeButton.classList.add('card_like-active');
    }
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeButton.classList.toggle('card_like-active');
  }

  _hasDeleteButton() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.remove();
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._likeButton.classList.toggle('card_like-active')
      if (this._likeButton.classList.contains('card_like-active')) {
        this._disLike(this._cardId);
      } else {
        this._addLike(this._cardId);
      }
    })
    this._deleteButton.addEventListener('click', () => {
      this._element.remove()
    })
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }
}
