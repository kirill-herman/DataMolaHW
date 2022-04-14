/* eslint-disable no-underscore-dangle */
class LogInView {
  constructor(containerId, controller) {
    this.containerId = containerId;
    this.handler = this._createHandler(controller);
  }

  display() {
    const logInContainer = document.querySelector(`#${this.containerId}`);
    logInContainer.innerHTML = `
      <nav class="breadcrumbs">
        <img class="breadcrumbs_img" src="images/home.svg" alt="home">
        <ul class="breadcrumbs_links">
          <li><span id="link-to-main">Main</span>></li>
          <li><span id="link-to-login">Log in<span>></li>
        </ul>
      </nav>
      
      <section class="sign">
        <div class="logo-big">
          <img src="images/LOGO.svg" alt="logo">
        </div>
        <form id="log-in-form">
          <div class="sign-inputs">
            <div class="username">
              <input type="text" name="username" id="login-username" placeholder="username" required>
            </div>
            <div class="password">
              <input type="password" name="password" id="login-password" placeholder="password" required>
            </div>
          </div>
          <div class="sign-buttons">
            <input type="submit" id="login-submit" value="Sign in">
            <p>if you don't have an account yet</p>
            <span id="link-to-signup">Sign up</span>
          </div>
        </form>
      </section>
    `;
  }

  _createHandler(controller) {
    const handler = (event) => {
      if (event.target.id === 'link-to-main') {
        controller.getFeed();
      } else if (event.target.id === 'link-to-signup') {
        controller.changeView('signup');
      } else if (event.target.id === 'login-submit') {
        event.preventDefault();
        const username = document.querySelector('#login-username').value;
        const password = document.querySelector('#login-password').value;
        controller.authorized(username, password);
      }
    };
    return handler;
  }

  addListeners() {
    const logInContainer = document.querySelector(`#${this.containerId}`);
    logInContainer.addEventListener('click', this.handler);
  }

  removeListeners() {
    const logInContainer = document.querySelector(`#${this.containerId}`);
    logInContainer.removeEventListener('click', this.handler);
  }
}

export default LogInView;
