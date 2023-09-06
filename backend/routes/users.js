const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const { REG_EXP_LINK } = require('../utils/constants');
const {
  getAllUsers,
  getUserbyId,
  updateUser,
  updateAvatar,
  getProfileUser,
} = require('../controllers/users');

// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар
// GET /users/me - возвращает информацию о текущем пользователе

router.get('/', getAllUsers);

router.get('/me', getProfileUser);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(REG_EXP_LINK),
    }),
  }),
  updateAvatar,
);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUserbyId,
);

module.exports = router;
