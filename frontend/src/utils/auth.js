import { handleRequest } from "./utils";

class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  registerUser({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
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
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then(handleRequest);
  }

  getContent() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
    .then(handleRequest);
  }
}

const auth = new Auth("https://rocket.api.nomoredomainsicu.ru");

export default auth;
