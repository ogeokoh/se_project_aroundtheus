// src/components/UserInfo.js
export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._aboutEl = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      title: this._nameEl.textContent,
      description: this._aboutEl.textContent,
    };
  }

  setUserInfo({ title, description }) {
    if (typeof title === "string") this._nameEl.textContent = title;
    if (typeof description === "string")
      this._aboutEl.textContent = description;
  }
}
