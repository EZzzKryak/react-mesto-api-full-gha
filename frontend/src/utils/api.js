import { handleRequest } from "./utils";

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // Возвращает промис для получения первоначальных карточек с сервера
  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(handleRequest);
  }

  // Возвращает промис для первоначального получения данных профиля с сервера (имени, описания и аватара)
  getProfileInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then(handleRequest);
  }

  // Возвращает промис для добавления новой карточки
  postNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
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
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(handleRequest);
  }

  // Возвращает промис для установки новых данных профиля из формы
  setProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
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
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(handleRequest);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(handleRequest);
  }
}

const api = new Api("https://rocket.api.nomoredomainsicu.ru");

export default api;
