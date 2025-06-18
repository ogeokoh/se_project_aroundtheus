import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Form validation settings
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

/* Elements */
/* Edit Profile */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(
  "#profile-edit-close-button"
);
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector("#edit-profile-form");
const cardListEl = document.querySelector(".cards__list");

/* Add Card */
const addNewCardButton = document.querySelector("#profile-add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addNewCardCloseButton = document.querySelector("#add-card-close-button");
const addCardForm = document.querySelector("#add-card-form");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector(".preview-image-modal__image");
const previewImageCloseButton = document.querySelector(
  "#preview-image-close-button"
);
const previewImageCaption = document.querySelector(
  ".preview-image-modal__caption"
);

/* Add Card Form */
const cardTitleInput = addCardForm.querySelector("#add-card-title-input");
const cardLinkInput = addCardForm.querySelector("#add-card-link-input");

// Create form validators
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);

/* Functions*/
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function handleEscClose(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closePopup(openedModal);
    }
  }
}

function handleImageClick(card) {
  previewImage.src = card._link;
  previewImage.alt = card._name;
  previewImageCaption.textContent = card._name;
  openModal(previewImageModal);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

/* Event Handlers */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  addCardFormValidator.disableSubmitButton();
  closePopup(addNewCardModal);
}

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  openModal(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

previewImageCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);

// Form Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Add new card button listener
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  openModal(addNewCardModal);
});

addNewCardCloseButton.addEventListener("click", () =>
  closePopup(addNewCardModal)
);

// Click outside modal to close
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(e.target);
  }
});

// Enable form validation
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Initialize cards
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
