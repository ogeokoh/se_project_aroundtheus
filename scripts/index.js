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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

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

/* Functions*/

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");
  const likeButton = cardElement.querySelector(".cards__like-button");
  // find delete button
  const trashButton = cardElement.querySelector(".cards__trash-button");

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageCaption.textContent = cardData.name;
    openModal(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

function resetFormAndValidation(formElement) {
  // Reset the form fields
  formElement.reset();

  // Reset validation states
  const inputList = [...formElement.querySelectorAll(".modal__input")];
  const submitButton = formElement.querySelector(".modal__button");

  // Hide all error messages
  inputList.forEach((inputEl) => {
    const errorMessageEl = formElement.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove("modal__input_type_error");
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove("modal__error_visible");
  });

  // Reset button state
  if (inputList.some((input) => !input.validity.valid)) {
    submitButton.classList.add("modal__button_disabled");
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove("modal__button_disabled");
    submitButton.disabled = false;
  }
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
  closePopup(addNewCardModal);
  cardTitleInput.value = "";
  cardLinkInput.value = "";
}

/* Event Listeners */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

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
  resetFormAndValidation(addCardForm);
  openModal(addNewCardModal);
});

addNewCardCloseButton.addEventListener("click", () =>
  closePopup(addNewCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
