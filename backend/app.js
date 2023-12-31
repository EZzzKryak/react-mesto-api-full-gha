const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT = 3000 } = require('./utils/app.config');
const { DB_URL } = require('./utils/constants');

const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');

const {
  DEFAULT_CODE_STATUS,
  REG_EXP_LINK,
  REG_EXP_EMAIL,
} = require('./utils/constants');

const app = express();
mongoose.connect(DB_URL);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger); // подключаем логгер запросов
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(REG_EXP_LINK),
      email: Joi.string().required().pattern(REG_EXP_EMAIL),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(REG_EXP_EMAIL),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);

app.post('/signout', (req, res) => {
  res.send({ message: 'Вы вышли со страницы' });
});

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Несуществующий маршрут'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = DEFAULT_CODE_STATUS, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === DEFAULT_CODE_STATUS
        ? 'На сервере произошла ошибка'
        : message,
  });
});

app.listen(PORT);
