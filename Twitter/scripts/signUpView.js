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
          <li><span id="link-to-main">Main</span>></li>
          <li><span id="link-to-signup">Sign up<span>></li>
        </ul>
      </nav>
      
      <section class="sign">
        <div class="logo-big">
          <img src="images/LOGO.svg" alt="logo">
        </div>
        <form id="sign-up-form">
          <div class="sign-inputs">
            <div class="username">
              <input type="text" id="signup-username" name="username" id="username" placeholder="username" required>
            </div>
            <div class="password">
              <input type="password" id="signup-password" name="password" id="password" placeholder="password" required>
            </div>
            <div class="password">
              <input type="password" name="password-confirm" id="password-confirm" placeholder="confirm password" required>
            </div>
          </div>
          <div class="sign-buttons">
            <input type="submit" id="signup-submit" value="Sign up">
            <p>if you already have an account</p>
            <span id="link-to-login">Log in</span>
          </div>
        </form>
      </section>
    `;
  }
}

export default SignUpView;
