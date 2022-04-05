import HeaderView from "./HeaderView.js";

class LogInView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display() {
    new HeaderView('header').displayAuthorizationHeader();
    const logInContainer = document.querySelector(`#${this.containerId}`);
    logInContainer.innerHTML = `
      <nav class="breadcrumbs">
        <img class="breadcrumbs_img" src="images/home.svg" alt="home">
        <ul class="breadcrumbs_links">
          <li><span>Main</span>></li>
          <li><span>Log in<span>></li>
        </ul>
      </nav>
      
      <section class="sign">
        <div class="logo-big">
          <img src="images/LOGO.svg" alt="logo">
        </div>
        <form id="log-in-form">
          <div class="sign-inputs">
            <div class="username">
              <input type="text" name="username" id="username" placeholder="username" required>
            </div>
            <div class="password">
              <input type="password" name="password" id="password" placeholder="password" required>
            </div>
          </div>
          <div class="sign-buttons">
            <input type="submit" value="Sign in">
            <p>if you don't have an account yet</p>
            <span>Sign up</span>
          </div>
        </form>
      </section>
    `;
  }
}

window.testLogInView = new LogInView('main');
