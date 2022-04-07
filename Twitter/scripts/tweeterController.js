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
    this.createMainPage();
  }

  addTweet(text) {
    if (this.tweetModel.add(text)) {
      this.createMainPage();
    }
  }

  editTweet(id, text) {
    if (this.tweetModel.edit(id, text)) {
      this.createMainPage();
    }
  }

  removeTweet(id) {
    if (this.tweetModel.remove(id)) {
      this.createMainPage();
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
      this.createTweetPage(id);
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
    this.createMainPage();
  }

  createMainPage() {
    this.headerView.display(this.userModel.authorized, TweetCollection.user);
    this.filterView.display();
    this.getFeed();

    // header
    if (!this.userModel.authorized) { 
      document.querySelector('#link-to-login').addEventListener('click', () => { this.createLogInPage(); });
      document.querySelector('#link-to-signup').addEventListener('click', () => { this.createSignUpPage(); });
    } else {
      document.querySelector('#logout').addEventListener('click', () => { this.logOut(); });
    }
    document.querySelector('#link-to-main').addEventListener('click', () => { this.createMainPage(); });

    // tweet-input
    const tweetTextArea = document.querySelector('#tweet-textarea');
    tweetTextArea.addEventListener('keydown', (e) => {
      if (tweetTextArea.value.length >= 280 && e.keyCode !== 8) {
        e.preventDefault();
      }
    });
    tweetTextArea.addEventListener('keyup', () => {
      if (tweetTextArea.value.length > 280) {
        tweetTextArea.value = tweetTextArea.value.slice(0, 280);
      }
      document.querySelector('#char-counter').innerHTML = `${tweetTextArea.value.length}/280`;
    });

    document.querySelector('#tweet-submit').addEventListener('click', (e) => {
      e.preventDefault();
      const text = tweetTextArea.value;
      if (text.length > 0) {
        this.addTweet(text);
        tweetTextArea.value = '';
      }
    });
    // tweet-delete
    document.querySelectorAll('#delete-button').forEach((button) => { // и тут я вспомнил про делегирование, но было слишком поздно :(
      button.addEventListener('click', (e) => {
        const { tweetId } = e.target.dataset;
        this.removeTweet(tweetId);
      });
    });
    // tweet-edit
    document.querySelectorAll('#edit-button').forEach((button) => { // надо бы переделать
      button.addEventListener('click', (e) => {
        const { tweetId } = e.target.dataset;
        const tweetBody = button.closest('.twit').querySelector('.twit-body');
        const tweetTextOld = tweetBody.textContent;
        tweetBody.setAttribute('contenteditable', true);
        tweetBody.focus();
        tweetBody.style = 'background: var(--bg-color)';
        button.style = 'display: none';
        tweetBody.insertAdjacentHTML('beforebegin', '<div id="tip" style="opacity: 0.7; text-align: center">Click enter to submit</div>');
        tweetBody.addEventListener('keydown', (e) => {
          if (tweetBody.textContent.length >= 280 && e.keyCode !== 8) {
            e.preventDefault();
          }
          if (e.keyCode === 13) {
            e.preventDefault();
            if (tweetBody.textContent.length > 0) {
              const text = tweetBody.innerHTML;
              this.editTweet(tweetId, text);
            } else this.editTweet(tweetId, tweetTextOld);
            tweetBody.setAttribute('contenteditable', false);
            tweetBody.style = 'background: none';
          }
        });
      });
    });

    // link to tweet page
    document.querySelectorAll('#comments').forEach((button) => {
      button.addEventListener('click', (e) => {
        const { tweetId } = e.target.dataset;
        this.createTweetPage(tweetId);
      });
    });

    // filter
    document.querySelector('aside').addEventListener('click', (e) => {
      if (e.target.id === 'filter-submit') {
        e.preventDefault();
        const filterConfig = {};
        if (document.querySelector('#filter-author').value.length > 0) filterConfig.author = document.querySelector('#filter-author').value;
        if (document.querySelector('#filter-date-from').value.length > 0) filterConfig.dateFrom = document.querySelector('#filter-date-from').value;
        if (document.querySelector('#filter-date-to').value.length > 0) filterConfig.dateTo = document.querySelector('#filter-date-to').value;
        if (document.querySelector('#filter-hashtag').value.length > 0) filterConfig.hashtag = document.querySelector('#filter-hashtag').value.split(' ');
        if (document.querySelector('#filter-text').value.length > 0) filterConfig.text = document.querySelector('#filter-text').value;
        this.getFeed(0, 10, filterConfig);
      }
    });
  }

  createLogInPage() {
    this.logInView.display();
    this.filterView.displayEmpty();
    document.querySelectorAll('#link-to-signup').forEach((link) => {
      link.addEventListener('click', () => { this.createSignUpPage(); });
    });
    document.querySelector('#link-to-main').addEventListener('click', () => { this.createMainPage(); });
    document.querySelector('#login-submit').addEventListener('click', (e) => {
      e.preventDefault();
      const username = document.querySelector('#login-username').value;
      const password = document.querySelector('#login-password').value;
      this.authorized(username, password);
    });
  }

  createSignUpPage() {
    this.signUpView.display();
    this.filterView.displayEmpty();
    document.querySelectorAll('#link-to-login').forEach((link) => {
      link.addEventListener('click', () => { this.createLogInPage(); });
    });
    document.querySelector('#link-to-main').addEventListener('click', () => { this.createMainPage(); });
    document.querySelector('#signup-submit').addEventListener('click', (e) => {
      e.preventDefault();
      const username = document.querySelector('#signup-username').value;
      const password = document.querySelector('#signup-password').value;
      this.register(username, password);
    });
  }

  createTweetPage(tweetId) {
    this.showTweet(tweetId);
    this.filterView.displayEmpty();

    document.querySelector('#link-to-main').addEventListener('click', () => { this.createMainPage(); });

    this.headerView.display(this.userModel.authorized, TweetCollection.user);
    if (!this.userModel.authorized) {
      document.querySelector('#link-to-login').addEventListener('click', () => { this.createLogInPage(); });
      document.querySelector('#link-to-signup').addEventListener('click', () => { this.createSignUpPage(); });
    } else {
      document.querySelector('#logout').addEventListener('click', () => { this.logOut(); });
    }

    document.querySelector('#comment-submit').addEventListener('click', (e) => {
      e.preventDefault();
      const text = document.querySelector('#comment-text').value;
      this.addComment(tweetId, text);
    });
  }
}

const controller = new TweeterController();
TweetCollection.user = localStorage.getItem('currentUser');

controller.createMainPage();
