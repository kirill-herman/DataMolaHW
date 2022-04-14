/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import TweetCollection from "./tweetCollection.js";

class TweetFeedView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(tweets, fullLength) {
    this._displayStatic();

    const tweetFeed = document.querySelector(`#${this.containerId}`).lastElementChild;
    const loadButton = this._getLoadButtonElement();

    for (let i = 0; i < tweets.length; i += 1) {
      tweetFeed.append(this._getTweetElement(tweets[i]));
    }
    if (tweetFeed.childElementCount < fullLength) {
      tweetFeed.append(loadButton);
    }
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
    if (tweetObject.author === TweetCollection.user) {
      tweetFooter.firstElementChild.classList.remove('hidden');
    } else tweetFooter.firstElementChild.classList.add('hidden');

    return tweet;
  }

  _getNormalDate(date) {
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

      <section id="tweet-feed"></section>
    `;
  }
}

export default TweetFeedView;
