/* eslint-disable no-underscore-dangle */
import TweetCollection from "./tweetCollection.js";

class HeaderView {
  constructor(containerId, controller) {
    this.containerId = containerId;
    this.handler = this._createHandler(controller);
  }

  displayAuthorized() {
    const headerContainer = document.querySelector(`#${this.containerId}`);
    headerContainer.innerHTML = `
      <div class="logo">
        <img src="images/LOGO.svg" alt="logo">
      </div>
    
      <div class="greetings">
        <h1>Welcome!</h1>
        <h2 id="hi-username">Hi, ${TweetCollection.user}</h2>
      </div>

      <div class="header-buttons">
        <span id="logout">Log out</span>
      </div>
    `;
  }

  displayNotAuthorized() {
    const headerContainer = document.querySelector(`#${this.containerId}`);
    headerContainer.innerHTML = `
        <div class="logo">
          <img src="images/LOGO.svg" alt="logo">
        </div>
      
        <div class="greetings">
          <h1 id="link-to-login">Log in</h1>
          <br>
          <h3 id="link-to-signup">Sign up</h3>
        </div>
      `;
  }

  displayAuthorization() {
    const headerContainer = document.querySelector(`#${this.containerId}`);
    headerContainer.innerHTML = `
      <div class="logo">
        <img src="images/LOGO.svg" alt="logo">
      </div>
    
      <div class="greetings">
        <h1 id="link-to-signup">Sign up</h1>
      </div>
    `;
  }

  displayRegistration() {
    const headerContainer = document.querySelector(`#${this.containerId}`);
    headerContainer.innerHTML = `
      <div class="logo">
        <img src="images/LOGO.svg" alt="logo">
      </div>
    
      <div class="greetings">
        <h1 id="link-to-login">Log in</h1>
      </div>
    `;
  }

  addListeners() {
    const headerContainer = document.querySelector(`#${this.containerId}`);
    headerContainer.addEventListener('click', this.handler);
  }

  removeListeners() {
    const headerContainer = document.querySelector(`#${this.containerId}`);
    headerContainer.removeEventListener('click', this.handler);
  }

  _createHandler(controller) {
    const handler = (event) => {
      if (event.target.id === 'link-to-login') {
        controller.changeView('login');
      } else if (event.target.id === 'link-to-signup') {
        controller.changeView('signup');
      } else if (event.target.id === 'logout') {
        controller.logOut();
      }
    };

    return handler;
  }
}

window.headerView = new HeaderView('header');

export default HeaderView;
