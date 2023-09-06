import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like ${
    isLiked && "place__like_active"
  }`;

  return (
    <article className="place">
      <img
        src={card.link}
        alt={card.name}
        className="place__img"
        onClick={handleClick}
      />
      <div className="place__info">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <div className="place__like-counter">{card.likes.length}</div>
        </div>
        {isOwn && (
          <button
            type="button"
            className="place__remove"
            aria-label="Удалить"
            onClick={handleDeleteClick}
          />
        )}
      </div>
    </article>
  );
};

export default Card;
