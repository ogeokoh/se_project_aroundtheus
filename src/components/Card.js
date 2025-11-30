export default class Card {
  // NEW: accept handleLikeToggle and initial isLiked from server
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeToggle
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = Boolean(data.isLiked); // <- server field
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeToggle = handleLikeToggle;
  }

  _setEventListeners() {
    // Like button -> delegate to external toggle handler
    this._likeButton.addEventListener("click", () => {
      if (typeof this._handleLikeToggle === "function") {
        this._handleLikeToggle(this);
      }
    });

    // Delete button -> external confirm handler
    this._deleteButton.addEventListener("click", () => {
      if (typeof this._handleDeleteClick === "function") {
        this._handleDeleteClick(this);
      }
    });

    // Image click preview
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  // UI helpers for like state
  _applyLikeUI() {
    this._likeButton.classList.toggle(
      "cards__like-button_active",
      this._isLiked
    );
  }

  // Public: update like state from server result
  setLiked(isLiked) {
    this._isLiked = Boolean(isLiked);
    this._applyLikeUI();
  }

  // Public: read current like state
  isLiked() {
    return this._isLiked;
  }

  // Public: used after server confirms deletion
  remove() {
    if (this._cardElement) {
      this._cardElement.remove();
      this._cardElement = null;
    }
  }

  // Public: expose server id
  getId() {
    return this._id;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-item")
      .cloneNode(true);
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardImage = this._cardElement.querySelector(".cards__image");
    this._cardTitle = this._cardElement.querySelector(".cards__title");
    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".cards__trash-button"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Initialize like UI from server flag
    this._applyLikeUI();

    this._setEventListeners();
    return this._cardElement;
  }
}
