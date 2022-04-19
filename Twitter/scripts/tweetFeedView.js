/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import TweetCollection from "./tweetCollection.js";

class TweetFeedView {
  constructor(containerId, controller) {
    this.containerId = containerId;
    this.handler = this._createHandler(controller);
  }

  display(tweets) {
    this._displayStatic();

    const tweetFeed = document.querySelector(`#${this.containerId}`).lastElementChild;

    for (let i = 0; i < tweets.length; i += 1) {
      tweetFeed.append(this._getTweetElement(tweets[i]));
    }
  }

  displayLoadButton() {
    if (document.querySelector('.twit-load')) {
      document.querySelector('.twit-load').remove();
    }
    const tweetFeed = document.querySelector(`#${this.containerId}`).lastElementChild;

    const loadButton = this._getLoadButtonElement();
    tweetFeed.append(loadButton);
  }

  addListeners() {
    const mainContainer = document.querySelector(`#${this.containerId}`);
    mainContainer.addEventListener('click', this.handler.click);
    mainContainer.addEventListener('keydown', this.handler.keydown);
    mainContainer.addEventListener('keyup', this.handler.keyup);
  }

  removeListeners() {
    const mainContainer = document.querySelector(`#${this.containerId}`);
    mainContainer.removeEventListener('click', this.handler);
    mainContainer.removeEventListener('keydown', this.handler);
    mainContainer.removeEventListener('keyup', this.handler);
  }

  _getLoadButtonElement() {
    const loadButton = document.createElement('button');
    loadButton.classList.add('twit-load');
    loadButton.textContent = 'load more';
    return loadButton;
  }

  _getTweetElement(tweetObject) {
    const tweet = document.createElement('section');
    tweet.classList.add('twit');
    tweet.id = 'twit';
    tweet.dataset.tweetId = tweetObject.id;

    const tweetHeader = document.createElement('div');
    tweetHeader.classList.add('twit-header');
    tweet.append(tweetHeader);

    tweetHeader.insertAdjacentHTML('beforeend', `
      <h3>${tweetObject.author}</h3>
      <span>${this._getNormalDate(tweetObject.createdAt)}</span>
    `);

    const tweetBody = document.createElement('p');
    tweetBody.classList.add('twit-body');
    tweet.append(tweetBody);

    tweetBody.insertAdjacentHTML('beforeend', this._getTextWithHashtags(tweetObject.text));

    const tweetFooter = document.createElement('div');
    tweetFooter.classList.add('twit-footer');
    tweet.append(tweetFooter);

    tweetFooter.insertAdjacentHTML('beforeend', `
      <div class="author-buttons">
        <img data-tweet-id="${tweetObject.id}" id="edit-button" style="padding: 4px;" src="images/Edit.svg" alt="">
        <img data-tweet-id="${tweetObject.id}" id="delete-button" src="images/Delete.svg" alt="">
      </div>
      <figure class="comments">
        <img id="comments" data-tweet-id="${tweetObject.id}" src="images/Comment.svg" alt="comment">
        <figcaption>${tweetObject.comments.length}</figcaption>
      </figure>
    `);
    if (tweetObject.author === TweetCollection.user && TweetCollection.user !== 'Guest') {
      tweetFooter.firstElementChild.classList.remove('hidden');
    } else tweetFooter.firstElementChild.classList.add('hidden');

    return tweet;
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
        </ul>
      </nav>
    `;
    if (localStorage.getItem('authorized') === 'true') {
      main.insertAdjacentHTML('beforeend', `
        <section id="twit-input">
          <h2 class="twit-input_header">What's new?</h2>
          <form class="twit-input_form" action="">
            <div class="input-wrapper">
              <textarea id="tweet-textarea"></textarea>
            </div>
            <div class="twit-input-footer">
              <span id="char-counter" class="char-counter">0/280</span>
              <button type="submit" id="tweet-submit">Post</button>
            </div>
          </form>
        </section>
      `);
    }
    main.insertAdjacentHTML('beforeend', `
      <section id="tweet-feed"></section>
    `);
  }

  _createHandler(controller) {
    const handler = {};
    handler.click = (event) => {
      if (event.target.id === 'tweet-submit') {
        event.preventDefault();
        const tweetTextArea = document.querySelector('#tweet-textarea');
        const text = tweetTextArea.value;
        if (text.length > 0) {
          controller.addTweet(text);
          tweetTextArea.value = '';
        }
      }
      if (event.target.id === 'delete-button') {
        const { tweetId } = event.target.dataset;
        controller.removeTweet(tweetId);
      }
      if (event.target.id === 'comments') {
        const { tweetId } = event.target.dataset;
        controller.showTweet(tweetId);
      }
      if (event.target.id === 'link-to-main') {
        controller.getFeed();
      }
      if (event.target.classList.contains('twit-load')) {
        const tweetFeed = document.querySelector(`#${this.containerId}`).lastElementChild;
        const count = 10 + tweetFeed.childElementCount;
        controller.loadMore(0, count);
      }
      if (event.target.id === 'edit-button') {
        const { tweetId } = event.target.dataset;
        const tweetBody = event.target.closest('.twit').querySelector('.twit-body');
        const tweetTextOld = tweetBody.textContent;
        tweetBody.innerHTML = `
          <div class="input-wrapper">
            <textarea id="tweet-textarea" width=100%>${tweetTextOld}</textarea>
          </div>
        `;
        event.target.style = 'visibility: hidden';
        tweetBody.insertAdjacentHTML('beforebegin', '<div id="tip" style="opacity: 0.7; text-align: center">Click enter to submit</div>');
        tweetBody.addEventListener('keydown', (e) => {
          if (tweetBody.textContent.length >= 280 && e.keyCode !== 8) {
            e.preventDefault();
          }
          if (e.keyCode === 13) {
            e.preventDefault();
            const tweetTextNew = tweetBody.querySelector('#tweet-textarea').value;

            if (tweetTextNew.length > 0) {
              controller.editTweet(tweetId, tweetTextNew);
              tweetBody.innerHTML = this._getTextWithHashtags(tweetTextNew);
            } else {
              controller.editTweet(tweetId, tweetTextOld);
              tweetBody.innerHTML = this._getTextWithHashtags(tweetTextOld);
            }
            event.target.style = 'visibility: visible';
            document.querySelector('#tip').remove();
          }
        });
      }
    };

    handler.keyup = () => {
      const tweetTextArea = document.querySelector('#tweet-textarea');
      const charCounter = document.querySelector('#char-counter');
      if (tweetTextArea) {
        if (tweetTextArea.value.length > 280) {
          tweetTextArea.value = tweetTextArea.value.slice(0, 280);
        }
        charCounter.innerHTML = `${tweetTextArea.value.length}/280`;
      }
    };

    handler.keydown = (event) => {
      const tweetTextArea = document.querySelector('#tweet-textarea');
      if (tweetTextArea) {
        if (tweetTextArea.value.length > 280 && event.keyCode !== 8) {
          event.preventDefault();
        }
      }
    };

    return handler;
  }
}

export default TweetFeedView;
