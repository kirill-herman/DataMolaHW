/* eslint-disable import/extensions */
import TweetCollection from "./tweetCollection.js";
import HeaderView from "./HeaderView.js";
import TweetFeedView from "./tweetFeedView.js";
import TweetView from "./tweetView.js";
import FilterView from "./filterView.js";
import LogInView from "./logInView.js";
import SignUpView from "./signUpView.js";
import UserCollection from "./userCollection.js";
import tweets from "./DB.js";
import TweetFeedApiService from "./tweetFeedApiService.js";

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
  }

  static filter = {};

  setCurrentUser(user) {
    TweetCollection.user = user;
    UserCollection.authorized = true;
    localStorage.setItem('currentUser', user);
    localStorage.setItem('authorized', true);
    this.getFeed();
  }

  addTweet(text) {
    if (this.tweetModel.add(text)) {
      this.getFeed();
    }
  }

  editTweet(id, text) {
    if (this.tweetModel.edit(id, text)) {
      console.log('edit');
    }
  }

  removeTweet(id) {
    if (this.tweetModel.remove(id)) {
      this.getFeed();
    }
  }

  loadMore(skip, top, filter = TweeterController.filter) {
    this.getFeed(skip, top, filter);
  }

  getFeed(skip = 0, top = 10, filterConfig = {}) {
    TweeterController.filter = filterConfig;
    const filtredModel = this.tweetModel.getPage(
      0,
      this.tweetModel.getTweetsLength(),
      filterConfig,
    );
    this.tweetFeedView.display(this.tweetModel.getPage(skip, top, filterConfig));
    if (filtredModel.length > top) {
      this.tweetFeedView.displayLoadButton();
    }
    this.changeView('main');
  }

  showTweet(id) {
    this.tweetView.display(this.tweetModel.get(id));
    this.changeView('tweet');
  }

  addComment(id, text) {
    if (this.tweetModel.addComment(id, text)) {
      this.showTweet(id);
    }
  }

  register(username, password, passwordConfirm) {
    const user = { name: username, password };
    if (password === passwordConfirm && this.userModel.addNewUser(user)) {
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
    UserCollection.authorized = false;
    TweetCollection.user = 'Guest';
    localStorage.setItem('currentUser', 'Guest');
    localStorage.setItem('authorized', false);
    this.getFeed();
  }

  changeView(view) {
    this.tweetView.removeListeners();
    this.tweetFeedView.removeListeners();
    this.headerView.removeListeners();
    this.filterView.removeListeners();
    this.signUpView.removeListeners();
    this.logInView.removeListeners();

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

      default:
        break;
    }
  }
}

const tweeterController = new TweeterController();

export default TweeterController;
