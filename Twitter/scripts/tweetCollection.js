/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import Tweet from "./tweet.js";
class TweetCollection {
  static _user = `Guest${String(Date.now()).slice(-6)}`;

  static get user() {
    return TweetCollection._user;
  }

  static set user(value) {
    TweetCollection._user = value;
  }

  constructor(tweets = []) {
    this._tweets = tweets;
  }

  getPage(skip = 0, top = 10, filterConfig = {}) {
    let workingTweetsArr = this._tweets;

    if (Object.keys(filterConfig).length !== 0) {
      workingTweetsArr = workingTweetsArr.filter((tweet) => {
        if ('author' in filterConfig) {
          if (tweet.author !== filterConfig.author) return false;
        }
        if ('dateTo' in filterConfig) {
          if (tweet.createdAt > filterConfig.dateTo) return false;
        }
        if ('dateFrom' in filterConfig) {
          if (tweet.createdAt < filterConfig.dateFrom) return false;
        }
        if ('hashtags' in filterConfig) {
          const every = filterConfig.hashtags.every((hashtag) => tweet.text.split(' ').filter((word) => word[0] === '#').includes(hashtag));
          if (!every) return false;
        }
        if ('text' in filterConfig) {
          if (!tweet.text.replace(/#/g, '').includes(filterConfig.text)) return false;
        }
        return true;
      });
    }

    workingTweetsArr = workingTweetsArr.sort((a, b) => b.createdAt - a.createdAt);

    return workingTweetsArr.slice(skip, skip + top);
  }

  get(id) {
    return this._tweets.find((tweet) => tweet.id === String(id));
  }

  add(text) {
    const tweet = new Tweet(text);
    if (Tweet.validate(tweet)) {
      this._tweets.push(tweet);
      return true;
    }
    return false;
  }

  edit(id, text) {
    const tweet = this.get(id);
    if ((TweetCollection.user === tweet.author) && (typeof text === 'string') && (text.length <= Tweet.maxTextLength)) { // второе и третье условия на случай, если в функцию прилетит не валидный текст
      tweet.text = text;
      return true;
    }
    return false;
  }

  remove(id) {
    const tweet = this.get(id);
    const indexOfTweet = this._tweets.indexOf(tweet);

    if (TweetCollection.user === tweet.author && indexOfTweet !== -1) {
      this._tweets.splice(indexOfTweet, 1);
      return true;
    }
    return false;
  }

  addAll(tweets) {
    return tweets.map((tweet) => {
      if (Tweet.validate(tweet)) {
        this._tweets.push(tweet);
        return undefined;
      }
      return tweet;
    }).filter((elem) => elem !== undefined);
  }

  clear() {
    this._tweets = [];
  }

  addComment(id, text) {
    const tweet = this.get(id);
    if (!tweet) return false;

    const comment = new Comment(text);
    if (!Comment.validate(comment)) return false;

    tweet.comments.push(comment);
    return true;
  }
}

export default TweetCollection;

// const tweetColl = new TweetCollection();
// tweets[0].id = 0;
// tweetColl.addAll(tweets);
// tweetColl.add('Hi');
// tweetColl.addComment('1', 'sadasda');
// TweetCollection.user = 'newUser';
// tweetColl.edit(1, 'puupa');
// TweetCollection.user = 'Kirill';
// tweetColl.edit(1, 'puupa');
// tweetColl.getPage(10, 10, { author: 'Kirill' });
// TweetCollection.user = 'newUser';
// tweetColl.add('newnewnewnewnewnewe');
// tweetColl.getPage(0, 40, { author: 'newUser' });
// tweetColl.remove('1654765838564');
// tweetColl.clear();
