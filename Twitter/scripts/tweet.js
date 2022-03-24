/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-unused-vars
class Tweet {
  static maxTextLength = 280;

  constructor(
    text,
    id = this._getNewID(),
    createdAt = new Date(),
    author = TweetCollection.user,
    comments = [],
  ) {
    this._id = id;
    this._createdAt = createdAt;
    this._author = author;

    this.text = text;
    this.comments = comments;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    console.log('can\'t set id');
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(date) {
    console.log('can\'t set date of creation');
  }

  get author() {
    return this._author;
  }

  set author(name) {
    console.log('can\'t set author name');
  }

  static validate(tweet) {
    if (typeof tweet.id !== 'string' || tweet.id.length === 0) return false;
    if (typeof tweet.text !== 'string' || tweet.text.length > Tweet.maxTextLength || tweet.text.length === 0) return false;
    if (!(tweet.createdAt instanceof Date)) return false;
    if (typeof tweet.author !== 'string' || tweet.author.length === 0) return false;

    if (!(tweet.comments instanceof Array)) return false;
    if (tweet.comments.length > 0) {
      const everyValid = tweet.comments.every((comment) => Comment.validate(comment));
      if (!everyValid) return false;
    }

    return true;
  }

  _getNewID() {
    return String(Date.now() + Math.floor(Math.random() * 1e10));
  }
}
