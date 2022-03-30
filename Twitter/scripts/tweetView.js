/* eslint-disable no-underscore-dangle */
import TweetCollection from "./tweetCollection.js";

class TweetView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(tweetObject) {
    this._displayStatic();

    const tweet = document.querySelector(`#${this.containerId}`).lastElementChild;
    tweet.insertAdjacentHTML('beforeend', `
      <section class="twit-wrapper">
      <div class="twit">
        <div class="twit-header">
          <h3>${tweetObject.author}</h3>
          <span>${this._getNormalDate(tweetObject.createdAt)}</span>
        </div>
        <p class="twit-body">${this._getTextWithHashtags(tweetObject.text)}</p>
        <div class="twit-footer">
          <div class="author-buttons">
            <img style="padding: 4px;" src="images/Edit.svg" alt="">
            <img src="images/Delete.svg" alt="">
          </div>
          <figure class="comments">
            <img src="images/Comment.svg" alt="comment">
            <figcaption>${tweetObject.comments.length}</figcaption>
          </figure>
        </div>
      </div>
      </section>
    `);
  }

  _getNormalDate(date) {
    return date;
  }

  _getTextWithHashtags(text) {
    return text;
  }

  _displayStatic() {
    const main = document.querySelector(`#${this.containerId}`);
    main.innerHTML = `
      <nav class="breadcrumbs">
        <img class="breadcrumbs_img" src="images/home.svg" alt="home">
        <ul class="breadcrumbs_links">
          <li><span>Main</span>></li>
          <li><span>Tweet<span>></li>
        </ul>
      </nav>

      <section id="tweetpage"></section>
    `;
  }
}

window.testTweetView = new TweetView('mainpage');
