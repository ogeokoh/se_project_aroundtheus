// src/components/PopupWithForm.js
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputs = Array.from(
      this._popupElement.querySelectorAll(".modal__input")
    );

    // NEW: submit button + its default label
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._defaultSubmitText = this._submitButton
      ? this._submitButton.textContent
      : "";
  }

  // NEW: toggle loading UI (text + disable inputs/button)
  renderLoading(isLoading, loadingText = "Saving...") {
    if (!this._submitButton) return;

    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true;
      this._inputs.forEach((i) => (i.disabled = true));
    } else {
      this._submitButton.textContent = this._defaultSubmitText;
      this._submitButton.disabled = false;
      this._inputs.forEach((i) => (i.disabled = false));
    }
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
    // NEW: always restore default UI if popup is closed mid-request
    this.renderLoading(false);
  }
}
