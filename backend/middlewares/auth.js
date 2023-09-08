require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/unathorized-err');
const { NODE_ENV, JWT_SECRET = 'dev-secret' } = require('../utils/app.config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnathorizedError('Неверный логин и/или пароль');
  }
  const token = authorization.replace('Bearer ', '');
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
