/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
class ErrorView {
  constructor(containerId, controller) {
    this.containerId = containerId;
    this.handler = this._createHandler(controller);
  }

  display(error) {
    const errorContainer = document.querySelector(`#${this.containerId}`);
    errorContainer.innerHTML = `
      <nav class="breadcrumbs">
        <img class="breadcrumbs_img" src="images/home.svg" alt="home">
        <ul class="breadcrumbs_links">
          <li><span id="link-to-main">Main</span>></li>
          <li><span>Error<span>></li>
        </ul>
      </nav>
      <section class="error">
        <img class="error-img" src="./images/sadCat.svg">
        <div class="error-text">Error ${error.statusCode}: ${error.message}</div>
      </section>
    `;
  }

  addListeners() {
    const mainContainer = document.querySelector(`#${this.containerId}`);
    mainContainer.addEventListener('click', this.handler);
  }

  removeListeners() {
    const mainContainer = document.querySelector(`#${this.containerId}`);
    mainContainer.removeEventListener('click', this.handler);
  }

  _createHandler(controller) {
    const handler = (event) => {
      if (event.target.id === 'link-to-main') {
        controller.getFeed();
      } else if (event.target.id === 'link-to-login') {
        controller.changeView('login');
      } else if (event.target.id === 'link-to-signup') {
        controller.changeView('signup');
      } else if (event.target.id === 'logout') {
        controller.logout();
      }
    };
    return handler;
  }
}

export default ErrorView;
