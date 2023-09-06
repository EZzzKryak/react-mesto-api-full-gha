// const crypto = require('crypto');

const DEFAULT_CODE_STATUS = 500;
const CREATED_CODE_STATUS = 201;

const REG_EXP_LINK = /https?:\/\/(www\.)?[\w\-._~:/?#[\]@!\\$&'()\\*+,;=]+#?/;
const REG_EXP_EMAIL = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const SECRET_KEY = 'dev-secret';
// crypto
//   .randomBytes(16) // сгенерируем случайную последовательность 16 байт (128 бит)
//   .toString('hex'); // приведём её к строке

module.exports = {
  DEFAULT_CODE_STATUS,
  CREATED_CODE_STATUS,
  REG_EXP_LINK,
  REG_EXP_EMAIL,
  SECRET_KEY,
};
