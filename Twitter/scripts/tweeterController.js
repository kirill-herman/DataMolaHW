/* eslint-disable import/extensions */
import TweetCollection from "./tweetCollection.js";
import HeaderView from "./HeaderView.js";
import TweetFeedView from "./tweetFeedView.js";
import TweetView from "./tweetView.js";
import FilterView from "./filterView.js";
import LogInView from "./logInView.js";
import SignUpView from "./signUpView.js";
import UserCollection from "./userCollection.js";

class TweeterController {
  constructor() {
    this.tweetModel = new TweetCollection(JSON.parse(localStorage.getItem('tweets')));
    this.userModel = new UserCollection();
    this.headerView = new HeaderView('header');
    this.filterView = new FilterView('filter');
    this.tweetFeedView = new TweetFeedView('main');
    this.tweetView = new TweetView('main');
    this.logInView = new LogInView('main');
    this.signUpView = new SignUpView('main');
  }

  setCurrentUser(user) {
    TweetCollection.user = user;
    this.userModel.authorized = true;
    localStorage.setItem('currentUser', user);
    this.headerView.display(true, user);
    this.getFeed();
  }

  addTweet(text) {
    if (this.tweetModel.add(text)) {
      this.getFeed();
    }
  }

  editTweet(id, text) {
    if (this.tweetModel.edit(id, text)) {
      this.getFeed();
    }
  }

  removeTweet(id) {
    if (this.tweetModel.remove(id)) {
      this.getFeed();
    }
  }

  getFeed(skip = 0, top = 10, filterConfig = {}) {
    this.tweetFeedView.display(
      this.tweetModel.getPage(skip, top, filterConfig),
      this.tweetModel.getLength(),
    );
  }

  showTweet(id) {
    this.tweetView.display(this.tweetModel.get(id));
  }

  addComment(id, text) {
    if (this.tweetModel.addComment(id, text)) {
      this.getFeed();
    }
  }

  register(username, password) {
    const user = { name: username, password };
    if (this.userModel.addNewUser(user)) {
      this.setCurrentUser(username);
    }
    // else to do (view error)
  }

  authorized(username, password) {
    const dataCorrect = this.userModel.getUsers()
      .some((user) => user.name === username && user.password === password);
    if (dataCorrect) {
      this.setCurrentUser(username);
    }
    // else to do (view error)
  }

  logOut() {
    this.userModel.authorized = false;
    TweetCollection.user = 'Guest';
    localStorage.setItem('currentUser', 'Guest');
    this.headerView.display();
    this.getFeed();
    this.filterView.display();
  }

  createMainPage() {
    this.headerView.display(this.userModel.authorized, TweetCollection.user);
    this.filterView.display();
    this.getFeed();

    if (!this.userModel.authorized) {
      document.querySelector('#link-to-login').addEventListener('click', () => { displayLogInPage(); });
      document.querySelector('#link-to-signup').addEventListener('click', () => { displaySignUpPage(); });
    } else {
      document.querySelector('#logout').addEventListener('click', () => { this.logOut(); });
    }
    document.querySelector('#link-to-main').addEventListener('click', () => { displayStartPage(); });
  }
}

const controller = new TweeterController();
TweetCollection.user = localStorage.getItem('currentUser');

function displayStartPage() {
  controller.headerView.display(controller.userModel.authorized, TweetCollection.user);
  controller.getFeed();
  controller.filterView.display();
  if (!controller.userModel.authorized) {
    document.querySelector('#link-to-login').addEventListener('click', displayLogInPage);
    document.querySelector('#link-to-signup').addEventListener('click', displaySignUpPage);
  } else {
    document.querySelector('#logout').addEventListener('click', () => { controller.logOut(); });
  }
  document.querySelector('#link-to-main').addEventListener('click', displayStartPage);
}

function displayLogInPage() {
  controller.logInView.display();
  controller.filterView.displayEmpty();
  document.querySelectorAll('#link-to-signup').forEach((link) => {
    link.addEventListener('click', displaySignUpPage);
  });
  document.querySelector('#link-to-main').addEventListener('click', displayStartPage);
  document.querySelector('#login-submit').addEventListener('click', () => {
    const username = document.querySelector('#login-username').value;
    const password = document.querySelector('#login-password').value;
    controller.authorized(username, password);
  });
}

function displaySignUpPage() {
  controller.signUpView.display();
  controller.filterView.displayEmpty();
  document.querySelectorAll('#link-to-login').forEach((link) => {
    link.addEventListener('click', displayLogInPage);
  });
  document.querySelector('#link-to-main').addEventListener('click', displayStartPage);
  document.querySelector('#signup-submit').addEventListener('click', () => {
    const username = document.querySelector('#signup-username').value;
    const password = document.querySelector('#signup-password').value;
    controller.register(username, password);
  });
}
