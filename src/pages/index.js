// src/pages/index.js
import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import api from "../utils/Api.js";

import {
  validationSettings,
  CARD_TEMPLATE_SELECTOR,
  CARD_LIST_SELECTOR,
} from "../utils/constants.js";

/* DOM refs */
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector("#profile-add-button");

const profileEditForm = document.querySelector("#edit-profile-form");
const addCardForm = document.querySelector("#add-card-form");

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const avatarEditButton = document.querySelector("#avatar-edit-button");
const avatarEditForm = document.querySelector("#avatar-edit-form");

// profile photo
const avatarEl = document.querySelector(".profile__image");

/* Validators */
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditForm
);
avatarFormValidator.enableValidation();

/* User info */
const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  aboutSelector: "#profile-description",
});

/* Preview popup */
const imagePreviewPopup = new PopupWithImage("#preview-image-modal");
imagePreviewPopup.setEventListeners();

/* Card factory */
function createCard(cardData) {
  const card = new Card(
    cardData,
    CARD_TEMPLATE_SELECTOR,
    // image preview
    (payload) => {
      const data =
        payload && payload.name && payload.link
          ? payload
          : { name: payload._name, link: payload._link };
      imagePreviewPopup.open({ name: data.name, link: data.link });
    },
    // delete confirm
    (cardInstance) => {
      cardToDelete = cardInstance;
      confirmDeletePopup.open();
    },
    // NEW: like toggle -> API
    (cardInstance) => {
      const willLike = !cardInstance.isLiked();
      const req = willLike
        ? api.addLike(cardInstance.getId())
        : api.removeLike(cardInstance.getId());

      req
        .then((updatedCard) => {
          // server returns card JSON with updated isLiked
          cardInstance.setLiked(updatedCard.isLiked);
        })
        .catch((err) => console.error(err));
    }
  );

  return card.generateCard();
}

/* Section (list) */
const cardsSection = new Section(
  {
    items: [],
    renderer: (item) => {
      cardsSection.addItem(createCard(item)); // prepend by default
    },
  },
  CARD_LIST_SELECTOR
);

/* Popups with forms */
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    editProfilePopup.renderLoading(true); // NEW
    api
      .updateUserInfo({ name: formData.title, about: formData.description })
      .then((user) => {
        userInfo.setUserInfo({ title: user.name, description: user.about });
        editProfilePopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => editProfilePopup.renderLoading(false)); // NEW
  }
);

editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  addCardPopup.renderLoading(true); // NEW
  api
    .addCard({ name: formData.title, link: formData.link })
    .then((card) => {
      cardsSection.addItem(createCard(card));
      addCardFormValidator.disableSubmitButton();
      addCardPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => addCardPopup.renderLoading(false)); // NEW
});

addCardPopup.setEventListeners();

/* Button handlers */
profileEditButton.addEventListener("click", () => {
  const current = userInfo.getUserInfo();
  profileTitleInput.value = current.title;
  profileDescriptionInput.value = current.description;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
});

avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarEditPopup.open();
});

let cardToDelete = null;

const confirmDeletePopup = new PopupWithForm("#confirm-delete-modal", () => {
  if (!cardToDelete) {
    confirmDeletePopup.close();
    return;
  }
  confirmDeletePopup.renderLoading(true, "Deleting..."); // NEW
  api
    .deleteCard(cardToDelete.getId())
    .then(() => {
      cardToDelete.remove();
      cardToDelete = null;
      confirmDeletePopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => confirmDeletePopup.renderLoading(false)); // NEW
});

confirmDeletePopup.setEventListeners();

// Avatar Edit Popup
const avatarEditPopup = new PopupWithForm("#avatar-edit-modal", (formData) => {
  avatarEditPopup.renderLoading(true); // NEW
  api
    .updateAvatar({ avatar: formData.avatar })
    .then((user) => {
      avatarEl.src = user.avatar;
      avatarEl.alt = user.name || "User avatar";
      avatarFormValidator.disableSubmitButton();
      avatarEditPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => avatarEditPopup.renderLoading(false)); // NEW
});

avatarEditPopup.setEventListeners();

// Load user + cards together, render after both resolved
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo({ title: user.name, description: user.about });
    avatarEl.src = user.avatar;
    avatarEl.alt = user.name;
    window.currentUserId = user._id;

    cards.forEach((card) => {
      cardsSection.addItem(createCard(card)); // pass full object with _id
    });
  })
  .catch(console.error);
