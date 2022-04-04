class HeaderView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(username) {
    // eslint-disable-next-line no-undef
    const greetingContainer = document.querySelector(`#${this.containerId}`);
    greetingContainer.textContent = `Hi, ${username}`;
  }
}

export default HeaderView;
