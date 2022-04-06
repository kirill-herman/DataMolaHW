class HeaderView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(authorized, user) {
    const headerContainer = document.querySelector(`#${this.containerId}`);
    if (authorized) {
      headerContainer.innerHTML = `
        <div class="logo">
          <img src="images/LOGO.svg" alt="logo">
        </div>
      
        <div class="greetings">
          <h1>Welcome!</h1>
          <h2 id="hi-username">Hi, ${user}</h2>
        </div>

        <div class="header-buttons">
          <span id="logout">Log out</span>
        </div>
      `;
    } else {
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
  }

  displayAuthorizationHeader() {
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

  displayRegistrationHeader() {
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
}

window.testHeaderView = new HeaderView('header');

export default HeaderView;
