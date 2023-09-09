import { handleRequest } from "./utils";

class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Возвращает промис для получения первоначальных карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(handleRequest);
  }

  // Возвращает промис для первоначального получения данных профиля с сервера (имени, описания и аватара)
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(handleRequest);
  }

  // Возвращает промис для добавления новой карточки
  postNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(handleRequest);
  }

  // Возвращает промис для удаления карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(handleRequest);
  }

  // Возвращает промис для установки новых данных профиля из формы
  setProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(handleRequest);
  }

  // Возвращает промис для установки нового аватара профиля
  setProfileAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(handleRequest);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(handleRequest);
  }
}

const api = new Api("https://rocket.api.nomoredomainsicu.ru", {
  "Content-Type": "application/json",
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
});

export default api;
