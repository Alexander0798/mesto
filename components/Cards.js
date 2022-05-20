export default class Cards {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = this._cardSelector
      .content
      .querySelector('.card__item')
      .cloneNode(true);

    return cardElement
  }
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__img').src = this._link
    this._element.querySelector('.card__img').alt = this._name
    this._element.querySelector('.card__label').textContent = this._name
    this._setEventListeners()
    return this._element
  }

  _setEventListeners() {
    this._element.querySelector('.card__button-like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card_like-active')
    })
    this._element.querySelector('.card__button-remove').addEventListener('click', () => {
      this._element.remove()
    })
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    })

  }
}
