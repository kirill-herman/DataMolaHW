import TweetCollection from "./tweetCollection.js";
import Comment from "./comment.js";
import HeaderView from "./HeaderView.js";

window.changeUser = () => {
  const test = new HeaderView('hi-username');
  test.display(TweetCollection.user);
};
