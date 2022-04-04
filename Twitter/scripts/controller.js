import TweetCollection from "./tweetCollection.js";
import HeaderView from "./HeaderView.js";
import TweetFeedView from "./tweetFeedView.js";
import TweetView from "./tweetView.js";
import FilterView from "./filterView.js";
import tweets from "./DB.js";

const model = new TweetCollection();
model.addAll(tweets);
const headerView = new HeaderView('hi-username');
const tweetFeedView = new TweetFeedView('main');
const tweetView = new TweetView('main');
const filterView = new FilterView('aside');

window.setCurrentUser = (user = 'guest') => {
  TweetCollection.user = user;
  headerView.display(user);
  tweetFeedView.display(model.getPage(0, 11));
};

window.addTweet = (text) => {
  if (model.add(text)) {
    tweetFeedView.display(model.getPage(0, 11));
  }
};

window.editTweet = (id, text) => {
  if (model.edit(id, text)) {
    tweetFeedView.display(model.getPage(0, 11));
  }
};

window.removeTweet = (id) => {
  if (model.remove(id)) {
    tweetFeedView.display(model.getPage(0, 11));
  }
};

window.getFeed = (skip = 0, top = 10, filterConfig = {}) => {
  tweetFeedView.display(model.getPage(skip, top, filterConfig));
};

window.showTweet = (id) => {
  tweetView.display(model.get(id));
};

filterView.display();
setCurrentUser('Kirill');
getFeed(0, 11);
addTweet('dmsakldmakdlmdksal');
removeTweet(17, 'testing');
editTweet(16, 'testing');
showTweet(16);
