import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

const PopupWithForm = ({
  name,
  title,
  buttonName,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  isValid,
}) => {
  usePopupClose(isOpen, onClose);
  // Проверка на валидность всех инпутов, приходящих в объекте validityProps
  return (
    <div className={`popup popup_type_${name} ${isOpen && " popup_opened"}`}>
      <div className="popup__container popup__container_type_form">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            disabled={!isValid}
            type="submit"
            className={`popup__submit popup__submit_type_${name}`}
            aria-label="Сохранить данные"
          >
            {isLoading ? "Сохранение..." : buttonName}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
