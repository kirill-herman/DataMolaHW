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
}

export default LogInView;
