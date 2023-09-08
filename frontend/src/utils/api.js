import { handleRequest } from "./utils";

class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(handleRequest);
  }

  // Возвращает промис для получения первоначальных карточек с сервера
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  // Возвращает промис для добавления новой карточки
  postNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  // Возвращает промис для удаления карточки
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Возвращает промис для первоначального получения данных профиля с сервера (имени, описания и аватара)
  getProfileInfo() {
    console.log(localStorage.jwt);
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  // Возвращает промис для установки новых данных профиля из формы
  setProfileInfo({name, about}) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  // Возвращает промис для установки нового аватара профиля
  setProfileAvatar(avatarData) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarData.avatar,
      }),
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }
}

const api = new Api("https://rocket.api.nomoredomainsicu.ru", {
  "Content-Type": "application/json",
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
});

export default api;
