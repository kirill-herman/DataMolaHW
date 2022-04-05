/* eslint-disable no-underscore-dangle */
class UserCollection {
  constructor() {
    this.users = [];
    this._restore();
  }

  getUsers() {
    return this.users;
  }

  addNewUser(user) {
    this.users.push(user);
    this._save();
  }

  hasUser(username) {
    return this.users.some((user) => user.name === username);
  }

  _restore() {
    this.users = JSON.parse(localStorage.getItem('users'));
  }

  _save() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
