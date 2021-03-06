/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/extensions
import TweetCollection from './tweetCollection.js';

class Comment {
  static maxTextLength = 280;

  // eslint-disable-next-line no-undef
  constructor(text, id = this._getNewID(), createdAt = new Date(), author = TweetCollection.user) {
    this._id = id;
    this._createdAt = createdAt;
    this._author = author;

    this.text = text;
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

  static validate(comment) {
    if (typeof comment.id !== 'string' || comment.id.length === 0) return false;
    if (typeof comment.text !== 'string' || comment.text.length > Comment.maxTextLength || comment.text.length === 0) return false;
    if (!(comment.createdAt instanceof Date)) return false;
    if (typeof comment.author !== 'string' || comment.author.length === 0) return false;
    return true;
  }

  _getNewID() {
    return String(Date.now() + Math.floor(Math.random() * 1e10)).split('').reverse().join('');
  }
}

export default Comment;
