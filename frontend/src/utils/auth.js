import { handleRequest } from "./utils";

class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  registerUser({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(handleRequest);
  }

  authorizeUser({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then(handleRequest);
  }

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(handleRequest);
  }
}

const auth = new Auth("https://rocket.api.nomoredominsicu.ru");

export default auth;