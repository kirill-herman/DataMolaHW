/* eslint-disable no-underscore-dangle */
class UserCollection {
  static _authorized = false;

  constructor() {
    this.users = [];
    this._restore();
  }

  static get authorized() {
    return UserCollection._authorized;
  }

  static set authorized(value) {
    UserCollection._authorized = value;
  }

  getUsers() {
    return this.users;
  }

  addNewUser(user) {
    if (!this.hasUser(user.name)) {
      this.users.push(user);
      this._save();
      return true;
    }
    return false;
  }

  hasUser(username) {
    return this.users.some((user) => user.name === username);
  }

  _restore() {
    this.users = JSON.parse(localStorage.getItem('users')) ?? [];
    UserCollection.authorized = JSON.parse(localStorage.getItem('authorized')) ?? false;
  }

  _save() {
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('authorized', JSON.stringify(UserCollection.authorized));
  }
}

export default UserCollection;
