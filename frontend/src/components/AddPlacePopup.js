import React, { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const { name, link } = values;

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) {
      onAddPlace({
        name,
        link,
      });
    }
  };

  return (
    <PopupWithForm
      name={"place"}
      title={"Новое место"}
      buttonName={"Создать"}
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
          maxLength="30"
          id="place-name-input"
          type="text"
          name="name"
          placeholder="Название"
          className="popup__input popup__input_type_pic-name"
          value={name || ""}
          onChange={handleChange}
          required
        />
        <span
          className={`popup__input-error ${
            !isValid && "popup__input-error_active"
          } place-name-input-error`}
        >
          {errors.name}
        </span>
      </label>
      <label className="popup__field">
        <input
          id="place-link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_pic-link"
          value={link || ""}
          onChange={handleChange}
          required
        />
        <span
          className={`popup__input-error ${
            !isValid && "popup__input-error_active"
          } place-link-input-error`}
        >
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
