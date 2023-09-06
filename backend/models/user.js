const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UnathorizedError = require('../errors/unathorized-err');
const { REG_EXP_EMAIL, REG_EXP_LINK } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимальная длина поля "Имя" - 2 символа'],
      maxlength: [30, 'Максимальная длина поля "Имя" - 30 символов'],
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Минимальная длина поля "Обо мне" - 2 символа'],
      maxlength: [30, 'Максимальная длина поля "Обо мне" - 30 символов'],
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => REG_EXP_LINK.test(v),
        message: 'Некорректная ссылка',
      },
    },
    email: {
      type: String,
      validate: {
        validator: (v) => REG_EXP_EMAIL.test(v),
        message: 'Некорректная почта',
      },
      unique: true,
      required: [true, 'Поле "Почта" должно быть заполнено'],
    },
    password: {
      type: String,
      required: [true, 'Поле "Пароль" должно быть заполнено'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnathorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnathorizedError('Неправильные почта или пароль');
        }
        return user; // теперь user доступен
      });
    });
};

module.exports = mongoose.model('user', userSchema);
