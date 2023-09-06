import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    setErrors,
  } = useFormAndValidation();

  const { name, description } = values;

  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setErrors({});
    setValues({
      name: currentUser.name,
      description: currentUser.about,
    });
  }, [currentUser, isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) {
      // Передаём значения управляемых компонентов во внешний обработчик
      onUpdateUser({
        name,
        about: description,
      });
    }
  };

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      buttonName={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      {/* children */}
      <label className="popup__field">
        <input
          minLength="2"
          maxLength="40"
          id="profile-name-input"
          type="text"
          name="name"
          placeholder="Введите имя"
          className="popup__input popup__input_type_name"
          value={name || ""}
          onChange={handleChange}
          required
        />
        <span
          className={`popup__input-error ${
            !isValid && "popup__input-error_active"
          } profile-name-input-error`}
        >
          {errors.name}
        </span>
      </label>
      <label className="popup__field">
        <input
          minLength="2"
          maxLength="200"
          id="profile-job-input"
          type="text"
          name="description"
          placeholder="Введите профессию"
          className="popup__input popup__input_type_job"
          value={description || ""}
          onChange={handleChange}
          required
        />
        <span
          className={`popup__input-error ${
            !isValid && "popup__input-error_active"
          } profile-job-input-error`}
        >
          {errors.description}
        </span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
