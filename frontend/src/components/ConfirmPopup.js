import React from "react";
import PopupWithForm from "./PopupWithForm";

const ConfirmPopup = ({ isOpen, onClose, onConfirmForm }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onConfirmForm();
  };

  return (
    <PopupWithForm
      name={"confirm"}
      title={"Вы уверены?"}
      buttonName={"Да"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isValid={true}
    />
  );
};

export default ConfirmPopup;
