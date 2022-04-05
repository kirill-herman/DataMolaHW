import HeaderView from "./HeaderView.js";

class SignUpView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display() {
    new HeaderView('header').displayRegistrationHeader();
    const signUpContainer = document.querySelector(`#${this.containerId}`);
    signUpContainer.innerHTML = `
      <nav class="breadcrumbs">
        <img class="breadcrumbs_img" src="images/home.svg" alt="home">
        <ul class="breadcrumbs_links">
          <li><span>Main</span>></li>
          <li><span>Sign up<span>></li>
        </ul>
      </nav>
      
      <section class="sign">
        <div class="logo-big">
          <img src="images/LOGO.svg" alt="logo">
        </div>
        <form id="sign-up-form">
          <div class="sign-inputs">
            <div class="username">
              <input type="text" name="username" id="username" placeholder="username" required>
            </div>
            <div class="password">
              <input type="password" name="password" id="password" placeholder="password" required>
            </div>
            <div class="password">
              <input type="password" name="password-confirm" id="password-confirm" placeholder="confirm password" required>
            </div>
          </div>
          <div class="sign-buttons">
            <input type="submit" value="Sign up">
            <p>if you already have an account</p>
            <span>Log in</span>
          </div>
        </form>
      </section>
    `;
  }
}

window.testSignUpView = new SignUpView('main');