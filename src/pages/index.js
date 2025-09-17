// src/pages/index.js
import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
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

/* Validators */
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

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
  const card = new Card(cardData, CARD_TEMPLATE_SELECTOR, (payload) => {
    // Card currently calls handler with `this`; normalize both shapes
    const data =
      payload && payload.name && payload.link
        ? payload
        : { name: payload._name, link: payload._link };

    imagePreviewPopup.open({ name: data.name, link: data.link });
  });
  return card.generateCard();
}

/* Section (list) */
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsSection.addItem(createCard(item)); // prepend by default
    },
  },
  CARD_LIST_SELECTOR
);
cardsSection.renderItems();

/* Popups with forms */
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({
      title: formData.title,
      description: formData.description,
    });
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  cardsSection.addItem(
    createCard({ name: formData.title, link: formData.link })
  );
  addCardFormValidator.disableSubmitButton();
  addCardPopup.close();
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
