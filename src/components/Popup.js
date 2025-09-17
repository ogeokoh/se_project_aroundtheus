// src/components/Popup.js
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  setEventListeners() {
    // overlay click
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupElement) this.close();
    });
    // X button
    const closeBtn = this._popupElement.querySelector(".modal__close");
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
  }
}
