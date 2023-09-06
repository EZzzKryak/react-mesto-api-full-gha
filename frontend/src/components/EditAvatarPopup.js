import React, { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const { link } = values;

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    if (isValid) {
      onUpdateAvatar({
        avatar: link,
      });
    }
  };

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
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
          id="avatar-link-input"
          type="url"
          name="link"
          value={link || ""}
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_avatar-link"
          onChange={handleChange}
          required
        />
        <span
          className={`popup__input-error ${
            !isValid && "popup__input-error_active"
          } avatar-link-input-error`}
        >
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
