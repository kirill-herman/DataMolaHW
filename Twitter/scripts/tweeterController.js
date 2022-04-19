/* eslint-disable import/extensions */
import TweetCollection from "./tweetCollection.js";
import HeaderView from "./HeaderView.js";
import TweetFeedView from "./tweetFeedView.js";
import TweetView from "./tweetView.js";
import FilterView from "./filterView.js";
import LogInView from "./logInView.js";
import SignUpView from "./signUpView.js";
import UserCollection from "./userCollection.js";
import TweetFeedApiService from "./tweetFeedApiService.js";
import ErrorView from "./errorView.js";

class TweeterController {
  constructor() {
    this.tweeterApi = new TweetFeedApiService('https://jslabapi.datamola.com/');
    this.tweetModel = new TweetCollection();
    this.userModel = new UserCollection();
    this.headerView = new HeaderView('header', this);
    this.filterView = new FilterView('aside', this);
    this.tweetFeedView = new TweetFeedView('main', this);
    this.tweetView = new TweetView('main', this);
    this.logInView = new LogInView('main', this);
    this.signUpView = new SignUpView('main', this);
    this.errorView = new ErrorView('main', this);
  }

  static currentFilter = {};

  static currentTop = 0;

  static currentTweets = [];

  setCurrentUser(user) {
    TweetCollection.user = user;
    UserCollection.authorized = true;
    localStorage.setItem('currentUser', user);
    localStorage.setItem('authorized', true);
    this.getFeed();
  }

  addTweet(text) {
    this.tweeterApi.addTweet(text)
      .then(() => {
        this.getFeed(0, TweeterController.currentTop, TweeterController.currentFilter);
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          this.changeView('login');
        } else {
          this.changeView('error');
          this.errorView.display(err);
        }
      });
  }

  editTweet(id, text) {
    this.tweeterApi.editTweet(id, text)
      .then(() => {
        this.getFeed(0, TweeterController.currentTop, TweeterController.currentFilter);
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          this.changeView('login');
        } else {
          this.changeView('error');
          this.errorView.display(err);
        }
      });
  }

  removeTweet(id) {
    this.tweeterApi.deleteTweet(id)
      .then(() => {
        this.getFeed(0, TweeterController.currentTop, TweeterController.currentFilter);
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          this.changeView('login');
        } else {
          this.changeView('error');
          this.errorView.display(err);
        }
      });
  }

  loadMore(skip, top) {
    TweeterController.currentTop = top;
    this.getFeed(skip, top, TweeterController.currentFilter);
  }

  getFeed(skip = 0, top = 10, filterConfig = {}) {
    TweeterController.currentFilter = filterConfig;

    this.tweeterApi.getPage(skip, top, filterConfig)
      .then((data) => {
        this.tweetFeedView.display(data);
        TweeterController.currentTweets = data;
      })
      .then(() => {
        this.tweeterApi.getPage(top, 1, filterConfig)
          .then((data) => {
            if (data.length > 0) {
              this.tweetFeedView.displayLoadButton();
            }
            this.changeView('main');
          });
      })
      .catch((err) => {
        this.changeView('error');
        this.errorView.display(err);
      });
  }

  showTweet(id) {
    this.tweeterApi.getPage(0, TweeterController.currentTop, TweeterController.currentFilter)
      .then((data) => {
        this.tweetView.display(data.find((tweet) => tweet.id === id));
        this.changeView('tweet');
      })
      .catch((err) => {
        this.changeView('error');
        this.errorView.display(err);
      });
  }

  addComment(id, text) {
    this.tweeterApi.addComment(id, text)
      .then(() => {
        this.showTweet(id);
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          this.changeView('login');
        } else {
          this.changeView('error');
          this.errorView.display(err);
        }
      });
  }

  register(username, password, passwordConfirm) {
    if (password === passwordConfirm) {
      this.tweeterApi.register(username, password)
        .then(() => {
          this.authorized(username, password);
        })
        .catch((err) => {
          if (err.statusCode === 409) {
            alert('login - "NeKirill" already exists');
          } else {
            this.changeView('error');
            this.errorView.display(err);
          }
        });
    }
  }

  authorized(username, password) {
    this.tweeterApi.login(username, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        this.setCurrentUser(username);
      })
      .catch((err) => {
        if (err.statusCode === 403) {
          alert(err.message);
        } else {
          this.changeView('error');
          this.errorView.display(err);
        }
      });
  }

  logOut() {
    UserCollection.authorized = false;
    TweetCollection.user = 'Guest';
    localStorage.setItem('currentUser', 'Guest');
    localStorage.setItem('authorized', false);
    localStorage.removeItem('token');
    this.getFeed();
  }

  changeView(view) {
    this.tweetView.removeListeners();
    this.tweetFeedView.removeListeners();
    this.headerView.removeListeners();
    this.filterView.removeListeners();
    this.signUpView.removeListeners();
    this.logInView.removeListeners();
    this.errorView.removeListeners();

    switch (view) {
      case 'main':
        if (UserCollection.authorized) {
          this.headerView.displayAuthorized();
        } else {
          this.headerView.displayNotAuthorized();
        }
        this.filterView.display();
        this.filterView.addListeners();
        this.tweetFeedView.addListeners();
        this.headerView.addListeners();
        break;

      case 'tweet':
        this.filterView.displayEmpty();
        this.tweetView.addListeners();
        this.headerView.addListeners();
        break;

      case 'signup':
        this.filterView.displayEmpty();
        this.headerView.displayRegistration();
        this.signUpView.display();
        this.headerView.addListeners();
        this.signUpView.addListeners();
        break;

      case 'login':
        this.filterView.displayEmpty();
        this.headerView.displayAuthorization();
        this.logInView.display();
        this.headerView.addListeners();
        this.logInView.addListeners();
        break;

      case 'error':
        if (UserCollection.authorized) {
          this.headerView.displayAuthorized();
        } else {
          this.headerView.displayNotAuthorized();
        }
        this.filterView.displayEmpty();
        this.headerView.addListeners();
        this.errorView.addListeners();
        break;

      default:
        break;
    }
  }
}

const tweeterController = new TweeterController();
if (localStorage.getItem('authorized') === 'true') {
  tweeterController.setCurrentUser(localStorage.getItem('currentUser'));
} else {
  tweeterController.logOut();
}

export default TweeterController;
