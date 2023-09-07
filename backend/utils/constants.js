// const crypto = require('crypto');

const DEFAULT_CODE_STATUS = 500;
const CREATED_CODE_STATUS = 201;

const REG_EXP_LINK = /https?:\/\/(www\.)?[\w\-._~:/?#[\]@!\\$&'()\\*+,;=]+#?/;
const REG_EXP_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const SECRET_KEY = 'dev-secret';

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// Массив доменов, с которых разрешены кросс-доменные запросы
const ALOWED_CORS = [
  'http://rocket.mesto.nomoredomainsicu.ru',
  'https://rocket.mesto.nomoredomainsicu.ru',
];

module.exports = {
  DEFAULT_CODE_STATUS,
  CREATED_CODE_STATUS,
  REG_EXP_LINK,
  REG_EXP_EMAIL,
  SECRET_KEY,
  DEFAULT_ALLOWED_METHODS,
  ALOWED_CORS,
};
