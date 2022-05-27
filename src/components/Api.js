export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
// загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
      .then(res => this._handleResponse(res));
  }
// добавление новой карточки
  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._handleResponse(res));
  }
// удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._handleResponse(res));
  }

// добавить лайк
  setLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._handleResponse(res));
  }
// удалить лайк
  deleteLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._handleResponse(res));
  }
// получить информацию о пользователе
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
      .then(res => this._handleResponse(res));
  }
// заменить информацию пользователя
  editUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._handleResponse(res));
  }
// заменить аватар 
  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._handleResponse(res));
  }
}
