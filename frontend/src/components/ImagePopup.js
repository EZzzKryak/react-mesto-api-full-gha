import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

const ImagePopup = ({ card, onClose }) => {
  usePopupClose(card?.link, onClose);
  return (
    <div className={`popup popup_type_img" ${card && " popup_opened"}`}>
      <div className="popup__container popup__container_type_img">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="popup__img"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className="popup__img-name">{card ? card.name : ""}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
