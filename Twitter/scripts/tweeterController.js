import TweetCollection from "./tweetCollection.js";
import HeaderView from "./HeaderView.js";
import TweetFeedView from "./tweetFeedView.js";
import TweetView from "./tweetView.js";
import FilterView from "./filterView.js";

class TweeterController {
  constructor() {
    this.tweetCollection = new TweetCollection(JSON.parse(localStorage.getItem('tweets')));
    this.headerView = new HeaderView('header');
    this.tweetFeedView = new TweetFeedView('main');
    this.filterView = new FilterView('filter');
    this.tweetView = new TweetView('main');
  }
}

// const headerView = new HeaderView('hi-username');

// window.setCurrentUser = (user = 'guest') => {
//   TweetCollection.user = user;
//   headerView.display(user);
//   tweetFeedView.display(model.getPage(0, 11));
// };

// window.addTweet = (text) => {
//   if (model.add(text)) {
//     tweetFeedView.display(model.getPage(0, 11));
//   }
// };

// window.editTweet = (id, text) => {
//   if (model.edit(id, text)) {
//     tweetFeedView.display(model.getPage(0, 11));
//   }
// };

// window.removeTweet = (id) => {
//   if (model.remove(id)) {
//     tweetFeedView.display(model.getPage(0, 11));
//   }
// };

// window.getFeed = (skip = 0, top = 10, filterConfig = {}) => {
//   tweetFeedView.display(model.getPage(skip, top, filterConfig));
// };

// window.showTweet = (id) => {
//   tweetView.display(model.get(id));
// };

// filterView.display();

window.model = new TweetCollection(JSON.parse(localStorage.getItem('tweets')));