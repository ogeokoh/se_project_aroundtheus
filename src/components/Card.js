export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    // Like button event listener
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    // Delete button event listener
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    // Image click event listener
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("cards__like-button_active");
  }

  _handleDeleteClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-item")
      .cloneNode(true);
  }

  generateCard() {
    // Get the card template
    this._cardElement = this._getTemplate();

    // Get card elements
    this._cardImage = this._cardElement.querySelector(".cards__image");
    this._cardTitle = this._cardElement.querySelector(".cards__title");
    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".cards__trash-button"
    );

    // Set card data
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Set event listeners
    this._setEventListeners();

    // Return the card element
    return this._cardElement;
  }
}
