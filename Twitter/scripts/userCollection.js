/* eslint-disable no-underscore-dangle */
class UserCollection {
  constructor() {
    this.users = [];
    this._authorized = false;
    this._restore();
  }

  get authorized() {
    return this._authorized;
  }

  set authorized(value) {
    this._authorized = value;
    this._save();
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
    this.authorized = JSON.parse(localStorage.getItem('authorized')) ?? false;
  }

  _save() {
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('authorized', JSON.stringify(this.authorized));
  }
}

export default UserCollection;
