import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import auth from "../utils/auth";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Main from "./Main";
import ProtectedRouteElement from "./ProtectedRoute";
import Register from "./Register";

function App() {
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  const [email, setEmail] = useState("");

  const [tooltipStatus, setTooltipStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser({
            name: userData.name,
            about: userData.about,
            avatar: userData.avatar,
            _id: userData._id,
          });
          setEmail(userData.email);
          setCards(cardsData.cards);
          // navigate("/");
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    auth
      .getContent()
      .then(data => {
        if (data) {
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogin = ({ email, password }, callback) => {
    auth
      .authorizeUser({ email, password })
      .then(res => {
        // нужно проверить, есть ли у данных jwt
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          // setCurrentUser({
          //   name: res.name,
          //   about: res.about,
          //   avatar: res.avatar,
          // });
          // setEmail(formData.email);
          setLoggedIn(true);
          callback();
          navigate("/");
        }
      })
      .catch(err => {
        console.log(err);
        setTooltipStatus(false);
        setIsTooltipPopupOpen(true);
      });
  };

  const handleRegister = ({ email, password }, callback) => {
    auth
      .registerUser({ email, password })
      .then(res => {
        setTooltipStatus(true);
        callback();
        navigate("/login");
      })
      .catch(err => {
        console.log(err);
        setTooltipStatus(false);
      })
      .finally(() => {
        setIsTooltipPopupOpen(true);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    auth
      .signOut()
      .then(() => {
        setCurrentUser({
          name: "",
          about: "",
          avatar: "",
          _id: "",
        });
        setCards([]);
        setEmail("");
        setLoggedIn(false);
        navigate("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(selectedCard => {
        setCards(state =>
          state.map(item => (item._id === card._id ? selectedCard : item))
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConfirmForm = () => {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards(cards => cards.filter(item => item._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCardDelete = card => {
    setDeletedCard(card);
    setIsConfirmPopupOpen(true);
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setProfileInfo({ name, about })
      .then(user => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = avatarData => {
    setIsLoading(true);
    api
      .setProfileAvatar(avatarData)
      .then(profileData => {
        setCurrentUser(profileData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);
    api
      .postNewCard({ name, link })
      .then(res => {
        setCards([res.card, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <div className="page">
          <Header email={email} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  element={Main}
                />
              }
            />
            <Route path="login" element={<Login handleLogin={handleLogin} />} />
            <Route
              path="register"
              element={<Register handleRegister={handleRegister} />}
            />
          </Routes>
          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirmForm={handleConfirmForm}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            tooltipStatus={tooltipStatus}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
