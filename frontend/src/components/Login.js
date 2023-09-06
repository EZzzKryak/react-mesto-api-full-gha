import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

const Login = ({ handleLogin }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const { email, password } = values;

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    if (isValid) {
      handleLogin(values, resetForm); // Если ф-я сработала, юзать ресет
    }
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        name="login"
        className="auth__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <label className="auth__field">
          <input
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+" // Махнуть в будущем на другой
            id="login-email-input"
            type="email"
            name="email"
            placeholder="Email"
            className="auth__input"
            onChange={handleChange}
            value={email || ""}
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
            id="login-pass-input"
            type="password"
            name="password"
            placeholder="Пароль"
            className="auth__input"
            onChange={handleChange}
            value={password || ""}
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
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
