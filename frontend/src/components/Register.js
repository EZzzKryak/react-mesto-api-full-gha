import React from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const Register = ({ handleRegister }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const { email, password } = values;

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) {
      handleRegister(values, resetForm); // Если ф-я сработала, юзать ресет
    }
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        name="register"
        className="auth__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <label className="auth__field">
          <input
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+" // Махнуть в будущем на другой
            id="auth-email-input"
            type="email"
            name="email"
            placeholder="Email"
            value={email || ""}
            onChange={handleChange}
            className="auth__input"
            required
          />
          <span
            className={`${
              !isValid && "auth__input-error_active"
            } auth__input-error`}
          >
            {errors.email}
          </span>
        </label>
        <label className="auth__field">
          <input
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}$"
            minLength="8"
            maxLength="20"
            id="auth-pass-input"
            type="password"
            name="password"
            placeholder="Пароль"
            value={password || ""}
            onChange={handleChange}
            className="auth__input"
            required
          />
          <span
            className={`${
              !isValid && "auth__input-error_active"
            } auth__input-error`}
          >
            {errors.password}
          </span>
        </label>
        <button
          disabled={!isValid}
          type="submit"
          className="auth__submit"
          aria-label="Сохранить данные"
        >
          Зарегистрироваться
        </button>
        <div className="auth__signup">
          <p className="auth__reg-question">Уже зарегистрированы?</p>
          <Link className="auth__link" to="/login">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
