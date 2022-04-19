/* eslint-disable no-underscore-dangle */
import TweetCollection from "./tweetCollection.js";

class TweetView {
  constructor(containerId, controller) {
    this.containerId = containerId;
    this.handler = this._createHandler(controller);
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
            <img data-tweet-id="${tweetObject.id}" id="edit-button" style="padding: 4px;" src="images/Edit.svg" alt="">
            <img data-tweet-id="${tweetObject.id}" id="delete-button" src="images/Delete.svg" alt="">
          </div>
          <figure class="comments">
            <img src="images/Comment.svg" alt="comment">
            <figcaption>${tweetObject.comments.length}</figcaption>
          </figure>
        </div>
      </div>
      </section>
    `);

    const tweetFooter = tweet.querySelector('.twit-footer');

    if (tweetObject.author === TweetCollection.user) {
      tweetFooter.firstElementChild.classList.remove('hidden');
    } else tweetFooter.firstElementChild.classList.add('hidden');

    if (tweetObject.comments.length > 0) {
      tweet.insertAdjacentHTML('beforeend', '<section class="comments-list"></section>');
      for (let i = 0; i < tweetObject.comments.length; i += 1) {
        tweet.lastElementChild.insertAdjacentHTML('beforeend', `
          <div class="comment">
            <div class="comment-header">
              <h3>${tweetObject.comments[i].author}</h3>
              <span>${this._getNormalDate(tweetObject.comments[i].createdAt)}</span>
            </div>
            <p class="comment-body">${tweetObject.comments[i].text}</p>
          </div>
        `);
      }
    }

    if (localStorage.getItem('authorized') === 'true') {
      tweet.insertAdjacentHTML('beforeend', `
      <section class="comment-input">
            <div class="comment-input-wrapper">
              <textarea id="comment-text" name=""></textarea>
            </div>
            <button id="comment-submit" data-tweet-id="${tweetObject.id}" type="submit">Post</button>
        </section>
      `);
    }
  }

  _getNormalDate(dateFromApi) {
    const date = new Date(dateFromApi);
    return `${(String(date.getDate()).length === 1) ? `0${date.getDate()}` : date.getDate()}.${(String(date.getMonth()).length === 1) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${date.getFullYear()} ${(String(date.getHours()).length === 1) ? `0${date.getHours()}` : date.getHours()}:${(String(date.getMinutes()).length === 1) ? `0${date.getMinutes()}` : date.getMinutes()}`;
  }

  _getTextWithHashtags(text) {
    return text.replace(/#\w+/g, (hashtag) => `<span class="hashtags-in-text">${hashtag}</span>`);
  }

  _displayStatic() {
    const main = document.querySelector(`#${this.containerId}`);
    main.innerHTML = `
      <nav class="breadcrumbs">
        <img class="breadcrumbs_img" src="images/home.svg" alt="home">
        <ul class="breadcrumbs_links">
          <li><span id="link-to-main">Main</span>></li>
          <li><span>Tweet<span>></li>
        </ul>
      </nav>

      <section id="tweetpage"></section>
    `;
  }

  _createHandler(controller) {
    const handler = (event) => {
      // if (event.target.id === 'edit-button') {
      //   controller.editTweet(event.target.dataset.tweetId);
      // } else
      if (event.target.id === 'delete-button') {
        controller.removeTweet(event.target.dataset.tweetId);
      } else if (event.target.id === 'comment-submit') {
        const commentText = document.querySelector('#comment-text');
        controller.addComment(event.target.dataset.tweetId, commentText.value);
        commentText.value = '';
      } else if (event.target.id === 'link-to-main') {
        controller.getFeed();
      } else if (event.target.id === 'link-to-login') {
        controller.changeView('login');
      } else if (event.target.id === 'link-to-signup') {
        controller.changeView('signup');
      } else if (event.target.id === 'logout') {
        controller.logout();
      }
    };
    return handler;
  }

  addListeners() {
    const mainContainer = document.querySelector(`#${this.containerId}`);
    mainContainer.addEventListener('click', this.handler);
  }

  removeListeners() {
    const mainContainer = document.querySelector(`#${this.containerId}`);
    mainContainer.removeEventListener('click', this.handler);
  }
}

window.testTweetView = new TweetView('main');

export default TweetView;
