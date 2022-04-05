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
          <span>Log out</span>
        </div>
      `;
    } else {
      headerContainer.innerHTML = `
        <div class="logo">
          <img src="images/LOGO.svg" alt="logo">
        </div>
      
        <div class="greetings">
          <h1>Log in</h1>
          <br>
          <h3>Sign up</h3>
        </div>
      `;
    }
  }
}

window.testHeaderView = new HeaderView('header');

export default HeaderView;
