import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import headerLogo from "../images/header__logo.svg";

const Header = ({ email, onSignOut }) => {
  return (
    <header className="header">
      <img src={headerLogo} alt="Место" className="header__logo" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__user-container">
              <p className="header__user">{email}</p>
              <Link
                onClick={onSignOut}
                className="header__link header__link_logout"
                to="/"
              >
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="register"
          element={
            <Link className="header__link" to="/login">
              Вход
            </Link>
          }
        />
        <Route
          path="login"
          element={
            <Link path="register" className="header__link" to="/register">
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
};

export default Header;
