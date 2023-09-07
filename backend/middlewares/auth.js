require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/unathorized-err');
const { SECRET_KEY } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET = SECRET_KEY } = process.env;
console.log(JWT_SECRET);

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnathorizedError('Неверный логин и/или пароль');
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new UnathorizedError('Неверный логин и/или пароль');
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
